"use strict";
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(cors());


let count = 0;
io.on("connection", (socket) => {
    console.log("New connection");

    socket.on("increment", () => {
        socket.emit("getData", ++count);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`App is now listening on port ${PORT}!`);
});
