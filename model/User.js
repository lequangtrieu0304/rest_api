const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    role: {
        user: {
            type: Number,
            default: 2001
        },
        editor: Number,
        admin: Number
    },
    password: {
        type: String,
        require: true
    },
    refreshToken: String
}, {
    collection: 'Users'
});

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel
