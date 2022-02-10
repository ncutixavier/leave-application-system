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
    select: false,
  },
  role: {
    type: String,
    default: "employee",
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
});

export default mongoose.model("User", schema);
