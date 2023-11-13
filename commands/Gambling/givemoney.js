const { SlashCommandBuilder } = require('discord.js');
const gambling_Schema = require('../../models/gambling');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('돈줘').setDescription('돈을 받습니다'),

    /**
     *
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async execute(interaction) {
        const gambling_find = await gambling_Schema.findOne({ userid: interaction.user.id });

        if (gambling_find) {
            const canGiveTime = gambling_find.cooltime + 360 * 60 * 1000;

            if (canGiveTime > Date.now()) {
                interaction.reply({
                    content: `돈을 너무 빨리 받고 있어요\n(<t:${Math.round(
                        canGiveTime / 1000
                    )}:R>)`,
                });
            }
            return;
        }

        await gambling_Schema.updateOne(
            { userid: interaction.user.id },
            { money: (gambling_find?.money || 0) + 10000, cooltime: Date.now() },
            { upsert: true }
        );

        const embed = new EmbedBuilder()
            .setDescription(`** 돈을 드렸어요 \n잔액${(gambling_find?.money || 0) + 10000}원**`)
            .setColor(0x7cc9c5);

        interaction.reply({ embeds: [embed] });
    },
};
