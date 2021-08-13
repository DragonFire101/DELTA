const Discord = require('discord.js');
const { guilds } = require('../information/guilds.json');
const { loadSpreadsheet } = require('../functions/loadSpreadsheet.js');

module.exports = {
	name: 'divisions',
	aliases: [ 'divs' ],
	description: 'Gives info about all divisions.',
	args: false,
	guildOnly: false,
	commandChannel: true,
	hide: true,
	async execute(message, args, server) {
		if (message.author.id != '203944534839656448') {
			return message.channel.send(`Unknown command!`);
		}

		let embedTheme;
		try{
			embedTheme = await require(`../information/embedThemes/${await server.embedTheme}.json`)
		} 
		catch {
			return message.channel.send("Invlid embed theme! Look at the DELTA website to see the list of avaliable embed themes.");
		}

		const embed = new Discord.MessageEmbed(embedTheme).setTitle(
			'Divisions'
		);

		const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

		for (let guild of guilds) {
			if (guild.guildName == 'Logistics') continue;
			await delay(3000);
			message.channel.send(`Getting ${guild.guildName} members!`);

			var spreadsheet = await loadSpreadsheet(guild.spreadsheetId, guild).catch(err => {
				message.channel.send(`Unable to load spreadsheet: \`${guild.guildName}\`\nError ${err.response.status}: ${err.response.statusText}`);
			});
			if (spreadsheet === null || spreadsheet === undefined) {
				message.channel.send(`Skipping \`${guild.guildName}\` spreadsheet. . .`);
				continue;
			}

			var rosterSheet = spreadsheet.sheetsByTitle[guild.rosterName];
			if (!rosterSheet) {
				message.channel.send(`Unable to load roster: \`${guild.guildName}\``);
				continue;
			}

			var rows = await rosterSheet.getRows();

			var ranks = {
				Honorary: 0,
				TR: 0,
				Enlisted: 0,
				NCO: 0,
				CO: 0,
				Other: 0
			};

			for (let i = 0; i < rows.length; i++) {
				let rankGroup = await identifyRankGroup(rows[i][guild.rankHeader], guild);
				let currentNum = ranks[rankGroup];
				ranks[rankGroup] = currentNum + 1;
			}

			embed.addField(
				`*${guild.guildName}*`,
				`**COs:** ${ranks['CO']}
					**NCOs:** ${ranks['NCO']}
					**Enlisted:** ${ranks['Enlisted']}
					**TR:** ${ranks['TR']}
					**Honorary:** ${ranks['Honorary']}
					**Other:** ${ranks['Other']}`,
				true
			);
		}

		return message.channel.send(embed);
	}
};

async function identifyRankGroup(rank, server) {
	let structure = server.rankStructure;
	const { ranks } = await require(`../information/ranks/${structure}.json`);

	let currRank = ranks.find((r) => r.name == rank);

	if (!currRank) {
		return 'Other';
	} else {
		return currRank.group;
	}
}
