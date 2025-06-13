import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { User } from '$lib/server/user';
import type { SessionFlags } from '$lib/server/session';
import { getUserFromEmail, getUserFromUsername } from '$lib/server/user';
import { getUserPasswordHash, verifyPasswordHash } from '$lib/server/password';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.session || locals.user) return redirect(302, '/app');
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		let user: User | null;
		const data = await event.request.formData();

		const usernameOrEmail = data.get('username-or-password') as string;
		const password = data.get('password') as string;

		// Username = 0, Email = 1, Unknown = -1
		const isUsernameOrEmail: number = validateUsernameOrEmail(usernameOrEmail);

		switch (isUsernameOrEmail) {
			case 0:
				user = await getUserFromUsername(usernameOrEmail);
				break;
			case 1:
				user = await getUserFromEmail(usernameOrEmail);
				break;
			default:
				return fail(400, {
					message: 'User not found',
					hideError: false
				});
		}

		if (!user) {
			return fail(400, {
				message: 'User not found',
				hideError: false
			});
		}

		const passwordHash: string = await getUserPasswordHash(user.id);
		const validPassword: boolean = await verifyPasswordHash(passwordHash, password);

		if (!validPassword) {
			return fail(400, {
				message: 'Invalid password',
				hideError: false
			});
		}

		const sessionFlags: SessionFlags = {
			twoFactorVerified: false
		};
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user.id, sessionFlags);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		throw redirect(302, '/app');

		// if (isUsernameOrEmail === ) {
		// 	return fail(401, {
		// 		message: 'Incorrect Login'
		// 	});
		// }
	}
};

function validateUsernameOrEmail(usernameOrEmail: string): number {
	if (
		usernameOrEmail.length >= 5 &&
		usernameOrEmail.length <= 16 &&
		/^[a-z0-9_]+$/.test(usernameOrEmail)
	) {
		return 0;
	}

	if (/^.+@.+\..+$/.test(usernameOrEmail) && usernameOrEmail.length < 256) {
		return 1;
	}

	return -1;
}
