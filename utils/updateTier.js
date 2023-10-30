const { SlashCommandBuilder, userMention } = require('discord.js');

// const commandBuilder = new SlashCommandBuilder()
//     .setName('내전티어조정')
//     .setDescription('티어 조정에 관한 명령어')
//     .addStringOption((f) =>
//         f
//             .setName('옵션')
//             .setDescription('옵션을 선택해 주세요')
//             .setRequired(true)
//             .addChoices({ name: '상승', value: '상승' }, { name: '하락', value: '하락' })
//     )
//     .addUserOption((f) => {
//         return f.setName('유저').setDescription('유저를 입력해주세요').setRequired(true);
//     });
module.exports = {
    // // data: commandBuilder,
    // /**
    //  *
    //  * @param {import("discord.js").ChatInputCommandInteraction} interaction
    //  */
    async updateTier(
        interaction,
        option_option,
        option_user,
        userTierList_find,
        userTierList_Schema
    ) {
        let userTier = userTierList_find.tier * 1;
        if (option_option == '상승') {
            if (userTierList_find) {
                if (userTier > 1) {
                    await userTierList_Schema.updateOne(
                        { userid: option_user.id },
                        { userName: option_user.displayName, tier: --userTier }
                    );
                    interaction.reply({
                        content: `${userMention(option_user.id)}님의 티어를 ${
                            userTierList_find.tier
                        }에서${userTier}로 조정했습니다`,
                        ephemeral: true,
                    });
                } else {
                    interaction.reply({
                        content: `${userMention(option_user.id)}님의 티어 ${
                            userTierList_find.tier
                        }가 최고점입니다`,
                        ephemeral: true,
                    });
                }
            } else {
                interaction.reply({
                    content: `${userMention(option_user.id)}님의 티어 정보가 존재하지 않습니다`,
                    ephemeral: true,
                });
            }
        } else if (option_option == '하락') {
            if (userTierList_find) {
                if (userTier < 5) {
                    await userTierList_Schema.updateOne(
                        { userid: option_user.id },
                        { userName: option_user.displayName, tier: --userTier }
                    );
                    interaction.reply({
                        content: `${userMention(option_user.id)}님의 티어를 ${
                            userTierList_find.tier
                        }에서${userTier}로 조정했습니다`,
                        ephemeral: true,
                    });
                } else {
                    interaction.reply({
                        content: `${userMention(option_user.id)}님의 티어 ${
                            userTierList_find.tier
                        }를 더이상 낮출 수 없습니다`,
                        ephemeral: true,
                    });
                }
            } else {
                interaction.reply({
                    content: `${userMention(option_user.id)}님의 티어 정보가 존재하지 않습니다`,
                    ephemeral: true,
                });
            }
        }
    },
};
