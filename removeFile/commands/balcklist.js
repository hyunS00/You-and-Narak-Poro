const { SlashCommandBuilder } = require('discord.js');
const blacklist_Schema = require('../../models/blacklist');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('블랙리스트')
        .setDescription('유저를 블랙리스트에 추가하거나 제거해요')
        .addStringOption((f) =>
            f
                .setName('옵션')
                .setDescription('옵션을 선택해 주세요')
                .setRequired(true)
                .addChoices({ name: '추가', value: '추가' }, { name: '제거', value: '제거' })
        )
        .addUserOption((f) =>
            f.setName('유저').setDescription('유저를 입력해주세요').setRequired(true)
        )
        .addStringOption((f) =>
            f.setName('사유').setDescription('사유를 입력해 주세요').setRequired(true)
        ),
    /**
     *
     * @param {import("discord.js").ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        if (interaction.user.id !== '385259208968241153') {
            console.log('들어옴');
            return interaction.reply({
                ephemeral: true,
                content: `**어딜 관리자를 벤하려고 해?!!**`,
            });
        }
        const option_option = interaction.options.getString('옵션');

        const option_user = interaction.options.getUser('유저');

        const option_reason = interaction.options.getString('사유');

        if (option_option == '추가') {
            const blacklist_find = await blacklist_Schema.findOne({ userid: option_user.id });

            if (blacklist_find) {
                await blacklist_Schema.updateOne(
                    { userid: option_user.id },
                    { reason: option_reason }
                );
            } else {
                await new blacklist_Schema({
                    userid: option_user.id,
                    reason: option_reason,
                }).save();
            }
            interaction.reply({
                content: `블랙리스트에 추가가 완료되었습니다.`,
                ephemeral: true,
            });
            return;
        }

        if (option_option == '삭제') {
            const blacklist_find = await blacklist_Schema.findOne({ userid: option_user.id });
            console.log('들어옴');
            if (!blacklist_find) {
                return interaction.reply({
                    ephemeral: true,
                    content: `**${option_option} 님은 블랙리스트가 아닙니다**`,
                });
            }

            await blacklist_Schema.deleteOne({ userid: option_user.id });

            interaction.reply({
                content: `블랙리스트에서 삭제가 완료되었습니다.`,
                ephemeral: true,
            });
            return;
        }
    },
};
