// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Session } from '$lib/server/session';
import type { User } from '$lib/server/user';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			session: Session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
