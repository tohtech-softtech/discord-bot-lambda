import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';

export const roleButtons = [
    { customId: 'role_year_2023', label: '2023年度入学', roleId: process.env.ROLE_YEAR_2023! },
    { customId: 'role_year_2024', label: '2024年度入学', roleId: process.env.ROLE_YEAR_2024! },
    { customId: 'role_year_2025', label: '2025年度入学', roleId: process.env.ROLE_YEAR_2025! },
    { customId: 'role_year_2026', label: '2026年度入学', roleId: process.env.ROLE_YEAR_2026! },
];

export const data = new SlashCommandBuilder()
    .setName("onboarding-add-yearify-role")
    .setDescription("新入生向けに押した人に対して、ロールを付与するものです。");

export async function execute(interaction: ChatInputCommandInteraction) {
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        roleButtons.map(btn =>
            new ButtonBuilder()
                .setCustomId(btn.customId)
                .setLabel(btn.label)
                .setStyle(ButtonStyle.Primary)
        )
    );

    const embed = new EmbedBuilder()
        .setTitle('🎭 入学年度')
        .setDescription('入学年度を選択してね')
        .setColor(0x5865f2);

    await interaction.reply({ embeds: [embed], components: [row] });
}
