export type nftDetailsType = {
  id: number;
  contract_address: string;
  name: string;
  blockchain: string;
  image: null | string;
  listed: number;
  total_supply: number;
  floor_price: string;
  floor_price_historic_one_day: string;
  total_volume: string;
  one_day_volume: string;
  one_day_change: string;
  last_sold: string;
  market_cap: string;
  num_owners: number;
  update_data_time: number;
  create_time: number;
  update_time: number;
};
export type SqlCardType = {
  nftInfo: nftDetailsType | null;
  charts: floorPriceType[];
};
export type floorPriceType = {
  price: string;
  times: string;
};
