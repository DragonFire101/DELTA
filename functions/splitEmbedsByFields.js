const Discord = require('discord.js');

function splitEmbedsByFields(fieldsContent, fieldCount, title) {
	var embeds = [];
	var isFirstEmbed = true;
	while (fieldsContent.length > 0) {
		let fields = [];

		for (let i = 0; i < fieldCount; i++) {
			if (fieldsContent.length == 0) {
				break;
			}

			fields.push(fieldsContent.shift());
		}

		var embed = new Discord.MessageEmbed({
			color: 255,
			fields: fields
		});

		if (isFirstEmbed) {
			embed.setTitle(title);
			embed.setThumbnail('https://i.ibb.co/2MHY6wn/D-E-L-T-A-4.jpg');

			isFirstEmbed = false;
		}

		if (fieldsContent.length == 0) {
			embed.setFooter('Combine Logistics', 'https://cdn.discordapp.com/attachments/888902406736314368/932812314120445982/pngwing.com.png');
		}

		embeds.push(embed);
	}
	return embeds;
}

module.exports.splitEmbedsByFields = splitEmbedsByFields;
