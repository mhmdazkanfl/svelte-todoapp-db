import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, request }) => {
	// Set the cookie when user visits welcome page
	cookies.set('has_visited', 'true', {
		path: '/',
		maxAge: 60 * 60 * 24 * 365, // 1 year
		httpOnly: true,
		secure: true,
		sameSite: 'strict'
	});

	const url = new URL(request.url);

	return {
		origin: url.origin
	};
};
