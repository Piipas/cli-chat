import { Server } from "socket.io";

const PORT = 3000;
const io = new Server();

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("message", (data) => {
        io.emit("message", data);
    });

    socket.on("disconnect", (data) => {
        console.log(`Client Disconnected: ${socket.id}`);
    });
});

io.listen(PORT);
