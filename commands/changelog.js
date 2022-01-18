const logisticsTestingGuildId = '479968465344659476';
const DevDiscordId = '141378733171802122';
const servers = require('../information/guilds.json');
const Discord = require('discord.js');

module.exports = {
	name: 'changelog',
	aliases: [ 'change' ],
	description: 'Sends a change log to every DELTA server with an announcements channel set up (Dev Only).',
	args: true,
	guildOnly: true,
	commandChannel: false,
	async execute(message, args, server, client) {
		if (server.guildId != logisticsTestingGuildId) return;
		if (message.author.id != DevDiscordId) {
			return message.channel.send('Only the Bot developer can run this!');
		}

		const embed = new Discord.MessageEmbed()
			.setTitle('Change Log')
			.setColor(255)
			.setAuthor('Sheogorath', 'https://i.ibb.co/SyjyCdh/56dd1219215d46403de009a1c2b82bcd.png')
			.setDescription(args.join(' '))
			.setFooter('Combine Logistics', 'https://cdn.discordapp.com/attachments/888902406736314368/932812314120445982/pngwing.com.png');

		servers.guilds.forEach(async (server) => {
			if (server['announcementChannelId']) {
				if (!server['announcementChannelId'] == '') {
					let channel = await client.channels.fetch(server.announcementChannelId);
					channel.send(embed);
				}
			}
		});

		return message.channel.send('Success!').catch(console.error());
	}
};
