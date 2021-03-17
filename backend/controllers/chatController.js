const Chatroom = require("../models/Chatroom");

const getAllChatrooms = async (req, res) => {
    try {
        const chatrooms = await Chatroom.find({}, "name", (err, data) => {
            res.json(data);
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
};

const getAllChats = async (req, res) => {
    try {
        const { chatroomId } = req.body;
        let chatroom = await Chatroom.findById(chatroomId, (err) => {
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
        });
        return res.status(200).json({ chats: chatroom.chats });
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
};

const addSWToken = async (req, res) => {
    try {
        const { chatroomId, swToken } = req.body;
        let chatroom = await Chatroom.findById(chatroomId, (err) => {
            if (err) {
                console.log(err);
                return res
                    .status(400)
                    .send({ err: "ChatroomId doesn't exist." });
            }
        });

        let swTokenExists = chatroom.serviceWorkerTokens.includes(swToken);

        if (swTokenExists) {
            return res
                .status(200)
                .send({ message: "Service worker token already exists!" });
        } else {
            chatroom.serviceWorkerTokens.push(swToken);
            chatroom.save((err) => {
                if (err) {
                    console.log(err);
                    return res
                        .status(400)
                        .send({ err: "Could not add service worker token" });
                } else {
                    return res.status(200).send({
                        message: "Service worker token added successfully!",
                    });
                }
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
};

module.exports = { getAllChatrooms, getAllChats, addSWToken };
