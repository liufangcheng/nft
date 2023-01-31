import React, { useState, useRef, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { Layout, Breadcrumb } from '@arco-design/web-react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import useRoute from '@/routes';
import { useLocale } from '../utils/hooks';
import lazyload from '../utils/lazyload';
import styles from './layout.module.less';

const Content = Layout.Content;

function PageLayout() {
  const history = useHistory();
  const pathname = history.location.pathname;
  const locale = useLocale();

  const { flattenRoutes, defaultRoute } = useRoute();

  const layoutContentRef = useRef<HTMLDivElement>();

  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    layoutContentRef.current.onscroll = () => {
      if (!showShadow && layoutContentRef.current.scrollTop !== 0) {
        setShowShadow(true);
      }
      if (showShadow && layoutContentRef.current.scrollTop === 0) {
        setShowShadow(false);
      }
    };
  }, [showShadow]);

  const [breadcrumb, setBreadCrumb] = useState([]);

  const routeMap = useRef<Map<string, React.ReactNode[]>>(new Map());

  const showNavbar = true;
  const showFooter = true;

  useEffect(() => {
    const routeConfig = routeMap.current.get(pathname);
    setBreadCrumb(routeConfig || []);
  }, []);

  return (
    <div className={styles.layout}>
      <div
        id="logout-content"
        ref={layoutContentRef}
        className={styles['layout-content']}
      >
        <div className={styles['layout-navbar']}>
          <div
            className={showShadow ? styles['navbar-shadow'] : ''}
            style={{ transition: 'all 0.5s' }}
          >
            <Navbar show={showNavbar} />
          </div>
        </div>
        <div className={styles['layout-content-wrapper']}>
          {!!breadcrumb.length && (
            <div className={styles['layout-breadcrumb']}>
              <Breadcrumb>
                {breadcrumb.map((node, index) => (
                  <Breadcrumb.Item key={index}>
                    {typeof node === 'string' ? locale[node] || node : node}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>
          )}
          <Content>
            <Switch>
              {flattenRoutes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={`/${route.key}`}
                    component={route.component}
                  />
                );
              })}
              <Route exact path="/">
                <Redirect to={`/${defaultRoute}`} />
              </Route>
              <Route
                path="*"
                component={lazyload(() => import('../pages/exception/404'))}
              />
            </Switch>
          </Content>
        </div>
        {showFooter && <Footer />}
      </div>
    </div>
  );
}

export default PageLayout;
