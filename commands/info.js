const Discord = require('discord.js');
const { description, version } = require('../package.json');

module.exports = {
	name: 'info',
	aliases: [ 'info' ],
	description: 'Gives info about DELTA.',
	args: false,
	guildOnly: false,
	commandChannel: true,
	async execute(message, args) {
		let embedTheme = await require(`../information/embedThemes/default.json`)
		const embed = new Discord.MessageEmbed(embedTheme)
			.setTitle(`${description} v${version}:`)
			.setDescription(
				'**Bot:** Made by Vio\n**Art:** Made by Ragnarok\n**Repository:** https://github.com/vaught-dawson/DELTA'
			)

		message.channel.send(embed);

		if (args.length > 0) {
			message.channel.send(`\`If you're trying to get member info, use 'member info <member>'!\``);
		}
	}
};
