const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersSchema = new Schema({
    name: {
        type: String,
        required: true
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
    }
},

    { strictQuery: false })

module.exports = mongoose.model('users', usersSchema);