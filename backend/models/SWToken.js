const mongoose = require("mongoose");

const SWTokenSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        serviceWorkerToken: {
            type: String,
            required: true,
        },
    },

    { versionKey: false }
);

module.exports = mongoose.model("SWToken", SWTokenSchema);
