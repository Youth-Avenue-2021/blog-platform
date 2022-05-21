/*

title*
slug*
markdown content*
created time*
updated time
reading time
author (reference to user)*
likes*
(comments)
cover image (cloudinary URL)*
hashtags : array*
description for seo (50 words about article)

*/

const mongoose = require("mongoose");
// const user = require("./User");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    readingTime: {
        type: Number,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    coverImg: {
        type: String,
    },
    hashTags: {
        type: [String],
        default: undefined,
        required: true,
    },
    createdAt: {
        type: String,
        default: new Date(),
    },
    updatedAt: {
        type: String,
        default: new Date(),
    },
    published: {
        type: Boolean,
        default: false,
        required: true,
    },
});

const post = mongoose.model("Posts", postSchema);
module.exports = post;
