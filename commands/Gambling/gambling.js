const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const gambling_Schema = require("../../models/gambling");
const { EmbedBuilder } = require("@discordjs/builders");
const { shuffle } = require("../../utils/shuffle");
const { throttle } = require("../../utils/throttle");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("야바위")
    .setDescription("돈을 걸고 도박을 합니다")
    .addIntegerOption((f) =>
      f
        .setName("베팅금")
        .setDescription("베팅하실 금액을 입력해 주세요")
        .setRequired(true)
    ),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {
    if (throttle()) {
      interaction.reply({
        content: `너무 빨리 실행하고 있어요 머리 좀 식히세요..!`,
      });
      return;
    }

    const bettingMoney = interaction.options.getInteger("베팅금", true);
    const gambling_find = await gambling_Schema.findOne({
      userid: interaction.user.id,
      guildid: interaction.guildId,
    });

    if (bettingMoney <= 0) {
      interaction.reply({
        content: `${bettingMoney}원 도박하는건 무슨 심보?`,
      });
      return;
    }

    if (!gambling_find) {
      interaction.reply({ content: `데이터가 존재하지 않습니다` });
      return;
    }
    if (gambling_find.money < bettingMoney) {
      interaction.reply({
        content: `잔액이 부족해요ㅜㅜ\n 현재 잔액: ${gambling_find.money.toLocaleString()}`,
      });
      return;
    }

    const max = 10;
    const min = 0;
    const randomArr = [1, 1, 1, 1, 1, 2, 2, 2, 2, 3];
    const randomIndex = Math.floor(Math.random() * (max - min) + min);
    const random = randomArr[randomIndex];

    const buttonActionRow = new ActionRowBuilder({ components: [] });
    const answerArr = ["true"];
    for (let i = 0; i < random; i++) {
      answerArr.push(`false${i}`);
    }
    shuffle(answerArr);
    console.log(answerArr);
    const date = new Date();
    for (let i = 0; i <= random; i++) {
      const btn = new ButtonBuilder()
        .setCustomId(`${interaction.user.id}${answerArr[i]}${date}`)
        .setLabel(`${i + 1}`)
        .setStyle(ButtonStyle.Primary);
      buttonActionRow.addComponents(btn);
    }

    const embed = new EmbedBuilder()
      .setTitle("🎲 야바위 도박")
      .setDescription(
        `버튼 하나를 클릭해주세요 \n제한시간: 20초\n 확률: ${Math.floor(
          100 / (random + 1)
        )}%\n 베팅전 잔액: ${gambling_find.money.toLocaleString()} \n 베팅금액: ${bettingMoney.toLocaleString()}원 성공하면 ${
          random + 1
        }배!`
      )
      .setColor(0x7cc9c5);
    interaction.reply({ embeds: [embed], components: [buttonActionRow] });

    const filter = (interaction) => {
      return (
        interaction.customId === `${interaction.user.id}true${date}` ||
        interaction.customId === `${interaction.user.id}false0${date}` ||
        interaction.customId === `${interaction.user.id}false1${date}` ||
        interaction.customId === `${interaction.user.id}false2${date}` ||
        interaction.customId === `${interaction.user.id}false3${date}` ||
        interaction.customId === `${interaction.user.id}false4${date}`
      );
    };

    const collertor = interaction.channel.createMessageComponentCollector({
      filter,
      time: 20000,
    });

    collertor.on("collect", async (interaction) => {
      if (interaction.customId === `${interaction.user.id}true${date}`) {
        buttonActionRow.components.forEach((obj) => {
          if (obj.data.custom_id === `${interaction.user.id}true${date}`) {
            obj.setStyle(ButtonStyle.Success).setDisabled(true);
          } else {
            obj.setStyle(ButtonStyle.Danger).setDisabled(true);
          }
        });
        const gambling_find = await gambling_Schema.findOne({
          userid: interaction.user.id,
          guildid: interaction.guildId,
        });
        const winEmbed = new EmbedBuilder()
          .setTitle("성공했어요!")
          .setDescription(
            `확률: ${Math.floor(
              100 / (random + 1)
            )}%에서 승리했어요!\n💰💰💰💰+${(
              bettingMoney * random
            ).toLocaleString()}\n 현재 잔액: ${(
              gambling_find.money +
              bettingMoney * random
            ).toLocaleString()}`
          )
          .setColor(0x7cc9c5);

        await gambling_Schema.updateMany(
          { userid: interaction.user.id, guildid: interaction.guildId },
          { money: gambling_find.money + bettingMoney * random }
        );
        interaction.update({
          embeds: [winEmbed],
          components: [buttonActionRow],
        });
      } else if (
        interaction.customId === `${interaction.user.id}false0${date}` ||
        interaction.customId === `${interaction.user.id}false1${date}` ||
        interaction.customId === `${interaction.user.id}false2${date}` ||
        interaction.customId === `${interaction.user.id}false3${date}` ||
        interaction.customId === `${interaction.user.id}false4${date}`
      ) {
        buttonActionRow.components.forEach((obj) => {
          if (obj.data.custom_id === `${interaction.user.id}true${date}`) {
            obj.setStyle(ButtonStyle.Success).setDisabled(true);
          } else {
            obj.setStyle(ButtonStyle.Danger).setDisabled(true);
          }
        });
        const gambling_find = await gambling_Schema.findOne({
          userid: interaction.user.id,
          guildid: interaction.guildId,
        });
        const lossEmbed = new EmbedBuilder()
          .setTitle("졌어요ㅜㅜ!")
          .setDescription(
            `확률: ${Math.floor(
              100 / (random + 1)
            )}%에서에서 패배했어요..\n-${bettingMoney.toLocaleString()}\n현재 잔액: ${(
              gambling_find.money - bettingMoney
            ).toLocaleString()}원`
          )
          .setColor(0x7cc9c5);

        await gambling_Schema.updateMany(
          { userid: interaction.user.id, guildid: interaction.guildId },
          { money: gambling_find.money - bettingMoney }
        );
        interaction.update({
          embeds: [lossEmbed],
          components: [buttonActionRow],
        });
      }
    });
  },
};
