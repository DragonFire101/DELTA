const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
	name: 'rankstructures',
	aliases: [ 'ranks' ],
	description: 'Lists the available rank structures to choose from.',
	args: false,
	guildOnly: false,
	commandChannel: true,
	async execute(message) {
		let embedTheme = require(`../information/embedThemes/default.json`)
		const embed = new Discord.MessageEmbed(embedTheme)
			.setTitle(`Avaliable rank structures:`)
			.setThumbnail('')

		let dirPath = path.resolve('./information/ranks');
		const rankStructures = fs.readdirSync(dirPath).filter((file) => file.endsWith('.json'));

		let desc = [];

		rankStructures.forEach((structure) => {
			desc.push(structure.substring(0, structure.length - 5));
		});

		embed.setDescription(desc.join(', '));

		return message.channel.send(embed);
	}
};
