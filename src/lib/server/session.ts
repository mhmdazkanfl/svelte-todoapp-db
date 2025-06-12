import { eq } from 'drizzle-orm';
import { db } from './db';
import { session, user } from './db/schema';
import type { User } from './user';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import type { RequestEvent } from '@sveltejs/kit';

export async function invalidateSession(sessionId: string): Promise<void> {
	try {
		await db.delete(session).where(eq(session.id, sessionId));
	} catch (error) {
		console.error('Failed to invalidate session:', error);
		throw new Error('Session invalidation failed');
	}
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

export function generateSessionToken(): string {
	const tokenBytes = new Uint8Array(20);
	crypto.getRandomValues(tokenBytes);
	const token = encodeBase32LowerCaseNoPadding(tokenBytes).toLowerCase();
	return token;
}

export async function createSession(
	token: string,
	userId: number,
	flags: SessionFlags
): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const newSession: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
		twoFactorVerified: flags.twoFactorVerified
	};

	try {
		await db.insert(session).values({
			id: newSession.id,
			userId: newSession.userId,
			expiresAt: Math.floor(newSession.expiresAt.getTime() / 1000),
			twoFactorVerified: Number(newSession.twoFactorVerified)
		});
	} catch (error) {
		console.error('Failed to create a session:', error);
		throw new Error('Session creation failed');
	}

	return newSession;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	try {
		const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

		const data = await db
			.select({
				sessionId: session.id,
				userId: session.userId,
				expiresAt: session.expiresAt,
				twoFactorVerified: session.twoFactorVerified,
				email: user.email,
				username: user.username,
				emailVerified: user.emailVerified,
				totpKey: user.totpKey
			})
			.from(session)
			.innerJoin(user, eq(session.userId, user.id))
			.where(eq(session.id, sessionId))
			.get();

		if (!data) {
			return { tempSession: null, tempUser: null };
		}

		const hasTotpKey = data.totpKey !== null ? 1 : 0;

		const tempSession: Session = {
			id: data.sessionId,
			userId: data.userId,
			expiresAt: new Date(data.expiresAt * 1000),
			twoFactorVerified: Boolean(data.twoFactorVerified)
		};

		const tempUser: User = {
			id: data.userId,
			email: data.email,
			username: data.username,
			emailVerified: Boolean(data.emailVerified),
			registered2FA: Boolean(hasTotpKey)
		};

		// Check if session is expired
		if (Date.now() >= tempSession.expiresAt.getTime()) {
			await db.delete(session).where(eq(session.id, tempSession.id)); // Added await
			return { tempSession: null, tempUser: null };
		}

		// Check if session needs renewal (15 days before expiry)
		if (Date.now() >= tempSession.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
			tempSession.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
			await db
				.update(session) // Added await
				.set({ expiresAt: Math.floor(tempSession.expiresAt.getTime() / 1000) })
				.where(eq(session.id, tempSession.id));
		}

		return { tempSession, tempUser };
	} catch (error) {
		console.error('Session validation failed:', error);
		// Return invalid session on any database error
		return { tempSession: null, tempUser: null };
	}
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set('session', token, {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		expires: expiresAt
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

type SessionValidationResult =
	| { tempSession: Session; tempUser: User }
	| { tempSession: null; tempUser: null };
