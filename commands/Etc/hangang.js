const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getHanganData } = require('../../utils/getHangangData');

const data = new SlashCommandBuilder().setName('한강수온').setDescription('한강 수온을 체크합니다');

module.exports = {
    data,
    /**
     *
     * @param {import("discord.js").ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const hangangData = await getHanganData();
        if (hangangData.STATUS == 'OK') {
            const embed = new EmbedBuilder()
                .setTitle('한강 수온')
                .setDescription(`${hangangData.DATAs.DATA.HANGANG['탄천'].TEMP}도! 따뜻하네요?`)
                .setFooter({
                    text: `측정시간: ${hangangData.DATAs.DATA.HANGANG['탄천'].LAST_UPDATE}\n측정장소: 탄천`,
                })
                .setColor(0x7cc9c5);

            interaction.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setTitle('한강 수온')
                .setDescription(`데이터 로드 오류`)
                .setColor(0x7cc9c5);

            interaction.reply({ embeds: [embed] });
        }
    },
};
