import { useMemo } from 'react';
import { Route } from './types';
import { myLocalStorage } from '@/utils';
import lazyload from '@/utils/lazyload';
import { isArray } from '@/utils/is';
import routesConfig from './routesConfig';

const menus = myLocalStorage.getValue('loginParams')?.menus || [];

const newMenus = menus
  .filter(({ type }) => type === 1)
  .sort(({ sort: sortA }, { sort: sortB }) => sortA - sortB);

const getChildren = (id) => {
  let res = {};
  const children = newMenus
    .filter((item) => item.parentId === id)
    .sort(({ sort: sortA }, { sort: sortB }) => sortA - sortB);
  if (children.length !== 0) {
    res = {
      children: children.map(({ name, id, icon }) => {
        return {
          name: `menu.${name}`,
          key: name,
          icon,
          ...getChildren(id),
        };
      }),
    };
  }
  return res;
};

const getRoutesTree = () => {
  let res = [];
  res = newMenus
    .filter(({ level }) => level === 0)
    .map(({ level, name, id, icon }) => {
      if (level === 0) {
        return {
          name: `menu.${name}`,
          key: name,
          icon,
          ...getChildren(id),
        };
      }
    });
  return res;
};

const getFlattenRoutes = (routes) => {
  const mod = import.meta.glob('../pages/**/[a-z[]*.tsx');
  const res = [];

  function travel(_routes) {
    _routes.forEach((route) => {
      if (route.page && !route.children) {
        route.component = lazyload(mod[`../pages/${route.page}/index.tsx`]);
        res.push(route);
      } else if (isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    });
  }

  travel(routes);
  return res;
};

const tree = getRoutesTree();

export const routes: Route[] = routesConfig;

const useRoute = (): {
  flattenRoutes: any;
  menusTree: any;
  defaultRoute;
} => {
  const flattenRoutes = useMemo(() => getFlattenRoutes(routes) || [], [routes]);

  const defaultRoute = useMemo(() => {
    const first = routes[0];
    if (first) {
      const firstRoute = first?.children?.[0]?.key || first.key;
      return firstRoute;
    }
    return '';
  }, [routes]);

  return {
    flattenRoutes,
    menusTree: routes,
    defaultRoute,
  };
};

export default useRoute;
