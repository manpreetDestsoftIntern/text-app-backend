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
// const io = new Server(server, {
//   cors: {
//       origin: "*", // Allow all origins (Change this in production)
//       methods: ["GET", "POST"]
//   }
// });

const io = new Server(server, {
  cors: {
      origin: ['http://localhost:5173']
  }
})
const { connectDB } = require("./config/db.conf.js");
// connectDB().catch((err) => console.error("db", err));

app.use(express.json());
// app.use(express.static(path.resolve(__dirname, 'build')))
// app.use(express.static("public"));


app.use(cors({
  origin: 'http://localhost:5173',
})); 

app.use('/users', userRoutes);
// app.use('/auth', authRoutes);
// app.use(express.static(path.join(__dirname + '/views/index.html')));


// Serve static files from the current directory
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Ensure index.html exists
});

// Handle WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
      console.log('A user disconnected');
  });
});


app.listen(3000, () => {
  console.log("app started");
});














