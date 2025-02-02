//index.js
const io = require('socket.io-client')
const mediasoupClient = require('mediasoup-client')
const VideoStreamMerger = require('video-stream-merger');

const roomName = window.location.pathname.split('/')[1]
console.log(window.location.pathname.split('/'));

const socket = io("/mediasoup")

socket.on('connectionSuccess', ({ socketId }) => {
  console.log(socketId)
  getLocalStream()
})

let device;
let rtpCapabilities;
let producerTransport;
let consumerTransports = [];
let audioProducer;
let videoProducer;
let merger;

let audioStreams = [];
let videoStreams = [];

const DIMENSION = 
[ // 1 person
  { // 16:9
    x: 0,
    y: 0,
    width: 1920,
    height: 1080,
  },
  { // 4:3
    x: 240,
    y: 0,
    width: 1440,
    height: 1080,
  },
  { // 1:1
    x: 420,
    y: 0,
    width: 1080,
    height: 1080,
  },
  { // 3:4
    x: 555,
    y: 0,
    width: 810,
    height: 1080,
  },
  { // 9:16
    x: 656.25,
    y: 0,
    width: 607.5,
    height: 1080,
  }
];

const LAYOUT = [
  { // 1
    lx: 0,
    ly: 0,
    col: 1,
  },
  { // 2
    lx: 0,
    ly: 270,
    col: 2,
  },
  { // 3-4
    lx: 0,
    ly: 0,
    col: 2,
  },
  { // 5-6
    lx: 0,
    ly: 180,
    col: 3,
  },
  { // 7-9
    lx: 0,
    ly: 0,
    col: 3,
  }
]

// https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerOptions
// https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
let params = {
  // mediasoup params
  encodings: [
    {
      rid: 'r0',
      maxBitrate: 100000,
      scalabilityMode: 'S1T3',
    },
    {
      rid: 'r1',
      maxBitrate: 300000,
      scalabilityMode: 'S1T3',
    },
    {
      rid: 'r2',
      maxBitrate: 900000,
      scalabilityMode: 'S1T3',
    },
  ],
  // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
  codecOptions: {
    videoGoogleStartBitrate: 1000
  }
}

let audioParams;
let videoParams = { params };
let consumingTransports = [];


const updateMediaDevices = async () => {
  const mediaDevices = await navigator.mediaDevices.enumerateDevices();
  const videoInputs = mediaDevices.filter(device => device.kind === 'videoinput');
  const audioInputs = mediaDevices.filter(device => device.kind === 'audioinput');
  const audioOutputs = mediaDevices.filter(device => device.kind === 'audiooutput');

  videoInputs.forEach((device) => {
    const option = document.createElement('option');
    option.value = device.deviceId;
    option.text = device.label || `Camera ${videoSelect.length + 1}`;
    videoSelect.appendChild(option);
  });
  audioInputs.forEach((device) => {
    const option = document.createElement('option');
    option.value = device.deviceId;
    option.text = device.label || `Microphone ${videoSelect.length + 1}`;
    audioInputSelect.appendChild(option);
  });
}

const streamSuccess = (stream) => {
  updateMediaDevices();
  localVideo.srcObject = stream

  merger = new VideoStreamMerger.VideoStreamMerger({
    width: 1920,   // Width of the output video
    height: 1080,  // Height of the output video
    fps: 30,       // Video capture frames per second
    clearRect: true, // Clear the canvas every frame
    audioContext: null, // Supply an external AudioContext (for audio effects)
  });

  
  videoStreams.push({ stream, id: 'local' });
  updateMerge();
  
  merger.start();
  mergerVideo.srcObject = merger.result;

  const mediaRecorder = new MediaRecorder(merger.result, { mimeType: "video/webm" });
  mediaRecorder.ondataavailable = event => {
    if(event.data.size > 0){
      // socket.emit('stream', event.data);
    }
  };

  mediaRecorder.start(100);

  audioParams = { track: stream.getAudioTracks()[0], ...audioParams };
  videoParams = { track: stream.getVideoTracks()[0], ...videoParams };

  joinRoom()
}

