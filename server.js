const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;

const createRoom = roomName => {
  console.log(`Room name is: ${roomName}`);
}

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/create-room', (req, res) => {
  // console.log(req.query.roomName);
  createRoom(req.query.roomName);
  res.send(req.query.roomName);
});

io.on('connection', socket => {
  console.log('A user is connected');
  socket.emit('connection', 'Welcome to the chat room');

  socket.on('character move', pos => {
    console.log('Character is moving');
    console.log(pos);
    io.emit('character move', pos);
  });

  socket.on('create room', room => {
    socket.join(room);
    console.log(`Joined Room: ${room}`)
    io.to(room).emit('create room', room);
    // console.log(io.sockets.adapter.rooms);
  });

  socket.on('say hello', data => {
    console.log(socket.rooms);
    console.log(data);
    io.to(data.room).emit('say hello', 'Nice to meet you!');
    // console.log(io.sockets.adapter.rooms);
  });
});

// console.log that your server is up and running
http.listen(port, () => console.log(`Listening on port ${port}`));