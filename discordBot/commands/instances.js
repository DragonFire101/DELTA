module.exports = {
	name: 'instances',
	aliases: [ 'instcs', 'is' ],
	description: 'Lists the instances in this Discord Server.',
	args: true,
	guildOnly: true,
	commandChannel: true,
	async execute(message, args) {
        //TODO Returns Instances
		try {
			let instance = getInstanceByCommandChannelId(message);

			
		}
		catch {
			return message.channel.send('Failed to find instance connected to this channel.');
		}
	}
};

async function getInstanceByCommandChannelId(message) {
    let instance = await Instance.find({ discord_server_id: message.server.id,  command_channel_id: message.channel.id});

    if (!instance) {
        throw new Error('Could not find instance by name.');
    }
}