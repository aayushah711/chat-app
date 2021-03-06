const express = require("express");
const app = express();
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const Chatroom = require("./models/Chatroom");
const chatRoute = require("./routes/chatRoute");
const cors = require("cors");
const socketMiddleware = require("./controllers/socketMiddleware");
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());
app.use(express.json());

const db = mongoose.connection;
mongoose.connect(
    "mongodb://localhost/chatapp",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("The database is connected");
        }
    }
);

db.once("open", async (req, res) => {
    if ((await Chatroom.countDocuments().exec()) > 0) {
        console.log("Chatroom already added in the collection");
        return;
    }

    Chatroom.insertMany([
        {
            name: "ShareChat",
            chats: [],
            members: [],
        },
    ])
        .then(() => console.log("Chatroom added Successfully"))
        .catch((err) => {
            console.log(`Error : ${err}`);
        });
});

const options = {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
    serveClient: false,
    wsEngine: "ws",
};
const io = require("socket.io")(server, options);

io.on("connection", (socket) => socketMiddleware(socket, io));

app.use("/api/chat", chatRoute);

server.listen(5000, () => {
    console.log("The serve is up and running on port 5000");
});
