import { Events } from 'discord.js';
import * as onBoardingRoleCommand from '../commands/onboarding/add-yearify-role.js';
import * as onBoardingInterestCommand from '../commands/onboarding/add-interest-role.js';
import { client } from './client.js';

client.on(Events.InteractionCreate, async (interaction) => {
    const allRoleButtons = [
        ...onBoardingRoleCommand.roleButtons, 
        ...onBoardingInterestCommand.interestButtons
    ];

    if (interaction.isButton()) {
        const btnConfig = allRoleButtons.find(b => b.customId === interaction.customId);
        if (!btnConfig) return;

        const member = interaction.guild?.members.cache.get(interaction.user.id);
        const role = interaction.guild?.roles.cache.get(btnConfig.roleId);

        if (!member || !role) {
            await interaction.reply({ content: 'ロールが見つかりませんでした。', ephemeral: true });
            return;
        }

        if (member.roles.cache.has(role.id)) {
            await member.roles.remove(role);
            await interaction.reply({ content: `✅ ${role.name} を撤回しました。`, ephemeral: true });
        } else {
            await member.roles.add(role);
            await interaction.reply({ content: `✅ ${role.name} を付与しました！`, ephemeral: true });
        }
    }
});