const updateMerge = () => {
  return;
  videoStreams.forEach(data => {
    merger.removeStream(data.stream);
  });
  audioStreams.forEach(data => {
    merger.removeStream(data.stream);
  });

  audioStreams.forEach(data => merger.addStream(data.stream));
  
  let sizeIndex, layoutIndex;
  if(videoStreams.length <= 1){
    sizeIndex = 1;
    layoutIndex = 0;
  }
  else if(videoStreams.length <= 2){
    sizeIndex = 2;
    layoutIndex = 1;
  }
  else if(videoStreams.length <= 4){
    sizeIndex = 2;
    layoutIndex = 2;
  }
  else if(videoStreams.length <= 6){
    sizeIndex = 3;
    layoutIndex = 3;
  }
  else if(videoStreams.length <= 9){
    sizeIndex = 3;
    layoutIndex = 4;
  }
  else{
    alert("Currently cannot support meet with size >9");
    return;
  }

  const { lx, ly, col } = LAYOUT[layoutIndex];
  videoStreams.forEach((data, index) => {
    let { width, height } = data.stream.getVideoTracks()[0].getSettings(); // problematik!!!
    let x, y;
    const cd = DIMENSION.find(d => {
      // console.log("test", width, d.height, height, d.width);
      return width * d.height === height * d.width;
    }); // find matching aspect ratio
    if(cd){
      ({ x, y, width, height } = cd);
    }
    else{
      x = 0, y = 0, width = 1920, height = 1080;
    }
    x /= sizeIndex; y /= sizeIndex; width /= sizeIndex; height /= sizeIndex;
    // console.log({ x, y, index, width, height, lx, ly, col });
    merger.addStream(data.stream, {
      width,
      height,
      x: (index % col) * 1920/sizeIndex + lx + x,
      y: (Math.floor(index / col)) * 1080/sizeIndex + ly + y,
    });
  })
}

const joinRoom = () => {
  socket.emit('joinRoom', { roomName }, (data) => {
    console.log(`Router RTP Capabilities... ${data.rtpCapabilities}`)

    // we assign to local variable and will be used when
    // loading the client Device (see createDevice above)
    rtpCapabilities = data.rtpCapabilities

    // once we have rtpCapabilities from the Router, create Device
    createDevice()
  })
}

const getLocalStream = () => {
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      width: {
        min: 640,
        // ideal: 1280,
        max: 1920,
      },
      height: {
        min: 400,
        // ideal: 720,
        max: 1080,
      },
      deviceId: null
    }
  })
  .then(streamSuccess)
  .catch(error => {
    console.log({ error })
  })
}

// A device is an endpoint connecting to a Router on the
// server side to send/recive media
const createDevice = async () => {
  try {
    device = new mediasoupClient.Device()

    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#device-load
    // Loads the device with RTP capabilities of the Router (server side)
    await device.load({
      // see getRtpCapabilities() below
      routerRtpCapabilities: rtpCapabilities
    })

    console.log('Device RTP Capabilities', device.rtpCapabilities)

    // once the device loads, create transport
    createSendTransport()

  } catch (error) {
    console.log(error)
    if (error.name === 'UnsupportedError')
      console.warn('browser not supported')
  }
}

const createSendTransport = () => {
  // see server's socket.on('createWebRtcTransport', sender?, ...)
  // this is a call from Producer, so sender = true
  socket.emit('createWebRtcTransport', { consumer: false }, ({ params }) => {
    // The server sends back params needed 
    // to create Send Transport on the client side
    if (params.error) {
      console.log(params.error)
      return
    }

    console.log(params)

    // creates a new WebRTC Transport to send media
    // based on the server's producer transport params
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#TransportOptions
    producerTransport = device.createSendTransport(params)

    // https://mediasoup.org/documentation/v3/communication-between-client-and-server/#producing-media
    // this event is raised when a first call to transport.produce() is made
    // see connectSendTransport() below
    producerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      try {
        // Signal local DTLS parameters to the server side transport
        // see server's socket.on('transport-connect', ...)
        await socket.emit('transportConnect', {
          dtlsParameters,
        })

        // Tell the transport that parameters were transmitted.
        callback()

      } catch (error) {
        errback(error)
      }
    })

    producerTransport.on('produce', async (parameters, callback, errback) => {
      console.log(parameters)

      try {
        // tell the server to create a Producer
        // with the following parameters and produce
        // and expect back a server side producer id
        // see server's socket.on('transport-produce', ...)
        await socket.emit('transportProduce', {
          kind: parameters.kind,
          rtpParameters: parameters.rtpParameters,
          appData: parameters.appData,
        }, ({ id, producersExist }) => {
          // Tell the transport that parameters were transmitted and provide it with the
          // server side producer's id.
          callback({ id })

          // if producers exist, then join room
          if (producersExist) getProducers()
        })
      } catch (error) {
        errback(error)
      }
    })

    connectSendTransport()
  })
}

const connectSendTransport = async () => {
  // we now call produce() to instruct the producer transport
  // to send media to the Router
  // https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
  // this action will trigger the 'connect' and 'produce' events above
  
  audioProducer = await producerTransport.produce(audioParams);
  videoProducer = await producerTransport.produce(videoParams);

  audioProducer.on('trackended', () => {
    console.log('audio track ended')

    // close audio track
  })

  audioProducer.on('transportclose', () => {
    console.log('audio transport ended')

    // close audio track
  })
  
  videoProducer.on('trackended', () => {
    console.log('video track ended')

    // close video track
  })

  videoProducer.on('transportclose', () => {
    console.log('video transport ended')

    // close video track
  })
}

