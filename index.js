const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  io.emit('getData','newdata');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  //console.log('a user connected');
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});