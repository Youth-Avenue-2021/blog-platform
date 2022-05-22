const post = require("../../Model/Post");

const deletePost = async (req, res) => {
    try {
        // Deleting post from post collection
        const deletePost = await post.findByIdAndDelete(req.body.id);

        res.status(200).json({ msg: "Post deleted successfully", data: deletePost });
    } catch (err) {
        res.status(500).json({ msg: "Failed to delete the post", error: err.message });
    }
};

module.exports = deletePost;
