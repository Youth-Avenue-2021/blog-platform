const post = require("../../Model/Post");

const getPosts = async (req, res) => {
    try {
        const foundedPost = await post.find();
        res.status(200).json({ length: foundedPost.length, data: foundedPost });
    } catch (err) {
        res.status(404).json({ msg: `Posts not founded.`, error: err.message });
    }
};

module.exports = getPosts;
