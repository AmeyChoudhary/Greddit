import Reports from "../Models/Reports.js";

export const createReport = async (req, res) => {
    const { reported_by, in_subgreddit, poster, reported_post, reason } = req.body;
    try {
        const newReport = new Reports({
            reported_by: {
                first_name: reported_by.first_name,
                last_name: reported_by.last_name,
                username: reported_by.username,
            },
            in_subgreddit: {
                name: in_subgreddit,
            },
            poster: {
                first_name: poster.first_name,
                last_name: poster.last_name,
                username: poster.username,
            },
            reported_post: {
                post_id: reported_post.post_id,
            },
            reason : reason,
        });
        const report = await newReport.save();
        res.status(200).json(report);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}