export type CardType = {
  discordProjectId: number;
  info?: InfoType;
};
export type InfoType = {
  approximate_member_count: number;
  approximate_presence_count: number;
  blockchain: string | null;
  contract_address: string | null;
  create_time: number;
  description: string | null;
  discord_description: string | null;
  discord_icon: string | null;
  discord_name: string | null;
  discord_url: string | null;
  get_discord_info_time: number;
  get_floor_price_time: number;
  guild_id: string | null;
  id: number;
  image: string | null;
  isWatch: number;
  name: string | null;
  newUserH: number;
  rateD: number;
  roadmap_image: null;
  update_time: number;
  website_url: string | null;
};
