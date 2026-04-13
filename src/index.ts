/* eslint-disable import/no-unresolved */
import { client } from "./setup/client.js";
import "./setup/ready.js";
import "./setup/interaction.js";

await client.login(process.env.DISCORD_TOKEN);
