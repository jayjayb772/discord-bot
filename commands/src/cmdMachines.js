const { MessageEmbed , Client,} = require("discord.js");

const {categories} = require('./machines');

async function machines(message){
    const authFilter = m => m.author.id === message.author.id;
    message.reply(new MessageEmbed().setTitle("What Machines would you like to know about").addField("Please type the category number","0 : 3D Printers", false)).then(r => r.delete({timeout:10000}));
    message.channel.awaitMessages(authFilter,{max:1, time:10000, dispose:true}).then(collected =>{
        collected.first().reply(new MessageEmbed().setTitle(`What Space would you like to look at for ${categories[collected.first().content]["categoryName"]}`).addField("Please type the space number","1 : IRL\n2 : IRL2", false)).then(r => r.delete({timeout:10000}));
        collected.first().delete();

        message.channel.awaitMessages(authFilter, {max:1, time:10000, dispose:true}).then(space =>{

            message.channel.send(messageCompose(collected.first().content, space.first().content)).then(r => r.delete({timeout:30000}))
            space.first().delete();

        }).catch((err) =>{
            message.channel.send("No space given").then(r => r.delete({timeout:10000}));
            console.log("No space given");

        });

    }).catch((err) =>{
        message.channel.send("No type given").then(r => r.delete({timeout:10000}));
        console.log("No type give");
        //console.log(err);
    });

    message.delete();





}



function messageCompose(reply, space){
    switch (reply) {
        case "0":
            let op = categories["0"].spaces[space];
            let toSend = new MessageEmbed();
            toSend.setTitle(op["spaceName"]);
            op["machines"].forEach((m) => {
                toSend.addField(m["name"], `Build area: ${m["build_area"]} \nType: ${m["type"]} \nLayer Thickness: ${m["thickness"]} \nMaterials: ${m["materials"]}`)
            });
            return toSend;

        case "1":
            console.log(categories["1"].categoryName);
            return new MessageEmbed().setTitle(`No content for ${categories["1"].categoryName} yet, please come back soon.`);
            break;
        default:
            return new MessageEmbed().setTitle("How did i get here");
            break;

    }
}


module.exports = {machines};

