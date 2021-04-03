const mongoose = require("mongoose");

const SWTokenSchema = new mongoose.Schema(
    {
        memberName: {
            type: String,
            required: true,
            index: true,
        },
        serviceWorkerToken: {
            type: String,
            required: true,
        },
    },

    { versionKey: false }
);

module.exports = mongoose.model("SWToken", SWTokenSchema);
