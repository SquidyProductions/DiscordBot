let mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    id: String,
    coins: Number
})
module.exports = mongoose.model("playerdata", playerSchema)