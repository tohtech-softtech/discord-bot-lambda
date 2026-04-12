import { Client, Collection, GatewayIntentBits, Events } from 'discord.js';
import * as pingCommand from './commands/botest/ping.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const commands = new Collection<string, any>();
commands.set(pingCommand.data.name, pingCommand);

client.once(Events.ClientReady, () => {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

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
});

await client.login(process.env.DISCORD_TOKEN);
