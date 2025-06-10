import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (locals.session || locals.user) return redirect(302, '/app');
	return {};
}
