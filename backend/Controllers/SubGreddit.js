import SubGreddit from "../Models/SubGreddit.js";

export const createSubGreddit = async (req, res) => {

    try 
    {

    const { name, description, tags, banned_keywords, moderator } = req.body;

    const newSubGreddit = new SubGreddit({
        name,
        description,
        tags,
        banned_keywords,
        moderator: [
            {
                first_name: moderator.first_name,
                last_name: moderator.last_name,
                username: moderator.username,
            }
        ],
        members: [{
            first_name: moderator.first_name,
            last_name: moderator.last_name,
            username: moderator.username,
        }],
        posts: [],
        blocked_users: [],
        requested_user: [],
        reported_posts: [],
    });

    const subGreddit = await newSubGreddit.save();
    res.status(200).json(subGreddit);
}
catch (error) {
    res.status(500).json({ error: error.message });
}

}