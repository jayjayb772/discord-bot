//const environment = "dev";
const environment = "prod";

const { MessageEmbed , Client} = require("discord.js");
const { config } = require("dotenv");
const https = require('https');


//Commands
const {quote} = require('./commands/cmdQuote.js');
const {notFunctional, notCMD} = require("./commands/cmdErrors");
const {help, site} = require("./commands/cmdHelp");
const {hours} = require("./commands/cmdHours");
const {say} = require("./commands/cmdSay");
const {staff} = require("./commands/cmdStaff");


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
    switch (cmd) {
        case "hours":
            await hours(message, args);
            break;

        case "say":
            await say(message, args);
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
            notFunctional(message);
            break;

        case "software":
            notFunctional(message);
            break;

        case "staff":
            await staff(message,args, environment);
            break;

        case "upcoming":
            notFunctional(message);
            break;

        default:
            notCMD(message);
    }

});

if(environment === "dev") {
    client.login(process.env.DEV_TOKEN);
}else if(environment === "prod"){
    client.login(process.env.TOKEN);
}