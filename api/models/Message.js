const mongoose = require("mongoose");
const messageSchema = mongoose.Schema(
  {
    conversation_id: { type: String },
    sender: { type: String },
    text: { type: String },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("messages", messageSchema);
module.exports = Message;
