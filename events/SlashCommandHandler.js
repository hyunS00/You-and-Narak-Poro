const { ChannelType } = require('discord.js');
const client = require('../index');
// const blacklist_Schema = require('../models/blacklist');

module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     *
     * @param {import ("discord.js").Interaction} interaction
     */
    async execute(interaction) {
        if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand()) return;
        if (interaction.channel.type == ChannelType.DM) return;
        const command = client.commands.get(interaction.commandName);
        console.log('커멘드', command);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.log(error);
        }
    },
};
