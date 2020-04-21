const https = require('https');
const {MessageEmbed, Client} = require("discord.js");

async function welcome(member){
    const guild = member.guild;
    const introChannel = guild.channels.cache.filter(channel => channel.id === process.env.introChannel).first();
    introChannel.send(`Welcome to the IRL community Discord server, ${member.user.tag}!`);
    await member.user.send("Welcome to the IRL discord server. Be sure to check out the #guidelines channel for our rules, and introduce yourself in the #introductions channel!").catch((err)=>{
        console.log("Error sending welcome message to user:");
        console.log(err);
    });
}

module.exports = {welcome};