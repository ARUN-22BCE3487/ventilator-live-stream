const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// ✅ Enable CORS for Socket.IO
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Doctor connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Doctor disconnected:", socket.id);
  });

  // Optional: send a welcome message
  socket.emit("ventilatorData", { message: "Connected to server!" });
});

// 🔴 Send ventilator data every second
setInterval(() => {
  const ventilatorData = {
    pressure: 15 + Math.random() * 10,
    timestamp: Date.now(), // use timestamp for consistency
  };

  io.emit("ventilatorData", ventilatorData); // match frontend event name
  console.log("Data sent:", ventilatorData);
}, 1000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server running on port", PORT));




