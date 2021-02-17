const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        chats: {
            type: Array,
            required: true,
        },
    },

    { versionKey: false }
);

module.exports = mongoose.model("Chatroom", chatroomSchema);
