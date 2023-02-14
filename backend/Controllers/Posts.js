import Post from "../Models/Posts.js";

export const getPosts = async (req, res) => {
    const { subgreddit_name } = req.body;
    try {
        const posts = await Post.find({ "subgreddit.name": subgreddit_name });
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const createPost = async (req, res) => {
    const { title, content, posted_by, subgreddit } = req.body;
    try {
        const newPost = new Post({
            title,
            content,
            posted_by: {
                first_name: posted_by.first_name,
                last_name: posted_by.last_name,
                username: posted_by.username,
            },
            subgreddit: {
                name: subgreddit,
            },
            comments: [],
        });
        const post = await newPost.save();
        res.status(200).json(post);

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}