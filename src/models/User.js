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
  }
});

export default mongoose.model("User", schema);
