const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const socket = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (_req: any, res: any) => {
  res.send("hi from server");
});

const messages = [
  {
    message: "hello miki",
    id: "ewknedjndqejn",
    user: { id: "dekdnekdne", name: "mikita" },
  },
  {
    message: "hello mikita",
    id: "dweefwefwwef",
    user: { id: "dwefwewdedwe", name: "miki" },
  },
];

socket.on("connection", (socketChannel: any) => {
  socketChannel.on("client-message-sent", (message: string) => {
    console.log(message);
  });

  socketChannel.emit("init-messages-published", messages);

  console.log("a user connected");
});

const PORT = process.env.PORT || 3009;

server.listen(PORT, () => {
  console.log("listening on *:3009");
});
