const { Schema, model } = require('mongoose');

const schema = new Schema({
    userName: String,
    userid: String,
    tier: String,
});

module.exports = model('userTierList', schema);
