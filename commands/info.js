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
		const embed = new Discord.MessageEmbed()
			.setColor(255)
			.setThumbnail('https://i.ibb.co/2MHY6wn/D-E-L-T-A-4.jpg')
			.setTitle(`${description} v${version}:`)
			.setDescription(
				'**Bot:** Made by Vio and changed by Sheogorath to fit the Combine.\n**Art:** Made by Ragnarok\n**Repository:** https://github.com/vaught-dawson/DELTA'
			)
			.setFooter('Combine Logistics', 'https://cdn.discordapp.com/attachments/888902406736314368/932812314120445982/pngwing.com.png');

		message.channel.send(embed);

		if (args.length > 0) {
			message.channel.send(`\`If you're trying to get member info, use 'member info <member>'!\``);
		}
	}
};
