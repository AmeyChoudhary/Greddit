import Post from "../Models/Posts.js";
import SubGreddit from "../Models/SubGreddit.js";

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
        const subGreddit = await SubGreddit.find({ name: subgreddit });
        subGreddit[0].posts.push({ post_id: newPost._id , title: newPost.title});
        await subGreddit[0].save();
        subGreddit[0].posts_num = subGreddit[0].posts.length;
        await subGreddit[0].save();
        const post = await newPost.save();
        res.status(200).json(post);

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}