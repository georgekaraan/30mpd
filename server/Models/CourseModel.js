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


},

    { strictQuery: false })

export default model('courses', coursesSchema);