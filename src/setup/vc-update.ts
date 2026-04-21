import { Events, TextChannel, VoiceState } from "discord.js";
import { client } from "./client.js";

client.on(Events.VoiceStateUpdate, async (oldState: VoiceState, newState: VoiceState) => {
    const targetChannel = await newState.client.channels.fetch(
        process.env.VOICE_NOTIFY_ID!
    ).catch(() => null);

    if (!targetChannel?.isTextBased()) return;

    const member = newState.member;
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;

    if (!oldChannel && newChannel) {
        (targetChannel as TextChannel).send(`${member?.displayName} が ${newChannel.name} に入室しました。`);
    }
    else if (oldChannel && !newChannel) {
        (targetChannel as TextChannel).send(`${member?.displayName} が ${oldChannel.name} から退出しました。`);
    }
    // else if (oldChannel && newChannel && oldChannel.id !== newChannel.id) {
    //     (targetChannel as TextChannel).send(`${member?.displayName} が ${oldChannel.name} から ${newChannel.name} に移動しました。`);
    // }
});
