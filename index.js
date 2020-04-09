const environment = "dev"; // "prod"

const { MessageEmbed , Client} = require("discord.js");
const { config } = require("dotenv");

const https = require('https');
const options = {
    hostname: 'https://www.adafruit.com/api/quotes.php',
}

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
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd === "ping"){
        const msg = await message.channel.send('Pong');
    }

    if(cmd ==="hours"){
        await message.channel.send(hoursEmbed);
    }

    if(cmd === "say"){
        if(message.deletable) message.delete();
        if(args.length < 1) return message.reply("Nothing to say?").then(m => m.delete(5000));

        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild;
        if(args[0].toLowerCase() === "embed"){
            const embed = new MessageEmbed()
                .setTitle(`Message from ${message.author.username}`)
                .setColor(roleColor)
                .setDescription(args.slice(1).join(" "));

           await message.channel.send(embed);
        }else{
           await message.channel.send(args[0]);
        }
    }


    if(cmd === "quote"){
        if(message.deletable) message.delete();
        https.get(options.hostname, (resp) => {
            let data = '';
            let author = '';
            let text = '';

            resp.on('data', (chunk)=>{
                data+=chunk;
            });

            resp.on('end', () =>{
                console.log(JSON.parse(data));
                text = JSON.parse(data)[0].text;
                author = JSON.parse(data)[0].author;
                const embed = new MessageEmbed().setTitle("Quote as requested:").setDescription(`"${text}"`).setFooter(`By: ${author}`);

                message.channel.send(embed);
            });

        }).on("error", (err) =>{
            console.log(`Error: ${err.message}`);
        });
    }

});

if(environment === "dev") {
    client.login(process.env.DEV_TOKEN);
}else if(environment === "prod"){
    client.login(process.env.TOKEN);
}
