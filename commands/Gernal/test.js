const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('test').setDescription('Slash command handler test'),
    /**
     *
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async execute(interaction) {
        await interaction.reply({ content: `**Perfect!!**` });
    },
};
