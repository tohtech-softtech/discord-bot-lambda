import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pongと返します。Botテスト用！');

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('Pong!');
}
