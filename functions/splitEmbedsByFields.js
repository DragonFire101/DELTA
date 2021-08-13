const Discord = require('discord.js');

function splitEmbedsByFields(fieldsContent, fieldCount, title, server) {
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

		let embedTheme = require(`../information/embedThemes/${server.embedTheme}.json`)
		var embed = new Discord.MessageEmbed(embedTheme)
			.addFields(fields)
			.setThumbnail('')
			.setFooter('')

		if (isFirstEmbed) {
			embed.setTitle(title);
			embed.setThumbnail(embedTheme.thumbnail.url);

			isFirstEmbed = false;
		}

		if (fieldsContent.length == 0) {
			embed.setFooter(embedTheme.footer.text, embedTheme.footer.iconURL);
		}

		embeds.push(embed);
	}
	return embeds;
}

module.exports.splitEmbedsByFields = splitEmbedsByFields;
