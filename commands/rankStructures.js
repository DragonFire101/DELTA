const Discord = require('discord.js');
const fs = require('fs');
const path = require("node:path")
module.exports = {
	name: 'rankstructures',
	aliases: [ 'ranks' ],
	description: 'Lists the available rank structures to choose from.',
	args: false,
	guildOnly: false,
	commandChannel: true,
	async execute(message) {
		const embed = new Discord.MessageEmbed()
			.setColor(255)
			.setTitle(`Avaliable rank structures:`)
			.setFooter('Combine Logistics', 'https://cdn.discordapp.com/attachments/888902406736314368/932812314120445982/pngwing.com.png');

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
