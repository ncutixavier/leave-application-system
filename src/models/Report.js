import mongoose from "mongoose";
import "dotenv/config";

const schema = mongoose.Schema({
  usedDays: {
    type: Number,
    default: 0,
  },
  remainingDays: {
    type: Number,
    default: process.env.MAX_DAYS || 18,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Report", schema);
