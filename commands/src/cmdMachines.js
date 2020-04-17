const { MessageEmbed , Client,} = require("discord.js");

const {categories} = require('./machines');

let choices = "0 : 3D Printers \n1 : Laser Cutting \nAll choices below this line are incomplete\n2 : CNC Milling \n3 : Animation \n4 : Heat Forming \n5 : Circuits and Soldering \n6 : Screen Printing \n7 : Textiles and Sewing \n8 : Vinyl Cutting \n9 : Wood Shop";

async function machines(message){
    const authFilter = m => m.author.id === message.author.id;
    message.reply(new MessageEmbed().setTitle("What Machines would you like to know about").addField("Please type the category number",choices, false)).then(r => r.delete({timeout:5000}));
    message.channel.awaitMessages(authFilter,{max:1, time:5000, dispose:true}).then(collected =>{
        if(!categories[collected.first().content].completed){
            collected.first().delete();
            return message.channel.send(new MessageEmbed().setTitle("Incomplete data").setDescription(`Details on ${categories[collected.first().content].categoryName} are not currently available.\nCheckout our website for details or ask a staff member!\nInformation is being updated daily, please be patient as I enter all of the machine data manually.\nThank you,\nBot developer`)).then(r=> r.delete({timeout:7500}));
        }
        collected.first().reply(new MessageEmbed().setTitle(`What Space would you like to look at for ${categories[collected.first().content]["categoryName"]}`).addField("Please type the space number","1 : IRL\n2 : IRL2", false)).then(r => r.delete({timeout:5000}));
        collected.first().delete();
        message.channel.awaitMessages(authFilter, {max:1, time:5000, dispose:true}).then(space =>{

            message.channel.send(messageCompose(collected.first().content, space.first().content)).then(r => r.delete({timeout:30000}))
            space.first().delete();

        }).catch((err) =>{
            message.channel.send("No space given").then(r => r.delete({timeout:5000}));
            console.log("No space given");

        });

    }).catch((err) =>{
        message.channel.send("No type given").then(r => r.delete({timeout:5000}));
        console.log("No type give");
        //console.log(err);
    });
    message.delete();
}



function messageCompose(reply, space){
    let category = categories[reply];
    let location = categories[reply].spaces[space];
    let toSend = new MessageEmbed();
    switch (reply) {
        case "0":
            toSend.setTitle(`${category.categoryName} in the ${location["spaceName"]}`);
            location["machines"].forEach((m) => {
                toSend.addField(`${m["name"]}\n${m["link"]}`, `Build area: ${m["build_area"]} \nType: ${m["type"]} \nLayer Thickness: ${m["thickness"]} \nMaterials: ${m["materials"]}`)
            });
            return toSend;

        case "1":
            toSend.setTitle(`${category.categoryName} in the ${location["spaceName"]}`);
            location["machines"].forEach((m) => {
                toSend.addField(`${m["name"]}\n${m["link"]}`, `Cut Area: ${m["cut_area"]} \nEngrave Area: ${m["engrave_area"]} \nLaser Wattage: ${m["laser_wattage"]} \nMaterials: ${m["materials"]}`)
            });
            return toSend;
        case "2":
            break;
        case "3":
            break;
        case "4":
            break;
        case "5":
            break;
        case "6":
            break;
        case "7":
            break;
        case "8":
            break;
        case "9":
            break;
        default:
            return new MessageEmbed().setTitle("How did get get here");


    }
}


module.exports = {machines};

