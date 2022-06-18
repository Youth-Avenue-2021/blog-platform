const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
});

const googleUserData = mongoose.model("googleUser", userSchema);
module.exports = googleUserData;
