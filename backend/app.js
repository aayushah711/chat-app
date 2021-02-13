const app = require("express")();
const server = require("http").createServer(app);
const options = {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
    serveClient: false,
};
const io = require("socket.io")(server, options);

io.on("connection", (socket) => {
    console.log("connected on server", socket.id);
});

server.listen(5000, () => {
    console.log("The serve is up and running on port 5000");
});
