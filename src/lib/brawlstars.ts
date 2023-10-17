import { BRAWLSTARS_API_TOKEN } from '$env/static/private';

export class Endpoints {
	static baseUrl: string = 'https://api.brawlstars.com';
	static version: string = 'v1';

	static player(playerTag: string) {
		return `${Endpoints.baseUrl}/${Endpoints.version}/players/${playerTag}`;
	}

	static clubMembers(clubTag: string) {
		return `${Endpoints.baseUrl}/${Endpoints.version}/clubs/${clubTag}/members`;
	}
}

export class Client {
	authorizationKey: string;
	constructor(authorizationKey: string = BRAWLSTARS_API_TOKEN) {
		this.authorizationKey = authorizationKey;
	}

	async get(endpoint: string) {
		try {
			console.log(endpoint);
			const response = await fetch(endpoint, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${this.authorizationKey}`
				}
			});
			if (response.ok) {
				return response.json();
			} else {
				console.error('Request failed with status:', response.status);
				const errorText = await response.text();
				console.error('Response:', errorText);
				throw new Error('Request failed');
			}
		} catch (error) {
			console.error('Error:', error);
			throw error;
		}
	}

	async player(playerTag: string) {
		const url = Endpoints.player(playerTag);
		return await this.get(url);
	}

	async clubMembers(clubTag: string) {
		console.log(clubTag);
		const url = Endpoints.clubMembers(clubTag);
		return await this.get(url);
	}
}
