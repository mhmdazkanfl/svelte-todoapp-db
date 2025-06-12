import { eq } from 'drizzle-orm';
import { db } from './db';
import { user } from './db/schema';

export async function isEmailAvailability(email: string): Promise<boolean> {
	try {
		const result = await db.select().from(user).where(eq(user.email, email));
		return result.length === 0;
	} catch (error) {
		console.error('Database error checking email:', error);
		throw new Error('Failed to check email availability');
	}
}
