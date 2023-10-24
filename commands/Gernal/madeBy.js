const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('만든사람').setDescription('누가 만들었을까요??'),
    /**
     *
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async execute(interaction) {
        await interaction.reply({ content: `made by 전산분대장 🤭` });
    },
};
