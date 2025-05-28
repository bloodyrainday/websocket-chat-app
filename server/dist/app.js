"use strict";
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
app.get("/", (_req, res) => {
    res.send("hi from server");
});
const users = new Map();
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
socket.on("connection", (socketChannel) => {
    users.set(socketChannel, {
        id: new Date().getTime().toString(),
        name: "anonym",
    });
    socketChannel.on("client-message-sent", (message) => {
        if (typeof message !== "string") {
            return;
        }
        const messageItem = {
            message: message,
            id: "ewknedjndqejn" + new Date().getTime(),
            user: { id: "dekdnekdne", name: "mikita" },
        };
        messages.push(messageItem);
        socket.emit("new-message-sent", messageItem);
    });
    socketChannel.emit("init-messages-published", messages);
    socket.on("client-name-sent", (name) => {
        const user = users.get(socketChannel);
        user.name = name;
    });
    console.log("a user connected");
});
const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
    console.log("listening on *:3009");
});
