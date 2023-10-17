<script lang="ts">
	import { getContext } from 'svelte';
	import type { PageData } from './$types';
	// Retrieve user store from context

	export let data: PageData;
</script>

<!-- interface Player {
  club: PlayerClub;
  isQualifiedFromChampionshipChallenge: boolean;
  '3vs3Victories': number;
  icon: PlayerIcon;
  tag: string;
  name: string;
  trophies: number;
  expLevel: number;
  expPoints: number;
  highestTrophies: number;
  powerPlayPoints: number;
  highestPowerPlayPoints: number;
  soloVictories: number;
  duoVictories: number;
  bestRoboRumbleTime: number;
  bestTimeAsBigBrawler: number;
  brawlers: BrawlerStat[];
  nameColor: string;
} -->

<div class="container mx-auto">
	<a href="/">
		<button class="btn mt-4"><i class="fa-solid fa-arrow-left" />Back</button>
	</a>
	<div class="flex flex-col md:flex-row my-4">
		<!-- User Icon -->
		<div class="avatar">
			<div class="w-32 rounded-lg">
				<img src={data.icons.player[data.response.icon.id]?.imageUrl} alt="" />
			</div>
		</div>

		<!-- User Details -->
		<div class="ml-4">
			<h1 class="text-5xl font-semibold font-display uppercase text-slate-50">
				{data.response.name}
			</h1>
			<p class="text-gray-500 text-xl">Tag: {data.response.tag}</p>
			<p class="text-gray-500 text-xl">Role: {data.response.club.name}</p>
		</div>
	</div>
	<div class="columns-1 md:columns-2">
		<div class="rounded-lg bg-base-200">
			<table class="table">
				<tr>
					<th class="font-display text-lg uppercase text-slate-100">General Stats</th>
					<th />
				</tr>
				<tr>
					<td><i class="fas fa-trophy text-amber-400" /> Trophies</td>
					<td>{data.response.trophies}</td>
				</tr>
				<tr>
					<td><i class="fas fa-medal text-violet-400" /> Rank (Highest Trophies)</td>
					<td>{data.response.highestTrophies}</td>
				</tr>
				<tr>
					<td> Info (Level)</td>
					<td>{data.response.expLevel}</td>
				</tr>
				<tr>
					<td><i class="fas fa-users text-blue-400" /> Club</td>
					<td>{data.response.club?.name ?? '-'}</td>
				</tr>
			</table>
		</div>
		<div class="rounded-lg bg-base-200">
			<table class="table">
				<tr>
					<th class="font-display text-lg uppercase text-slate-100">Personal Records</th>
					<th />
				</tr>
				<tr>
					<td>Unlocked Brawl Stars (Unlocked Brawlers)</td>
					<td>{data.response.brawlers.length} / 72</td>
				</tr>
				<tr>
					<td>3v3 Wins (3 vs 3 Victories)</td>
					<td>{data.response['3vs3Victories']}</td>
				</tr>
				<tr>
					<td>Solo Showdown (Solo Victories)</td>
					<td>{data.response.soloVictories}</td>
				</tr>
				<tr>
					<td>Duo Showdown (Duo Victories)</td>
					<td>{data.response.duoVictories}</td>
				</tr>
				<tr>
					<td>Robo Rumble</td>
					<td>{data.response.bestRoboRumbleTime}</td>
				</tr>
				<tr>
					<td>Big Brawler (Big Game)</td>
					<td>{data.response.expLevel}</td>
				</tr>
			</table>
		</div>
	</div>
	<div class="overflow-x-auto mt-4">
		<table class="table table-auto table-zebra rounded-lg">
			<!-- head -->
			<thead>
				<tr>
					<th>Brawler</th>
					<th />
					<th>Power Level</th>
					<th>Rank</th>
					<th>Trophies</th>
				</tr>
			</thead>
			<tbody>
				<!-- row 1 -->
				{#each data.response.brawlers.sort((a, b) => b.trophies - a.trophies) as brawler}
					<tr>
						<!-- gadgets	AccessoryList[...]
starPowers	StarPowerList[...]
id	integer
rank	integer
trophies	integer
highestTrophies	integer
power	integer
gears	GearStatList[...]
name -->
						<!-- <td>{data.brawlers.find((brawler) => brawler.id === brawler.id)} </td> -->
						<td class="td-no-wrap">
							<div class="avatar">
								<div class="w-16 rounded">
									<img src={data.brawlers.list.find((b) => b.id === brawler.id).imageUrl} alt="" />
								</div>
							</div>
						</td>
						<th>{brawler.name}</th>
						<td>{brawler.power}</td>
						<td>{brawler.rank}</td>
						<td>{brawler.trophies}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- {JSON.stringify(data, null, 2)} -->
