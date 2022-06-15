const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
});

const user = mongoose.model("Users", userSchema);
module.exports = user;
