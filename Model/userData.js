/*

username
description (bio)
full name
password
followers (reference to other user)
reading list posts (reference to posts)
profile pic (cloudinary URL)
email address
location
birth date
published articles
skills
hobbies
education
work

Some links
    twitter
    instagram
    website
 */

const mongoose = require("mongoose");
// const post = require("./Post");

const userSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // ref:[user,googleUser,githubUser]
        ref: googleUser,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    dob: {
        type: Date,
    },
    profilePic: {
        type: String,
    },
    readingList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: undefined,
        // reference to posts
    },
    publishedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            default: undefined,
        },
    ],
    unPublishedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            default: undefined,
        },
    ],
});

const userData = mongoose.model("userData", userSchema);
module.exports = userData;
