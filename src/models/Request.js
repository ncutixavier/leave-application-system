import mongoose from "mongoose";

const schema = mongoose.Schema({
    startDate: {
        type: Date,
        default: Date.now,
    },
    returnDate: {
        type: Date,
        default: Date.now,
    },
    numberOfDays: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    type: {
        type: String,
    },
    status: {
        type: String,
        default: "pending",
    },
    reason: {
        type: String,
    }
});

export default mongoose.model("Request", schema);
