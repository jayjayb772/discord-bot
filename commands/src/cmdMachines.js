const { MessageEmbed , Client} = require("discord.js");

const machineJSON = require('')

async function machines(message){
    let printers = "";
    printers = printers+machineJSON["3D_Printing"]["Dremel3D45"]["Build_area"];

    const response = new MessageEmbed().setTitle("Machines").addField("3D Printers", printers );
    await message.channel.send(response);


}

module.exports = {machines};

