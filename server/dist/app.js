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
const usersState = new Map();
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
    usersState.set(socketChannel, {
        id: new Date().getTime().toString(),
        name: "anonym",
    });
    socket.on("disconnect", () => {
        usersState.delete(socketChannel);
    });
    socketChannel.on("client-message-sent", (message) => {
        if (typeof message !== "string") {
            return;
        }
        const user = usersState.get(socketChannel);
        const messageItem = {
            message,
            id: new Date().getTime().toString(),
            user,
        };
        messages.push(messageItem);
        socket.emit("new-message-sent", messageItem);
    });
    socketChannel.emit("init-messages-published", messages);
    socket.on("client-name-sent", (name) => {
        const user = usersState.get(socketChannel);
        user.name = name;
    });
    console.log("a user connected");
});
const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
    console.log("listening on *:3009");
});
