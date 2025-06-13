import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
	// Set the cookie when user visits welcome page
	cookies.set('has_visited', 'true', {
		path: '/',
		maxAge: 60 * 60 * 24 * 365, // 1 year
		httpOnly: true,
		secure: true,
		sameSite: 'strict'
	});

	return {};
};
