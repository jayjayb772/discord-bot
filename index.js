const environment = "dev"; // "prod"

const { MessageEmbed , Client} = require("discord.js");
const { config } = require("dotenv");
const {quote} = require('./cmdQuote.js');
const https = require('https');
const {say} = require("./cmdSay");


//const hoursEmbed = new MessageEmbed().setTitle("IRL and IRL2 Hours of operation").addField("IRL Hours", "Monday-Friday 10AM-9PM\nSaturday 10AM-5PM\nSunday Closed", true).addField("IRL2 Hours", "Monday-Friday 10AM-9PM\nSaturday-Sunday 10AM-5PM", true);
const hoursEmbed = new MessageEmbed().setTitle("IRL and IRL2 Hours of operation").addField("IRL Hours", "Currently closed due to COVID-19", true).addField("IRL2 Hours", "Currently closed due to COVID-19", true);


const client = new Client({
    disableEveryone: true
    });

config({
    pah: __dirname + "/.env"
});

client.on("ready", () =>{
    console.log(`I am online, my name is ${client.user.username}`);
    client.user.setActivity(`My own development`, {type: "WATCHING"});

});



client.on('message', async message =>{

    const prefix = "irl!";
    if (message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;

    if(message.content.startsWith(prefix) && !message.author.bot){
        console.log(`${message.author.username} said ${message.content}`);
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd === "ping"){
        const msg = await message.channel.send('Pong');
    }

    if(cmd ==="hours"){
        await message.channel.send(hoursEmbed);
    }

    if(cmd === "say"){
        say(message, args);
    }


    if(cmd === "quote"){
        quote(message);
    }

});

if(environment === "dev") {
    client.login(process.env.DEV_TOKEN);
}else if(environment === "prod"){
    client.login(process.env.TOKEN);
}