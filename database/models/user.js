const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const SchemaCharacter = new mongoose.Schema({
    discord: {
        name: {
            type: String,
            required: true,
            default: null
        },
        id: {
            type: Number,
            required: true,
            default: null
        }
    },
    steamId: {
        type: String,
        required: true,
        default: null
    },
    dateJoined: {
        type: Date,
        required: true,
        default: Date.now()
    },
    characters: [
        {
            type: ObjectId,
            ref: 'character',
            required: true
        }
    ],
    characterIds: [
        {
            type: String,
            required: true
        }
    ]
})

module.exports = SchemaCharacter;