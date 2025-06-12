import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import type { SessionFlags } from '$lib/server/session';
import { isEmailAvailability } from '$lib/server/email';
import { isUsernameAvailability } from '$lib/server/username';
import { createUser } from '$lib/server/user';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.session || locals.user) return redirect(302, '/app');
	return {};
};

export const actions: Actions = {
	signup: async (event) => {
		const data = await event.request.formData();

		const username = data.get('username');
		const email = data.get('email');
		const password = data.get('password');

		/* if (typeof email !== 'string' || typeof username !== 'string' || typeof password !== 'string') {
			return fail(400, {
				message: 'Invalid or missing fields',
				username: '',
				email: '',
				password: '',
				hidden: false
			});
		} */

		if (!validateUsername(username)) {
			return fail(400, {
				message: 'Invalid username (must be 5-16 alphanumeric characters, starting with a letter)',
				username: '',
				email: email,
				password: password,
				hideError: false
			});
		}

		const usernameAvailable = await isUsernameAvailability(username as string);
		if (!usernameAvailable) {
			return fail(400, {
				message: 'Username already taken',
				username: '',
				email: email,
				password: password,
				hideError: false
			});
		}

		if (!validateEmail(email)) {
			return fail(400, {
				message: 'Invalid email address',
				username: username,
				email: '',
				password: password,
				hideError: false
			});
		}

		const emailAvailable = await isEmailAvailability(email as string);
		if (!emailAvailable) {
			return fail(400, {
				message: 'Email already taken',
				username: username,
				email: '',
				password: password,
				hideError: false
			});
		}

		if (!validatePassword(password)) {
			return fail(400, {
				message:
					'Invalid password (must be 8-20 character, contain at least one lowercase, uppercase, number, and special character',
				username: username,
				email: email,
				password: '',
				hideError: false
			});
		}

		const user = await createUser(username as string, email as string, password as string);

		const sessionFlags: SessionFlags = {
			twoFactorVerified: false
		};
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user.id, sessionFlags);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		// return {
		// 	message: '',
		// 	username: username,
		// 	email: email,
		// 	password: password,
		// 	hideError: true
		// };

		throw redirect(302, '/login');
	}
};

function validateUsername(username: FormDataEntryValue | null) {
	return (
		typeof username === 'string' &&
		username.length >= 5 &&
		username.length <= 16 &&
		/^[a-z0-9_]+$/.test(username) &&
		isNaN(Number(username[0]))
	);
}

function validateEmail(email: FormDataEntryValue | null) {
	return (
		typeof email === 'string' && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
	);
}

function validatePassword(password: FormDataEntryValue | null) {
	return (
		typeof password === 'string' &&
		password.length >= 8 &&
		password.length <= 20 &&
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)
	);
}
// TODO: Use formsnap (Zod and SuperForm, check shadcn formsnap)
// TODO: Make emailVerification request using real email send
