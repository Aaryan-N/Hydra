const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  Events,
} = require("discord.js");
const ticketSchema = require("../../schemas/ticketing/ticketSchema");
const errorEmbed = require("../../templates/embeds/errors/errorEmbed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createticket")
    .setDescription("Create a ticket for mods to review!"),
  async execute(interaction) {
    try {
      if (!interaction.inGuild()) {
        interaction.reply({
          content: "This command can only be run in servers!",
          ephemeral: true,
        });
        return;
      }

      let ticketingProfile = await ticketSchema.findOne({
        userId: interaction.member.id,
        guildId: interaction.guild.id,
      });

      const ticketingModal = new ModalBuilder()
        .setCustomId(`ticketModal`)
        .setTitle("Create a ticket for mods to review!");

      const ticketSubjectInput = new TextInputBuilder()
        .setCustomId("ticketInputSubject")
        .setLabel("Enter the subject of your ticket here!")
        .setStyle(TextInputStyle.Short);

      const ticketMainInput = new TextInputBuilder()
        .setCustomId("ticketInputMain")
        .setLabel("Enter the body of your ticket here!")
        .setStyle(TextInputStyle.Paragraph);

      const ticketSubjectInputActionRow = new ActionRowBuilder().addComponents(
        ticketSubjectInput,
      );
      const ticketMainInputActionRow = new ActionRowBuilder().addComponents(
        ticketMainInput,
      );

      ticketingModal.addComponents(
        ticketSubjectInputActionRow,
        ticketMainInputActionRow,
      );

      interaction.showModal(ticketingModal);

      let modalSubjectContent;
      let modalMainContent;

      const filter = (interaction) => interaction.customId === "ticketModal";
      interaction
        .awaitModalSubmit({ filter, time: 15_000 })
        .then((interaction) => {
          interaction.reply({
            content: "Your ticket was successfully created!",
            ephemeral: true,
          });
          modalSubjectContent =
            interaction.fields.getTextInputValue("ticketInputSubject");
          modalMainContent =
            interaction.fields.getTextInputValue("ticketInputMain");
        })
        .then(() => {
          ticketingProfile = new ticketSchema({
            userId: interaction.member.id,
            guildId: interaction.guild.id,
            ticketSubjectContent: modalSubjectContent,
            ticketBodyContent: modalMainContent,
            timeTicketCreated: interaction.createdAt,
          });
          ticketingProfile.save();
        })
        .catch(console.error);
    } catch (err) {
      console.error(
        "Something went badly wrong in the ticketing command. Here it is!" +
          err,
      );
      interaction.reply({ embeds: [errorEmbed] });
    }
  },
};