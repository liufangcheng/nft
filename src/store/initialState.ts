import { GlobalState } from './types';
import defaultSettings from '../settings.json';
import { myLocalStorage } from '@/utils';

export const initialState: GlobalState = {
  settings: defaultSettings,
  userInfo: myLocalStorage.getValue('userInfo'),
  tokenSecret: myLocalStorage.getValue('tokenSecret'),
};
