const app = require("express")()
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

    // Rooms
    socket.on("create_room", () => {
        const room = {
            id: nanoid(7),
            chat: []
        };
        socket.join(room)
        socket.emit("get_room", room)
        rooms.push(room);
        socket.broadcast.emit("updateRooms", rooms)
    });
    socket.join('join_room', (room) => {
        socket.join(room.id)
    });
    socket.broadcast.emit("updateRooms", rooms);

    socket.on('message', (payLoad) => {
        rooms.map((room) => {
            if (room.id === payLoad.room) {
                singleChat = { message: payLoad.message, writer: payLoad.socketId };
                room.chat.push(singleChat);
            }
            oi.to(payLoad.room).emit("chat", payLoad);
        });
    });
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server is running  on port ${PORT}`)
})