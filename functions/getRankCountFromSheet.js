async function getRankCountFromSheet(divisionGuild, rosterSheet) {
    var rows = await rosterSheet.getRows();

    var ranks = {
        Advisor: 0,
        Honorary: 0,
        TR: 0,
        Enlisted: 0,
        JNCO: 0,
        NCO: 0,
        SNCO: 0,
        CO: 0,
        Other: 0
    };

    for (let i = 1; i < rows.length; i++) {
        let rankGroup = await identifyRankGroup(rows[i][divisionGuild.rankHeader], divisionGuild);
        let currentNum = ranks[rankGroup];
        ranks[rankGroup] = currentNum + 1;
    }

    return ranks;
}

module.exports.getRankCountFromSheet = getRankCountFromSheet;

async function identifyRankGroup(rank, server) {
	let structure = server.rankStructure;
	const { ranks } = require(`../information/ranks/${structure}.json`);

	let currRank = ranks.find((r) => r.name == rank);

	if (!currRank) {
		return 'Other';
	} else {
		return currRank.group;
	}
}