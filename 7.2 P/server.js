const express = require("express");
const app = express();

// Create HTTP server from Express app
const http = require("http").createServer(app);

// Attach Socket.IO to HTTP server
const io = require("socket.io")(http);

// Serve static client files
app.use(express.static("public"));

// Handle socket connections
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Receive status update from client
  socket.on("status_update", (data) => {
    const statusPayload = {
      user: data.user,
      status: data.status,
      time: new Date().toLocaleTimeString()
    };

    // Broadcast update to all clients
    io.emit("status_broadcast", statusPayload);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server
http.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
