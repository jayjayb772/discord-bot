import { botToken } from './sercrets';
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.login(botToken)
