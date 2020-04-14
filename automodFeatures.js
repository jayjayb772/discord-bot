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
        const members = await message.guild.members.fetch();
        //console.log(members);

        const managers = members.filter(m => m.roles.highest.id === process.env.Manager_ID);

        console.log(managers);
        managers.forEach((manager)=>{
            //manager.send(flagged);
            console.log(manager.displayName);
        });

        const emoji = message.guild.emojis.cache.find(emoji =>emoji.name === 'AuthRequired');
        await message.react(emoji);
    }
}

exports.checkMessage = checkMessage;