const user = require("../Model/User");
const post = require("../Model/Post");

const getUserPosts = async (req, res) => {
    const userId = req.params.userId;
    try {
        const foundedPost = await post.find({ author: userId });
        res.status(200).json({ msg: "Posts founded for user.", length: foundedPost.length, data: foundedPost });
    } catch (err) {
        res.status(404).json({ msg: "Posts not founded for user.", error: err.message });
    }
};

module.exports = getUserPosts;
