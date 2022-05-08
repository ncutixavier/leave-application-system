import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "employee",
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("User", schema);
