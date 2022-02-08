import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  supervisor_name: {
    type: String,
    required: true,
  },
  supervisor_email: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Department", schema);
