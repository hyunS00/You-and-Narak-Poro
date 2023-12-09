const { Schema, model } = require('mongoose');

const schemaF = new Schema({
    userid: String,
    guildid: String,
    userName: String,
    money: Number,
    cooltime: Number,
});

module.exports = model('Gambling', schemaF);
