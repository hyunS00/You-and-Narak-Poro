const { SlashCommandBuilder, MessageMentions } = require('discord.js');
const gambling_Schema = require('../../models/gambling');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('돈주기')
        .setDescription('돈을 다른 유저에게 송금합니다')
        .addUserOption((option) =>
            option
                .setName('송금할유저')
                .setDescription('송금할 유저를 선택해주세요')
                .setRequired(true)
        )
        .addIntegerOption((f) =>
            f.setName('송금금액').setDescription('송금할 금액을 선택해주세요').setRequired(true)
        ),

    /**
     *
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async execute(interaction) {
        const option_user = interaction.options.getUser('송금할유저');
        const sendMoney = interaction.options.getInteger('송금금액', true);
        console.log(option_user);
        const Remittance_gambling_find = await gambling_Schema.findOne({
            userid: interaction.user.id,
        });
        const Deposit_gambling_find = await gambling_Schema.findOne({ userid: option_user.id });

        if (!Deposit_gambling_find || !Remittance_gambling_find) {
            interaction.reply({ content: `유저 데이터가 존재하지 않습니다` });
            return;
        }
        if (Remittance_gambling_find.money < sendMoney) {
            interaction.reply({
                content: `잔액이 부족해요ㅜㅜ\n 현재 잔액: ${Remittance_gambling_find.money}`,
            });
            return;
        }

        await gambling_Schema.updateMany(
            { userid: interaction.user.id },
            { money: Remittance_gambling_find.money - sendMoney }
        );

        await gambling_Schema.updateMany(
            { userid: option_user.id },
            { money: Deposit_gambling_find.money + sendMoney }
        );

        const embed = new EmbedBuilder()
            .setTitle('돈 주기')
            .setDescription(
                `${interaction.user}님이 ${option_user}님에게 💵${sendMoney}원을 송금했어요!`
            )
            .setColor(0x7cc9c5);

        interaction.reply({ embeds: [embed] });
    },
};
