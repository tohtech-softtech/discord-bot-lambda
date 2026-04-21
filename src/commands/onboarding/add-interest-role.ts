import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';

export const interestButtons = [
    { customId: 'interest_programming', label: '🖥️ プログラミング', roleId: process.env.ROLE_PROGRAMMING! },
    { customId: 'interest_3dcg',        label: '🎮 3DCG',          roleId: process.env.ROLE_3DCG! },
    { customId: 'interest_illust',      label: '🎨 イラスト',       roleId: process.env.ROLE_ILLUST! },
    { customId: 'interest_vr',          label: '💻 VR',             roleId: process.env.ROLE_VR! },
    { customId: 'interest_gamedev',     label: '🕹️ ゲーム制作',     roleId: process.env.ROLE_GAMEDEV! },
    { customId: 'interest_member',      label: '🚪 部員ロール',      roleId: process.env.ROLE_MEMBER! },
];

export const data = new SlashCommandBuilder()
    .setName('onboarding-add-interest-role')
    .setDescription('趣味・特技のロールを取得できます。');

export async function execute(interaction: ChatInputCommandInteraction) {
    const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
        interestButtons.slice(0, 5).map(btn =>
            new ButtonBuilder()
                .setCustomId(btn.customId)
                .setLabel(btn.label)
                .setStyle(ButtonStyle.Primary)
        )
    );
    const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
        interestButtons.slice(5).map(btn =>
            new ButtonBuilder()
                .setCustomId(btn.customId)
                .setLabel(btn.label)
                .setStyle(btn.customId === 'interest_member' ? ButtonStyle.Success : ButtonStyle.Primary)
        )
    );

    const embed = new EmbedBuilder()
        .setTitle('趣味, 特技, これからやりたいこと！')
        .setDescription(
            '興味ある内容のボタンを押してください！！\n' +
            '部員ロールをつけることでメッセージが送れるようになります\n' +
            '※1回押すと付与、2回押すと撤回です。'
        )
        .setColor(0x5865f2);

    await interaction.reply({ embeds: [embed], components: [row1, row2] });
}
