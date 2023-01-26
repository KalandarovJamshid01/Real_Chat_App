const router = require("express").Router();
const Notify = require("./../models/Notify");
router.post("/", async (req, res) => {
  try {
    const notify = await Notify.create(req.body);
    res.status(201).json(notify);
  } catch (error) {
    res.json(error);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const notify = await Notify.find({ userId: req.params.userId });
    res.status(200).json(notify);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
