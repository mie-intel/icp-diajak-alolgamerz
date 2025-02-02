import express from 'express';
const app = express();

import https from 'httpolyglot';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

import { Server } from 'socket.io';
import mediasoup from 'mediasoup';

app.get('*', (req, res, next) => {
  
  if(req.path.length > 1) return next();
  
  res.send('You need to specify a room name in the path!');
});

app.use('/:room', express.static(path.join(__dirname, 'public')));

// SSL cert for HTTPS access
const options = {
  key: fs.readFileSync('./server/ssl/localhost.key', 'utf-8'),
  cert: fs.readFileSync('./server/ssl/localhost.crt', 'utf-8')
}

const httpsServer = https.createServer(options, app);
httpsServer.listen(3000, () => {
  console.log('listening on port: ' + 3000)
})

const io = new Server(httpsServer);

const connections = io.of('mediasoup');

// temporary video storage
const tempFolder = path.join(__dirname, "video");
if (!fs.existsSync(tempFolder)) {
  fs.mkdirSync(tempFolder);
}

/**
* Worker
* |-> Router(s)
*     |-> Producer Transport(s)
*         |-> Producer
*     |-> Consumer Transport(s)
*         |-> Consumer 
**/

let worker
let rooms = {}          // { roomName1: { Router, rooms: [ socketId1, ... ], merger, ffmpegStream }, ...}
let peers = {}          // { socketId1: { roomName1, socket, transports = [id1, id2,] }, producers = [id1, id2,] }, consumers = [id1, id2,], peerDetails }, ...}
let transports = []     // [ { socketId1, roomName1, transport, consumer }, ... ]
let producers = []      // [ { socketId1, roomName1, producer, }, ... ]
let consumers = []      // [ { socketId1, roomName1, consumer, }, ... ]

let recordingTransports = [] // [ { socketId1, roomName1, transport } ]

const createWorker = async () => {
  worker = await mediasoup.createWorker({
    rtcMinPort: 2000,
    rtcMaxPort: 2020,
  });
  console.log(`[Worker] created ${worker.pid}`);
  
  worker.on('died', () => {
    console.error(`[Worker] died: ${worker.pid} :(`);
    setTimeout(() => process.exit(1), 2000);
  });
}

// create worker as soon as application starts
createWorker();

const mediaCodecs = [
  {
    kind: 'audio',
    mimeType: 'audio/opus',
    clockRate: 48000,
    channels: 2,
  },
  {
    kind: 'video',
    mimeType: 'video/VP8',
    clockRate: 90000,
    parameters: {
      'x-google-start-bitrate': 1000,
    },
  },
];

