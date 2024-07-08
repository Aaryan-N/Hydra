import { SlashCommandBuilder, EmbedBuilder} from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Replies with amount of guilds the bot is currently in!"),
    async execute(interaction) {
        interaction.client.cluster.fetchClientValues('guilds.cache.size')
            .then(results => {
                const parsedGuildSize = results.reduce((prev, val) => prev + val, 0)
                const owner = interaction.guild.ownerId;
                const ownerDisplayName = interaction.client.users.cache.get(owner)

                const statsEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .addFields(
                            { name: "Amount of guilds the bot is currently in:", value: parsedGuildSize.toString() },
                            { name: "Owner of server:", value: ownerDisplayName.username}
                        )
                        .setTimestamp()
                        .setFooter({ text: "Sent using Inferna" })
                    interaction.reply({embeds : [statsEmbed]});
            })
            .catch(console.error);
    },
};
