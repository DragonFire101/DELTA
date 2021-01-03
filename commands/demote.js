const { getDiscordMember } = require('../functions/getDiscordMember.js');
const { loadSpreadsheet } = require('../functions/loadSpreadsheet.js');
const { sendErrorEmbed } = require('../functions/sendErrorEmbed.js');
const dateFormat = require('dateformat');
const ranks = require('../information/ranks.json');

module.exports = {
	name: 'demote',
	aliases: [ 'dmt', 'demo' ],
	description: 'Demotes a member on the roster.',
	args: true,
	sheets: true,
	usage: '<member name>',
	guildOnly: true,
	async execute(message, args, server) {
		const spreadsheet = loadSpreadsheet(server.sheetId);
		const rosterSheet = (await spreadsheet).sheetsByTitle[server.rosterName];
		const rows = await rosterSheet.getRows();
		var inputMember = args.join('_');
		var member = await getDiscordMember(inputMember, message);
		var output;
		rows.forEach((row) => {
			if (row[server.nameHeader].toLowerCase() == member.name.toLowerCase() || row[server.discordHeader] == member.id) {
				let rank = row[server.rankHeader];
				newRank = demote(rank);
				if (newRank == null) output = `Failed to demote \`${row[server.nameHeader]}\` from \`${rank}\`.`;
				else {
					try {
						row[server.rankHeader] = newRank;
						let today = dateFormat(new Date(), 'mm/dd/yy');
						row[server.lastPromotionDateHeader] = today;
						if (newRank == '-01-TR') {
							row[server.statusHeader] = 'TR';
						}
						row.save();
						output = `Successfully demoted \`${row[server.nameHeader]}\` to \`${newRank}\` from \`${rank}\`.`;
					} catch (err) {
						sendErrorEmbed(message, { message: `**Command:** ${message.content}\n**Error:** ${err}` });
						output = `There was a problem saving to the roster.`;
					}
				}
			}
		});
		return message.channel.send(output ? output : `Failed to find \`${member.name}\` on the roster.`);
	}
};

function demote(rank) {
	switch (rank) {
		case ranks['pvt']:
			return ranks['tr'].toString();
		case ranks['pfc']:
			return ranks['pvt'].toString();
		case ranks['spc']:
			return ranks['pfc'].toString();
		case ranks['lcpl']:
			return ranks['spc'].toString();
		case ranks['cpl']:
			return ranks['lcpl'].toString();
		case ranks['sgt']:
			return ranks['cpl'].toString();
		case ranks['ssgt']:
			return ranks['sgt'].toString();
		case ranks['msgt']:
			return ranks['ssgt'].toString();
		case ranks['sgm']:
			return ranks['msgt'].toString();
		case ranks['wo']:
			return ranks['sgm'].toString();
		case ranks['2lt']:
			return ranks['wo'].toString();
		case ranks['1lt']:
			return ranks['2lt'].toString();
		case ranks['cpt']:
			return ranks['1lt'].toString();
		case ranks['mjr']:
			return ranks['cpt'].toString();
		case ranks['colonel']:
			return ranks['mjr'].toString();
	}
	return null;
}
