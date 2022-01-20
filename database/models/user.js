const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    discord_name: {
        type: String,
        required: true,
        default: null
    },
    discord_id: {
        type: Number,
        required: true,
        default: null
    },
    steam_id: {
        type: String,
        required: true,
        default: null
    },
    date_joined: {
        type: Date,
        required: true,
        default: Date.now()
    },
    characters: {
        type: Array,
        required: true,
        default: []
    }
})

module.exports = mongoose.model('Character', characterSchema);