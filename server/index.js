const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("user connected:=", socket.id);

    socket.on("join_room", (data) => { //data passed here is room id
        socket.join(data)
        console.log("user joined room with room id typed by user:=", data);
    })

    socket.on("send_message", (data) => {
        console.log("user info:=", data)
        socket.to(data.room).emit("receive_message", data) //send data to only who are in that room
    })

    socket.on("disconnect", () => {
        console.log("user disconnected:=", socket.id);
    });


});
server.listen(3001, () => {
    console.log("server is running on port 3001");
});
