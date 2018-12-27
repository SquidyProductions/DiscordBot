let error = require("../func/error.js")
let mongoose = require('mongoose')
let User = require('../schema/user.js')
let config = require('../a/b/c/d/botconfig.json')
mongoose.connect(`mongodb+srv://zaedus:${config.password}@discordbot-cyf2b.mongodb.net/discordbot`, {useNewUrlParser: true})
module.exports.run = async (bot, message, args, perms) => {
    message.delete()
    if(!args[0]) return error(module.exports.help.usage, message);
    if(isNaN(args[0])) return error(module.exports.help.usage, message);
    let mem = message.member;
    if(message.mentions.members.first()){
        mem = message.mentions.members.first();
    }
    User.find({
        id: mem.id
    }, (err, users) => {
        users[0].updateOne({
            coins: parseInt(users[0].coins) + parseInt(args[0])
        }, (err, raw) => {
            if(err) return console.log(err)
        })
    })
    User.replaceOne({
        id: mem.id
    }, (err, raw)=> {
        if(err) return console.log(err)
    })
}
module.exports.help = {
    "name": "coins",
    "description": "Gives `x` amount of coins",
    "usage": "!coins <number>"
}