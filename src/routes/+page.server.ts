import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/session';
import { addTask, type Task } from '$lib/server/task';

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
	},

	addTask: async ({ locals, request }) => {
		if (!locals.session || !locals.user) {
			return fail(401, {
				message: 'Not Authenticated'
			});
		}

		const data = await request.formData();
		const userId = locals.user.id;
		const title = data.get('title') as string;
		const description = data.get('description') as string;

		const task: Task | null = await addTask(userId, title, description);

		if (!task) {
			return fail(400, {
				message: 'Failed to add a new task'
			});
		}

		return {
			message: 'New task added'
		};
	}
};
