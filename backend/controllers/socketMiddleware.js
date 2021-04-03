const Chat = require("../models/Chat");
const Chatroom = require("../models/Chatroom");
const SWToken = require("../models/SWToken");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const middleware = async (socket, io) => {
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
        let members = chatroom.members;

        let serviceWorkerTokens;

        let serviceWorkerTokenDocuments = await SWToken.find(
            {
                memberName: {
                    $in: members,
                },
            },
            { serviceWorkerToken: 1, _id: 0 },
            (err, serviceWorkerTokenDocuments) => {
                if (err) {
                    console.log("err", err);
                    // handle err
                }

                serviceWorkerTokens = serviceWorkerTokenDocuments.map(
                    (item) => {
                        return item.serviceWorkerToken;
                    }
                );
                return serviceWorkerTokens;
            }
        );

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
                registration_ids: serviceWorkerTokens,
            },
            headers: {
                authorization: process.env.FCM_KEY,
            },
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        io.emit("chat message", chat);
    });
};

module.exports = middleware;
