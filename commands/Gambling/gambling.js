const { SlashCommandBuilder } = require('discord.js');
const gambling_Schema = require('../../models/gambling');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('도박')
        .setDescription('돈을 걸고 도박을 합니다')
        .addIntegerOption((f) =>
            f.setName('베팅금').setDescription('베팅하실 금액을 입력해 주세요').setRequired(true)
        ),
    /**
     *
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async execute(interaction) {
        const bettingMoney = interaction.options.getInteger('베팅금', true);
        const gambling_find = await gambling_Schema.findOne({ userid: interaction.user.id });

        if (!gambling_find) {
            interaction.reply({ content: `데이터가 존재하지 않습니다` });
            return;
        }
        if (gambling_find.money < bettingMoney) {
            interaction.reply({ content: '잔액이 부족해요ㅜㅜ' });
            return;
        }
        const random_number = Math.round(Math.random() * 100);
        const win_standard = Math.round(Math.random() * 100);

        if (win_standard > random_number) {
            await gambling_Schema.updateMany(
                { userid: interaction.user.id },
                { money: gambling_find.money + bettingMoney }
            );
            const embed = new EmbedBuilder()
                .setTitle('이겼어요!')
                .setDescription(
                    `** 이길확률\n${win_standard}%에서 승리했어요|\n+${bettingMoney}\n 현재 잔액: ${
                        gambling_find.money + bettingMoney
                    }원**`
                )
                .setColor(0x7cc9c5);
            interaction.reply({ embeds: [embed] });
        } else {
            await gambling_Schema.updateMany(
                { userid: interaction.user.id },
                { money: gambling_find.money - bettingMoney }
            );
            const embed = new EmbedBuilder()
                .setTitle('졌어요ㅜㅜ!')
                .setDescription(
                    `** 이길확률\n${win_standard}%에서 패배했어요..\n-${bettingMoney}\n현재 잔액: ${
                        gambling_find.money - bettingMoney
                    }원**`
                )
                .setColor(0x7cc9c5);
            interaction.reply({ embeds: [embed] });
        }
    },
};
