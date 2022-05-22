const post = require("../../Model/Post");

const searchPost = async (req, res) => {
    const searchString = req.query.search;
    try {
        const findPosts = await post.find({ title: searchString });
        res.status(200).json({ msg: "Result founded.", data: findPosts });
    } catch (err) {
        res.status(404).json({ msg: "Result Not founded.", error: err.message });
    }
};

module.exports = searchPost;
