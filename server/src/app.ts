import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const socket = new Server(server);

app.get("/", (_req: any, res: any) => {
  res.send("hi from server");
});

socket.on("connection", (_connection: any) => {
  console.log("a user connected");
});

const PORT = process.env.PORT || 3009;

server.listen(PORT, () => {
  console.log("listening on *:3009");
});

// import express from "express";
// import http from "http";
// import socketio from "socket.io";
// //const server = http.createServer(app);
// //const { Server } = require("socket.io");
// //const io = require("socket.io")(http);
// const app = express();
// const server = http.createServer(app);

// const io = socketio(server);

// app.get("/", (req, res) => {
//   res.send("hi from the server");
// });

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });

// server.listen(3009, () => {
//   console.log("listening on *:3009");
// });
