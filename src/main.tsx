
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ConfigProvider, Notification } from '@arco-design/web-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import rootReducer from './store';
import PageLayout from './layout';
import { GlobalContext } from './context';
import { checkLogin } from '@/utils/tools/checkLogin';
import changeTheme from '@/utils/tools/changeTheme';
import useStorage from './utils/useStorage';
import {
  ArcoLocale
} from '@/config/ArcoLocale'

import { ComponentConfig } from '@arco-design/web-react/es/ConfigProvider/interface';

import './less/index.less'
import './style/global.less';
import './style/theme/index.less';

const store = createStore(rootReducer);

function Index() {
  Notification.config({
    maxCount: 3,
  })

  const [lang, setLang] = useStorage('arco-lang', 'en-US');
  const [theme, setTheme] = useStorage('arco-theme', 'dark');

  async function fetchUserInfo() {
    try {
      const data = {}
      store.dispatch({
        type: 'update-userInfo',
        payload: { userInfo: data },
      });
    } catch (error) {
    }
  }

  useEffect(() => {
    if (checkLogin()) {
      fetchUserInfo();
    } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
      //   window.location.pathname = '/home';
    }
  }, []);

  const componentConfig: ComponentConfig = {

  }
  const locale = ArcoLocale[lang] || ArcoLocale[0]


  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };

  return (
    <BrowserRouter>
      <ConfigProvider
        locale={locale}
        componentConfig={componentConfig}
      >
        <Provider store={store}>
          <GlobalContext.Provider value={contextValue}>
            <Switch>
              {/* <Route path="/login" component={Login} /> */}
              <Route path="/" component={PageLayout} />
            </Switch>
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
