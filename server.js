const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });

// Isso mata o erro de "Not Found" e confirma que o servidor está vivo
app.get('*', (req, res) => {
  res.send('<h1>Servidor Haleyweb Online!</h1><p>Pronto para receber a extensao.</p>');
});

io.on('connection', (socket) => {
  console.log('Extensão conectada: ' + socket.id);
  socket.on('authenticate', (data) => {
    socket.emit('authentication-result', { 
      success: true, 
      roomId: 'sala-principal', 
      userId: 'admin', 
      isActiveUser: true,
      isAuthenticated: true 
    });
  });
});

const PORT = process.env.PORT || 10000;
http.listen(PORT, () => console.log('Servidor rodando na porta ' + PORT));
