const post = require("../../Model/Post");
const user = require("../../Model/User");

const deletePost = async (req, res) => {
    try {
        // Deleting post from database and post collection
        const deletePost = await post.findByIdAndDelete(req.body.postId);

        // Deleting post from user data
        const foundedUser = await user.findById(req.body.authorId);
        // const {}

        res.status(200).json({ msg: "Post deleted successfully", data: deletePost });
    } catch (err) {
        res.status(500).json({ msg: "Failed to delete the post", error: err.message });
    }
};

module.exports = deletePost;
