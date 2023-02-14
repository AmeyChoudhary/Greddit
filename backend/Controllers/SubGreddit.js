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

export const mySubGreddits = async (req, res) => {
    try {
        const { username } = req.body;
        const subGreddits = await SubGreddit.find({ "moderator.username": username });
        res.status(200).json(subGreddits);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const allSubGreddits = async (req, res) => {
    try {
        const subGreddits = await SubGreddit.find();
        res.status(200).json(subGreddits);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUserStatus = async (req, res) => {
    try {
        const { username, subgreddit_name } = req.body;
        const subGreddit = await SubGreddit.find({ name: subgreddit_name });
        const moderator = subGreddit[0].moderator.filter((moderator) => moderator.username === username);
        const member = subGreddit[0].members.filter((member) => member.username === username);
        const blocked_users = subGreddit[0].blocked_users.filter((blocked_user) => blocked_user.username === username);
        const requested_user = subGreddit[0].requested_user.filter((requested_user) => requested_user.username === username);
        if (moderator.length > 0) {
            res.status(200).json({ status: "moderator" });
        }
        else if (member.length > 0) {
            res.status(200).json({ status: "member" });
        }
        else if (blocked_users.length > 0) {
            res.status(200).json({ status: "blocked" });
        }
        else if (requested_user.length > 0) {
            res.status(200).json({ status: "requested" });
        }
        else {
            res.status(200).json({ status: "normal_user" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getSubGredditInfo = async (req, res) => {
    const { subgreddit_name } = req.body;
    const subGreddit = await SubGreddit.find({ name: subgreddit_name });
    res.status(200).json(subGreddit);
}
