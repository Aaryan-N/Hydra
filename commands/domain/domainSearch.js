import { ComponentType, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import axios from 'axios';
import { errorEmbed } from '../../templates/embeds/errors/errorEmbed.js';
import { domainSearchRow } from '../../templates/actionRows/domains/domainSearchActionRow.js';
import { expiredDomainHelp } from '../../templates/embeds/domain/expiredDomainHelp.js';
import { domainInvalidUrl } from '../../templates/embeds/domain/invalidUrl.js';
import validator from 'validator';
import { domainInactiveUrl } from '../../templates/embeds/domain/inactiveUrl.js';

function isValidUrl(str) {
 return validator.isURL(str);
}

export default {
 category: 'domain',
 cooldown: 5,
 data: new SlashCommandBuilder()
  .setName('domainsearch')
  .setDescription('Rasssss')
  .addStringOption(option =>
   option.setName('query').setDescription('Domain to search! (example.com)').setRequired(true),
  ),
 async execute(interaction) {
  try {
   const query = interaction.options.getString('query');

   if (isValidUrl(query) === true) {
    axios({
     method: 'get',
     url: `https://fira-whois.vercel.app/${query}`,
     responseType: 'json',
    })
     .then(async function(response) {
      if (response.data.registrant.name === undefined) {
       let registrantName = 'None provided';
      }

      let registrantStreet = ''
      if (response.data.registrant.street === undefined) {
       registrantStreet = "None provided";
      } else {
       registrantStreet = response.data.registrant.street
      }

      let registrantCity = "None provided"
      try {
       registrantCity = response.data.registrant.city;
      } catch (e) {
       console.log("nah")
      }

      let registrantProvince = "None provided"
      try {
       registrantProvince = response.data.registrant.province;
      } catch (e) {
       console.log("nah")
      }

      let registrantPostalCode = "None provided"
      try {
       registrantPostalCode = response.data.registrant.postal_code;
      } catch (e) {
       console.log("nah")
      }
      // ---------------------------------------------------------------------------
      let administrativeName = 'None provided';
      try {
       administrativeName = response.data.administrative.name
      } catch (e) {
       console.log("nah")
      }

      let administrativeStreet = "None provided"
      try {
       administrativeStreet = response.data.administrative.street;
      } catch (e) {
       console.log("nah")
      }

      let administrativeCity = "None provided"
      try {
       administrativeCity = response.data.administrative.city;
      } catch (e) {
       console.log("nah")
      }

      let administrativeProvince = "None provided"
      try {
       administrativeProvince = response.data.administrative.province;
      } catch (e) {
       console.log("nah")
      }

      let administrativePostalCode = "None provided"
      try {
       administrativePostalCode = response.data.administrative.postal_code;
      } catch (e) {
       console.log("nah")
      }
      // -------------------------------------------------------------------------------
      let technicalName = 'None provided';
      try {
       technicalName = response.data.technical.name
      } catch (e) {
       console.log("nah")
      }

      let technicalStreet = "None provided"
      try {
       technicalStreet = response.data.technical.street;
      } catch (e) {
       console.log("nah")
      }

      let technicalCity = "None provided"
      try {
       technicalCity = response.data.technical.city;
      } catch (e) {
       console.log("nah")
      }

      let technicalProvince = "None provided"
      try {
       technicalProvince = response.data.technical.province;
      } catch (e) {
       console.log("nah")
      }

      let technicalPostalCode = "None provided"
      try {
       technicalPostalCode = response.data.technical.postal_code;
      } catch (e) {
       console.log("nah")
      }
      // -------------------------------------------------------------------------------

      let nameserverList = ''

      for (let index = 0; index < response.data.domain.name_servers.length; index++) {
       nameserverList += response.data.domain.name_servers[index] + "\n";
      }

      const domainMainMenu = new EmbedBuilder()
       .setColor([255, 231, 188])
       .setTitle('Pick any one of the below categories to learn more about: ' + response.data.domain.domain)
       .setTimestamp()
       .setFooter({
        text: 'Sent using Fira',
        iconURL: 'https://cdn.discordapp.com/attachments/1171358299409617011/1260485101905645568/FiraLogo.jpeg?ex=668f7dba&is=668e2c3a&hm=7c023e2a9df44ca40816a976179870f3b55941196a431c537a5768a330690032&',
       });

      const domainNameserverEmbed = new EmbedBuilder()
       .setColor([255, 231, 188])
       .setTitle('Domain: ' + response.data.domain.domain + " | " + "Nameserver Info")
       .addFields(
        { name: "Nameserver:", value: nameserverList }
       )
       .setTimestamp()
       .setFooter({
        text: 'Sent using Fira',
        iconURL:
         'https://cdn.discordapp.com/attachments/1171358299409617011/1260485101905645568/FiraLogo.jpeg?ex=668f7dba&is=668e2c3a&hm=7c023e2a9df44ca40816a976179870f3b55941196a431c537a5768a330690032&',
       });

      const domainDatesEmbed = new EmbedBuilder()
       .setColor([255, 231, 188])
       .setTitle('Domain: ' + response.data.domain.domain + " | " + "Date Info")
       .addFields(
        { name: "Created Date:", value: response.data.domain.created_date },
        { name: "Updated Date:", value: response.data.domain.updated_date },
        { name: "Expiration Date:", value: response.data.domain.expiration_date },
       )
       .setTimestamp()
       .setFooter({
        text: 'Sent using Fira',
        iconURL:
         'https://cdn.discordapp.com/attachments/1171358299409617011/1260485101905645568/FiraLogo.jpeg?ex=668f7dba&is=668e2c3a&hm=7c023e2a9df44ca40816a976179870f3b55941196a431c537a5768a330690032&',
       });

      const domainRegistrarEmbed = new EmbedBuilder()
       .setColor([255, 231, 188])
       .setTitle('Domain: ' + response.data.domain.domain + " | " + "Registrar Info")
       .addFields(
        { name: "Registrar Name:", value: response.data.registrar.name },
        { name: "Registrar Phone:", value: response.data.registrar.phone },
        { name: "Registrar Email:", value: response.data.registrar.email },
        { name: "Registrar URL:", value: response.data.registrar.referral_url },
       )
       .setTimestamp()
       .setFooter({
        text: 'Sent using Fira',
        iconURL:
         'https://cdn.discordapp.com/attachments/1171358299409617011/1260485101905645568/FiraLogo.jpeg?ex=668f7dba&is=668e2c3a&hm=7c023e2a9df44ca40816a976179870f3b55941196a431c537a5768a330690032&',
       });

      const domainRegistrantAddress = registrantStreet + ', ' + registrantCity + ', ' + registrantProvince + ', ' + registrantPostalCode + " " + response.data.registrant.country

      const domainRegistrantEmbed = new EmbedBuilder()
       .setColor([255, 231, 188])
       .setTitle('Domain: ' + response.data.domain.domain + " | " + "Registrant Info")
       .addFields(
        { name: "Registrant Name:", value: registrantName },
        { name: "Registrant Organization:", value: response.data.registrant.organization },
        { name: "Registrar Address:", value: domainRegistrantAddress },
        { name: "Registrar Phone:", value: response.data.registrant.phone, inline: true },
        { name: "Registrar Email:", value: response.data.registrar.email, inline: true },
       )
       .setTimestamp()
       .setFooter({
        text: 'Sent using Fira',
        iconURL:
         'https://cdn.discordapp.com/attachments/1171358299409617011/1260485101905645568/FiraLogo.jpeg?ex=668f7dba&is=668e2c3a&hm=7c023e2a9df44ca40816a976179870f3b55941196a431c537a5768a330690032&',
       });

      const domainAdministrativeAddress = administrativeStreet + ', ' + administrativeCity + ', ' + administrativeProvince + ', ' + administrativeStreet + " " + response.data.administrative.country

      const domainAdministrativeEmbed = new EmbedBuilder()
       .setColor([255, 231, 188])
       .setTitle('Domain: ' + response.data.domain.domain + " | " + "Administrator Info")
       .addFields(
        { name: "Adminstrator Name:", value: response.data.administrative.name },
        { name: "Adminstrator Organization:", value: response.data.administrative.organization },
        { name: "Adminstrator Address:", value: domainAdministrativeAddress },
        { name: "Adminstrator Phone:", value: response.data.administrative.phone, inline: true },
        { name: "Adminstrator Email:", value: response.data.administrative.email, inline: true },
       )
       .setTimestamp()
       .setFooter({
        text: 'Sent using Fira',
        iconURL:
         'https://cdn.discordapp.com/attachments/1171358299409617011/1260485101905645568/FiraLogo.jpeg?ex=668f7dba&is=668e2c3a&hm=7c023e2a9df44ca40816a976179870f3b55941196a431c537a5768a330690032&',
       });

      const domainTechnicalAddress = technicalStreet + ', ' + technicalCity + ', ' + technicalProvince + ', ' + technicalPostalCode + " " + response.data.technical.country

      const domainTechnicalEmbed = new EmbedBuilder()
       .setColor([255, 231, 188])
       .setTitle('Domain: ' + response.data.domain.domain + " | " + "Technical Info")
       .addFields(
        { name: "Technical Adminstrator Name:", value: response.data.administrative.name },
        { name: "Technical Adminstrator Organization:", value: response.data.administrative.organization },
        { name: "Technical Adminstrator Address:", value: domainTechnicalAddress },
        { name: "Technical Adminstrator Phone:", value: response.data.technical.phone, inline: true },
        { name: "Technical Adminstrator Email:", value: response.data.technical.email, inline: true },
       )
       .setTimestamp()
       .setFooter({
        text: 'Sent using Fira',
        iconURL:
         'https://cdn.discordapp.com/attachments/1171358299409617011/1260485101905645568/FiraLogo.jpeg?ex=668f7dba&is=668e2c3a&hm=7c023e2a9df44ca40816a976179870f3b55941196a431c537a5768a330690032&',
       });


      // ---------------------------------------------------------------------------------

      const domainSearchResponse = await interaction.reply({
       embeds: [domainMainMenu],
       components: [domainSearchRow]
      });

      const collectorFilter = i => i.user.id === interaction.user.id;

      const collector = await domainSearchResponse.createMessageComponentCollector({
       components: ComponentType.StringSelect,
       filter: collectorFilter,
       idle: 60_000,
       time: 1_20_000,
      });

      collector.on('collect', async interact => {
       const selection = interact.values[0];
       if (selection === 'nameserver') {
        await interact.update({ embeds: [domainNameserverEmbed], components: [domainSearchRow] });
       } else if (selection === 'dates') {
        await interact.update({ embeds: [domainDatesEmbed], components: [domainSearchRow] });
       } else if (selection === 'registrar') {
        await interact.update({ embeds: [domainRegistrarEmbed], components: [domainSearchRow] });
       } else if (selection === 'registrant') {
        await interact.update({ embeds: [domainRegistrantEmbed], components: [domainSearchRow] });
       } else if (selection === 'administrative') {
        await interact.update({ embeds: [domainAdministrativeEmbed], components: [domainSearchRow] });
       } else if (selection === 'technical') {
        await interact.update({ embeds: [domainTechnicalEmbed], components: [domainSearchRow] });
       }
      });

      collector.on('end', async collected => {
       const collectedMap = collected.map(x => x);
       const channelId = collectedMap[0].message.channelId;
       const messageId = collectedMap[0].message.id;
       interaction.client.channels.fetch(channelId).then(channel => {
        channel.messages.edit(messageId, { embeds: [expiredDomainHelp], components: [] });
       });
      });
     }).catch(err => {
     if (err.code === "ERR_BAD_RESPONSE") {
      interaction.reply({ embeds: [domainInactiveUrl], ephemeral: true })
     } else {
        console.log(err);
     }
    })
   } else {
    interaction.reply({ embeds: [domainInvalidUrl], ephemeral: true })
   }
  } catch (err) {
   console.log(`Woah there has been an error with the domain search command. Here it is:` + err,);
   interaction.reply({ embeds: [errorEmbed] });
}},}
