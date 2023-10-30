const { userMention } = require('discord.js');

module.exports = {
    // /**
    //  *
    //  * @param {import("discord.js").ChatInputCommandInteraction} interaction
    //  */
    async setTier(interaction, option_user, option_tier, userTierList_find, userTierList_Schema) {
        if (userTierList_find) {
            await userTierList_Schema.updateOne(
                { userid: option_user.id },
                { userName: option_user.displayName, tier: option_tier }
            );
        } else {
            await new userTierList_Schema({
                userid: option_user.id,
                userName: option_user.displayName,
                tier: option_tier,
            }).save();
        }
        console.log(interaction.user);
        interaction.reply({
            content: `${userMention(option_user.id)}님의 티어를 
            ${option_tier}로 설정했습니다`,
            ephemeral: true,
        });
    },
};
