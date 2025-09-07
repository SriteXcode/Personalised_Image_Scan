// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// require('./config/cloudinary');

// const http = require('http');
// const { Server } = require('socket.io');

// const authRoutes = require('./routes/authRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const nameRoute = require('./routes/nameRoute');
// const NameModel = require('./models/Image');
// const connectDB = require('./config/db');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // CORS allowed domains
// const allowedOrigins = [
//   "https://personalised-image-scan-1.onrender.com",
//   "http://localhost:5173"
// ];
// app.use(cors({ origin: allowedOrigins, credentials: true }));
// app.use(express.json());

// // HTTP + Socket server wrapper
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials: true
//   }
// });
// console.log("Socket server is ready to accept connections...");
// // io.on("connection", (socket) => {
// //   console.log("Socket Connected:", socket.id);

// //   // Test event logs
// //   socket.on("pingFromClient", (data) => {
// //     console.log("Received from client:", data);
// //     socket.emit("pongFromServer", { msg: "Hello Client", time: new Date() });
// //   });
// //   socket.on("test", (data) => {
// //     console.log("🎯 Test event received:", data);
// //   });

// //   socket.on("disconnect", () => {
// //     console.log("Socket Disconnected:", socket.id);
// //   });
// // });

// io.on("connection", (socket) => {
//   console.log("Socket Connected:", socket.id);

//   // 🔥 Send test event as soon as client connects
//   socket.emit("testEvent", { msg: "Hello from server ✅", time: new Date() });

//   // Test event logs
//   socket.on("pingFromClient", (data) => {
//     console.log("Received from client:", data);
//     socket.emit("pongFromServer", { msg: "Hello Client", time: new Date() });
//   });

//   socket.on("test", (data) => {
//     console.log("🎯 Test event received:", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("Socket Disconnected:", socket.id);
//   });
// });


// // Make io available globally (for controllers)
// global.io = io;

// // DB connection
// connectDB();

// // Routes
// app.use('/api/name', nameRoute);
// app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes);

// app.get("/api", async (req, res) => {
//   try {
//     const names = await NameModel.find();
//     res.json(names);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching names' });
//   }
// });

// // Start the server with http + socket
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/cloudinary");

const http = require("http");
const { initSocket } = require("./socket"); // 👈 import socket setup

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const nameRoute = require("./routes/nameRoute");
const NameModel = require("./models/Image");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://personalised-image-scan-1.onrender.com",
  "http://localhost:5173",
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

const server = http.createServer(app);

// 🔥 Initialize socket.io once
initSocket(server, allowedOrigins);

connectDB();

// Routes
app.use("/api/name", nameRoute);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api", async (req, res) => {
  try {
    const names = await NameModel.find();
    res.json(names);
  } catch (error) {
    res.status(500).json({ message: "Error fetching names" });
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
