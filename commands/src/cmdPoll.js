const { MessageEmbed , Client,} = require("discord.js");





async function poll(message){
    const reactionFilter = user => user.id === message.author.id;
    const authFilter = m => m.author.id === message.author.id;
    let pollMessage = new MessageEmbed();
    let toReact = [];
    message.reply(new MessageEmbed().setTitle("What would you like to title your poll?").addField("instructions","Please reply with the name of the poll\nExpires in 10 seconds\nType exit to cancel", false)).then(r => r.delete({timeout:10000}));
    message.channel.awaitMessages(authFilter,{max:1, time:10000, dispose:true}).then(collected =>{
        let title = collected.first();
        //console.log(title);
        pollMessage.setTitle(title);
        if(title === "exit") return;
        collected.first().reply(new MessageEmbed().setTitle("Please enter the 1st option").addField("instructions","Please type in an option\nType exit to cancel\nType done to finish adding options"));
        message.channel.awaitMessages(authFilter, {max:1, time:30000, dispose:true}).then(optionsMessage =>{
            let option = optionsMessage.first().content;
            //console.log(option);

            optionsMessage.first().channel.send(`Please react to **YOUR PREVIOUS** Message with the ${option}`)

            optionsMessage.first().awaitReactions(reactionFilter, {max:1, time:10000, errors:['time']}).then(reactionInfo =>{
                let reaction = reactionInfo.first().emoji.name;
                console.log(reaction);
            }).catch(err =>{
                console.log(err);
            });


        }).catch((err) =>{
            console.log(err);
            console.log("options error");
        })

    }).catch((err) =>{
        console.log(err);
        console.log("title error");
    });
    message.delete();
}


async function splitOptions(ops){
    let arr = ops.split(',');
    for( let i = 0; i<arr.length; i++){
        arr[i] = arr[i].trim();
    }
    return arr;


}

module.exports = {poll};