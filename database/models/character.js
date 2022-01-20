const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    date_joined: {
        type: Date,
        required: false,
        default: Date.now()
    },
    last_promotion_date: {
        type: Date,
        required: false,
        default: Date.now()
    }
}, { strict: false })

module.exports = mongoose.model('Character', characterSchema);