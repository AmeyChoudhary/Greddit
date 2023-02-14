import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    posted_by: {
        type: {
            first_name: String,
            last_name: String,
            username: String,
        },
        required: true,
        trim: true,
    },
    subgreddit: {
        type: {
            name: String,
        },
        required: true,
        trim: true,
    },
    upvotes: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
    },
    downvotes: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
    },
    comments: {
        type: [{
            comment_id: String,
        }], sparse: true
    },

    comments_num: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
    },

}, { timestamps: true });


const Post = mongoose.model("Post", PostSchema);
export default Post;

