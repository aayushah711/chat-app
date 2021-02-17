const Chatroom = require("../models/Chatroom");

const getAllChatrooms = async (req, res) => {
    try {
        const chatrooms = await Chatroom.find({}, "name", (err, data) => {
            res.json(data);
        });
        console.log(chatrooms);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
};

const getAllChats = async (req, res) => {
    try {
        console.log("req.body");
        console.log(req.body);
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

module.exports = { getAllChatrooms, getAllChats };
