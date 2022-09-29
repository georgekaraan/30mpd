import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;
const usersSchema = new Schema({
    name: {
        type: String
    },
    nickname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    bio: {
        type: String
    },
    active_subscription: {
        type: Boolean
    },
    signup_date: {
        type: Date,
        required: true
    },
    sub_start_date: {
        type: Date
    },
    current_course_ID: {
        type: Schema.Types.ObjectId,
        ref: 'courses'
    },
    current_course_start: {
        type: Date
    },
    current_course_day: {
        type: Number
    },
    current_course_day_completed: {
        type: Boolean
    },
    current_course_min: {
        type: Number
    },
    prev_subscription: [{
        sub_start: {
            type: Date
        },
        sub_end: {
            type: Date
        },
    }],
    completed_courses: [{
        courseID: {
            type: Schema.Types.ObjectId,
            ref: 'courses'
        },
        course_start: {
            type: Date
        },
        course_end: {
            type: Date
        },
        rating: {
            type: Number
        }
    }],
    mins_watched: {
        type: Number
    },
    streak_count: {
        type: Number
    },
    longest_streak: {
        type: Number
    },
    user_timezone: {
        type: String,
        required: true
    },
    user_date_time: {
        type: Date,
        required: true
    }
},

    { strictQuery: false })

export default model('users', usersSchema);