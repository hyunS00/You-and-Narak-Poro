const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const data = new SlashCommandBuilder().setName('한강수온').setDescription('한강 수온을 체크합니다');

async function getHanganData() {
    try {
        const hangangData = await fetch('http://hangang.dkserver.wo.tc');
        return hangangData.json();
    } catch (error) {
        console.error('Error fetching champion data:', error);
        throw error; // Rethrow the error to handle it further, if needed.
    }
}

module.exports = {
    data,
    /**
     *
     * @param {import("discord.js").ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const hangangData = await getHanganData();
        const time = hangangData.time.split(' ');
        if (hangangData.result == 'true') {
            const embed = new EmbedBuilder()
                .setTitle('한강 수온')
                .setDescription(`${hangangData.temp}도! 따뜻하네요?`)
                .setFooter({ text: `측정시간: ${time[0]} ${time[1]}` })
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
