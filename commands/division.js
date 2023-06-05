const Discord = require('discord.js');
const { guilds } = require('../information/guilds.json');
const { loadSpreadsheet } = require('../functions/loadSpreadsheet.js');

module.exports = {
	name: 'division',
	aliases: [ 'div' ],
	description: 'Gives info about a division.',
	usage: '?<division name>',
	guildOnly: false,
	commandChannel: true,
	async execute(message, args, server) {
		let divisionGuild;
		if (args && args.length > 0) {
			if (message.author.id != '141378733171802122') {
				return message.channel.send(
					`You don't have permission to run this on any division except your own!\nUse \`${server.prefix}division\` to get data on your own division!`
				);
			}

			args = args.join(/ +/);

			divisionGuild = guilds.find((guild) => guild.guildName.toLowerCase() == args.toLowerCase());
			if (!divisionGuild) {
				return message.channel.send('Invalid division name!');
			}
		} else {
			divisionGuild = server;
		}

		const embed = new Discord.MessageEmbed(require('../information/embedThemes/combineLogistics.json')).setTitle(
			`${divisionGuild.guildName}`
		);

		const spreadsheet = await loadSpreadsheet(divisionGuild.spreadsheetId, server);

		if (spreadsheet === null) {
			return message.channel.send('Invalid spreadsheet id! Make sure you set it up properly in the config.');
		}

		var rosterSheet = spreadsheet.sheetsByTitle[divisionGuild.rosterName];

		if (!rosterSheet) {
			return message.channel.send('Invalid roster sheet name! Make sure you set it up properly in the config.');
		}

		var rows = await rosterSheet.getRows();

		var ranks = {
			Advisor: 0,
			Honorary: 0,
			Enlisted: 0,
			JNCO: 0,
			NCO: 0,
			SNCO: 0,
			CO: 0,
			Overlook: 0,
			Other: 0
		};

		for (let i = 0; i < rows.length; i++) {
			let rankGroup = await identifyRankGroup(rows[i][divisionGuild.rankHeader], divisionGuild);
			let currentNum = ranks[rankGroup];
			ranks[rankGroup] = currentNum + 1;
		}

		embed.setDescription(
			`**Overlook:** ${ranks['Overlook']}
			**COs:** ${ranks['CO']}
			**SNCOs:** ${ranks['SNCO']}
            **NCOs:** ${ranks['NCO']}
			**JNCOs:** ${ranks['JNCO']}
            **Enlisted:** ${ranks['Enlisted']}
			**Honorary:** ${ranks['Honorary']}
			**Advisors:** ${ranks['Advisor']}
            **Other:** ${ranks['Other']}`
		);

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
