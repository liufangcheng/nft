import React, { useRef, useEffect } from 'react';
import AllIcon from '@/components/AllIcon';
import useRoute from '@/routes';
import { isArray, lowerFirst } from 'lodash';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu } from '@arco-design/web-react';
import NProgress from 'nprogress';
import qs from 'query-string';
import { useLocale, useMyStore } from '@/utils/hooks';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
// import styles from './index.module.less';
const NavBarMenu = () => {
  const {
    state: { userInfo },
    dispatch,
  } = useMyStore();
  const history = useHistory();
  const { flattenRoutes, menusTree, defaultRoute } = useRoute();
  const locale = useLocale();
  const pathname = history.location.pathname;
  const currentComponent = qs.parseUrl(pathname).url.slice(1);
  const defaultSelectedKeys = [currentComponent || defaultRoute];
  const paths = (currentComponent || defaultRoute).split('/');
  const defaultOpenKeys = paths.slice(0, paths.length - 1);
  const routeMap = useRef<Map<string, React.ReactNode[]>>(new Map());
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] =
    useState<string[]>(defaultSelectedKeys);
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  function onClickMenuItem(key) {
    const currentRoute = flattenRoutes.find((r) => r.key === key);
    if (!currentRoute) {
      history.push(`/exception/404`);
      return;
    }
    const component = currentRoute?.component;
    const preload = component?.preload();
    NProgress?.start();
    preload.then(() => {
      setSelectedKeys([key]);
      history.push(currentRoute.path ? currentRoute.path : `/${key}`);
      NProgress.done();
    });
  }

  function renderRoutes(locale) {
    routeMap.current.clear();
    const nodes = [];

    function travel(_routes, level, parentNode = []) {
      return _routes.map((route) => {
        const { breadcrumb = true } = route;
        const iconDom = <AllIcon name={route.icon} />;

        const titleDom = (
          <>
            {iconDom} {locale(route.name) || route.name}
          </>
        );
        if (
          !isArray(route.children) ||
          (isArray(route.children) && !route.children.length)
        ) {
          routeMap.current.set(
            `/${route.key}`,
            breadcrumb ? [...parentNode, route.name] : []
          );

          if (level > 1) {
            return <Menu.Item key={route.key}>{titleDom}</Menu.Item>;
          }
          nodes.push(
            <Menu.Item key={route.key}>
              <Link to={`/${route.key}`}>{titleDom}</Link>
            </Menu.Item>
          );
        }
        if (isArray(route.children) && route.children.length) {
          const parentNode = [];
          if (iconDom?.props?.isIcon) {
            parentNode.push(iconDom);
          }

          if (level > 1) {
            return (
              <SubMenu
                key={route.key}
                title={titleDom}
                style={{ backgroundColor: 'red' }}
              >
                {travel(route.children, level + 1, [...parentNode, route.name])}
              </SubMenu>
            );
          }
          nodes.push(
            <SubMenu key={route.key} title={titleDom}>
              {travel(route.children, level + 1, [...parentNode, route.name])}
            </SubMenu>
          );
        }
      });
    }
    const menus = menusTree.filter((item) => item?.disable);

    travel(menus, 1);
    return nodes;
  }

  useEffect(() => {
    const key = pathname.split('/');
    key.shift();
    const newSelectedKey = key.join('/');
    if (newSelectedKey) {
      setSelectedKeys([newSelectedKey]);
    } else {
      history.push('/home');
    }
  }, []);

  return (
    <>
      <div>
        <Menu
          collapse={collapsed}
          onClickMenuItem={onClickMenuItem}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onClickSubMenu={(_, openKeys) => {
            setOpenKeys(openKeys);
          }}
          mode="horizontal"
        >
          {renderRoutes(locale)}
        </Menu>
      </div>
    </>
  );
};

export default NavBarMenu;
