import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteTask, updateTask, type Task } from '$lib/server/task';

export const POST: RequestHandler = async ({ request }) => {
	//action (0: update, 1: delete)
	const { task, checked, action }: { task: Task; checked: boolean; action: number } =
		await request.json();

	if (action) {
		await deleteTask(task.id);
	} else {
		await updateTask(task.id, task.title, task.description, Number(checked));
	}

	return json({ success: 'Success' });
};
