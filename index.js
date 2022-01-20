require('dotenv').config();

const { DiscordBot } = require('./discordBot/DiscordBot.js');
const { Intents } = require('discord.js');
 
const botIntents = new Intents();
botIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS)

const client = new DiscordBot(process.env.DISCORD_TOKEN, botIntents);

// const { ApiServer } = require('./api/ApiServer.js');
// const apiServer = new ApiServer('3000');