const signalNewConsumerTransport = async (remoteProducerId) => {
  //check if we are already consuming the remoteProducerId
  if (consumingTransports.includes(remoteProducerId)) return;
  consumingTransports.push(remoteProducerId);

  await socket.emit('createWebRtcTransport', { consumer: true }, ({ params }) => {
    // The server sends back params needed 
    // to create Send Transport on the client side
    if (params.error) {
      console.log(params.error)
      return
    }
    console.log(`PARAMS... ${params}`)

    let consumerTransport
    try {
      consumerTransport = device.createRecvTransport(params)
    } catch (error) {
      // exceptions: 
      // {InvalidStateError} if not loaded
      // {TypeError} if wrong arguments.
      console.log(error)
      return
    }

    consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      try {
        // Signal local DTLS parameters to the server side transport
        // see server's socket.on('transport-recv-connect', ...)
        await socket.emit('transportRecvConnect', {
          dtlsParameters,
          serverConsumerTransportId: params.id,
        })

        // Tell the transport that parameters were transmitted.
        callback()
      } catch (error) {
        // Tell the transport that something was wrong
        errback(error)
      }
    })

    connectRecvTransport(consumerTransport, remoteProducerId, params.id)
  })
}

// server informs the client of a new producer just joined
socket.on('newProducer', ({ producerId }) => signalNewConsumerTransport(producerId))

const getProducers = () => {
  socket.emit('getProducers', producerIds => {
    console.log(producerIds)
    // for each of the producer create a consumer
    // producerIds.forEach(id => signalNewConsumerTransport(id))
    producerIds.forEach(signalNewConsumerTransport)
  })
}

const connectRecvTransport = async (consumerTransport, remoteProducerId, serverConsumerTransportId) => {
  // for consumer, we need to tell the server first
  // to create a consumer based on the rtpCapabilities and consume
  // if the router can consume, it will send back a set of params as below
  await socket.emit('consume', {
    rtpCapabilities: device.rtpCapabilities,
    remoteProducerId,
    serverConsumerTransportId,
  }, async ({ params }) => {
    if (params.error) {
      console.log('Cannot Consume')
      return
    }

    console.log(`Consumer Params`, params);
    // then consume with the local consumer transport
    // which creates a consumer
    const consumer = await consumerTransport.consume({
      id: params.id,
      producerId: params.producerId,
      kind: params.kind,
      rtpParameters: params.rtpParameters
    })

    consumerTransports = [
      ...consumerTransports,
      {
        consumerTransport,
        serverConsumerTransportId: params.id,
        producerId: remoteProducerId,
        consumer,
      },
    ]

    // create a new div element for the new consumer media
    const newElem = document.createElement('div')
    newElem.setAttribute('id', `td-${remoteProducerId}`)

    // destructure and retrieve the video track from the producer
    const { track } = consumer;
    const stream = new MediaStream([ track ]);
    console.log(`Received media ${remoteProducerId}: `, track);

    if (params.kind == 'audio') {
      //append to the audio container
      newElem.innerHTML = '<audio id="' + remoteProducerId + '" autoplay></audio>';

      audioStreams = [...audioStreams, { stream, id: remoteProducerId }];
    } else {
      //append to the video container
      newElem.setAttribute('class', 'remoteVideo');
      newElem.innerHTML = '<video id="' + remoteProducerId + '" autoplay class="video" ></video>';
      videoStreams = [...videoStreams, { stream, id: remoteProducerId }];
    }

    videoContainer.appendChild(newElem);
    updateMerge();
    
    document.getElementById(remoteProducerId).srcObject = stream;
    document.getElementById(remoteProducerId).onplay = () => console.log('remote video playing!', remoteProducerId);
    console.log(newElem);

    // the server consumer started with media paused
    // so we need to inform the server to resume
    socket.emit('consumerResume', { serverConsumerId: params.serverConsumerId })
  })
}

socket.on('producerClosed', ({ remoteProducerId }) => {
  // server notification is received when a producer is closed
  // we need to close the client-side consumer and associated transport
  const producerToClose = consumerTransports.find(transportData => transportData.producerId === remoteProducerId)
  producerToClose.consumerTransport.close()
  producerToClose.consumer.close()

  // remove the consumer transport from the list
  consumerTransports = consumerTransports.filter(transportData => transportData.producerId !== remoteProducerId)

  // remove the video div element
  videoContainer.removeChild(document.getElementById(`td-${remoteProducerId}`));
  audioStreams = audioStreams.filter(data => data.id !== remoteProducerId);
  videoStreams = videoStreams.filter(data => data.id !== remoteProducerId);

  updateMerge();
});