const express = require("express");
const postRoute = require("./Post/Post");
const userRoute = require("./User/User");
const router = express.Router();

// all post routes handle from api/posts
router.use("/post", postRoute);
router.use("/user", userRoute);

router.get("/hello", (req, res) => {
    res.send("Router is running...");
});

module.exports = router;
