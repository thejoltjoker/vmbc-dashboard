interface PlayerClub {
	tag: string;
	name: string;
}

interface PlayerIcon {
	id: number;
}

interface Accessory {
	name: {
		id: number;
	};
}

interface JsonLocalizedName {
	// Define the structure for JsonLocalizedName
}

interface StarPower {
	name: {
		id: number;
	};
	id: number;
}

interface GearStat {
	name: JsonLocalizedName;
	id: number;
	level: number;
}

interface BrawlerStat {
	gadgets: Accessory[];
	starPowers: StarPower[];
	id: number;
	rank: number;
	trophies: number;
	highestTrophies: number;
	power: number;
	gears: GearStat[];
	name: JsonLocalizedName;
}

interface PlayerIcon {
	id: number;
}

enum Role {
	notMember = 'notMember',
	member = 'member',
	president = 'president',
	senior = 'senior',
	vicePresident = 'vicePresident',
	unknown = 'unknown'
}

interface ClubMember {
	icon: PlayerIcon;
	tag: string;
	name: string;
	trophies: number;
	role: Role;
	nameColor: string;
}

interface ClubMemberList {
	[key: string]: ClubMember;
}

interface Player {
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
}

interface BrawlerStatList {
	brawlers: BrawlerStat[];
}

interface StarPowerList {
	starPowers: StarPower[];
}

interface GearStatList {
	gears: GearStat[];
}
