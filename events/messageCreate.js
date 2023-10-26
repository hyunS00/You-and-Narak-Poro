module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.content == '포로야') {
            message.reply({ content: `핫 둘 셋 넷 😽` });
        }
    },
};
