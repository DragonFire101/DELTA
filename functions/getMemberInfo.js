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

	const embed = new Discord.MessageEmbed({
		thumbnail: { url: 'https://i.ibb.co/2MHY6wn/D-E-L-T-A-4.jpg' },
		color: 255,
		title: memberData[server.nameHeader],
		footer: {
			text: 'Combine Logistics',
			icon_url: 'https://cdn.discordapp.com/attachments/888902406736314368/932812314120445982/pngwing.com.png'
		}
	});

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
