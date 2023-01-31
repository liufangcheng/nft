export type DropsCardType = {
  sonData: {
    id: number;
    platform_name: string;
    contract_address: string;
    blockchain: string;
    collection_name: string;
    discord_member_count: number;
    discord_url: string;
    external_id: string;
    image: string;
    presale_date: number;
    published: string;
    sale_date: number;
    sale_price: string;
    supply: string;
    twitter_handle: string;
    website_url: string;
    create_time: number;
    update_time: number;
    content?: string;
    name?: string;
  };
  cardStyle: React.CSSProperties;
  iconsDisable: boolean;
};
