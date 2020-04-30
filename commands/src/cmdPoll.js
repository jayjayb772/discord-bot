const { MessageEmbed , Client,} = require("discord.js");
const emoji = require('node-emoji');

let toReact = [];
let pollMessage = new MessageEmbed();
let toDelete = [];


async function doReactions(message){
    for( let i = 0; i<toReact.length; i++){
        await message.react(emoji.emojify(toReact[i].emoji)).then(()=>{
            if(i === toReact.length-1){
                toReact =[];
            }
        });
    }

}

async function doDelete(message){
    for( let i =0; i< toDelete.length; i++) {
        message.channel.messages.fetch(toDelete[i].id).then(m=> m.delete());
        if(i === toDelete.length-1){
            toDelete =[];
        }
    }
}

async function getOption(message, collected, authFilter) {
    await collected.first().reply(new MessageEmbed().setTitle(`Please enter option ${toReact.length + 1}`).addField("instructions", "Please type in an option\nType exit to cancel\nType done to finish adding options")).then(r => toDelete.push({id: r.id}));
    ;

    await message.channel.awaitMessages(authFilter, {
        max: 1,
        time: 30000,
        dispose: true
    }).then(async function (optionsMessage) {
        let option = optionsMessage.first().content;
        toDelete.push({id: optionsMessage.first().id});
        if (option === "done") return;
        if (option === "exit") {
            doDelete(message).catch(err => {
                console.log(err);
            });
            return;
        }
        //console.log(option);
        const reactionFilter = users => users.reaction.id === optionsMessage.first().author.id;
        const rTrue = user => true;
        await optionsMessage.first().channel.send(`Please react to **YOUR PREVIOUS** Message with the option ${option}`).then(r => toDelete.push({id: r.id}));

        await optionsMessage.first().awaitReactions(rTrue, {max: 1, time: 30000}).then(async function (reactionInfo) {
            //console.log(reactionInfo);
            let reactedEmoji = emoji.unemojify(reactionInfo.first().emoji.name);
            optionsMessage.first().react(emoji.emojify(reactedEmoji));
            toReact.push({option: option, emoji: reactedEmoji});
            pollMessage.addField(`Option ${toReact.length}`, `${emoji.emojify(reactedEmoji)} : ${option}`);
            console.log(toReact);
            return getOption(message, collected, authFilter);
            // let reaction = reactionInfo.first().emoji.name;
            // console.log(reaction);
        }).catch(err => {
            console.log(err);
        });


    }).catch((err) => {
        console.log(err);
        console.log("options error");
    });


}




async function poll(message, args) {

    toReact = [];
    toDelete = [];
    if (args.length === 0) {

        const authFilter = m => m.author.id === message.author.id;


        message.reply(new MessageEmbed().setTitle("What would you like to title your poll?").addField("instructions", "Please reply with the name of the poll\nExpires in 10 seconds\nType exit to cancel", false)).then(r => toDelete.push({id:r.id}));;

        await message.channel.awaitMessages(authFilter, {
            max: 1,
            time: 30000,
            dispose: true
        }).then(async function (collected) {

            //console.log(collected);
            toDelete.push({id:collected.first().id});
            let title = collected.first().content;
            console.log(title);
            pollMessage.setTitle(title);
            if (title === "exit"){
                await doDelete(message);
                return;
            }

            getOption(message, collected, authFilter, toReact).then(async function (temp) {
                if(toReact.length === 0){
                    return;
                }
                message.channel.send(pollMessage).then(sentMessage => {
                    doReactions(sentMessage);
                    doDelete(message);
                    message.delete();

                    pollMessage = new MessageEmbed();
                }).catch((err) => {
                    console.log(err);
                });

            });


        }).catch((err) => {
            console.log(err);
            console.log("title error");
        });
        //await message.delete();

    }else{
        pollMessage.setTitle("Poll Results");
        message.channel.messages.fetch(args[0]).then(async function(prevPoll){
            let reactions = prevPoll.reactions.cache.array();

            let index =0;
            let highest=0;
            pollMessage.setTitle(`Results from ${prevPoll.embeds[0].title}`);
            //console.log(reactions.length);
            for(let i = 0; i<reactions.length; i++){
                pollMessage.addField(`Option ${i+1}`, `${prevPoll.embeds[0].fields[i].value}\nTotal count: ${reactions[i].count-1}`);
                if(reactions[i].count-1 > highest){
                    highest = reactions[i].count-1;
                    index = i;
                }
            }
            pollMessage.addField('Winner', `${prevPoll.embeds[0].fields[index].value} is the winner with ${reactions[index].count-1} votes`);
            message.channel.send(pollMessage).then(r => {
                pollMessage = new MessageEmbed();
            });
            message.delete();


        }).catch((err)=>{
            console.log(err);
        })
    }
}





module.exports = {poll};