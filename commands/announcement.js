const logisticsTestingGuildId = '479968465344659476';
const DevDiscordId = '141378733171802122';
const servers = require('../information/guilds.json');
const Discord = require('discord.js');

module.exports = {
	name: 'announcement',
	aliases: [ 'announce' ],
	description: 'Sends an announcement to every DELTA server with an announcements channel set up (Dev only).',
	args: true,
	usage: '<data>',
	guildOnly: true,
	commandChannel: false,
	async execute(message, args, server, client) {
		if (server.guildId != logisticsTestingGuildId) return;
		if (message.author.id != DevDiscordId) {
			return message.channel.send('Only developer can run this!');
		}

		const embed = new Discord.MessageEmbed()
			.setTitle('Announcement')
			.setColor(255)
			.setAuthor('Sheogorath')
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
