import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';

const rawRoles = process.env.YEAR_ROLE_MAPPING || "";
export const roleButtons = rawRoles.split(',').map(entry => {
    const [label, roleId] = entry.split(':');
    return {
        customId: `role-${label}`,
        label: `${label}年度入学`,
        roleId: roleId
    };
});

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
