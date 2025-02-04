require('dotenv').config();
const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected");
  }

  module.exports = {connectDB}