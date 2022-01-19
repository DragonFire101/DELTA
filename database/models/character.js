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
    dateJoined: {
        type: Date,
        required: false,
        default: Date.now()
    },
    lastPromotionDate: {
        type: Date,
        required: false,
        default: Date.now()
    }
}, { strict: false })

module.exports = mongoose.model('Character', characterSchema);