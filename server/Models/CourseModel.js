import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;
const coursesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sub_title: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    upload_date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: String,
    media: [
        {
            media_file: String,
            text_fie: String,
            day: Number,
            title: String
        }
    ],
    category: {
        type: String,
        required: true
    },
    sub_category: [String],
    difficulty: {
        type: Number,
        required: true
    },
    tags: [String],
    rating: Number,
    num_ratings: Number,
    num_commitments: Number
},

    { strictQuery: false })

export default model('courses', coursesSchema);