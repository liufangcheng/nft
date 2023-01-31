import { TableColumnProps } from '@arco-design/web-react';
import { SearchConfig } from '../LeftCard/types';
export interface DataColumnsInterface {
  key?: string;
  name?: string;
  Floor?: number | string;
  '1d%'?: string;
  Volume?: string;
  '1dVolume'?: string;
  MarketCap?: string;
  Holders?: string;
  Online?: string;
  Visit?: string;
  NewUsers?: string;
  Retention?: string;
  Type?: string;
  Timestamp?: string;
  Price?: string;
  Collection?: string;
  Market?: string;
  TokenMint?: string;
  Buyer?: string;
  Seller?: string;
}
export interface disableFollowerInterface {
  disableFollower?: boolean;
}
export interface ColumnsInterface {
  columns: TableColumnProps[];
  dataSorce?: DataColumnsInterface[];
  pagination: boolean;
  request: (data: unknown) => Promise<any>;
  scroll?: {
    x: number;
  };
}
export type TableListRef = {
  getList: (searchProps?: SearchConfig) => void;
};
