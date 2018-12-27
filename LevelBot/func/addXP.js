let mongoose = require('mongoose')
let config = require('../a/b/c/d/botconfig.json')
let User = require('../schema/user.js')
let Discord = require('discord.js')
mongoose.connect(`mongodb+srv://zaedus:${config.password}@discordbot-cyf2b.mongodb.net/discordbot`, {useNewUrlParser: true})
/**
 * Sends a random amount of coins to the database
 * @param message - A Discord Message Variable
 */
module.exports = function(message){
    let chance = Math.floor(Math.random() * 20) + 1;
    let coins = Math.floor(Math.random() * 5) + 1; 
    console.log(chance)
    if(chance <= 19) return;
    User.find({
        id: message.member.id
    }, (err, users) => {
        if(err) return console.log(err)
        if(!users[0]){
            let user = new User({
                _id: mongoose.Types.ObjectId(),
                username: message.author.username,
                id: message.member.id,
                coins: 0
            })
            return user.save();
        }
        let was = users[0].coins;
        let fin = was + coins;
        users[0].updateOne({
            coins: fin
        }, (err, raw) => {
            if(err) return console.log(err)
        })
        users[0].save()
        message.channel.send(new Discord.RichEmbed({
            title: `${message.author.username} just got ${coins} coin(s)!`,
            description: `You have ${fin} coins in your balance! Keep chatting!`,
        }).setColor("#ffe100")).then(msg=>{
            msg.delete(7500)
        })
    })
}