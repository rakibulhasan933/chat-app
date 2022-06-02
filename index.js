const express = require("express")();
const server = require("http").createServer(app);
const PORT = 5000;
const { nanoid } = require("nanoid");
const { Socket } = require("socket.io");
const oi = require("socket.io")(server, {
    cors: {
        origin: "*"
    },
});

const users = [];
const rooms = [];

oi.on("connection", (socket) => {
    socket.emit("me", socket.id)
    users.push(socket.id);

    socket.broadcast.emit("updateUsers", users)

    socket.on("disconnected", () => {
        users = users.filter((users) => user !== socket.id)
        socket.broadcast.emit("updateUsers", users);
        socket.disconnect();
    })
    socket.emit("getAllUsers", users);

    // rooms

})