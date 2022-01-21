const Discord = require('discord.js');
const models = require('../../database/models');
const defaultCustomization = require('../defaultCustomization.json');

module.exports = {
	name: 'instances',
	aliases: [ 'instcs', 'is' ],
	description: 'Lists the instances in this Discord Server.',
	args: true,
	guildOnly: true,
	commandChannel: true,
	async execute(message, args) {
        //TODO Returns Instances
		try {
			let embed = new Discord.MessageEmbed(defaultCustomization.embedOptions)
				.setTitle(`Instances in \`${message.guild.name}\`:`);

			let instances = await getInstancesByCommandChannelId(message);
			if (instances.length == 0) {
				embed.setDescription('You don\'t seem to have any instances in this server.');
				return message.channel.send({ embeds: [embed] });
			}

			else {
				for (let instance of instances) {
					embed.addField(instance.name, `Type: ${instance.type}`, true);
				}

				return message.channel.send({ embeds: [embed] });
			}
		}
		catch (err) {
			console.log(err);
			return message.channel.send('Failed to find instance connected to this channel.');
		}
	}
};

async function getInstancesByCommandChannelId(message) {
    let instances = await models.Instance.find({ 'discord.serverId': message.guild.id });

    if (!instances || instances.length == 0) {
        throw new Error('Could not find instances in this server.');
    }

	return instances;
}