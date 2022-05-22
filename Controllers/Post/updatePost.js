const post = require("../../Model/Post");

const updatePost = async (req, res) => {
    const id = req.params.id;
    try {
        await post.findOneAndUpdate({ _id: id }, req.body);
        res.status(200).json({ msg: "Post updated successfully" });
    } catch (err) {
        res.status(404).json({ msg: "No post founded to update" });
    }
};

module.exports = updatePost;
