let Discord = require('discord.js')
let error = require('../func/error.js')
let fs = require('fs')
let mongoose = require('mongoose')
let User = require('../schema/user.js')
let config = require('../a/b/c/d/botconfig.json')
const talkedRecently = new Set();
mongoose.connect(`mongodb+srv://zaedus:${config.password}@discordbot-cyf2b.mongodb.net/discordbot`, {useNewUrlParser: true})
module.exports.run = async (bot, message, args, perms) => {
    message.delete()
    if(talkedRecently.has("yes")){
        return message.reply("Wait a moment! Someone else's is processing...")
    }
    talkedRecently.add("yes");
    let del = "";
    message.channel.send("Loading...").then(msg=>{
        del=msg;
    })
    let member = message.member;
    let coins;
    if(message.mentions.members.first()){ member = message.mentions.members.first();}
    User.find({
        id: member.id
    }, (err, users) =>{
        if(err) return console.log(err);
        if(!users[0]){
            return message.channel.send("This person hasn't gotten any coins yet...")
        }
        coins = users[0].coins;

        let html = `<html style='background-color: #23272A;'><div style="background-color: #090A0B; height: 400px; width: 300px; top: 15px; left: 15px; position: absolute; border-radius: 4px;"><div style="background-color: #1b1e21; border-radius: 50%; position: absolute; top: 2.7%; left: 95px; height: 110px; width: 110px;"></div><img src="${member.user.avatarURL}" style="border-radius: 50%; position: absolute; top: 4%; left: 100px; height: 100px; width: 100px;"><h1 style="font-size: 14px; color: whitesmoke; top: 120px; position:relative; text-align: center;">${member.user.username}</h1><h3 style="font-size: 8px; color: darkslategray; top: 115px; position:relative; text-align: center;">#${member.user.discriminator}</h3><div style="background-color: rgb(87, 95, 102); height: 30px; width: 130px; position: relative; top: 120px; left: 10px; border-radius: 100px;"><h3 style="color: white; position: absolute; top: -17px; left: 4px;">${coins}</p><img src="https://bot-resources.neocities.org/resources/coin.png" style="height: 24px; width: 19.5px; position: absolute; top: 1px; left: 100px;"></div></div><style>@font-face { font-family: font; src: url("https://bot-resources.neocities.org/resources/emulogic.ttf")} html {font-family: 'font'}</style></html>`
        var webshot = require("webshot");
        let height = 431;
        let width = 331;
        var options = {
            streamType: "jpeg",
            siteType: "html",
            defaultWhiteBackground: false,
            shotsize: {
                height: height,
                width: width
            },
            screenSize: {
                height: height,
                width: width
            },
            quality: 1000
        };
        let loop = 0;
        while(fs.existsSync(`./images/output${loop}.jpeg`)){
            loop++;
        }
        console.log(`./images/output${loop}.jpeg`)
        webshot(html, `./images/output${loop}.jpeg`, options, (err) => {
            talkedRecently.delete("yes")
            del.delete()
            if(err){
                return console.log(err);
            }
            message.channel.send({
                file: `./images/output${loop}.jpeg`
            }).then(msg=>{
                if(fs.existsSync(`./images/output${loop}.jpeg`)){
                    fs.unlinkSync(`./images/output${loop}.jpeg`);
                }
            })
        });
    })
}
module.exports.help = {
    "name": "rank",
    "description": "Displays current rank",
    "usage": "!rank *<@user>" 
}