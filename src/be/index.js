const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const fs = require("fs");
const path = require("path");

const io = new Server(server);

// Folder untuk menyimpan file sementara
const tempFolder = path.join(__dirname, "video");
if (!fs.existsSync(tempFolder)) {
  fs.mkdirSync(tempFolder);
}

// Endpoint utama
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Menyimpan data stream
let streamData = [];

io.on("error", () => {
  console.log("Error");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("error", (data) => {
    console.log("HYey");
  });

  // Ketika data diterima
  socket.on("stream", (data) => {
    console.log("DATA RECEIVED", data);
    streamData.push(Buffer.from(data)); // Konversi data stream ke Buffer
  });

  // Ketika permintaan download diterima
  socket.on("download", () => {
    console.log("DOWNLAOD");
    if (streamData.length === 0) {
      socket.emit("error", "No data available for download");
      return;
    }

    // Gabungkan semua buffer menjadi satu file
    const videoBuffer = Buffer.concat(streamData);

    // Simpan ke file sementara
    const fileName = `video-${Date.now()}.mp4`;
    const filePath = path.join(tempFolder, fileName);

    fs.writeFile(filePath, videoBuffer, (err) => {
      if (err) {
        console.error("Error saving file:", err);
        socket.emit("error", "Failed to save video");
        return;
      }

      console.log("Video saved:", fileName);

      // Kirim URL untuk mendownload file
      socket.emit("downloadReady", `/download/${fileName}`);
    });
    streamData = [];
  });
});

// Endpoint untuk mengunduh file
app.get("/download/:fileName", (req, res) => {
  const filePath = path.join(tempFolder, req.params.fileName);

  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        console.error("Error during download:", err);
      } else {
        // Hapus file setelah diunduh
        fs.unlinkSync(filePath);
      }
    });
  } else {
    res.status(404).send("File not found");
  }
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
