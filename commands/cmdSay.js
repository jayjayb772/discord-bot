const https = require('https');
const { MessageEmbed , Client} = require("discord.js");


const say = async function(message, args){
    if(message.deletable) message.delete();
    if(args.length < 1) return message.reply("Nothing to say?").then(m => m.delete(5000));

    const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild;
    if(args[0].toLowerCase() === "embed"){
        const embed = new MessageEmbed()
            .setTitle(`Message from ${message.author.username}`)
            .setColor(roleColor)
            .setDescription(args.slice().join(" "));

        await message.channel.send(embed);
    }else{
       await message.channel.send(args.slice().join(" "));
    }
}

exports.say = say;