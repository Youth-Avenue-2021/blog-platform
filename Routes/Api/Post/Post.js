const addPost = require("../../../Controllers/Post/addPost");
const searchPost = require("../../../Controllers/Post/searchPost");
const deletePost = require("../../../Controllers/Post/deletePost");
const express = require("express");

const postRouter = express.Router();

postRouter.post("/add", addPost);
postRouter.get("/", searchPost);
postRouter.delete("/delete", deletePost);

module.exports = postRouter;
