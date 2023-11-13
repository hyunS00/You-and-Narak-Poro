const { Schema, model } = require('mongoose');

const schemaF = new Schema({
    userid: String,
    money: Number,
    cooltime: Number,
});

module.exports = model('Gambling', schemaF);
