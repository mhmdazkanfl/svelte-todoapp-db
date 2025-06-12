import {
	deleteSessionTokenCookie,
	setSessionTokenCookie,
	validateSessionToken
} from '$lib/server/session';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session') ?? null;
	if (token === null) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { tempSession, tempUser } = await validateSessionToken(token);
	if (tempSession !== null) {
		setSessionTokenCookie(event, token, tempSession.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.session = tempSession;
	event.locals.user = tempUser;
	return resolve(event);
};
