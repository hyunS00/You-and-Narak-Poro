const { SlashCommandBuilder, userMention } = require('discord.js');
const userTierList_Schema = require('../../models/userTierList');
const { isHangul } = require('hangul-util');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('내전용팀원분배')
        .setDescription('내전용 팀원을 분배합니다')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('2팀분배')
                .setDescription('2개의 팀으로 분배합니다')
                .addUserOption((option) =>
                    option
                        .setName('유저1')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저2')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저3')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저4')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저5')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저6')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저7')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저8')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저9')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저10')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('3팀분배')
                .setDescription('2개의 팀으로 분배합니다')
                .addUserOption((option) =>
                    option
                        .setName('유저1')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저2')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저3')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저4')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저5')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저6')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저7')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저8')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저9')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저10')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저11')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저12')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저13')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저14')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('유저15')
                        .setDescription('티어 설정할 유저를 선택해주세요')
                        .setRequired(true)
                )
        ),
    /**
     *
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async execute(interaction) {
        const command = interaction.options.getSubcommand();

        let personnel = 10;
        if (command == '3팀분배') personnel = 15;
        const option_users = [];
        for (let i = 1; i < personnel + 1; i++) {
            const user = interaction.options.getUser(`유저${i}`);
            option_users.push(user);
        }

        console.log('유저', option_users);
        const userList = [];
        const errorUserList = [];
        for (let i = 0; i < personnel; i++) {
            const userFind = await userTierList_Schema.findOne({ userid: option_users[i].id });
            if (userFind) {
                userList.push(userFind);
            } else {
                errorUserList.push(userMention(option_users[i]));
            }
        }
        console.log('에러멤버', errorUserList);
        console.log(userList);
        userList.sort((a, b) => {
            if (a.tier === b.tier) {
                const upperCaseA = a.userName.toUpperCase();
                const upperCaseB = b.userName.toUpperCase();
                if (isHangul(upperCaseA) && !isHangul(upperCaseB)) return -1;
                if (!isHangul(upperCaseA) && isHangul(upperCaseB)) return 1;
                if (upperCaseA > upperCaseB) return 1;
                if (upperCaseA < upperCaseB) return -1;
                if (upperCaseA === upperCaseB) return 0;
            }
            return a.tier - b.tier;
        });
        // userList[4], userList[7], userList[8]
        // userList[5], userList[6], userList[9]
        if (command === '2팀분배') {
            const team1 = [userList[0], userList[3], userList[4], userList[7], userList[8]];
            const team2 = [userList[1], userList[2], userList[5], userList[6], userList[9]];
            interaction.reply({
                content: `🕹️ 내전 팀원 분배 🕹️
                😮 멤버 : ${userMention(userList[0].userid)}${userList[0].tier}, 
                ${userMention(userList[1].userid)}${userList[1].tier}, 
                ${userMention(userList[2].userid)}${userList[2].tier}, 
                ${userMention(userList[3].userid)}${userList[3].tier}, 
                ${userMention(userList[4].userid)}${userList[4].tier}, 
                ${userMention(userList[5].userid)}${userList[5].tier}, 
                ${userMention(userList[6].userid)}${userList[6].tier}, 
                ${userMention(userList[7].userid)}${userList[7].tier}, 
                ${userMention(userList[8].userid)}${userList[8].tier}, 
                ${userMention(userList[9].userid)}${userList[9].tier}
                \n\n🔴 1팀:\n ${userMention(team1[0].userid)}${team1[0].tier} ${userMention(
                    team1[1].userid
                )}${team1[1].tier} ${userMention(team1[2].userid)}${team1[2].tier} ${userMention(
                    team1[3].userid
                )}${team1[3].tier} ${userMention(team1[4].userid)}${team1[4].tier}
                \n\n🔵 2팀:\n ${userMention(team2[0].userid)}${team2[0].tier} ${userMention(
                    team2[1].userid
                )}${team2[1].tier} ${userMention(team2[2].userid)}${team2[2].tier} ${userMention(
                    team2[3].userid
                )}${team2[3].tier} ${userMention(team2[4].userid)}${team2[4].tier}
                \n\n누락 : ${errorUserList}`,
            });
        } else if (command === '3팀분배') {
            const team1 = [userList[0], userList[5], userList[6], userList[11], userList[12]];
            const team2 = [userList[1], userList[4], userList[7], userList[10], userList[13]];
            const team3 = [userList[2], userList[3], userList[8], userList[9], userList[14]];
            interaction.reply({
                content: `🕹️ 내전 팀원 분배 🕹️
                😮 멤버 : ${userMention(userList[0].userid)}${userList[0].tier}, 
                ${userMention(userList[1].userid)}${userList[1].tier}, 
                ${userMention(userList[2].userid)}${userList[2].tier}, 
                ${userMention(userList[3].userid)}${userList[3].tier}, 
                ${userMention(userList[4].userid)}${userList[4].tier}, 
                ${userMention(userList[5].userid)}${userList[5].tier}, 
                ${userMention(userList[6].userid)}${userList[6].tier}, 
                ${userMention(userList[7].userid)}${userList[7].tier}, 
                ${userMention(userList[8].userid)}${userList[8].tier}, 
                ${userMention(userList[9].userid)}${userList[9].tier},
                ${userMention(userList[10].userid)}${userList[10].tier},
                ${userMention(userList[11].userid)}${userList[11].tier},
                ${userMention(userList[12].userid)}${userList[12].tier},
                ${userMention(userList[13].userid)}${userList[13].tier}
                ${userMention(userList[14].userid)}${userList[14].tier}
                \n\n🔴 1팀:\n ${userMention(team1[0].userid)}${team1[0].tier} ${userMention(
                    team1[1].userid
                )}${team1[1].tier} ${userMention(team1[2].userid)}${team1[2].tier} ${userMention(
                    team1[3].userid
                )}${team1[3].tier} ${userMention(team1[4].userid)}${team1[4].tier}
                \n\n🔵 2팀:\n ${userMention(team2[0].userid)}${team2[0].tier} ${userMention(
                    team2[1].userid
                )}${team2[1].tier} ${userMention(team2[2].userid)}${team2[2].tier} ${userMention(
                    team2[3].userid
                )}${team2[3].tier} ${userMention(team2[4].userid)}${team2[4].tier}
                \n\n🟣 3팀:\n ${userMention(team3[0].userid)}${team3[0].tier} ${userMention(
                    team3[1].userid
                )}${team3[1].tier} ${userMention(team3[2].userid)}${team3[2].tier} ${userMention(
                    team3[3].userid
                )}${team3[3].tier} ${userMention(team3[4].userid)}${team3[4].tier}
                \n\n누락 : ${errorUserList}`,
            });
        }
    },
};
