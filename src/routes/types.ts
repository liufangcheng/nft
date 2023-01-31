import { AuthParams } from '@/utils/authentication';
export type Route = AuthParams & {
  name: string;
  key: string;
  breadcrumb?: boolean;
  children?: Route[];
};
