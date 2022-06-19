const addPost = require("../../../Controllers/Post/addPost");
const searchPost = require("../../../Controllers/Post/searchPost");
const deletePost = require("../../../Controllers/Post/deletePost");
const updatePost = require("../../../Controllers/Post/updatePost");
const getPosts = require("../../../Controllers/Post/getPosts");
const isLoggedIn = require("../../../Middlewares/googleAuth/isLoggedIn");

const express = require("express");

const postRouter = express.Router();

postRouter.get("/", isLoggedIn, getPosts);
postRouter.post("/add", addPost);
postRouter.get("/", isLoggedIn, searchPost);
postRouter.delete("/delete/:id", deletePost);

postRouter.put("/update/:id", updatePost);

module.exports = postRouter;
