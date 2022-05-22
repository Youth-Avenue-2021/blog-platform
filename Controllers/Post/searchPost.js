const post = require("../../Model/Post");

const searchPost = async (req, res) => {
    const searchString = req.query.search;
    try {
        const findPosts = await post.find({ $text: { $search: searchString } }).sort({ title: -1 });
        res.status(200).json({ msg: `${findPosts.length} Result founded.`, length: findPosts.length, data: findPosts });
    } catch (err) {
        res.status(404).json({ msg: "Result Not founded.", error: err.message });
    }
};

module.exports = searchPost;
