const axios = require('axios');

const { userMention } = require('discord.js');
const riotSearchIdURL = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/`;
const RIOTAPIKEY = process.env.RIOTAPIKEY;
module.exports = {
    // /**
    //  *
    //  * @param {import("discord.js").ChatInputCommandInteraction} interaction
    //  */
    async setTier(
        interaction,
        discordId,
        option_tier,
        userTierList_find,
        userTierList_Schema,
        username
    ) {
        let riotAccountId;
        let nickname;
        if (userTierList_find) {
            nickname = userTierList_find.userName;
            console.log(userTierList_find);
        } else {
            nickname = username;
        }
        await axios
            .get(`${riotSearchIdURL}${nickname.split(' ').join('')}?api_key=${RIOTAPIKEY}`)
            .then((response) => {
                riotAccountId = response.data.accountId;
                nickname = response.data.name;
            })
            .catch((error) => {
                // console.log(error);
                interaction.reply({
                    content: `${userMention(discordId)}데이터 저장이 안됐습니다`,
                    ephemeral: true,
                });
                return;
            });

        if (userTierList_find) {
            nickname = userTierList_find.userName;
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
