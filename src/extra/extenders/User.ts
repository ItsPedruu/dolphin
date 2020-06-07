import { User } from 'discord.js';
import Extender from '../../structures/Extender';

module.exports = class extends Extender {
	[x: string]: any;

	constructor() {
		super({
			appliesTo: [User]
		});

		this.command = null;
	}

	setCooldown(): void {
		this.client.commands.set(this.id, Date.now());
	}

	get hasCooldown(): boolean {
		return this.client.cooldowns.get(this.id) && this.client.dolphinOptions.commands && this.client.dolphinOptions.commands.cooldown
			? this.cooldownTimeLeft > 0
			: false;
	}

	get cooldownTimeLeft(): number {
		return (this.client.dolphinOptions.commands.cooldown * 1000) - (Date.now() - this.client.cooldowns.get(this.id));
	}
}