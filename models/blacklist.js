const { Schema, model } = require('mongoose');

const schema = new Schema({
    userid: String,
    reason: String,
});

module.exports = model('Blacklist', schema);
