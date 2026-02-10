const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

let startTime = Date.now();

// Smooth breathing waveform
function pressureWave(t) {
  return 18 + 7 * Math.sin(t / 800);
}

// Send data every 100 ms
setInterval(() => {
  const now = Date.now();

  io.emit("ventilatorData", {
    pressure: pressureWave(now - startTime),
    timestamp: now,
  });
}, 100);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Backend running"));


