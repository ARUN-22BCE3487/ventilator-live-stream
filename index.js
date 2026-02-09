const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Doctor connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Doctor disconnected:", socket.id);
  });
});

// 🔴 Generate ventilator data ONLY ONCE
setInterval(() => {
  const ventilatorData = {
    pressure: 15 + Math.random() * 10,
    time: new Date().toLocaleTimeString()
  };

  io.emit("ventilator_data", ventilatorData); // push to all doctors
}, 1000);

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});


