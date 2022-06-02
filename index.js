const express = require("express")();
const server = require("http").createServer(app);
const PORT = 5000;
const { nanoid } = require("nanoid");
const oi = require("socket.io")(server, {
    cors: {
        origin: "*"
    },
});
