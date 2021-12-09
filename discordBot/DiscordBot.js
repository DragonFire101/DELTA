require('dotenv').config();
const { Client, Collection } = require('discord.js');
const fs = require('fs');

class DiscordBot {
    constructor(discordToken, intents) {
        this.client = new Client({ intents: intents });
        this.client.login(discordToken).catch(console.log('[ERROR] Failed to login.'));

        this.client.on('ready', async () => {
            console.log(`[EVENT] Logged in as ${this.client.user.tag}!`);
            await this.initializeCommands().then(console.log('[EVENT] Initialized commands.'));
        })

        this.client.on('messageCreate', async (message) => {
            if (message.author.bot) return;

            if (await this.isMessageCommandFormat(message.content))
                this.handleCommand(message);
        })
    }

    async initializeCommands() {
        new Promise((resolve) => {
            this.client.commands = new Collection();
            const commandFiles = fs.readdirSync('./discordBot/commands').filter((file) => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`./commands/${file}`);
                this.client.commands.set(command.name, command);
            }
            resolve(true);
        });
    }

    async isMessageCommandFormat(content) {
        const prefix = process.env.PREFIX;
        if (content.startsWith(prefix))
            return true;
        return false;
    }

    async handleCommand(message) {
        let args = message.content.substring(1).split(/ +/);
        var commandName = args.shift().toLowerCase();
	    var command = await this.getCommandFromName(commandName);

        if (!command) 
            return message.channel.send('This is an invalid command!');

        command.execute(message, args);
    }

    async getCommandFromName(commandName) {
        return (
            this.client.commands.get(commandName) ||
            this.client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))
        );
    }

}

module.exports.DiscordBot = DiscordBot;