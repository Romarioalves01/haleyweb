const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });

// Garante que o servidor responda em qualquer página para não dar Not Found
app.get('*', (req, res) => {
  res.send('<h1>Servidor Haleyweb Online!</h1>');
});

io.on('connection', (socket) => {
  console.log('Conexão recebida: ' + socket.id);

  // Responde ao pedido de autenticação da extensão
  socket.on('authenticate', (data) => {
    socket.emit('authentication-result', { 
      success: true, 
      roomId: 'sala-principal', 
      userId: 'admin', 
      isActiveUser: true,
      isAuthenticated: true 
    });
  });

  socket.on('disconnect', () => {
    console.log('Extensão desconectou');
  });
});

const PORT = process.env.PORT || 10000;
http.listen(PORT, () => console.log('SaaS rodando na porta ' + PORT));
