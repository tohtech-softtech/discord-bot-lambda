import { Client, Collection, GatewayIntentBits, Events } from 'discord.js';
import * as pingCommand from './commands/botest/ping.js';
import * as onBoardingRoleCommand from './commands/onboarding/add-yearify-role.js';
import { roleButtons } from './commands/onboarding/add-yearify-role.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const commands = new Collection<string, any>();
commands.set(pingCommand.data.name, pingCommand);
commands.set(onBoardingRoleCommand.data.name, onBoardingRoleCommand);

client.once(Events.ClientReady, () => {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const command = commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'エラーが発生しました', ephemeral: true });
            } else {
                await interaction.reply({ content: 'エラーが発生しました', ephemeral: true });
            }
        }
    }
    else if (interaction.isButton()) {
        const btnConfig = roleButtons.find(b => b.customId === interaction.customId);
        if (!btnConfig) return;

        const member = interaction.guild?.members.cache.get(interaction.user.id);
        const role = interaction.guild?.roles.cache.get(btnConfig.roleId);

        if (!member || !role) {
            await interaction.reply({ content: 'ロールが見つかりませんでした。', ephemeral: true });
            return;
        }

        if (member.roles.cache.has(role.id)) {
            await interaction.reply({ content: `すでに ${role.name} を持っています。`, ephemeral: true });
            return;
        }

        await member.roles.add(role);
        await interaction.reply({ content: `✅ ${role.name} を付与しました！`, ephemeral: true });
    }
});

await client.login(process.env.DISCORD_TOKEN);
