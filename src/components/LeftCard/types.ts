export interface disableFollowerInterface {
  disableFollower?: boolean;
  onSearch?: (searchConfig: SearchConfig) => void;
}
export type SearchConfig = {
  search: string | null;
  blockchain: string | null;
  follower?: number | null;
};
