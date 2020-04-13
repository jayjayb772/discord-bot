const https = require('https');
const { MessageEmbed , Client} = require("discord.js");

//const hoursEmbed = new MessageEmbed().setTitle("IRL and IRL2 Hours of operation").addField("IRL Hours", "Monday-Friday 10AM-9PM\nSaturday 10AM-5PM\nSunday Closed", true).addField("IRL2 Hours", "Monday-Friday 10AM-9PM\nSaturday-Sunday 10AM-5PM", true);
const hoursEmbed = new MessageEmbed().setTitle("IRL and IRL2 Hours of operation").addField("IRL Hours", "Currently closed due to COVID-19", true).addField("IRL2 Hours", "Currently closed due to COVID-19", true);

//const irlHours = new MessageEmbed().setTitle("IRL Hours of Operation").addField("IRL Hours",  "Monday-Friday 10AM-9PM\nSaturday 10AM-5PM\nSunday Closed", true )
const irlHours = new MessageEmbed().setTitle("IRL Hours of Operation").addField("IRL Hours",  "Currently closed due to COVID-19", true )

//const irl2Hours = new MessageEmbed().setTitle("IRL2 Hours of Operation").addField("IRL2 Hours",  "Monday-Friday 10AM-9PM\nSaturday-Sunday 10AM-5PM", true )
const irl2Hours = new MessageEmbed().setTitle("IRL2 Hours of Operation").addField("IRL2 Hours",  "Currently closed due to COVID-19", true )



const hours = function(message, args){
    if(message.deletable) message.delete();
   if(args[0] === "irl"){
       message.channel.send(irlHours);
   }
   else if(args[0] === "irl2"){
       message.channel.send(irl2Hours);
   }
   else {
       message.channel.send(hoursEmbed);
   }
}

exports.hours = hours;