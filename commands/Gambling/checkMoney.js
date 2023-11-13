const { SlashCommandBuilder } = require('discord.js');
const gambling_Schema = require('../../models/gambling');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('잔액확인').setDescription('내 잔액을 확인합니다'),

    /**
     *
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async execute(interaction) {
        const gambling_find = await gambling_Schema.findOne({ userid: interaction.user.id });

        if (!gambling_find) {
            interaction.reply({ content: `데이터가 존재하지 않습니다` });
            return;
        }

        const embed = new EmbedBuilder()
            .setDescription(
                `**${interaction.user}님의 잔액은${gambling_find.money.toLocaleString()}원이에요**`
            )
            .setColor(0x7cc9c5);

        interaction.reply({ embeds: [embed] });
    },
};
