import {CommandOptions} from '../utils/interfaces';
import { User, GuildMember, Message } from 'discord.js';
import DolphinClient from './Client';

export default class Command {
	options: CommandOptions;
	run: any;
	message: Message;
	client: DolphinClient;
	args: string[];

	constructor(options: CommandOptions) {
		if (!options.name)
			throw new Error('Command requires a name property.');

		this.options = options;
	}

	execute(options: object): void {
		for (const key of Object.keys(options))
			this[key] = options[key];

		this.run();
	}

	async getMentioned(requiresMember: boolean, from?: number, to?: number): Promise<User | GuildMember> {
		const name = this.args.slice(from, to).join(' ');
		const user = this.message.mentions.users.first()
			|| this.client.users.cache.find(user => user.username.toLowerCase().includes(name.toLowerCase()));

		if (!requiresMember)
			return user;

		const members = await this.message.guild.members.fetch();

		return members.get(user.id);
	}
}