connections.on('connection', async socket => {
  const streamData = [];

  console.log(`[Socket] connected ${socket.id}`);
  socket.emit('connectionSuccess', {
    socketId: socket.id,
  });
  
  // utility function to remove all current socket's element in array or object
  // also closes the corresponding type
  const removeItems = (items, type) => {
    items.forEach(item => {
      if(item.socketId == socket.id){
        item[type].close();
      }
    });
    return items.filter(item => item.socketId !== socket.id);
  }

  socket.on('stream', data => {
    streamData.push(Buffer.from(data));
  })

  socket.on('disconnect', () => {
    // cleanup
    console.log(`[Socket] disconnected ${socket.id}`);
    consumers = removeItems(consumers, 'consumer');
    producers = removeItems(producers, 'producer');
    transports = removeItems(transports, 'transport');
    recordingTransports = removeItems(recordingTransports, 'transport');

    if(!peers[socket.id]) return;
    const { roomName } = peers[socket.id];
    delete peers[socket.id];

    rooms[roomName].peers = rooms[roomName].peers.filter(socketId => socketId !== socket.id);
    if(rooms[roomName].peers.length === 0){
      closeRoom(roomName);
    }

    if (streamData.length === 0) {
      return;
    }

    const videoBuffer = Buffer.concat(streamData);

    const fileName = `video-${Date.now()}.mp4`;
    const filePath = path.join(tempFolder, fileName);

    fs.writeFile(filePath, videoBuffer, (err) => {
      if (err) {
        console.error("[Error] saving file:", err);
        return;
      }
      console.log("[Record] Video saved: ", fileName);
    });
  });

  socket.on('joinRoom', async ({ roomName }, callback) => {
    if(!rooms[roomName]) await createRoom(roomName);
    const router = rooms[roomName].router;

    peers[socket.id] = {
      socket,
      roomName,
      transports: [],
      producers: [],
      consumers: [],
      peerDetails: {
        name: '',
        isAdmin: false,
      }
    }

    rooms[roomName].peers.push(socket.id);

    const rtpCapabilities = router.rtpCapabilities;

    callback({ rtpCapabilities });
  });

  const createWebRtcTransport = async (router) => {
    const webRtcTransportOptions = {
      listenIps: [
        {
          ip: '127.0.0.1',
        }
      ],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
    }

    let transport = await router.createWebRtcTransport(webRtcTransportOptions);
    console.log(`[Transport] created ${transport.id}`);

    transport.on('dtlsstatechange', dtlsState => {
      if(dtlsState === 'closed'){
        transport.close();
      }
    }) 

    transport.on('close', () => {
      console.log(`[Transport] closed ${transport.id}`);
    })

    return transport;
  }

  const addTransport = (transport, roomName, consumer) => {
    transports.push({ 
      socketId: socket.id,
      transport,
      roomName,
      consumer,
    });

    peers[socket.id].transports.push(transport.id)
  }

  const addProducer = (producer, roomName) => {
    producers.push({ socketId: socket.id, producer, roomName });

    peers[socket.id].producers.push(producer.id);
  }

  const addConsumer = (consumer, roomName) => {
    consumers.push({ socketId: socket.id, consumer, roomName });
1
    peers[socket.id].consumers.push(consumer.id);
  }

  const informConsumers = (roomName, id) => {
    producers.filter(
      producerData => producerData.socketId !== socket.id && producerData.roomName === roomName
    ).map(
      producerData => peers[producerData.socketId].socket
    ).forEach(
      roomPeerSocket => roomPeerSocket.emit('newProducer', { producerId: id })
    );
  }

  const getProducerTransport = () => {
    return transports.find(
      transport => !transport.consumer && transport.socketId === socket.id
    ).transport
  }

  const getConsumerTransport = (serverConsumerTransportId) => {
    return transports.find(
      transport => transport.consumer && transport.transport.id === serverConsumerTransportId
    ).transport
  }

  socket.on('createWebRtcTransport', async ({ consumer }, callback) => {
    const roomName = peers[socket.id].roomName;
    const router = rooms[roomName].router;
    try{
      const transport = await createWebRtcTransport(router);
  
      callback({
        params: {
          id: transport.id,
          iceParameters: transport.iceParameters,
          iceCandidates: transport.iceCandidates,
          dtlsParameters: transport.dtlsParameters,
        }
      });
  
      addTransport(transport, roomName, consumer);
    }
    catch(err){
      console.error(err);
    }
  });

  socket.on('getProducers', (callback) => {
    const { roomName } = peers[socket.id];

    let producerList = producers.filter(
      producerData => producerData.socketId !== socket.id && producerData.roomName === roomName
    ).map(
      producerData => producerData.producer.id
    );

    callback(producerList);
  })

  socket.on('transportConnect', ({ dtlsParameters }) => {
    console.log(`[Producer Transport] DTLS params: `, { dtlsParameters });

    getProducerTransport().connect({ dtlsParameters });
  });

  socket.on('transportProduce', async ({ kind, rtpParameters, appData }, callback) => {
    const producer = await getProducerTransport().produce({
      kind,
      rtpParameters
    });

    const { roomName } = peers[socket.id];

    addProducer(producer, roomName);
    informConsumers(roomName, producer.id);

    console.log(`[Producer] created ${producer.id}`, producer.kind);

    callback({
      id: producer.id,
      producersExist: producers.length > 1,
    })
  });

  socket.on('transportRecvConnect', async ({ dtlsParameters, serverConsumerTransportId }) => {
    console.log(`[Consumer Transport] DTLS params: `, { dtlsParameters });
    const consumerTransport = getConsumerTransport(serverConsumerTransportId);
    await consumerTransport.connect({ dtlsParameters });
  })

  socket.on('consume', async ({ rtpCapabilities, remoteProducerId, serverConsumerTransportId }, callback) => {
    try{
      const { roomName } = peers[socket.id];
      const router = rooms[roomName].router;
      const consumerTransport = getConsumerTransport(serverConsumerTransportId);

      if(!router.canConsume({
        producerId: remoteProducerId,
        rtpCapabilities,
      })) return;

      const consumer = await consumerTransport.consume({
        producerId: remoteProducerId,
        rtpCapabilities,
        paused: true,
      });

      console.log(`[Consumer] created ${consumer.id}`);

      consumer.on('transportclose', () => {
        console.log(`[Consumer] transport closed`);
      })

      consumer.on('producerclose', () => {
        console.log(`[Consumer] producer closed`);
        socket.emit('producerClosed', { remoteProducerId });

        consumerTransport.close([]);
        transports = transports.filter(
          transportData => transportData.transport.id !== consumerTransport.id
        );
        consumer.close();
        consumers.filter(
          consumerData => consumerData.consumer.id !== consumer.id
        );
      });

      addConsumer(consumer, roomName);

      const params = {
        id: consumer.id,
        producerId: remoteProducerId,
        kind: consumer.kind,
        rtpParameters: consumer.rtpParameters,
        serverConsumerId: consumer.id,
      }

      callback({ params })
    }
    catch(err){
      console.log(err.message)
      callback({
        params: {
          error: err,
        }
      })
    }
  });

  socket.on('consumerResume', async ({ serverConsumerId }) => {
    const { consumer } = consumers.find(consumerData => consumerData.consumer.id === serverConsumerId)
    console.log(`[Consumer] resume ${consumer.id}`);
    await consumer.resume();
  });
});

const createRoom = async (roomName) => {
  const router = await worker.createRouter({ mediaCodecs });
  console.log(`[Router] created ${router.id} for room ${roomName}`);
  rooms[roomName] = { router, peers: [] };
}

const closeRoom = (roomName) => {
  console.log(`[Router] destroyed ${rooms[roomName].router.id} for room ${roomName}`);
  rooms[roomName].router.close();
  delete rooms[roomName];
}