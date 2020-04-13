const https = require('https');
const { MessageEmbed , Client} = require("discord.js");


const notFunctional = function(message){
    if(message.deletable) message.delete();
    message.author.send(`Previous command is not currently functional. Contact <@${process.env.USER}> for details`);
}

const notCMD = function(message){
    if(message.deletable) message.delete();
    message.author.send(`Previous command is unrecognized. If you think this may be a mistake, please contact <@${process.env.USER}> with details.`);
}

exports.notFunctional = notFunctional;
exports.notCMD = notCMD;