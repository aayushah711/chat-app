const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },

    { versionKey: false }
);

module.exports = mongoose.model("Chat", chatSchema);
