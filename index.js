const { Client, RichEmbed } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
    disableEveryone: true
    });

config({
    pah: __dirname + "/.env"
});

client.on("ready", () =>{
    console.log(`I am online, my name is ${client.user.username}`);
    client.user.setPresence({
        game: {
            name: "being developed",
            type: "WATCHING"
        }
    });

});

client.on('message', async message =>{
    const prefix = "_";
    if (message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd === "ping"){
        const msg = await message.channel.send('Pong');
    }

    if(cmd === "say"){
        if(message.deletable) message.delete();
        if(args.length < 1) return message.reply("Nothing to say?").then(m => m.delete(5000));

        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild;
        if(args[0].toLowerCase() === "embed"){
            const embed = new RichEmbed()
                .setColor(roleColor)
                .setDescription(args.slice(1).join(" "));

            message.channel.send(embed);
        }else{
            message.channel.send(args[0]);
        }
    }

});


client.login(process.env.TOKEN);
