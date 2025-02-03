import express from 'express';
const app = express();

import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

import { Server } from 'socket.io';
import http from 'http';

app.get("/", (req,res)=>{
  res.send("This is the websocket thing");
});

const httpServer = http.createServer(app);
httpServer.listen(3001, () => {
  console.log('Server starting on port ' + 3001);
});

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://051plp7w-3000.asse.devtunnels.ms/"],
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
  }
});

// main variables
let rooms = {} // { roomId1: { clients: [{ socketId, username }] }, }
let peers = {} // { socketId1: { roomId, username }, }

const createRoom = (roomId) => {
  if(rooms[roomId]) return;
  rooms[roomId] = { clients: [] };
}

io.on('connection', async socket => {
  console.log(`[Socket] connected ${socket.id}`);
  
  socket.on('join', ({ roomId, username }, callback) => {
    // handle room joining
    if(!rooms[roomId]) createRoom(roomId);
    console.log(`[Client] ${username} ID ${socket.id} joined room ${roomId}`);

    const clients = rooms[roomId].clients;
    const numClients = clients.length;
    
    socket.join(roomId);
    clients.push({ socketId: socket.id, username });
    peers[socket.id] = { roomId, username };
    
    // share peer info
    if(numClients > 0){
      socket.to(roomId).emit('newPeer', { socketId: socket.id, username });
    }

    const others = clients.filter(client => client.socketId !== socket.id);
    callback(others);
  });

  socket.on('signal', ({ target, signal }) => {
    console.log(`[Message] from ${socket.id} to ${target}`, )
    socket.to(target).emit('signal', {
      sender: socket.id,
      signal,
    });
  });

  socket.on('disconnect', () => {
    // handle disconnect
    if(peers[socket.id]){
      const { roomId } = peers[socket.id];
      rooms[roomId].clients = rooms[roomId].clients.filter(client => client.socketId !== socket.id);
      socket.to(roomId).emit('removePeer', socket.id);
      console.log(`[Client] ${socket.id} exited room ${roomId}`);
      delete peers[socket.id];
    }
  })
})