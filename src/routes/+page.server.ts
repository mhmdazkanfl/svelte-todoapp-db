import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/session';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.session || !locals.user) return redirect(302, '/welcome');
	return {};
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401, {
				message: 'Not Authenticated'
			});
		}
		await invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);
		return redirect(302, '/login');
	}
};
