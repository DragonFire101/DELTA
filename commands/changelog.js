const logisticsTestingGuildId = '749775101435838554';
const vioDiscordId = '203944534839656448';
const servers = require('../information/guilds.json');
const Discord = require('discord.js');
const { isValidEmbedTheme } = require('../functions/isValidEmbedTheme.js');

module.exports = {
	name: 'changelog',
	aliases: [ 'change' ],
	description: 'Sends a change log to every DELTA server with an announcements channel set up (Dev Only).',
	args: true,
	guildOnly: true,
	commandChannel: false,
	async execute(message, args, server, client) {
		if (server.guildId != logisticsTestingGuildId) return;
		if (message.author.id != vioDiscordId) {
			return message.channel.send('Only Vio can run this!');
		}

		let embedTheme = await isValidEmbedTheme(server.embedTheme) ? require(`../information/embedThemes/${server.embedTheme}.json`) : require(`../information/embedThemes/default.json`);
		const embed = new Discord.MessageEmbed(embedTheme)
			.setTitle('Change Log')
			.setAuthor('Vio', 'https://i.ibb.co/SyjyCdh/56dd1219215d46403de009a1c2b82bcd.png')
			.setDescription(args.join(' '))
			.setThumbnail('')

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
