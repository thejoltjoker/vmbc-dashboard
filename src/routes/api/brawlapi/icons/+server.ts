import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const url = 'https://api.brawlapi.com/v1/icons';

	const response = await fetch(url)
		.then(async (response) => {
			if (response.ok) {
				return await response.json();
			}
			throw new Error('Something went wrong');
		})

		.catch((error) => {
			console.log(error);
		});
	return json(response);
};
