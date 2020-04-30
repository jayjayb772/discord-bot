const https = require('https');
const {MessageEmbed, Client} = require("discord.js");
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const FileReader = require('filereader');
const FileAPI = require('file-api'), File = FileAPI.File;

const fs = require('fs'),  request = require('request');

const download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};





const spaceEndpoint = new aws.Endpoint(`${process.env.spaceEndpoint}`);
const s3 = new aws.S3({
    endpoint: `${spaceEndpoint}`,
    accessKeyId:`${process.env.SPACES_KEY}`,
    secretAccessKey: `${process.env.SPACES_SECRET}`
});

const upload = multer({
    storage:multerS3({
        s3:s3,
        bucket:`${process.env.SPACE_NAME}`,
        acl:'public-read',
        key: function(request, file, cb){
            console.log(file);
            cb(null, file.originalname);
        }
    })
}).array('upload', 1);






async function collectPic(message){
    //console.log(message);
    if(await containsPic(message)){
        //Get infor about image from discord message
        let url = message.attachments.toJSON()[0].attachment;
        let name = message.attachments.toJSON()[0].name;
        console.log("Yes pic");
        //downloads the picture to a local file
        download(url, name, function(){
            console.log('done');
            let image;
            const fr = new FileReader();
            const imageFile = new File(`./${name}`);
            //read file as base64
            fr.readAsDataURL(imageFile);
            fr.addEventListener("load", ()=>{
                //after file is loaded
                image = fr.result;
                console.log(imageFile);
                console.log('\n\n\n');
                //console.log(image);
                //send to digital ocean spaces
                sendFile(image, name);
            });
        });
    }else{
        console.log("no pic");
    }

}

async function containsPic(message){
    console.log(message.attachments.toJSON());
    if(message.attachments.toJSON().length === 0){
        return false;
    }
    let name =message.attachments.toJSON()[0].name.toString();
    return name.includes(".png") || name.includes(".jpg") || name.includes("jpeg");
}

async function sendFile(bod, name){
    let params = {
        Bucket: `pet-pics-dev.nyc3.digitaloceanspaces.com`,
        Key: `${name}`,
        Body: bod,
        ACL: 'public-read'
    };
    s3.putObject(params, function(err, data){
        if(err) console.log(err, err.stack);
        else console.log(data);
    });
}

module.exports = {collectPic};