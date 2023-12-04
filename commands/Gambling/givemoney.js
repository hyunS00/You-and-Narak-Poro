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
        // const moneyTsble = [30000, 30000, 30000, 35000, 35000, 40000, 40000, 50000];
        const min = 0;
        const max = 8;
        // const money = moneyTsble[Math.floor(Math.random() * (max - min) + min)];
        const money = 50000;
        if (gambling_find) {
            const canGiveTime = gambling_find.cooltime + 180 * 60 * 1000;

            if (canGiveTime > Date.now()) {
                interaction.reply({
                    content: `돈을 너무 빨리 받고 있어요\n(<t:${Math.round(
                        canGiveTime / 1000
                    )}:R>)`,
                });
                return;
            }
        }

        await gambling_Schema.updateOne(
            { userid: interaction.user.id },
            { money: (gambling_find?.money || 0) + money, cooltime: Date.now() },
            { upsert: true }
        );

        const embed = new EmbedBuilder()
            .setTitle('돈 줘')
            .setDescription(
                `** 💵${money}원을 드렸어요 \n💰잔액${(gambling_find?.money || 0) + money}원**`
            )
            .setColor(0x7cc9c5);

        interaction.reply({ embeds: [embed] });
    },
};
