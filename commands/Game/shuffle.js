const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js');
const { shuffle } = require('../../utils/shuffle');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('팀원분배')
        .setDescription('팀원을 분배합니다')
        .addStringOption((f) =>
            f
                .setName('유저')
                .setDescription('유저1 유저2 유저3.... 식으로 적어주세요')
                .setRequired(true)
        )
        .addStringOption((f) =>
            f
                .setName('팀당분배인원')
                .setDescription(
                    'A인원 B인원... 예를 들어 13명을 4 4 5으로 분배하려면 4 4 5를 입력해주세요'
                )
                .setRequired(true)
        ),
    /**
     *
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async execute(interaction) {
        const option_users = interaction.options.getString('유저').split(' ');
        const option_teamsPlayersNum = interaction.options.getString('팀당분배인원').split(' ');
        const shuffleUsers = [];
        option_users.forEach((e) => {
            shuffleUsers.push(e);
        });
        shuffle(shuffleUsers);
        let fields = [];
        option_teamsPlayersNum.forEach((v, i) => {
            const teamMembers = shuffleUsers.splice(0, v);
            fields.push({
                name: `${i + 1}팀`,
                value: teamMembers.toString(),
                inline: true,
            });
        });

        const shuffleEmbed = new EmbedBuilder()
            .setColor(0x7cc9c5)
            .setTitle('🕹️ 팀원 분배')
            .addFields(
                { name: '\u200B', value: ' ' },
                { name: '🧑‍🦲 멤버', value: option_users.toString() },
                { name: '\u200B', value: ' ' },
                { name: '❓ 섞어 결과 ‼️', value: ' ' }
            );
        fields.forEach((f) => {
            shuffleEmbed.addFields(f);
        });

        const reShuffle = new ButtonBuilder()
            .setCustomId('retrySuffle')
            .setLabel('다시 섞기')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(reShuffle);

        const response = await interaction.reply({ embeds: [shuffleEmbed], components: [row] });

        const filter = (interaction) => {
            return interaction.customId === 'retrySuffle';
        };
        const collertor = interaction.channel.createMessageComponentCollector({
            filter,
            time: 60000 * 30,
        });
        try {
            collertor.on('collect', async (interaction) => {
                if (interaction.customId === 'retrySuffle') {
                    option_users.forEach((e) => {
                        shuffleUsers.push(e);
                    });
                    shuffle(shuffleUsers);
                    let fields = [];
                    option_teamsPlayersNum.forEach((v, i) => {
                        const teamMembers = shuffleUsers.splice(0, v);
                        fields.push({
                            name: `${i + 1}팀`,
                            value: teamMembers.toString(),
                            inline: true,
                        });
                    });

                    const reSuffleEmbed = new EmbedBuilder()
                        .setColor(0x7cc9c5)
                        .setTitle('🕹️ 팀원 분배')
                        .addFields(
                            { name: '\u200B', value: ' ' },
                            { name: '🧑‍🦲 멤버', value: option_users.toString() },
                            { name: '\u200B', value: ' ' },
                            { name: '❓ 섞어 결과 ‼️', value: ' ' }
                        );
                    fields.forEach((f) => {
                        reSuffleEmbed.addFields(f);
                    });
                    await interaction.update({ embeds: [reSuffleEmbed], components: [row] });
                }
            });
        } catch (e) {
            console.log(e);
        }
        return;
    },
};
