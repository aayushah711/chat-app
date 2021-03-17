const Chat = require("../models/Chat");
const Chatroom = require("../models/Chatroom");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const middleware = (socket, io) => {
    socket.on("chat message", async (msg) => {
        const chat = new Chat(msg);
        chat.save((err) => {
            if (err) {
                console.log(err);
                return;
            }
        });

        const chatroom = await Chatroom.findOne({ name: "ShareChat" });
        chatroom.chats.push(chat);
        chatroom.save((err) => {
            if (err) {
                console.log(err);
                return;
            }
        });

        // use FCM for sw
        let serviceWorkerTokens = chatroom.serviceWorkerTokens;
        for (let i = 0; i < serviceWorkerTokens.length; i++) {
            axios({
                method: "post",
                url: "https://fcm.googleapis.com/fcm/send",
                data: {
                    notification: {
                        title: chat.name,
                        body: chat.message,
                        icon:
                            "https://cdn6.aptoide.com/imgs/f/e/b/feb715e42bb4ff2d3961c3f57cc97573_icon.png?w=240",
                        click_action: "/",
                    },
                    to: serviceWorkerTokens[i],
                },
                headers: {
                    authorization: process.env.FCM_KEY,
                },
            })
                .then((res) => console.log(res.data))
                .catch((err) => {
                    console.log(err);
                });
        }

        io.emit("chat message", chat);
    });
};

module.exports = middleware;
