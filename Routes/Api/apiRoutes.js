const express = require("express");
const postRoute = require("./Post/Post");
const userRoute = require("./User/User");

const getUserPosts = require("../../Controllers/getUserPosts");
const byHashtag = require("../../Controllers/Post/byHashtag");

const router = express.Router();

// all post routes handle from api/posts
router.use("/post", postRoute);
router.use("/user", userRoute);

router.get("/:userId/posts", getUserPosts);
router.get("/tag/:hashTag", byHashtag);

router.get("/hello", (req, res) => {
    res.send("Router is running...");
});

module.exports = router;
