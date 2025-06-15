import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { updateTask, type Task } from '$lib/server/task';

export const POST: RequestHandler = async ({ request }) => {
	const { task, checked }: { task: Task; checked: boolean } = await request.json();
	await updateTask(task.id, task.title, task.description, Number(checked));
	return json({ success: 'Success ' });
};
