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
        const riotData = [];
        for (let i = 0; i < splitArr.length; i++) {
            await axios
                .get(`${riotSearchIdURL}${splitArr[i][0]}?api_key=${RIOTAPIKEY}`)
                .then((response) => {
                    riotData.push({ id: response.data.accountId, name: response.data.name });
                });
        }
        const noData = [];
        for (let i = 0; i < splitArr.length; i++) {
            const userFind = await userTierList_Schema.findOne({
                riotAccountId: riotData[i].id,
            });
            if (userFind) {
                await userTierList_Schema.updateOne(
                    { riotAccountId: riotData[i].id },
                    { tier: splitArr[i][2], userName: riotData.name }
                );
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
