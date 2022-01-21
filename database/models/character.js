const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const SchemaCharacter = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateJoined: {
        type: Date,
        required: false,
        default: Date.now()
    },
    dateLastPromotion: {
        type: Date,
        required: false,
        default: Date.now()
    },
    user: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    instance: {
        type: ObjectId,
        ref: 'instance',
        required: true
    },
    instanceId: {
        type: String,
        required: true
    }
}, { strict: false })

module.exports = SchemaCharacter;