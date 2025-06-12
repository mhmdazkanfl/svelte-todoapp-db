import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	console.log(`Root: ${locals.user}`);
	console.log(`Root: ${locals.session}`);
	if (locals.session || locals.user) return redirect(302, '/app');
	return {};
};
