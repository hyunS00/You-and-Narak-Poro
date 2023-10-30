const { SlashCommandBuilder } = require('discord.js');
const { setTier, updateTier, selectUserTier, deleteUserTier } = require('../../utils/tierUitils');

const userTierList_Schema = require('../../models/userTierList');

const data = new SlashCommandBuilder()
    .setName('내전티어')
    .setDescription('내전 티어와 관련한 명령어입니다')
    .addSubcommand((subcommand) =>
        subcommand
            .setName('설정')
            .setDescription('(관리자 명령어)티어를 설정합니다')
            .addUserOption((option) =>
                option
                    .setName('유저')
                    .setDescription('티어 설정할 유저를 선택해주세요')
                    .setRequired(true)
            )
            .addStringOption((f) => {
                return f
                    .setName('티어')
                    .setDescription('티어를 선택해주세요')
                    .setRequired(true)
                    .addChoices(
                        { name: '1티어', value: '1' },
                        { name: '2티어', value: '2' },
                        { name: '3티어', value: '3' },
                        { name: '4티어', value: '4' },
                        { name: '5티어', value: '5' }
                    );
            })
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName('삭제')
            .setDescription('(관리자 명령어)저장된 티어정보를 삭제합니다')
            .addStringOption((option) =>
                option
                    .setName('유저이름')
                    .setDescription('티어 삭제할 유저를 입력해주세요')
                    .setRequired(true)
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName('조정')
            .setDescription('(관리자 명령어)티어를 조정합니다')
            .addStringOption((f) =>
                f
                    .setName('옵션')
                    .setDescription('옵션을 선택해 주세요')
                    .setRequired(true)
                    .addChoices({ name: '상승', value: '상승' }, { name: '하락', value: '하락' })
            )
            .addUserOption((f) => {
                return f.setName('유저').setDescription('유저를 입력해주세요').setRequired(true);
            })
    );
// .addSubcommand((subcommand) =>
//     subcommand
//         .setName('조회')
//         .setDescription('티어를 조회합니다')
//         .addUserOption((f) => {
//             return f.setName('유저').setDescription('조회할 유저를 입력해주세요');
//         })
// );

module.exports = {
    data,
    /**
     *
     * @param {import("discord.js").ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        if (
            interaction.user.id === process.env.ADMINID ||
            interaction.user.id === process.env.DEVELOPERID
        ) {
            const option_user = interaction.options.getUser('유저');
            const command = interaction.options.getSubcommand();

            if (command === '삭제') {
                const option_userName = interaction.options.getString('유저이름');
                const deleteUser_find = await userTierList_Schema.findOne({
                    userName: option_userName,
                });
                deleteUserTier(interaction, deleteUser_find, userTierList_Schema, option_userName);
                return;
            }

            const userTierList_find = await userTierList_Schema.findOne({
                userid: option_user.id,
            });

            if (command === '설정') {
                const option_tier = interaction.options.getString('티어');
                setTier(
                    interaction,
                    option_user,
                    option_tier,
                    userTierList_find,
                    userTierList_Schema
                );
            } else if (command === '조정') {
                const option_option = interaction.options.getString('옵션');
                updateTier(
                    interaction,
                    option_option,
                    option_user,
                    userTierList_find,
                    userTierList_Schema
                );
            }
        } else {
            interaction.reply({
                content: '관리자만 실행할 수 있는 명령어입니다',
                ephemeral: true,
            });
        }
    },
};
