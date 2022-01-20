const mongoose = require('mongoose');

module.exports = {
	name: 'roster',
	aliases: [ 'members', 'r', 'rstr', 'list', 'ls' ],
	description: 'Lists the members of the roster in this instance.',
	args: false,
	guildOnly: true,
	commandChannel: true,
	async execute(message, args) {
		try {
			let instance = getInstanceByCommandChannelId(message);

			mongoose.connect(process.env.DATABASE_URI + 'DELTA_ROSTERS');
        	const db = mongoose.connection;
			let roster = db.collection('rosters').findOne()

			//TODO Iterate through roster from interface and list basic member info
		}
		catch {
			return message.channel.send('Failed to find instance connected to this channel.');
		}
	}
};

async function getInstanceByCommandChannelId(message) {
    const instance = await Instance.find({ discord_server_id: message.server.id,  command_channel_id: message.channel.id});

    if (!instance) {
        throw new Error('Could not find instance by name.');
    }
}