const { MessageEmbed , Client} = require("discord.js");

async function reportBug(message, timestamp){

    const bugReport = new MessageEmbed().setTitle(`Bug reported by ${message.author.tag}`)
                                        .addField('Bug description', message.content.toString().split('!bug')[1])
                                        .setFooter(timestamp);

    message.guild.members.fetch(process.env.bugReporter).then((user) =>{
        user.user.send(bugReport);
        message.author.send("Thank you for reporting a bug!");
        const emoji = message.guild.emojis.cache.find(emoji =>emoji.name === 'NoAuthRequired');
        message.react(emoji);
    })


}

module.exports = {reportBug};