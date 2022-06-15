const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    username: {
        type: String,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    readingList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: undefined,
    },
});

const userData = mongoose.model("userData", userSchema);
module.exports = userData;
