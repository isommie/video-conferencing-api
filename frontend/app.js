const socket = io('http://localhost:5000');

// DOM Elements
let localVideo, remoteVideo;

// Check which page is loaded
const currentPage = window.location.pathname.split('/').pop();

// Initialize page-specific logic

// Check if the current page is the root route or index.html
if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    // Add event listeners for the buttons
    document.getElementById('registerBtn').addEventListener('click', () => {
        window.location.href = 'register.html'; // Redirect to register.html
    });

    document.getElementById('loginBtn').addEventListener('click', () => {
        window.location.href = 'login.html'; // Redirect to login.html
    });
} else if (currentPage === 'register.html') {
    // Registration Page Logic
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            alert('Registration successful! Please login.');
            window.location.href = 'login.html'; // Redirect to login page
        } catch (error) {
            console.error('Registration Error:', error);
            alert('Registration failed. Please try again.');
        }
    });
} else if (currentPage === 'login.html') {
    // Login Page Logic
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            localStorage.setItem('token', data.token); // Save token
            alert('Login successful!');
            window.location.href = 'room.html'; // Redirect to room page
        } catch (error) {
            console.error('Login Error:', error);
            alert('Login failed. Please try again.');
        }
    });
} else if (currentPage === 'room.html') {
    // Room Page Logic
    localVideo = document.getElementById('localVideo');
    remoteVideo = document.getElementById('remoteVideo');

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login first.');
        window.location.href = 'login.html'; // Redirect to login page
    }

    // Create Room
    document.getElementById('createRoomBtn').addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:5000/api/rooms/create', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            console.log('Create Room Response:', data);
            joinRoom(data.roomId);
        } catch (error) {
            console.error('Create Room Error:', error);
            alert('Failed to create room. Please try again.');
        }
    });

    // Join Room
    function joinRoom(roomId) {
        const userId = 'user-' + Math.random().toString(36).substring(7); // Generate a random user ID
        socket.emit('join-room', roomId, userId);

        // Set up WebRTC
        setupWebRTC(roomId, userId);
    }

    // WebRTC Setup
    function setupWebRTC(roomId, userId) {
        const peer = new SimplePeer({
            initiator: true,
            trickle: false,
        });

        // Handle WebRTC events
        peer.on('signal', (data) => {
            socket.emit('webrtc-signal', roomId, userId, data);
        });

        socket.on('webrtc-signal', (senderId, signal) => {
            if (senderId !== userId) {
                peer.signal(signal);
            }
        });

        peer.on('stream', (stream) => {
            remoteVideo.srcObject = stream;
        });

        // Get local video stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localVideo.srcObject = stream;
                peer.addStream(stream);
            })
            .catch((error) => {
                console.error('Error accessing media devices:', error);
            });
    }
} else if (currentPage === 'index.html') {
    // Home Page Logic
    document.getElementById('registerBtn').addEventListener('click', () => {
        window.location.href = 'register.html'; // Redirect to registration page
    });

    document.getElementById('loginBtn').addEventListener('click', () => {
        window.location.href = 'login.html'; // Redirect to login page
    });
}