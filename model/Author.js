const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    collection: 'Author'
});

module.exports = mongoose.model('Author', AuthorSchema);