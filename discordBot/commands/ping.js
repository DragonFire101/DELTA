module.exports = {
	name: 'ping',
	aliases: [ 'pong' ],
	description: 'Pong!',
	args: false,
	guildOnly: false,
	commandChannel: true,
	async execute(message, args) {
		return message.channel.send("Pong!");
	}
};
