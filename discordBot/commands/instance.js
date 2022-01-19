const Instance = require('../models/instance.js'); 

module.exports = {
	name: 'instance',
	aliases: [ 'instc', 'i' ],
	description: 'Modify an instance.',
    usage: '<add/remove/set> <instance name> <parameter> <data>',
	args: true,
	guildOnly: true,
	commandChannel: true,
	async execute(message, args) {
        const subcommand = args.shift();

        switch (subcommand) {
            case 'a': 
            case 'add':
                //TODO Make roster with instance and tie them together
                const instance = new Instance({
                    name: args.shift(),
                    discord_server_id: message.server.id,
                    command_channel_id: message.channel.id,
                });

                try {
                    instance.save();
                    return message.channel.send(`Successfully made instance \`${instance.name}\`! To customize settings use the \`set\` subcommand.`);
                }
                catch (err) {
                    return message.channel.send(`Unable to make instance. Error: \`${err.message}\``);
                }

            case 'r':
            case 'rm':
            case 'remove':
                //TODO Remove Instance
                const instance = getInstanceByName(message, args.shift()).catch(() => {
                    return message.channel.send('Failed to find this instance! Did you type the name right?');
                });

                await instance.remove();
                return message.channel.send(`Instance \`${instance.name}\` was successfully removed.`);

            case 's':
            case 'set': 
                //Possibly working ???
                const instance = getInstanceByName(message, args.shift()).catch(() => {
                    return message.channel.send('Failed to find this instance! Did you type the name right?');
                });

                try {
                    instance[args.shift()] = args.join(' ');
                    instance.save()
                }
                 catch {
                    return message.channel.send('Something went wrong! Make sure that the parameter is typed correctly and you are providing a valid data type.');
                 }

            default:
                return message.channel.send(`Invalid subcommand! Usage: \`${this.usage}\``);
        }
	}
};

async function getInstanceByName(message, instanceName) {
    const instance = await Instance.find({ name: instanceName, discord_server_id: message.server.id });

    if (!instance) {
        throw new Error('Could not find instance by name.');
    }
}