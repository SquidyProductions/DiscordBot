let Discord = require('discord.js');
let bot = new Discord.Client();
let config = require("./a/b/c/d/botconfig.json")
let fs = require('fs')
let addXP = require('./func/addXP.js')
let spam = require('./func/spam.js')
bot.commands = new Discord.Collection()
fs.readdir("./commands/", (err, files) => {
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.")
        return;
    }
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});
bot.on('ready', listener => {
    console.log("This is it chief.")
})
bot.on("message", message => {
    message.member.user.discriminator
    if(message.channel.type === "dm") return;
    if(message.author.bot) return;
    addXP(message)
    spam(message)
    let messagearr = message.content.split(" ");
    let cmd = messagearr[0];
    let prefix = "!";
    let args = messagearr.slice(1);
    let perms = message.member.permissions.toArray()
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args, perms)
})
bot.login(config.token);