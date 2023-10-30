const { userMention } = require('discord.js');

module.exports = {
    // /**
    //  *
    //  * @param {import("discord.js").ChatInputCommandInteraction} interaction
    //  */
    async selectUserTier(interaction, option_userName) {
        if (userTierList_find) {
            interaction.reply({
                content: `${userMention(option_user.id)}님의 티어는 
                ${userTierList_find.tier}입니다`,
                ephemeral: true,
            });
        } else {
            interaction.reply({
                content: `${userMention(option_user.id)}님의 티어정보가 존재하지 않아요`,
                ephemeral: true,
            });
        }
    },
};
