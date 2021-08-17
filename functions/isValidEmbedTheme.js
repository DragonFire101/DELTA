const fs = require('fs');

async function isValidEmbedTheme(embedTheme) {
	const embedThemes = fs.readdirSync('./information/embedThemes').filter((file) => file.endsWith('.json'));
    for (const theme of embedThemes) {
        if (embedTheme.toLowerCase() + ".json" === theme.toLowerCase()) return true;
    }
    return false;
}

module.exports.isValidEmbedTheme = isValidEmbedTheme;
``