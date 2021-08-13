const { GoogleSpreadsheet } = require('delta-google-spreadsheet');
const { sendErrorEmbed } = require('../functions/sendErrorEmbed.js');

async function loadSpreadsheet(spreadsheetId, server) {
	var spreadsheet;
	try {
		spreadsheet = new GoogleSpreadsheet(spreadsheetId);
		await spreadsheet.useServiceAccountAuth(server['googleClientCredentials']);
	} catch (err) {
		sendErrorEmbed({ message: `**Error:** ${err}` });
		throw err;
	}

	await spreadsheet.loadInfo();

	return spreadsheet;
}

module.exports.loadSpreadsheet = loadSpreadsheet;
