const https = require('https');
const {MessageEmbed, Client} = require("discord.js");

async function checkMessage(message, environment) {
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

        let managers;
        managers = message.guild.roles.cache.filter(role => role.id === "699655886511276032");
        console.log(managers);
        const man = managers.members.filter(m=>m.user.presence !==null).map(m=>m.user);
        if(process.env.debug === "on") {
            console.log(managers.members);
            console.log(managers);
            console.log(man);
        }
        man.forEach((manager)=>{
            manager.user.send(flagged);
            console.log(manager.displayName);
        });


        const emoji = message.guild.emojis.cache.find(emoji =>emoji.name === 'AuthRequired');
        await message.react(emoji);
    }
}

module.exports = {checkMessage};