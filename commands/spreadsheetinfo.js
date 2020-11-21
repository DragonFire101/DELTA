const { getSpreadsheetName } = require('../functions/getSpreadsheetName.js');
const { getSpreadsheetInfo } = require('../functions/getSpreadsheetInfo.js');
const Discord = require('discord.js');

module.exports = {
	name: 'spreadsheetinfo',
	aliases: [ 'sheets' ],
	description: 'Get the info of the whole spreadsheet.',
	args: false,
	sheets: true,
	guildOnly: true,
	async execute(message, args, server) {
		if (server.sheetId == null) {
			return message.channel.send(
				'This server does not have a sheet id set, notify the server owner to set this!'
			);
		}

		var embed = new Discord.MessageEmbed({
			color: 15105570,
			title: await getSpreadsheetName(server.sheetId),
			fields: await getSpreadsheetInfo(server.sheetId),
			footer: {
				text: 'Resistance Logistics',
				icon_url: 'https://i.ibb.co/Wzd001F/677a08d8682923ca8cb51fe48df38208.png'
			}
		});
		message.channel.send(embed);
	}
};
