import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies, url }) => {
	const hasVisited = cookies.get('has_visited');

	// If user hasn't visited before and isn't already on the welcome page
	if (!hasVisited && url.pathname !== '/welcome') {
		redirect(307, '/welcome');
	}

	return {};
};
