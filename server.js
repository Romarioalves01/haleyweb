const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" } // Permite que a extensão conecte
});

// Uma página simples só para ver se o servidor tá online
app.get('/', (req, res) => {
  res.send('Servidor do SaaS está online!');
});

io.on('connection', (socket) => {
  console.log('Uma extensão conectou! ID:', socket.id);

  // Aqui a extensão vai pedir autorização
  socket.on('authenticate', (data) => {
    console.log('Tentativa de login:', data.userId);
    
    // Por enquanto, vamos aprovar TODO MUNDO para você testar
    socket.emit('authentication-result', { 
      success: true, 
      roomId: data.roomId || 'sala-teste',
      userId: data.userId,
      isActiveUser: true 
    });
  });

  socket.on('ping', (data, callback) => {
    if (typeof callback === 'function') callback();
  });
});

// O Render define a porta na variável process.env.PORT
const PORT = process.env.PORT || 10000;
httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
