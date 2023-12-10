const { SlashCommandBuilder, MessageMentions } = require('discord.js');
const gambling_Schema = require('../../models/gambling');
const { EmbedBuilder } = require('@discordjs/builders');
const { throttle } = require('../../utils/throttle');

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
        if (throttle()) {
            interaction.reply({
                content: `너무 빨리 실행하고 있어요 머리 좀 식히세요..!`,
            });
            return;
        }
        const option_user = interaction.options.getUser('송금할유저');
        if (option_user.id === interaction.user.id) {
            interaction.reply({ content: `버그 악용을 하려고해?! 예끼 이놈아😾` });
            return;
        }
        const sendMoney = interaction.options.getInteger('송금금액', true);
        console.log(option_user);
        const Remittance_gambling_find = await gambling_Schema.findOne({
            userid: interaction.user.id,
            guildid: interaction.guildId,
        });
        const Deposit_gambling_find = await gambling_Schema.findOne({
            userid: option_user.id,
            guildid: interaction.guildId,
        });

        if (!Deposit_gambling_find || !Remittance_gambling_find) {
            interaction.reply({ content: `유저 데이터가 존재하지 않습니다` });
            return;
        }
        if (Remittance_gambling_find.money < sendMoney) {
            interaction.reply({
                content: `잔액이 부족해요ㅜㅜ\n 현재 잔액: ${Remittance_gambling_find.money.toLocaleString()}`,
            });
            return;
        }

        await gambling_Schema.updateMany(
            { userid: interaction.user.id, guildid: interaction.guildId },
            { money: Remittance_gambling_find.money - sendMoney }
        );

        await gambling_Schema.updateMany(
            { userid: option_user.id, guildid: interaction.guildId },
            { money: Deposit_gambling_find.money + sendMoney }
        );

        const embed = new EmbedBuilder()
            .setTitle('돈 주기')
            .setDescription(
                `${
                    interaction.user
                }님이 ${option_user}님에게 💵${sendMoney.toLocaleString()}원을 송금했어요!`
            )
            .setColor(0x7cc9c5);

        interaction.reply({ embeds: [embed] });
    },
};
