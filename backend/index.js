const connectToMongo = require('./db');
const express = require('express');
const cryptoRoutes = require('./routes/cryptoRoutes');
const http = require('http');
const { Server } = require('socket.io');
const Crypto = require('./model/crypto'); 
const cors = require('cors');

connectToMongo();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
    }
});

const port = 5011;

app.use(cors());
app.use(express.json());

app.use('/api/crypto', cryptoRoutes);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const emitDataUpdates = async () => {
    try {
        const data = await Crypto.find().sort({ createdAt: -1 }).limit(50);
        io.emit('updateData', data);
    } catch (error) {
        console.error('Error emitting data updates:', error);
    }
};


setInterval(async () => {
    await emitDataUpdates();
}, 5000);

server.listen(port, () => {
    console.log(`Real Time Price backend listening on port ${port}`);
});
