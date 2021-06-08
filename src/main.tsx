import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import store, { history } from "./store";
import { ConfigProvider } from "antd";
import enUS from "antd/es/locale/en_US";
import 'antd/dist/antd.min.css';

import { ProviderApi } from "@tongdun/tdhttp";
import apis from "Http";

import App from './app'

import './index.less'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={enUS}>
      <ProviderApi apis={apis}>
        <App history={history} />
      </ProviderApi>
    </ConfigProvider>
  </Provider>
  ,
  document.getElementById('root')
)
