import type { PageServerLoad } from './$types';
import { Client } from '$lib/brawlstars';
export const load = (async ({ params }) => {
	try {
		const client = new Client();
		const response = client.player(encodeURIComponent(params.tag));
		console.log(response);
		// const icons = fetch('/api/brawlapi/icons').then((res) => res.json());
		const icons = fetch('https://api.brawlapi.com/v1/icons').then((res) => res.json());
		const brawlers = fetch('https://api.brawlapi.com/v1/brawlers').then((res) => res.json());
		return { response, icons, brawlers };
	} catch (error) {
		console.error(`Error in load function for /player/[tag]: ${error}`);
	}
}) satisfies PageServerLoad;
