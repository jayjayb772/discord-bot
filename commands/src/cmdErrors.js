const https = require('https');
const { MessageEmbed } = require("discord.js");


async function notFunctional(message){
    //if(message.deletable) message.delete();
    await message.author.send(`Previous command is not currently functional. Contact <@${process.env.USER}> for details`);
}

async function notCMD(message){
    //if(message.deletable) message.delete();
    await message.author.send(`Previous command is unrecognized. If you think this may be a mistake, please contact <@${process.env.USER}> with details.`);
}

module.exports = {notFunctional, notCMD};