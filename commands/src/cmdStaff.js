const https = require('https');
const { MessageEmbed , Client} = require("discord.js");


async function staff(message, args, environment){


    //console.log(message.mentions.roles);

    if(args.length === 0){
        //console.log(args);
        let withRole;
        if(environment === "dev") {
            withRole = await message.guild.roles.fetch(process.env.testid);
            console.log(withRole);
        }else{
            withRole = await message.guild.roles.fetch(process.env.STAFF_ID);
        }
        const online = withRole.members.filter(m => m.presence.status === 'online').map(m=>m.displayName).join('\n');
        //console.log(online);
        const mems = new MessageEmbed().setTitle('All IRL staff online');
        if(online.length === 0){
            mems.setDescription("No employees currently online. Try again later.");
        }else {
            mems.setDescription(online);
        }
        //if(message.deletable) message.delete();
        await message.channel.send(mems).then( m => m.delete({timeout:15000}));
        message.delete();
    }
    else {
        //specified role

        if (process.env.forbiden_roles.includes(message.mentions.roles.first().id)) {
            await message.channel.send(`${message.mentions.roles.first().name} is not valid with this command, please use roles pertaining to IRL staff only`).then( m => m.delete({timeout:5000}));;
        } else {

            const withRole = message.mentions.roles.first().members;
            const online = withRole.filter(m => m.presence.status === 'online').map(m => m.displayName).join('\n');
            // console.log(online);

            const mems = new MessageEmbed()
                .setTitle(`Staff with ${message.mentions.roles.first().name} role currently online`)

            if (online.length === 0) {
                mems.setDescription("No employees with that specialty are online now. Try again later");
            } else {
                mems.setDescription(online);
            }
            if(message.deletable) message.delete();
            message.channel.send(mems).then( m => m.delete({timeout:15000}));;
        }
    }

}

module.exports = {staff};