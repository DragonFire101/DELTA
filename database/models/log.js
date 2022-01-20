const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    instance: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    change: {
        action: {
            type: String,
            required: true
        },
        data: {
            old: {
                type: Array,
                required: true
            },
            new: {
                type: Array,
                required: true
            }
        }
    }
})

module.exports = mongoose.model('Log', logSchema);