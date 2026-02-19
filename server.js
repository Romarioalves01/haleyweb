const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { 
    cors: { origin: "*", methods: ["GET", "POST"] } 
});

// Resposta simples para saber que o servidor está vivo
app.get('*', (req, res) => {
    res.send('<h1>Servidor Haleyweb Online</h1><p>Status: Operando</p>');
});

io.on('connection', (socket) => {
    console.log('Cliente conectado: ' + socket.id);

    // Quando a extensão pede permissão, nós damos o OK na hora
    socket.on('authenticate', (data) => {
        console.log('Autenticando usuário...');
        socket.emit('authentication-result', { 
            success: true, 
            roomId: 'sala-principal', 
            userId: 'admin', 
            isActiveUser: true,
            isAuthenticated: true 
        });
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = process.env.PORT || 10000;
http.listen(PORT, () => console.log('SaaS haleyweb rodando na porta ' + PORT));
