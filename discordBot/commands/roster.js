const mongoose = require('mongoose');
const models = require('../../database/models');
module.exports = {
	name: 'roster',
	aliases: [ 'members', 'r', 'rstr', 'list', 'ls' ],
	description: 'Lists the members of the roster in this instance.',
	args: false,
	guildOnly: true,
	commandChannel: true,
	async execute(message, args) {
		try {
			const db = mongoose.connection;

			let instance = await getInstanceByCommandChannelId(message);

			if (!instance) {
				return message.channel.send(`Unable to find instance for this channel! Have you made an instance yet?\n\`Instance: ${instance}\``);
			}

			let roster = await db.collection('rosters').findOne(instance['_id']);

			if (!roster) {
				return message.channel.send('Unable to find a roster for this instance. Have you added any data to it yet?');
			}

			return message.channel.send(`Found roster: ${roster}`);
		}
		catch (err) {
			console.log('Error:', err)
			return message.channel.send('Failed to find instance connected to this channel.');
		}
	}
};

async function getInstanceByCommandChannelId(message) {
    const instance = await models.Instance.findOne({ discord_server_id: message.guild.id,  command_channel_id: message.channel.id});

    if (!instance) {
        throw new Error('Could not find instance by name.');
    }

	return instance;
}