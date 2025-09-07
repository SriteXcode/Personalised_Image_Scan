// socket.js
const { Server } = require("socket.io");

let io;

function initSocket(server, allowedOrigins) {
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ Socket Connected:", socket.id);

    socket.emit("testEvent", { msg: "Hello from server ✅", time: new Date() });

    socket.on("pingFromClient", (data) => {
      console.log("Received:", data);
      socket.emit("pongFromServer", { msg: "Hello Client", time: new Date() });
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket Disconnected:", socket.id);
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error("❌ Socket.io not initialized!");
  }
  return io;
}

module.exports = { initSocket, getIO };
