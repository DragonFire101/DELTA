async function getMemberFromSheetById(member, sheet, server) {
	var rows = await sheet.getRows();
    let output = rows.filter((row) => row[server.discordHeader] === member.id);
	return output[0];
}

module.exports.getMemberFromSheetById = getMemberFromSheetById;
