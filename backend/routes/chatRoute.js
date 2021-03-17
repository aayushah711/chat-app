const express = require("express");
const router = express.Router();
const {
    getAllChatrooms,
    getAllChats,
    addSWToken,
} = require("../controllers/chatController");

router.get("/allChatrooms", getAllChatrooms);
router.post("/allChats", getAllChats);
router.post("/addSWToken", addSWToken);

module.exports = router;
