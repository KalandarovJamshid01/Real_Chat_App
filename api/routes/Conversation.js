const router = require("express").Router();
const Conversation = require("./../models/Conversation");

router.route("/").post(async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/", async (req, res) => {
  const conversations = await Conversation.find();
  res.status(200).json(conversations);
});
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
