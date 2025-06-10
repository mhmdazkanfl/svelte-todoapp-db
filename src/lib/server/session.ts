import { eq } from 'drizzle-orm';
import { db } from './db';
import { session } from './db/schema';
import type { User } from './user';
import type { RequestEvent } from '../../routes/$types';

export function invalidateSession(sessionId: string): void {
	db.delete(session).where(eq(session.id, sessionId));
	// db.execute("DELETE FROM session WHERE id = ?", [sessionId]);
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set('session', '', {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		maxAge: 0
	});
}

export interface SessionFlags {
	twoFactorVerified: boolean;
}

export interface Session extends SessionFlags {
	id: string;
	expiresAt: Date;
	userId: number;
}

type SessionValidationResult = { session: Session; user: User } | { session: null; user: null };
