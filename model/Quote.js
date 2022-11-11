const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
    quote: {
        type: String,
        required: true
    },
    author_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    dayCreate: {
        type: Date,
        default: ''
    },

    dayUpdate: {
        type: Date,
        default: ''
    }
}, {
    collection: 'Quote'
});

module.exports = mongoose.model('Quote', QuoteSchema);