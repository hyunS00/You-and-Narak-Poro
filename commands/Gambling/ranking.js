// Copyright 2023 대찌 (자세한건 유튜브 채널 설명 확인)
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const gambling_Schema = require('../../models/gambling');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('순위')
        .setDescription('전체 도박 돈 순위를 보여줍니다'),
    /**
     *
     * @param {import("discord.js").ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const gambling_find = await gambling_Schema
            .find()
            .sort([['money', 'descending']])
            .limit(10)
            .exec();

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.client.user.username} 도박 순위 💸`)
            .setColor(0x7cc9c5)
            .setThumbnail(interaction.client.user.displayAvatarURL());

        for (let i = 0; i < gambling_find.length; i++) {
            const user = await interaction.client.users.fetch(gambling_find[i].userid);
            embed.addFields({
                name: `${i + 1}. ${user.username}`,
                value: `${interaction.client.user.username} 머니 : ${gambling_find[
                    i
                ].money.toLocaleString()}원`,
            });
        }

        interaction.reply({ embeds: [embed] });
    },
};
