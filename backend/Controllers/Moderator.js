import SubGreddit from "../Models/SubGreddit.js";
import Reports from "../Models/Reports.js";

export const UserList = async (req, res) => {
    const { subgreddit_name } = req.body;
    const subGreddit = await SubGreddit.find({ name: subgreddit_name });
    const moderator = subGreddit[0].moderator;
    const members = subGreddit[0].members;
    const blocked_users = subGreddit[0].blocked_users;

    res.status(200).json({ moderator, members, blocked_users });
}

export const JoiningRequest = async (req, res) => {

    const { subgreddit_name } = req.body;
    const subGreddit = await SubGreddit.find({ name: subgreddit_name });
    const requested_user = subGreddit[0].requested_user;
    res.status(200).json(requested_user);

}

export const AcceptJoiningRequest = async (req, res) => {
    const { subgreddit_name, username, first_name, last_name } = req.body;
    const subGreddit = await SubGreddit.find({ name: subgreddit_name });
    subGreddit[0].members.push({ first_name, last_name , username });
    subGreddit[0].requested_user = subGreddit[0].requested_user.filter((user) => user.username !== username);
    subGreddit[0].members_num = subGreddit[0].members.length;
    await subGreddit[0].save();
    res.status(200).json({ message: "User added to the subgreddit" });
}

export const RejectJoiningRequest = async (req, res) => {
    const { subgreddit_name, username } = req.body;
    const subGreddit = await SubGreddit.find({ name: subgreddit_name });
    subGreddit[0].requested_user = subGreddit[0].requested_user.filter((user) => user.username !== username);
    await subGreddit[0].save();
    res.status(200).json({ message: "User rejected" });
}

export const ReportedPosts = async (req, res) => {
    const { in_subgreddit } = req.body;
    const reported_posts = await Reports.find({ "in_subgreddit.name": in_subgreddit });
    console.log(reported_posts)
    res.status(200).json(reported_posts);
}



