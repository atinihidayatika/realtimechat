const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware untuk melayani file statis
app.use(express.static("public"));

// Rute utama
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Event Socket.IO
io.on("connection", (socket) => {
  console.log("User connected");

  // Terima pesan dari frontend
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // Broadcast pesan ke semua user
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Jalankan server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
