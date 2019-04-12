const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

io.on('connection', socket => {
  console.log('A user is connected');
  socket.emit('connection', 'Welcome to the chat room');

  socket.on('character move', pos => {
    console.log('Character is moving');
    console.log(pos);
    io.emit('character move', pos);
  });
});

// console.log that your server is up and running
http.listen(port, () => console.log(`Listening on port ${port}`));