const post = require("../../Model/Post");

const findByHashtag = async (req, res) => {
    const hashTag = req.params.hashTag;
    try {
        const foundedPost = await post.find({ hashTags: { $in: [hashTag] } });
        res.status(200).json({ msg: `Founded posts for ${hashTag}`, length: foundedPost.length, data: foundedPost });
    } catch (err) {
        res.status(404).json({ msg: `Posts not founded for ${hashTag}`, error: err.message });
    }
};

module.exports = findByHashtag;
