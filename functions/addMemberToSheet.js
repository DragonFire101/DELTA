async function addMemberToSheet(member, sheet, server) {
	let row = {};

	let today = new Date();
	row[server.nameHeader] = member.name;
	row[server.discordHeader] = member.id || 'None';
	row[server.lastPromotionDateHeader] = today.getUTCMonth().toString().padStart(2,"0")+"/"+today.getUTCDate().toString().padStart(2,"0")+"/"+today.getUTCFullYear().toString().slice(2,4);
	let structure = server.rankStructure;
	const { ranks } = require(`../information/ranks/${structure}.json`);
	row[server.rankHeader] = ranks[0].name;
	await sheet.addRow(row);
}

module.exports.addMemberToSheet = addMemberToSheet;
