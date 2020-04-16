const https = require('https');
const { MessageEmbed } = require("discord.js");


async function notFunctional(message){
    //if(message.deletable) message.delete();
    await message.channel.send(`Previous command is not currently functional. Contact <@${process.env.USER}> for details`).then( m => m.delete({timeout:5000}));;
}

async function notCMD(message){
    //if(message.deletable) message.delete();
    await message.channel.send(`Previous command is unrecognized. If you think this may be a mistake, please contact <@${process.env.USER}> with details.`).then( m => m.delete({timeout:5000}));;
}

module.exports = {notFunctional, notCMD};