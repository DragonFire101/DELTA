const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const SchemaLog = new mongoose.Schema({
    instance: {
        type: ObjectId,
        ref: 'instance',
        required: true
    },
    instanceId: {
        type: String,
        required: true
    },
    character: {
        type: ObjectId,
        ref: 'character',
        required: true
    },
    characterId: {
        type: String,
        required: true
    },
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
})

module.exports = SchemaLog;