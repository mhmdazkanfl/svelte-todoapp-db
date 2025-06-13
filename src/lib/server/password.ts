import { hash, verify } from '@node-rs/argon2';
import { db } from './db';
import { user } from './db/schema';
import { eq } from 'drizzle-orm';

export async function hashPassword(password: string): Promise<string> {
	return await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
}

export async function getUserPasswordHash(userId: number): Promise<string> {
	try {
		const row = await db
			.select({ passwordHash: user.passwordHash })
			.from(user)
			.where(eq(user.id, userId))
			.get();

		if (!row) {
			return '';
		}

		return row.passwordHash;
	} catch (error) {
		console.error('Get user password hash failed:', error);
		return '';
	}
}

export async function verifyPasswordHash(hash: string, password: string): Promise<boolean> {
	return await verify(hash, password);
}
