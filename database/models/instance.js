const mongoose = require('mongoose');

const instanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'roster'
    },
    discord_server_id: {
        type: Number,
        required: true
    },
    command_channel_id: {
        type: Number,
        required: true
    },
    command_prefix: {
        type: String,
        required: true,
        default: '+'
    },
    member_prefix: {
        type: String,
        required: false
    },
    embed_options: {
        color: {
            type: Number,
            required: false
        },
        footer: {
            iconURL: {
                type: String,
                required: false
            },
            text: {
                type: String,
                required: false
            }
        }
    },
    announcements: {
        enabled: {
            type: Boolean,
            required: true,
            default: true
        },
        channel_id: {
            type: Number,
            required: false
        }
    },
    member_leave_notification: {
        enabled: {
            type: Boolean,
            required: true,
            default: true
        },
        channel_id: {
            type: Number,
            required: false
        }
    },
    rank_structure: {
        type: Array,
        required: true,
        default: [
            {
                name: 'Member',
                index: 0
            }
        ]
    },
    authorized_users: {
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('Instance', instanceSchema);