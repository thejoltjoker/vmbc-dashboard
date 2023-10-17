<script lang="ts">
	import type { PageData, PageServerData } from './$types';
	import { camelCaseToTitleCase, camelCaseToKebabCase } from '$lib/utility';
	import { goto } from '$app/navigation';

	// Api data
	export let data: PageData;

	const clubTrophies = data.response?.items?.reduce((total, member) => total + member.trophies, 0);
	console.log(data);
</script>


<svelte:head>
	<title>Vacay Mania Brawl Club</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<div class="container mx-auto">
	<div class="hero bg-base-200 py-12 my-4 rounded-lg">
		<div class="hero-content text-center">
			<div class="flex flex-col items-center text-center">
				<h1 class="text-5xl font-bold font-display uppercase text-slate-50">
					Vacay Mania Brawl Club
				</h1>
				<p class="pt-6 max-w-lg">
					Welcome to Vacay Mania Brawl Club, your one-stop online hub for Brawl Stars action. Join
					us for non-stop thrills, strategize with fellow Brawlers, and conquer the battlefield.
					<br />
					<span class="font-bold">Let's brawl it out!</span>
				</p>
			</div>
		</div>
	</div>
	<div class="stats shadow w-full">
		<div class="stat">
			<div class="stat-figure text-primary">
				<i class="fas fa-trophy text-2xl pt-3" />
			</div>
			<!-- Total trophies -->
			<div class="stat-title">Total Trophies</div>
			<div class="stat-value text-primary">{clubTrophies.toLocaleString('en-US')}</div>
			<div class="stat-desc">21% more than last month</div>
		</div>

		<div class="stat">
			<div class="stat-figure text-secondary">
				<i class="fas fa-gamepad text-2xl pt-3" />
			</div>
			<div class="stat-title">Battles Played</div>
			<div class="stat-value text-secondary">2248</div>
			<div class="stat-desc">21% more than last month</div>
		</div>

		<div class="stat">
			<div class="stat-figure text-secondary">
				<div class="avatar online">
					<div class="w-16 rounded-full">
						<img src="http://placekitten.com/260/260" />
					</div>
				</div>
			</div>
			<div class="stat-value">86%</div>
			<div class="stat-title">Win Rate</div>
			<div class="stat-desc text-secondary">31 tasks remaining</div>
		</div>
	</div>

	<div class="overflow-x-auto">
		<table class="table table-zebra table-auto">
			<!-- head -->
			<thead>
				<tr>
					<th>Icon</th>
					<th>Name</th>
					<th>Tag</th>
					<th>Role</th>
					<th>Trophies</th>
				</tr>
			</thead>
			<tbody>
				<!-- row 1 -->

				{#each data?.response?.items as player}
					<tr
						on:click={() => goto(`/player/${encodeURIComponent(player.tag)}`)}
						class="cursor-pointer"
					>
						<td class="td-no-wrap">
							<div class="avatar">
								<div class="w-12 rounded">
									<img
										src={data.icons?.player[player.icon.id].imageUrl}
										alt="Tailwind-CSS-Avatar-component"
									/>
								</div>
							</div>
						</td>
						<th>{player.name}</th>
						<td>{player.tag}</td>
						<td
							><div class="badge badge-neutral badge-{camelCaseToKebabCase(player.role)}">
								{camelCaseToTitleCase(player.role)}
							</div></td
						>
						<td>{player.trophies}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
