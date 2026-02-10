const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// health check (optional)
app.get("/", (req, res) => {
  res.send("Ventilator backend running");
});

io.on("connection", (socket) => {
  console.log("Doctor connected:", socket.id);

  const interval = setInterval(() => {
    const pressure = Math.floor(Math.random() * 20) + 10;

    socket.emit("ventilatorData", {
      pressure,
      timestamp: Date.now()
    });
  }, 1000);

  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("Doctor disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

