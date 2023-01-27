const mongoose = require("mongoose");
const notifySchema = mongoose.Schema(
  {
    userId: String,
    documentId: String,
    text: String,
    view: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notify = mongoose.model("notifies", notifySchema);
module.exports = Notify;
