const https = require('https');
const { MessageEmbed , Client} = require("discord.js");

//const hoursEmbed = new MessageEmbed().setTitle("IRL and IRL2 Hours of operation").addField("IRL Hours", "Monday-Friday 10AM-9PM\nSaturday 10AM-5PM\nSunday Closed", true).addField("IRL2 Hours", "Monday-Friday 10AM-9PM\nSaturday-Sunday 10AM-5PM", true);

const helpmsg = new MessageEmbed().setTitle("List of commands").addField("How to use commands", "In order to use commands you must start with the prefix \"irl!\" ", false)
                                                                .addField("say (embed) *str*", "repeats *str* with optional embed", false)
                                                                .addField("site", "sends the link to the IRL website")
                                                                .addField("quote", "Gets quote from [Adafruit quote api](adafruit.com/quotes.php)",false)
                                                                .addField("hours (irl/irl2)", "Sends hours of spaces with optional specifier tag", false)
                                                                .addField("staff (role)", "Lists staff online, use role to specify specialties")
                                                                .addField("help", "Lists all functional commands", false)
                                                                .setURL("https://github.com/jayjayb772/discord-bot");


const help = async function(message, args){
    if(message.deletable) message.delete();
    await message.channel.send(helpmsg);
}


const site = async function(message){
    if(message.deletable) message.delete();
    await message.channel.send(new MessageEmbed().setTitle("IRL WEBSITE").setURL("http://irl.depaul.edu/"));
}

exports.help = help;
exports.site = site;
