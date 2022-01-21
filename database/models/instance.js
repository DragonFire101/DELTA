const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const defaultCustomization = require('../../discordBot/defaultCustomization.json');

const SchemaInstance = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'roster'
    },
    discord: {
        serverId: {
            type: Number,
            required: true
        },
        channelId: {
            type: Number,
            required: true
        },
    },
    prefixCommand: {
        type: String,
        required: true,
        default: defaultCustomization.prefix
    },
    prefixMember: {
        type: String,
        required: false
    },
    embedOptions: {
        color: {
            type: Number,
            required: false,
            default: defaultCustomization.embedOptions.color
        },
        thumbnail: {
            url: {
                type: String,
                required: false,
                default: defaultCustomization.embedOptions.thumbnail.url
            }
        },
        footer: {
            iconURL: {
                type: String,
                required: false,
                default: defaultCustomization.embedOptions.footer.iconURL
            },
            text: {
                type: String,
                required: false,
                default: defaultCustomization.embedOptions.footer.text
            }
        }
    },
    announcements: {
        enabled: {
            type: Boolean,
            required: true,
            default: true
        },
        channelId: {
            type: Number,
            required: false
        }
    },
    memberLeaveNotification: {
        enabled: {
            type: Boolean,
            required: true,
            default: true
        },
        channelId: {
            type: Number,
            required: false
        }
    },
    rankStructure: {
        type: Array,
        required: true,
        default: defaultCustomization.rankStructure
    },
    authorizedUsers: {
        type: Array,
        required: false
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

module.exports = SchemaInstance;