import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Layout from 'Components/layout';
import Loading from 'Components/loading';
// import Forbid from "Pages/exception/403.jsx";
// import NotFound from "Pages/exception/404.jsx";
// import Error from "Pages/exception/500.jsx";

const config = {
  menu: [
    {
      value: '主页',
      key: 'home',
      url: '/home',
      icon: 'HomeOutlined',
    },
  ],
  headerInfo: {
    user: {
      userName: '小盾',
    },
    menu: [
      {
        value: '退出登录',
        url: '/logout.htm',
        icon: 'LogoutOutlined',
      },
    ],
  },
  logo: {
    imageCollapsed:
      'https://portal-static.tongdun.cn/static-public/sec/common/1.0.0/logo.svg',
    image: 'https://portal-static.tongdun.cn/static-public/sec/common/1.0.0/logo.svg',
    text: 'vite-tempalte',
  },
};

const routes = (
  <Router>
    <Layout {...config}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to={config.menu[0].url} />}
          />
          {config.menu.map((item, index) => {
            return (
              <Route
                key={index}
                path={`${item.url}`}
                component={lazy(() => import(`./pages${item.url}/index.tsx`))}
              />
            );
          })}

          {/* <Route exact path="/exception/403" component={Forbid} />
          <Route exact path="/exception/404" component={NotFound} />
          <Route exact path="/exception/500" component={Error} />
          <Route path="*" render={() => <Redirect to="/exception/404" />} /> */}
        </Switch>
      </Suspense>
    </Layout>
  </Router>
);

export default routes;
