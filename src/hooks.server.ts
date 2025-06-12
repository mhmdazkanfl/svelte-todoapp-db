import {
	deleteSessionTokenCookie,
	setSessionTokenCookie,
	validateSessionToken
} from '$lib/server/session';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session') ?? null;
	console.log(`Middleware (token): ${token}`);
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
	console.log(`Middleware (user id): ${event.locals.user?.id}`);
	console.log(`Middleware (session id): ${event.locals.session?.id}`);
	return resolve(event);
};
