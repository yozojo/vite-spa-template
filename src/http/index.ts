/* 封装tdHttp拦截接口 */
import http from '@tongdun/tdhttp';
import { message } from 'antd';
import NProgress from 'nprogress';
import { debounce } from 'lodash-es';
import apis from './apis';

const IO = http(apis);

IO.interceptors.request.use(
  (config) => {
    NProgress.start();
    return config;
  },
  (error) => Promise.reject(error),
);

const debMsg = debounce((msg) => message.error(msg), 500);

IO.interceptors.response.use(
  (response) => {
    const { data } = response;
    NProgress.done();
    if (data.success) {
      return data.data;
    } else {
      const msg = data.msg || data.message;
      debMsg(msg);
      return Promise.reject(msg);
    }
  },
  (error) => {
    NProgress.done();
    return Promise.reject({ type: 1, error });
  },
);

export default IO;
