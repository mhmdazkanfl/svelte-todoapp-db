import { generateRandomRecoveryCode } from '$lib/utils';
import { db } from './db';
import { encryptString } from './encryption';
import { hashPassword } from './password';
import { user } from './db/schema';

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

export interface User {
	id: number;
	email: string;
	username: string;
	emailVerified: boolean;
	registered2FA: boolean;
}
