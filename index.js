
const { MessageEmbed , Client} = require("discord.js");
const { config } = require("dotenv");
const https = require('https');
const {checkMessage} = require("./commands/src/automodFeatures");


//Commands
const {quote} = require('./commands/src/cmdQuote.js');
const {notFunctional, notCMD} = require("./commands/src/cmdErrors");
const {help, site} = require("./commands/src/cmdHelp");
const {hours} = require("./commands/src/cmdHours");
const {say} = require("./commands/src/cmdSay");
const {staff} = require("./commands/src/cmdStaff");


const client = new Client({
    disableEveryone: true
    });

config({
    pah: __dirname + "/.env"
});

client.on("ready",  async () =>{
    console.log(`I am online, my name is ${client.user.username}`);
    if(process.env.debug === "on") {
        await client.user.setActivity(`bugs run rampant`, {type: "WATCHING"});
    }else{
        await client.user.setActivity(`irl!help`, {type: "PLAYING"});
    }
});



client.on('message', async (message) =>{
    const prefix = "irl!";
    if (message.author.bot) return;
    if(!message.guild) return;



    if(message.content.startsWith(prefix) && !message.author.bot){
        console.log(`${message.author.username} said ${message.content}`);
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    if(!message.content.startsWith(prefix)){
        await checkMessage(message);
        cmd="NO_CMD";
    }
    switch (cmd) {
        case "hours":
            await hours(message, args);
            break;

        case "say":
            await say(message, args, process.env.environment);
            break;

        case "quote":
            await quote(message);
            break;

        case "help":
            await help(message,args);
            break;

        case "site":
            await site(message);
            break;

        case "machines":
            await notFunctional(message);
            break;

        case "software":
            await notFunctional(message);
            break;

        case "staff":
            await staff(message,args, process.env.environment);
            break;

        case "upcoming":
            await notFunctional(message);
            break;

        case "NO_CMD":
            console.log('No command');
            break;

        default:
            await notCMD(message);
    }

});

client.login(process.env.TOKEN);





