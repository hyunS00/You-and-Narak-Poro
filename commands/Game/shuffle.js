const { SlashCommandBuilder } = require('discord.js');
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
        let ans = '';
        option_teamsPlayersNum.forEach((v, i) => {
            ans += `${i + 1}팀: ${shuffleUsers.splice(0, v)}\n`;
        });

        await interaction.reply({
            content: `유저: ${option_users}\n팀당 분배 인원: ${option_teamsPlayersNum}\n\n----셔플 결과----\n${ans}`,
        });
        return;
    },
};
