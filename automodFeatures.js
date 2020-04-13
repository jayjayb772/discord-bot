const https = require('https');
const {MessageEmbed, Client} = require("discord.js");

const checkMessage = async function (message, environment) {
    let bannedWords = process.env.banned_words.toString().substr(1, process.env.banned_words.toString().length - 2).split(", ");
    //console.log(bannedWords);
    let safe = true;
    bannedWords.forEach((word) => {
        if (message.content.includes(word)) {
            safe = false;
        }
    });
    if (safe !== true) {
        const flagged = new MessageEmbed().setTitle(`Flagged message from ${message.author.tag} in ${message.channel.name}`).setDescription(message.content);
        let managers;
        if(environment === "dev") {
            managers = await message.guild.roles.fetch(process.env.testmanager);
        }else{
            managers = await message.guild.roles.fetch(process.env.Manager_ID);
        }

        managers.members.forEach(m => {
            m.send(flagged);
        });
        const emoji = message.guild.emojis.cache.find(emoji =>emoji.name === 'AuthRequired');
        await message.react(emoji);
    }
}

exports.checkMessage = checkMessage;