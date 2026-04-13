import * as pingCommand from '../commands/botest/ping.js';
import * as onBoardingRoleCommand from '../commands/onboarding/add-yearify-role.js';
import * as onBoardingInterestCommand from '../commands/onboarding/add-interest-role.js';
import { Collection } from 'discord.js';

export const commands = new Collection<string, any>();
commands.set(pingCommand.data.name, pingCommand);
commands.set(onBoardingRoleCommand.data.name, onBoardingRoleCommand);
commands.set(onBoardingInterestCommand.data.name, onBoardingInterestCommand);
