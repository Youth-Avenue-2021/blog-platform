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
        default: "",
    },
    readingTime: {
        type: Number,
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userData",
            default: undefined,
        },
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userData",
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
