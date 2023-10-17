import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return json({
		tag: 'xxxx',
		victories: 324,
		defeats: 3289,
		lastBattle: new Date()
	});
};
