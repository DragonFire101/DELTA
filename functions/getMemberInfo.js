const { getMemberFromSheetById } = require('./getMemberFromSheetById.js');
const { getMemberFromSheetByName } = require('./getMemberFromSheetByName.js');
const { getSheetHeaders } = require('./getSheetHeaders.js');
const Discord = require('discord.js');

async function getMemberInfo(member, sheet, server) {
	var memberData = await getMemberFromSheetById(member, sheet, server);

	if (!memberData) {
		memberData = await getMemberFromSheetByName(member, sheet, server);
		if (!memberData) {
			return `Member \`${member.name == null ? member.id : member.name}\` not found!`;
		}
	}

	var headers = await getSheetHeaders(sheet);

	let embedTheme = await require(`../information/embedThemes/${server.embedTheme}.json`)
	const embed = new Discord.MessageEmbed(embedTheme)
		.setTitle(memberData[server.nameHeader])
	
	let description = '';

	headers.forEach((header) => {
		if (memberData[header] && memberData[header] != '' && header != server.nameHeader) {
			description += `**${header}:** ${memberData[header]}\n`;
		}
	});

	if (description != '') {
		embed.setDescription(description);
	} else {
		return `No data!`;
	}

	return embed;
}

module.exports.getMemberInfo = getMemberInfo;
