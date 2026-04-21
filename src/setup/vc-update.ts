import { Events, TextChannel, VoiceState, EmbedBuilder, Colors } from "discord.js";
import { client } from "./client.js";

client.on(Events.VoiceStateUpdate, async (oldState: VoiceState, newState: VoiceState) => {
    const targetChannel = await newState.client.channels.fetch(
        process.env.VOICE_NOTIFY_ID!
    ).catch(() => null);

    if (!targetChannel?.isTextBased()) return;

    const member = newState.member;
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;

    const avatarURL = member?.user.displayAvatarURL({ size: 64 }) ?? undefined;
    const now = new Date();

    if (!oldChannel && newChannel) {
        const embed = new EmbedBuilder()
            .setColor(0x57f287)
            .setAuthor({
                name: member?.displayName ?? "Unknown",
                iconURL: avatarURL,
            })
            .setTitle("🟢  入室しました")
            .addFields(
                {
                    name: "📢  チャンネル",
                    value: `**${newChannel.name}**`,
                    inline: true,
                },
                {
                    name: "👥  現在の人数",
                    value: `**${newChannel.members.size}** 人`,
                    inline: true,
                },
                {
                    name: "🔗  リンク",
                    value: `<#${newChannel.id}>`,
                    inline: true,
                }
            )
            .setThumbnail(avatarURL ?? null)
            .setFooter({
                text: `ユーザーID: ${member?.id ?? "不明"}`,
            })
            .setTimestamp(now);

        (targetChannel as TextChannel).send({ embeds: [embed] });

    } else if (oldChannel && !newChannel) {
        const embed = new EmbedBuilder()
            .setColor(0xed4245)
            .setAuthor({
                name: member?.displayName ?? "Unknown",
                iconURL: avatarURL,
            })
            .setTitle("🔴  退出しました")
            .addFields(
                {
                    name: "📢  チャンネル",
                    value: `**${oldChannel.name}**`,
                    inline: true,
                },
                {
                    name: "👥  残り人数",
                    value: `**${oldChannel.members.size}** 人`,
                    inline: true,
                },
                {
                    name: "🔗  リンク",
                    value: `<#${oldChannel.id}>`,
                    inline: true,
                }
            )
            .setThumbnail(avatarURL ?? null)
            .setFooter({
                text: `ユーザーID: ${member?.id ?? "不明"}`,
            })
            .setTimestamp(now);

        (targetChannel as TextChannel).send({ embeds: [embed] });
    }
});
