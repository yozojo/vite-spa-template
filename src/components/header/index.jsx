import React, { Component } from 'react';
import { Layout, Tooltip, Dropdown, Menu, Badge } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import { connect } from 'react-redux';
import * as action from '@/store/actions/global-action';
import style from './index.module.less';

const { Header: AntdHeader } = Layout;

class Header extends Component {
  toggle() {
    const { dispatch, collapsed } = this.props;
    dispatch(action.collapsed(collapsed));
  }

  render() {
    const { headerInfo } = this.props;

    const menu = (
      <Menu>
        {headerInfo.menu &&
          headerInfo.menu.map((item, index) => (
            <Menu.Item key={index}>
              <a href={item.url}>
                {React.createElement(AntdIcons[item.icon])} {item.value}
              </a>
            </Menu.Item>
          ))}
      </Menu>
    );

    return (
      <AntdHeader className={style.header}>
        <div className={style['header-right']}>
          {headerInfo.help && (
            <Tooltip placement="bottom" title={headerInfo.help.text}>
              <a target="_blank" href={headerInfo.help.linkUrl} className={style.help}>
                <AntdIcons.QuestionCircleOutlined />
              </a>
            </Tooltip>
          )}

          {headerInfo.notice && (
            <span className={style.notice}>
              <Badge
                count={headerInfo.notice.count}
                overflowCount={headerInfo.notice.overflowCount}
                showZero>
                <a target="_blank" href={headerInfo.notice.linkUrl}>
                  <AntdIcons.BellOutlined />
                </a>
              </Badge>
            </span>
          )}

          {headerInfo.user && (
            <Dropdown overlay={menu}>
              <span className={style.username}>
                <img
                  src="https://portal-static.tongdun.cn/static-public/micro-frontend/seed/1.1.2/user.svg"
                  alt=""
                />
                {headerInfo.user.userName}
              </span>
            </Dropdown>
          )}
        </div>
      </AntdHeader>
    );
  }
}

export default connect((state) => {
  return {
    collapsed: state.global.collapsed,
  };
})(Header);
