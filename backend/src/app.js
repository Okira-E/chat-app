"use strict";
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(cors());


let chat = [];
io.on("connection", (socket) => {
    console.log("New connection");

    socket.emit("getData", chat);
    socket.on("message", (data) => {
        chat.push(data);
        io.emit("getData", data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`App is now listening on port ${PORT}!`);
});
