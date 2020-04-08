const Discord = require('discord.js');
const { config } = require("dotenv");

const bot = new Discord.Client({
    disableEveryone: true
    });

config({
    pah: __dirname + "/.env"
});

bot.on("ready", () =>{
    console.log(`I am online, my name is ${bot.user.username}`);
    bot.user.setPresence({
        game:{
            name: "being developed",
            type: "WATCHING"
        }
    })

});

bot.on('message', async message =>{
    const prefix = "_";
    if (message.author.bot) return;
    if(message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd === "ping"){
        const msg = await message.channel.send('Pong');
    }

});


bot.login(process.env.TOKEN);
