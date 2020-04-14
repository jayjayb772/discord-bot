const https = require('https');
const { MessageEmbed , Client} = require("discord.js");


const say = async function(message, args, environment){
    //if(message.deletable) message.delete();
    if(args.length < 1) return message.reply("Nothing to say?").then(m => m.delete(5000));
    let bannedWords = process.env.banned_words.toString().substr(1,process.env.banned_words.toString().length-2).split(", ");
    let safe = true;
    bannedWords.forEach((word) =>{
        if(args.includes(word)){
            safe = false;
        }
    });

    if(safe === true) {
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild;
        if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed()
                .setTitle(`Message from ${message.author.username}`)
                .setColor(roleColor)
                .setDescription(args.slice().join(" "));

            await message.channel.send(embed);
        } else {
            await message.channel.send(args.slice().join(" "));
        }

    }else{
        await message.channel.send("Not repeating due to profanity")
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

exports.say = say;