const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);

const googleUserData = mongoose.model("googleUser", userSchema);
module.exports = googleUserData;
