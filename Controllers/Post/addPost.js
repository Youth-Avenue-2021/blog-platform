const slugify = require("slugify");
const post = require("../../Model/Post");

const addPost = async (req, res) => {
    // Post body => req.body

    // Extracting hashtags array and published Posts from Post body
    let { hashTags, title, slug } = req.body;

    // converting slug from title
    slug = slugify(title);

    // Removing more than 4 hashtags from Post body
    if (hashTags !== undefined) {
        req.body.hashTags = hashTags.slice(0, 4);
    }
    // update slug in post body
    req.body.slug = slug;

    // Creating object of Post body
    const createdPost = new post(req.body);

    try {
        // Save Post in database
        await createdPost.save();
        // Sending success response
        res.status(201).json({ msg: "Post created successfully.", data: createdPost });
    } catch (err) {
        // Sending unsuccess response
        res.status(500).json({ msg: "Internal server error", error: err.message });
    }
};

module.exports = addPost;
