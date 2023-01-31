import { menu } from './menu';
import { setting } from './setting';
import { navbar } from './navbar';
import { global } from './global';
import { dms } from './pages/dms';
import { watchlist } from './pages/watchlist';
import { discord } from './pages/discord';
import { home } from './pages/home';
import { personalCenter } from './pages/personalCenter';

export const locale = {
  ...menu,
  ...setting,
  ...navbar,
  ...global,
  ...dms,
  ...watchlist,
  ...discord,
  ...home,
  ...personalCenter,
};
