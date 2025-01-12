/* eslint-disable no-undef */
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	aliases: [ 'commands' ],
	description: 'List all commands or details on a specific commands.',
	usage: '<command name>',
	guildOnly: false,
	commandChannel: true,
	execute(message, args, server) {
		const { commands } = message.client;
		let prefix = process.env.PREFIX_DEFAULT;

		if (server) {
			prefix = server.prefix;
		}

		if (!args.length) {
			return dmUserAllCommands(message, prefix, commands);
		}

		const commandName = args[0].toLowerCase();
		const command = commands.get(commandName) || commands.find((c) => c.aliases && c.aliases.includes(commandName));

		if (!command || command.hide) {
			return message.reply("That's not a valid command!");
		}

		return sendChannelSpecificCommandDetails(message, prefix, command);
	}
};

function dmUserAllCommands(message, prefix, commands) {
	let embed = new Discord.MessageEmbed(require('../information/embedThemes/combineLogistics.json'))
		.setTitle("Here's a list of all my commands:")
		.setFooter(
			`You can send \`${prefix}help [command name]\` to get more info on a specific command!`,
			'https://cdn.discordapp.com/attachments/888902406736314368/932812314120445982/pngwing.com.png'
		);

	commands.forEach((command) => {
		if (!command.hide) {
			embed.addField(`${prefix}${command.name}`, command.description, false);
		}
	});

	embed.setDescription('*You can find the full documentation [here](https://github.com/vaught-dawson/DELTA)!*');

	return message.author
		.send(embed)
		.then(() => {
			if (message.channel.type === 'dm') return;
			message.reply("I've sent you a DM with all my commands!");
		})
		.catch((error) => {
			console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
			message.reply("It seems like I can't DM you! Do you have DMs disabled?");
		});
}

function sendChannelSpecificCommandDetails(message, prefix, command) {
	let embed = new Discord.MessageEmbed()
		.setTitle(`Name: ${command.name}`)
		.setColor(255)
		.setThumbnail('https://i.ibb.co/2MHY6wn/D-E-L-T-A-4.jpg')
		.setFooter('Combine Logistics', 'https://cdn.discordapp.com/attachments/888902406736314368/932812314120445982/pngwing.com.png');

	if (command.aliases) {
		embed.addField('Aliases:', command.aliases.join(', '), false);
	}

	if (command.description) {
		embed.addField('Description:', command.description, false);
	}

	if (command.usage) {
		embed.addField('Usage:', `${prefix}${command.name} ${command.usage}`, false);
	}

	return message.channel.send(embed);
}
