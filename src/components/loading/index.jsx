import React, { Component } from 'react';
import { Spin } from 'antd';
import style from './index.module.less';

export default function Loading() {
  return (
    <div className={style['container-spin']}>
    <Spin size="large" tip="Loading" className={style.spin} />
  </div>
  )
}

