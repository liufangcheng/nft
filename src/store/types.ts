import defaultSettings from '../settings.json';

export interface GlobalState {
  settings?: typeof defaultSettings;
  userInfo?: {
    address: string;
    avatar: null | string;
    create_time: number;
    email: string;
    id: number;
    invitation_code: string;
    invitation_user_id: number;
    name: string;
    update_time: number;
    userId: number;
    twitter_id_str: null | string;
  };
  tokenSecret: null | string;
}
