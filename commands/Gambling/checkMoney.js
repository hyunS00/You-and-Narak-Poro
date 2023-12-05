const { SlashCommandBuilder } = require('discord.js');
const gambling_Schema = require('../../models/gambling');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('도박잔액확인')
        .setDescription('내 잔액을 확인합니다')
        .addUserOption((option) =>
            option
                .setName('확인할유저')
                .setDescription('잔액 확인할 유저를 선택합니다')
                .setRequired(true)
        ),

    /**
     *
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async execute(interaction) {
        const option_user = interaction.options.getUser('확인할유저');
        let userid;
        if (option_user) {
            userid = option_user.id;
        } else {
            userid = interaction.user.id;
        }
        const gambling_find = await gambling_Schema.findOne({ userid });

        if (!gambling_find) {
            interaction.reply({ content: `데이터가 존재하지 않습니다` });
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle('💰잔액 확인')
            .setDescription(
                `💳${interaction.user}님의 잔액: ${gambling_find.money.toLocaleString()}원`
            )
            .setColor(0x7cc9c5);

        interaction.reply({ embeds: [embed] });
    },
};
