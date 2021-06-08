import React, { Component } from 'react';
import { Layout, Menu, Badge } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './index.module.less';

const {Sider, Header} = Layout;
const {SubMenu} = Menu;

class SideMenu extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  //递归遍历生成menu，渲染所有的子menu
  _loop = (data = []) => data.map((item) => {
    if (item.children) {
      return <SubMenu key={item.key} title={<span>{item.icon ?  React.createElement(AntdIcons[item.icon]) :''}<span>{item.value}</span></span>}>
        {this._loop(item.children)}</SubMenu>;
    }
    return <Menu.Item key={item.url}>
      <Link to={item.url} href={item.url} className={style.link} title={item.value}>
        {item.icon ?  React.createElement(AntdIcons[item.icon]) : ''}
        <span title={item.value}>{item.value}</span>
        {item.badge ? <Badge count={item.badge} overflowCount={99} className={style.badge} /> : null}
      </Link>
    </Menu.Item>;
  });

  render() {
    const {menu, logo, collapsed, pathname} = this.props;
    let _logo;
    if (logo) {
      _logo =
        <Header className={style['logo-header']}>
          {
            logo.text ?
              <a href="/">
                <img src={logo.imageCollapsed} height='32px' />
                <h1 className={style['logo-h1']}>{logo.text}</h1>
              </a>
              :
              (
                collapsed ?

                  <a href="/">
                    <img src={logo.imageCollapsed} height='32px' />
                  </a>
                  :
                  <a href="/">
                    <img src={logo.image} height='32px' />
                  </a>
              )
          }
        </Header>;
    }
    let defaultOpenKeys = [];
    pathname.split('/').map((item)=>{
      let len = defaultOpenKeys.length;
      if(len === 0){
        defaultOpenKeys.push(item);
      }else{
        defaultOpenKeys.push(defaultOpenKeys[len-1]+'/'+item)
      }

    })
    return (
      <Sider
        collapsible
        // collapsed={collapsed}
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        defaultCollapsed={true}
        // trigger={null}
        // trigger={this.state.collapsed?<AntdIcons.MenuUnfoldOutlined />:<AntdIcons.MenuFoldOutlined />}
        trigger={<span style={{position: 'absolute',
          left: 16}}>{this.state.collapsed?<AntdIcons.MenuUnfoldOutlined />:<AntdIcons.MenuFoldOutlined />}</span>}
        width={208}
        collapsedWidth={48}
        className={style.sider}
      >
        {
          _logo
        }
        <Menu
          selectedKeys={[`/${pathname}`]}
          defaultOpenKeys={defaultOpenKeys}
          mode='inline'
          theme='dark'
        >
          {this._loop(menu)}
        </Menu>
      </Sider>
    );
  }
}

// map state to props
export default connect((state) => {
  return {
    collapsed: state.global.collapsed,
  };
})(SideMenu);
