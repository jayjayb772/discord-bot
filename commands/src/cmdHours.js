const https = require('https');
const { MessageEmbed , Client} = require("discord.js");

const hoursEmbed = new MessageEmbed().setTitle("IRL and IRL2 Hours of operation").addField("IRL Hours", "Monday-Friday 10AM-9PM\nSaturday 10AM-5PM\nSunday Closed", true).addField("IRL2 Hours", "Monday-Friday 10AM-9PM\nSaturday-Sunday 10AM-5PM", true);
const hoursEmbedcovid = new MessageEmbed().setTitle("IRL and IRL2 Hours of operation").addField("IRL Hours", "Currently closed due to COVID-19", true).addField("IRL2 Hours", "Currently closed due to COVID-19", true);

const irlHours = new MessageEmbed().setTitle("IRL Hours of Operation").addField("IRL Hours",  "Monday-Friday 10AM-9PM\nSaturday 10AM-5PM\nSunday Closed", true )
const irlHourscovid = new MessageEmbed().setTitle("IRL Hours of Operation").addField("IRL Hours",  "Currently closed due to COVID-19", true )

const irl2Hours = new MessageEmbed().setTitle("IRL2 Hours of Operation").addField("IRL2 Hours",  "Monday-Friday 10AM-9PM\nSaturday-Sunday 10AM-5PM", true )
const irl2Hourscovid = new MessageEmbed().setTitle("IRL2 Hours of Operation").addField("IRL2 Hours",  "Currently closed due to COVID-19", true )



async function hours(message, args){
    //if(message.deletable) message.delete();
   if(args[0] === "irl"){
       if(args[1] === "normal" || args[1] === "n"){
           await message.channel.send(irlHours).then( m => m.delete({timeout:15000}));;
       }else {
           await message.channel.send(irlHourscovid).then( m => m.delete({timeout:15000}));;
       }
   }
   else if(args[0] === "irl2"){
       if(args[1] === "normal" || args[1] === "n"){
           await message.channel.send(irl2Hours).then( m => m.delete({timeout:15000}));;
       }else {
           await message.channel.send(irl2Hourscovid).then( m => m.delete({timeout:15000}));;
       }
   }
   else {
       if (args[0] === "normal" || args[0] === "n") {
           await message.channel.send(hoursEmbed).then( m => m.delete({timeout:15000}));;
       } else {
           await message.channel.send(hoursEmbedcovid).then( m => m.delete({timeout:15000}));;
       }
   }
}

module.exports = {hours};