const post = require("../../Model/Post");
const user = require("../../Model/User");

const addPost = async (req, res) => {
    // Post body => req.body

    // Extracting hashtags array and published Posts from Post body
    let { hashTags } = req.body;
    const { published } = req.body;

    // Removing more than 4 hashtags from Post body
    if (hashTags !== undefined) {
        req.body.hashTags = hashTags.slice(0, 4);
    }

    // Creating object of Post body
    const createdPost = new post(req.body);
    // Getting author Id from Post
    const { author } = createdPost;

    // Update database data according to published and unPublished Posts
    switch (published) {
        case true:
            try {
                // Save Post in database
                await createdPost.save();

                // Extract id of created post
                const id = await createdPost._id.valueOf();
                // Getting data about published posts by user
                const { publishedPosts } = await user.findById(author);
                // Add newly published post id in publishedPosts array
                publishedPosts.push(id);

                // Update user data after adding published post data
                const updatedUser = await user.findByIdAndUpdate(author, { publishedPosts: publishedPosts });
                await updatedUser.save();

                // Sending success response
                res.status(201).json({ msg: "Published post created successfully", data: createdPost });
            } catch (err) {
                // Sending unsuccess response
                res.status(500).json({ msg: "Internal server error", error: err.message });
            }
            break;
        case false:
            try {
                // Same process like above
                // But here is the change is updating the unpublished post data in user data
                await createdPost.save();
                const id = await createdPost._id.valueOf();
                const { unPublishedPosts } = await user.findById(author);
                unPublishedPosts.push(id);

                // Update user data after adding unpublished post data
                const updatedUser = await user.findByIdAndUpdate(author, { unPublishedPosts: unPublishedPosts });
                await updatedUser.save();
                res.status(201).json({ msg: "Unpublished post created successfully", data: createdPost });
            } catch (err) {
                res.status(500).json({ msg: "Internal server error", error: err.message });
            }
            break;
        default:
            res.status(404).json({ msg: "Published post value goes wrong.", error: err.message });
    }
};

module.exports = addPost;
