const express = require("express");
const userRoutes = require('./routes/User.routes.js');
const authRoutes = require('./routes/Auth.routes.js');

// const server = express();
const app = express();
const http = require('http');
const server = http.createServer(app);

const cors = require("cors");
const path = require('path');
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
      origin: "*", // Allow all origins (Change this in production)
      // origin: 'http://localhost:3000', 
      methods: ['GET', 'POST'],
  }
});
const { connectDB } = require("./config/db.conf.js");
const { default: messageRoutes } = require("./routes/message.route.mjs");
connectDB().catch((err) => console.error("Database Error: ", err));

app.use(express.json());


const corsOptions = {
  origin: 'http://localhost:3000', // Your front-end URL
  credentials: true,               // Allow credentials (cookies, HTTP authentication)
};

app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/message", messageRoutes);

app.get('/', (req, res) => {
    res.json({success: true}); // Ensure index.html exists
});

// Handle WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for username setup
  socket.on('set_username', (username) => {
    socket.username = username;
    console.log(`${username} has joined the chat.`);
  });

  // Listen for chat messages
  socket.on('send_message', (data) => {
    const messageData = { username: socket.username, message: data.message };
    console.log('Message received:', messageData);
    socket.broadcast.emit('receive_message', messageData);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`${socket.username || 'A user'} disconnected.`);
  });
});


server.listen(5001, () => {
  console.log("server started");
});