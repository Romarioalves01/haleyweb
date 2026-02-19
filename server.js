const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });

app.get('/', (req, res) => {
  res.send('Servidor Haleyweb Online!');
});

io.on('connection', (socket) => {
  console.log('Extensão conectada');
  socket.on('authenticate', (data) => {
    socket.emit('authentication-result', { 
      success: true, 
      roomId: 'sala-haley', 
      userId: data.userId, 
      isActiveUser: true 
    });
  });
});

const PORT = process.env.PORT || 10000;
http.listen(PORT, () => console.log('Rodando na porta ' + PORT));
