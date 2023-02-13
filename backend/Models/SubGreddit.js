import mongoose from "mongoose";

const SubGredditSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true, //name must be unique for subgreddit so search becomes easier
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    moderator: {
        type: [{
            first_name: String,
            last_name: String,
            username: String,

        }],
        required: true,
        trim: true,
    },
    members_num: {
        type: Number,
        required: true,
        trim: true,
        default: 1, // The moderator is a member by default
    },
    members: {
        type: [{
            first_name: String,
            last_name: String,
            username: String,
        }], sparse: true
    },
    posts_num: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
    },
    posts: {
        type: [{
            title: String,
            post_id: String,
        }], sparse: true
    },
    tags: {
        type: [{
            type: String,
        }], sparse: true
    },
    banned_keywords: {
        type: [{
            type: String,
        }], sparse: true
    },
    blocked_users: {
        type: [{
            first_name: String,
            last_name: String,
            username: String,
        }], sparse: true
    },
    requested_user : {
        type: [{
            first_name: String,
            last_name: String,
            username: String,
        }], sparse: true
    },
    reported_posts: {
        type: [{
            reported_by: String,
            post_id: String,
            reported_against: String,
            concern: String,
        }], sparse: true
    },

});

const SubGreddit = mongoose.model("SubGreddit", SubGredditSchema);
export default SubGreddit;

