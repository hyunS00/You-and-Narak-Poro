const { userMention } = require('discord.js');

module.exports = {
    async deleteUserTier(interaction, userTierList_find, userTierList_Schema, option_userName) {
        if (userTierList_find) {
            try {
                await userTierList_Schema.deleteOne({ userid: userTierList_find.userid });
                interaction.reply({
                    content: `${userMention(
                        userTierList_find.userid
                    )}님의 티어 데이터를 삭제했습니다`,
                    ephemeral: true,
                });
            } catch {
                interaction.reply({
                    content: `${userMention(
                        userTierList_find.userid
                    )}님의 티어 데이터를 삭제하지 못했습니다 문의주세용`,
                    ephemeral: true,
                });
            }
        } else {
            interaction.reply({
                content: `${option_userName}님의 티어정보가 존재하지 않아요`,
                ephemeral: true,
            });
        }
    },
};
