"use strict";
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const socket = new Server(server);
app.get("/", (req, res) => {
    res.send("hi from server");
});
socket.on("connection", (connection) => {
    console.log("a user connected");
});
server.listen(3009, () => {
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
