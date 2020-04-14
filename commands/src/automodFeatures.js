const https = require('https');
const {MessageEmbed, Client} = require("discord.js");

async function checkMessage(message) {
    let bannedWords = process.env.banned_words.toString().substr(1, process.env.banned_words.toString().length - 2).split(", ");
    //console.log(bannedWords);
    let safe = true;
    await bannedWords.forEach((word) => {
        if (message.content.includes(word)) {
            safe = false;
        }
    });
    if (safe !== true) {
        const flagged = new MessageEmbed().setTitle(`Flagged message from ${message.author.tag} in ${message.channel.name}`).setDescription(message.content);

        await message.guild.roles.fetch(process.env.Manager_ID).then((managers)=>{
            managers.members.map(m=>m.user).forEach((user)=>{
                user.send(flagged)
            })
        });
        const emoji = message.guild.emojis.cache.find(emoji =>emoji.name === 'AuthRequired');
        await message.react(emoji);
    }
}

module.exports = {checkMessage};