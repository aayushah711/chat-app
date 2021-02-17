const express = require("express");
const router = express.Router();
const {
    getAllChatrooms,
    getAllChats,
} = require("../controllers/chatController");

router.get("/allChatrooms", getAllChatrooms);
router.post("/allChats", getAllChats);

module.exports = router;
