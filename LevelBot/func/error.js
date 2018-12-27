let Discord = require('discord.js')
module.exports = function(usage, message){
    let rndm = Math.floor(Math.random() * 5);
    let response = [
        "Dev guys, can you translate this?", 
        "Pinging the server... no response found.", 
        "Can you at least try to do it right?", 
        "eRrOr: Imppprooooper foorrmaat.", 
        "404: Propper Syntax not Found"
    ]
    let richEmbed = new Discord.RichEmbed()
    .setColor("#ff3a3a")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription("Usage: `" + usage + "`")
    .setTitle("❌ " + response[rndm])
    return message.channel.send(richEmbed)
    .then(msg=> msg.delete(10000))
}