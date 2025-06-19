import { argon2id } from '@noble/hashes/argon2';
import { randomBytes } from '@noble/hashes/utils';
import { db } from './db';
import { user } from './db/schema';
import { eq } from 'drizzle-orm';

export async function hashPassword(password: string): Promise<string> {
	// Generate a random 32-byte salt
	const salt = randomBytes(32);

	// Hash the password with Argon2id
	const hash = argon2id(password, salt, {
		m: 19456, // memory cost (19456 KB)
		t: 2, // time cost (iterations)
		p: 1, // parallelism
		dkLen: 32 // output length
	});

	// Combine salt and hash for storage
	// Format: salt (32 bytes) + hash (32 bytes) = 64 bytes total
	const combined = new Uint8Array(salt.length + hash.length);
	combined.set(salt, 0);
	combined.set(hash, salt.length);

	// Convert to base64 for storage
	return btoa(String.fromCharCode(...combined));
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

export async function verifyPasswordHash(storedHash: string, password: string): Promise<boolean> {
	try {
		// Decode the stored hash from base64
		const combined = new Uint8Array(
			atob(storedHash)
				.split('')
				.map((char) => char.charCodeAt(0))
		);

		// Extract salt (first 32 bytes) and hash (last 32 bytes)
		const salt = combined.slice(0, 32);
		const originalHash = combined.slice(32);

		// Hash the provided password with the same salt
		const newHash = argon2id(password, salt, {
			m: 19456, // memory cost (19456 KB)
			t: 2, // time cost (iterations)
			p: 1, // parallelism
			dkLen: 32 // output length
		});

		// Compare the hashes using constant-time comparison
		if (originalHash.length !== newHash.length) {
			return false;
		}

		let result = 0;
		for (let i = 0; i < originalHash.length; i++) {
			result |= originalHash[i] ^ newHash[i];
		}

		return result === 0;
	} catch (error) {
		console.error('Password verification failed:', error);
		return false;
	}
}
