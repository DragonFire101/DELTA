const fs = require('fs');
const path = '.\\information\\guilds.json';
const servers = require('../information/guilds.json');

function addGuildToConfig(guild) {
	servers.guilds.push({
		name: guild.name.toLowerCase(),
		guildId: guild.id,
		commandChannelId: null,
		sheetId: null,
		prefix: '+',
		rosterSheet: {
			name: 'Roster',
			nameHeader: 'Name',
			rankHeader: 'Rank',
			subdivisionChangeHeader: 'SubDiv',
			lastPromotionDateHeader: 'LastPromo',
			discordHeader: 'Discord',
			statusHeader: 'Status'
		}
	});
	fs.writeFile(path, JSON.stringify(servers, null, 2), function writeJSON(err) {
		if (err) {
			return console.log(err);
		}
	});
}

module.exports.addGuildToConfig = addGuildToConfig;
