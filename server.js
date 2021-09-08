// To be able to use variables from .env file
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.port || 8000;

const app = express();

// ### MIDDLEWARES ###

// To be able to parse body object
app.use(express.json());

// Enabling CORS
app.use(cors());

// ### ROUTES ###

// Auth Routes
app.use("/api/auth", authRoutes);

// User Routes
app.use("/api/user", userRoutes);

// Playlist Routes
app.use("/api/playlist", playlistRoutes);

// Error Middleware - always keep this one LAST,
// before starting the server!
app.use(errorHandler);

// ### START SERVER AND CONNECT O DATABASE ###

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT} 🌈`);
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p5bqh.mongodb.net/ljudio-database`
  )
  .then(() => {
    console.log('Connected to database... 🦄');
  })
  .catch((err) => {
    console.log('There was an error connecting to database: ', err);
  });
