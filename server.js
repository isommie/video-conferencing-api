const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const { handleWebRTCSignaling } = require('./controllers/webrtcController');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins (update in production)
    },
});

// Attach socket.io to the app
app.set('io', io);

// Handle WebRTC signaling
handleWebRTCSignaling(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});