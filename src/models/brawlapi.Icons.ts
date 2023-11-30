interface PlayerIcon {
  [key: string]: {
    id: number;
    name: string;
    name2: string;
    imageUrl: string;
    imageUrl2: string;
    brawler: null | any; // Replace 'any' with the actual type for 'brawler' if known
    requiredTotalTrophies: number;
    sortOrder: number;
    isReward: boolean;
    isAvailableForOffers: boolean;
  };
}

interface ClubIcon {
  [key: string]: {
    id: number;
    imageUrl: string;
  };
}

interface Icons {
  player: PlayerIcon;
  club: ClubIcon;
}

export default Icons;
