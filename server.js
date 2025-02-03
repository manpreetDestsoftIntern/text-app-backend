const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require('./routes/User.routes.js');
const server = express();
const cors = require("cors");
require('dotenv').config();
const path = require('path');
main().catch((err) => console.error("hihi", err));

server.use(express.json());
// server.use(express.static(path.resolve(__dirname, 'build')))
// server.use(express.static("public"));


async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("MongoDB connected");
}
server.use(cors());

server.use('/users', userRoutes);

server.get('/', (req, res) =>
  res.json({"success": true})
);

server.listen(3000, () => {
  console.log("server started");
});

















// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const userRoutes = require('./routes/User.routes.js');
// require('dotenv').config(); // Load environment variables


// const app = express();
// const port = 3000;

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect(process.env.DATABASE_URL, {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });

// // Routes
// app.use('/users', userRoutes);

// app.get('/', (req, res) => {
//   res.send('Welcome to the User API');
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
