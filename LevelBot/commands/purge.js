let error = require("../func/error.js")
module.exports.run = async (bot, message, args, perms) => {
    message.delete()
    if(isNaN(args[0])) return error(module.exports.help.usage, message);
    if(!args[0]) return error(module.exports.help.usage, message);
    let msgs = await message.channel.fetchMessages({
        limit: args[0]
    })
    message.channel.bulkDelete(msgs)
    .catch(err => {
        message.reply("Couldn't Couldn't delete messages because of the following error: ```\n" + err + "```")
    })
}
module.exports.help = {
    "name": "purge",
    "description": "Deletes `x` amount of messages",
    "usage": "!purge <amount of messages>"
}