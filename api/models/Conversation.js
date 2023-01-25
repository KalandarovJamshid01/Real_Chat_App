const mongoose = require("mongoose");
const conversationSchema = mongoose.Schema({
  members: { type: Array },
});
