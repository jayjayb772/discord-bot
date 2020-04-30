const {MessageEmbed, Client} = require("discord.js");
const {config} = require("dotenv");
const https = require('https');


//const Twit = require('twit');
const {poll} = require("./commands/src/cmdPoll");
const {welcome} = require("./commands/src/welcomeAcknowledge");

//Commands
const {quote} = require('./commands/src/cmdQuote.js');
const {notFunctional, notCMD} = require("./commands/src/cmdErrors");
const {help, site} = require("./commands/src/cmdHelp");
const {hours} = require("./commands/src/cmdHours");
const {say} = require("./commands/src/cmdSay");
const {staff} = require("./commands/src/cmdStaff");
const {machines} = require("./commands/src/cmdMachines");
const {reportBug} = require("./commands/src/cmdBug");
const {checkMessage} = require("./commands/src/automodFeatures");
//const {collectPic} = require("./commands/src/petPicCollector");

const client = new Client({
    disableEveryone: true
});



config({
    pah: __dirname + "/.env"
});

client.on("ready", async () => {
    console.log(`I am online, my name is ${client.user.username}`);
    if (process.env.debug === "on") {
        await client.user.setActivity(`bugs run rampant`, {type: "WATCHING"});
        //client.guilds.cache.first().channels.cache.filter(channel => channel.id === process.env.onlineChannel).first().send(`Newly updated!`).then(r => r.delete({timeout: 5000}));
    } else {
        await client.user.setActivity(`irl!help`, {type: "PLAYING"});
    }
});



client.on('guildMemberAdd', (member )=>{
   console.log(`New member: ${member.user.tag}`);
    //welcome(member);
});

client.on('warn', function(info){
    console.log(info);
})


client.on('message', async (message) => {
    const prefix = "irl!";
    if(message.author.bot) return;

    if (!message.guild) return;


    if (message.content.startsWith(prefix) && !message.author.bot) {
        console.log(`${message.author.username} said ${message.content}`);
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix)) {
        await checkMessage(message, convertTimestamp(message.createdTimestamp));
        /*
        if(message.channel.id === process.env.petPicsChannel){
            await collectPic(message);
        }
        */
        return;
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
            await help(message, args);
            break;

        case "site":
            await site(message);
            break;

        case "machines":
            await machines(message);
            break;

        case "software":
            await notFunctional(message);
            break;

        case "staff":
            await staff(message, args, process.env.environment);
            break;

        case "upcoming":
            await notFunctional(message);
            break;

        case "bug":
            await reportBug(message, convertTimestamp(message.createdTimestamp));

        case "poll":
            await poll(message, args);

        case "NO_CMD":
            break;

        case "play":
            if (message.channel.id === process.env.musicListener) {
                await notFunctional(message)
            } else {
                await message.channel.send("Cannot use previous command in this channel").then(r => r.delete({timeout: 5000}))
            }
            message.delete();
            break;

        case "skip":
            if (message.channel.id === process.env.musicListener) {
                await notFunctional(message)
            } else {
                await message.channel.send("Cannot use previous command in this channel").then(r => r.delete({timeout: 5000}))
            }
            message.delete();
            break;

        case "pause":
            if (message.channel.id === process.env.musicListener) {
                await notFunctional(message)
            } else {
                await message.channel.send("Cannot use previous command in this channel").then(r => r.delete({timeout: 5000}))
            }
            message.delete();
            break;

        case "stop":
            if (message.channel.id === process.env.musicListener) {
                await notFunctional(message)
            } else {
                await message.channel.send("Cannot use previous command in this channel").then(r => r.delete({timeout: 5000}))
            }
            message.delete();
            break;
        default:
            await notCMD(message);
    }

});

function convertTimestamp(timestamp, offset = -6) {
    let d = new Date(timestamp);
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    let nd = new Date(utc + (3600000 * offset));
    return nd.toLocaleString();
}


client.login(process.env.TOKEN).catch((error) => {
    console.log(error);
});

/*

const twitClient = new Twit({
    consumer_key:process.env.twitterConsumerKey,
    consumer_secret:process.env.twitterConsumerSecret,
    access_token: process.env.twitterAccessToken,
    access_token_secret: process.env.twitterAccessTokenSecret
});

const twitStream = twitClient.stream(`statuses/filter`, {follow:process.env.twitterIRLID});

twitStream.on('tweet', function(tweet){
    client.guilds.cache.first().channels.cache.filter(channel => channel.id === process.env.socialMdeiaChannel).fetch().then(channel =>{
        channel.send(new MessageEmbed().setTitle(tweet.user).setDescription(tweet.text));
    })
});



 */



