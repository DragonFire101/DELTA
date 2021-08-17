/* eslint-disable no-undef */
const Discord = require('discord.js');

async function sendErrorEmbed(message, error) {
	console.log(error);

	let embedTheme = require(`../information/embedThemes/default.json`)
	const embed = new Discord.MessageEmbed(embedTheme)
		.setAuthor(message.author.tag)
		.setThumbnail(message.author.displayAvatarURL())
		.setTitle(`${message.guild.name}:`)
		.setDescription(error.message ? error.message : 'Failed to grab error.')

	const bugReportWebhookClient = new Discord.WebhookClient(process.env.BUGREPORT_WEBHOOK_ID, process.env.BUGREPORT_WEBHOOK_TOKEN);

	bugReportWebhookClient.send('', {
		username: error.bug ? 'Bug Report' : 'Error',
		avatarURL: 'https://i.ibb.co/2MHY6wn/D-E-L-T-A-4.jpg',
		embeds: [ embed ]
	});
}

module.exports.sendErrorEmbed = sendErrorEmbed;
