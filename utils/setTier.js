const axios = require('axios');

const { userMention } = require('discord.js');
const riotSearchIdURL = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/`;
const RIOTAPIKEY = process.env.RIOTAPIKEY;
module.exports = {
    // /**
    //  *
    //  * @param {import("discord.js").ChatInputCommandInteraction} interaction
    //  */
    async setTier(interaction, discordId, option_tier, userTierList_find, userTierList_Schema) {
        let nickname = interaction.member.nickname;
        let riotAccountId;
        console.log(discordId);
        await axios.get(`${riotSearchIdURL}${nickname}?api_key=${RIOTAPIKEY}`).then((response) => {
            riotAccountId = response.data.accountId;
        });
        if (userTierList_find) {
            await userTierList_Schema.updateOne(
                { riotAccountId },
                { userName: nickname, tier: option_tier }
            );
        } else {
            console.log(riotAccountId);
            await new userTierList_Schema({
                userid: discordId,
                userName: nickname,
                tier: option_tier,
                riotAccountId,
            }).save();
        }
        interaction.reply({
            content: `${userMention(discordId)}님의 티어를 
            ${option_tier}로 설정했습니다`,
            ephemeral: true,
        });
    },
};
