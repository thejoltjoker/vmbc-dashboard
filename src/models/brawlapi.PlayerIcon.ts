interface PlayerIcon {
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
}

export default PlayerIcon;
