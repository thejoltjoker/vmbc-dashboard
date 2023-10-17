import type { PageServerLoad } from './$types';
import { BRAWLSTARS_CLUB_TAG } from '$env/static/private';
import { Client } from '$lib/brawlstars';

export const load = (async () => {
	try {
		const client = new Client();
		const response = client.clubMembers(encodeURIComponent(BRAWLSTARS_CLUB_TAG));
		console.log(response);

		// Icons
		const icons = fetch('https://api.brawlapi.com/v1/icons').then((res) => res.json());

		console.log(icons);

		
		return { response, icons };
	} catch (error) {
		console.error(`Error in load function for /: ${error}`);
	}
}) satisfies PageServerLoad;
