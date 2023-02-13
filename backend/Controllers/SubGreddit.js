import SubGreddit from "../Models/SubGreddit.js";

export const createSubGreddit = async (req, res) => {
    const { name, description, tags, banned_keywords } = req.body;


    const newSubGreddit = new SubGreddit({
        name,
        description,
        tags,
        banned_keywords,
    });

    const subGreddit = await newSubGreddit.save();
    res.status(200).json(subGreddit);

}
