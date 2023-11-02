const axios = require('axios');

const { userMention } = require('discord.js');
const riotSearchIdURL = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/`;
const RIOTAPIKEY = process.env.RIOTAPIKEY;
module.exports = {
    async setTierAll(interaction, data, userTierList_Schema) {
        const splitArr = data.split(' ');
        splitArr.forEach((str, i, arr) => {
            arr[i] = str.split('\t');
        });
        console.log(splitArr);
        const riotAccountId = [];
        for (let i = 0; i < splitArr.length; i++) {
            await axios
                .get(`${riotSearchIdURL}${splitArr[i][0]}?api_key=${RIOTAPIKEY}`)
                .then((response) => {
                    riotAccountId.push(response.data.accountId);
                });
        }
        const noData = [];
        for (let i = 0; i < splitArr.length; i++) {
            const userFind = await userTierList_Schema.findOne({
                riotAccountId: riotAccountId[i],
            });
            if (userFind) {
                await userTierList_Schema.updateOne({ riotAccountId }, { tier: splitArr[i][2] });
            } else {
                noData.push(splitArr[i][0]);
            }
        }
        interaction.reply({
            content: `등록 안된 유저: ${noData}`,
            ephemeral: true,
        });
    },
};
