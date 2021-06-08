import React, { Component } from 'react';
import SideMenu from 'Components/sideMenu';
import Header from 'Components/header';
import { Layout as AntdLayout } from 'antd';
import style from './index.module.less';

const { Content } = AntdLayout;

class Layout extends Component {
  render() {
    const { menu, logo, headerInfo, children } = this.props;

    //判断是否iframe集成，私有化部署的时候隐藏菜单和头
    const isNotFrame = window.self === window.top;

    return (
      <AntdLayout className={style.layout}>
        {isNotFrame && (
          <SideMenu
            menu={menu}
            logo={logo}
            pathname={window.location.pathname.slice(1)}
          />
        )}
        <AntdLayout className={style['layout-content']}>
          {isNotFrame && <Header headerInfo={headerInfo}></Header>}
          <Content>{children}</Content>
        </AntdLayout>
      </AntdLayout>
    );
  }
}

export default Layout;
