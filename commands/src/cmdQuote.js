const https = require('https');
const { MessageEmbed , Client} = require("discord.js");



const options = {
    hostname: 'https://www.adafruit.com/api/quotes.php',
}
async function quote(message){
   // if(message.deletable) message.delete();
    https.get(options.hostname, (resp) => {
        let data = '';
        let author = '';
        let text = '';

        resp.on('data', (chunk)=>{
            data+=chunk;
        });

        resp.on('end', () =>{
            //console.log(JSON.parse(data));
            text = JSON.parse(data)[0].text;
            author = JSON.parse(data)[0].author;
            const embed = new MessageEmbed().setTitle("Quote as requested:").setDescription(`"${text}"`).setFooter(`By: ${author}`);

            message.channel.send(embed).then( m => m.delete({timeout:20000}));;
        });

    }).on("error", (err) =>{
        console.log(`Error: ${err.message}`);
    });

}

module.exports ={quote};