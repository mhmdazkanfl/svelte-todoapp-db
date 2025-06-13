import { generateRandomRecoveryCode } from '$lib/utils';
import { db } from './db';
import { encryptString } from './encryption';
import { hashPassword } from './password';
import { user } from './db/schema';
import { eq } from 'drizzle-orm';

export async function createUser(username: string, email: string, password: string): Promise<User> {
	const passwordHash = await hashPassword(password);
	const recoveryCode = generateRandomRecoveryCode();
	const encryptedRecoveryCode = encryptString(recoveryCode);
	let userId = 0;

	try {
		const result = await db
			.insert(user)
			.values({
				email: email,
				username: username,
				passwordHash: passwordHash,
				recoveryCode: encryptedRecoveryCode
			})
			.returning({ id: user.id });
		userId = result[0].id;
	} catch (error) {
		console.error('Error creating user:', error);
		throw new Error('Failed to create user');
	}

	const newUser: User = {
		id: userId,
		username,
		email,
		emailVerified: false,
		registered2FA: false
	};

	return newUser;
}

export async function getUserFromUsername(username: string): Promise<User | null> {
	try {
		const row = await db
			.select({
				id: user.id,
				email: user.email,
				username: user.username,
				emailVerified: user.emailVerified,
				totpKey: user.totpKey
			})
			.from(user)
			.where(eq(user.username, username))
			.get();

		if (!row) {
			return null;
		}

		const hasTotpKey = row.totpKey !== null ? 1 : 0;

		const tempUser: User = {
			id: row.id,
			email: row.email,
			username: row.username,
			emailVerified: Boolean(row.emailVerified),
			registered2FA: Boolean(hasTotpKey)
		};

		return tempUser;
	} catch (error) {
		console.error('Get user form username failed:', error);
		return null;
	}
}

export async function getUserFromEmail(email: string): Promise<User | null> {
	try {
		const row = await db
			.select({
				id: user.id,
				email: user.email,
				username: user.username,
				emailVerified: user.emailVerified,
				totpKey: user.totpKey
			})
			.from(user)
			.where(eq(user.email, email))
			.get();

		if (!row) {
			return null;
		}

		const hasTotpKey = row.totpKey !== null ? 1 : 0;

		const tempUser: User = {
			id: row.id,
			email: row.email,
			username: row.username,
			emailVerified: Boolean(row.emailVerified),
			registered2FA: Boolean(hasTotpKey)
		};

		return tempUser;
	} catch (error) {
		console.error('Get user form email failed:', error);
		return null;
	}
}
export interface User {
	id: number;
	email: string;
	username: string;
	emailVerified: boolean;
	registered2FA: boolean;
}
