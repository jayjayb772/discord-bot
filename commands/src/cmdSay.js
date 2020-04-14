const https = require('https');
const { MessageEmbed , Client} = require("discord.js");


async function say(message, args, environment){
    //const managers = await message.guild.roles.fetch(process.env.Manager_ID);
    //if(message.deletable) message.delete();
    if(args.length < 1) return message.reply("Nothing to say?").then(m => m.delete(5000));
    let bannedWords = process.env.banned_words.toString().substr(1,process.env.banned_words.toString().length-2).split(", ");
    let safe = true;
    const emoji = message.guild.emojis.cache.find(emoji =>emoji.name === 'AuthRequired');
    bannedWords.forEach((word) =>{
        while(args.includes(word)){
            safe = false;
            args.splice(args.indexOf(word), 1, emoji);
            //console.log(word);
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

        const flagged = new MessageEmbed().setTitle(`Flagged message from ${message.author.tag} in ${message.channel.name}`).setDescription(message.content);

        let managers;
        managers = await message.guild.roles.fetch(process.env.Manager_ID);
        const man = managers.members.map(m=>m);

        if(process.env.debug === "on") {
            console.log(managers);
            console.log(man);
        }

        man.forEach((m) => {
            m.user.send(flagged);
            console.log(m.displayName);
        });

        await message.react(emoji);
        await message.channel.send(args.join(" "));
    }
}

module.exports = {say};