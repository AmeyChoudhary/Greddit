import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    reported_by: {
        type: {
            first_name: String,
            last_name: String,
            username: String,
        },
        required: true,
        trim: true,
    },
    in_subgreddit: {
        type: {
            name: String,
        },
        required: true,
        trim: true,
    },
    poster: {
        type: {
            first_name: String,
            last_name: String,
            username: String,
        },
        required: true,
        trim: true,
    },
    reported_post: {
        type: {
            post_id: String,

        },
        required: true,
        trim: true,
    },
    reason: {
        type: String,
        required: true,
        trim: true,
    },

}, { timestamps: true });

const Reoprts = mongoose.model("Reports", ReportSchema);
export default Reoprts;
