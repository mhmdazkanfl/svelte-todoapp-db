import { eq } from 'drizzle-orm';
import { db } from './db';
import { user } from './db/schema';

export async function isUsernameAvailability(username: string): Promise<boolean> {
	try {
		const result = await db.select().from(user).where(eq(user.username, username));
		return result.length === 0;
	} catch (error) {
		console.error('Database error checking username:', error);
		throw new Error('Failed to check username availability');
	}
}
