const Chatroom = require("../models/Chatroom");
const SWToken = require("../models/SWToken");

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
        const { chatroomId, memberName, swToken } = req.body;

        let chatroom = await Chatroom.findById(chatroomId).exec();
        if (!chatroom) {
            return res.status(400).send({ err: "ChatroomId doesn't exist." });
        }

        await SWToken.findOneAndUpdate(
            { memberName },
            { memberName, serviceWorkerToken: swToken },
            { upsert: true },
            (err, doc) => {
                if (err) {
                    return res.status(500).send({
                        err: "Could not add service worker token",
                    });
                }
            }
        );
        let memberExists = chatroom.members.includes(memberName);
        if (!memberExists) {
            chatroom.members.push(memberName);
            chatroom.save((err) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send({
                        err:
                            "Something went wrong while adding member to chatroom",
                    });
                }
            });
        }
        return res.send({ message: "Service worker token updated!" });
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
};

module.exports = { getAllChatrooms, getAllChats, addSWToken };
