import { eq } from 'drizzle-orm';
import { db } from './db';
import { task } from './db/schema';

export async function addTask(
	userId: number,
	title: string,
	description: string | null,
	completed: number = 0
): Promise<Task | null> {
	try {
		const result = await db
			.insert(task)
			.values({
				userId: userId,
				title: title,
				description: description,
				completed: completed
			})
			.returning()
			.get();

		const tempTask: Task = {
			id: result.id,
			userId: result.userId,
			title: result.title,
			description: result.description,
			completed: result.completed
		};

		return tempTask;
	} catch (error) {
		console.error('Error creating a new task: ', error);
		return null;
	}
}

export async function getAllTask(userId: number): Promise<Task[]> {
	try {
		const result: Task[] = await db.select().from(task).where(eq(task.userId, userId));
		return result;
	} catch (error) {
		return [];
	}
}

export interface Task {
	id: number;
	userId: number;
	title: string;
	description: string | null;
	completed: number;
}

/* export const task = sqliteTable('task', {
  id: text('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  title: text('title').notNull(),
  description: text('description'),
  completed: integer('completed').notNull().default(0)
}); */
