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

  let time = 0;

  const interval = setInterval(() => {
    // Simulated breathing cycle (realistic ventilator waveform)
    const pressure = 20 + 8 * Math.sin(time);
    const flow = 40 * Math.sin(time);
    const volume = 400 + 150 * Math.sin(time);

    socket.emit("ventilatorData", {
      pressure: Number(pressure.toFixed(2)),
      flow: Number(flow.toFixed(2)),
      volume: Number(volume.toFixed(2)),
      timestamp: Date.now()
    });

    time += 0.2; // controls breathing speed
  }, 100); // 100ms update (smooth wave)

  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("Doctor disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

