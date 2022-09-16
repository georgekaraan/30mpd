const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const coursesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    color: {
        type: String
    },
    description: {
        type: String
    }
},

    { strictQuery: false })

module.exports = mongoose.model('courses', coursesSchema);