import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import myLogo from '../imgs/money.png'
// import './App.less'
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const LogoStyle = {
  'height': '32px',
  'margin': '16px',
};


class SiderMenu extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

	render() {

		return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo"
        style={this.state.collapsed?
        {backgroundSize:'70%', textAlign:"center"}:{backgroundSize:'30%', textAlign:"center"}}>
          <img src={myLogo} alt="logo" style={{height:36,margin:12, display:"inlineBlock"}}/>
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
        >
          <Menu.Item key="/app">
            <Link to='/app'>
              <Icon type="home" /><span>主页</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='/app/search'>
            <Link to='/app/search'>
              <Icon type="search" />
              <span>股票查询</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={<span><Icon type="star-o" /><span>我的账户</span></span>}
          >
            <Menu.Item key="/app/myfund">
              <Link to='/app/myfund'><span>资金信息</span></Link>
            </Menu.Item>
            <Menu.Item key="/app/mystock">
              <Link to='/app/mystock'><span>持有股票</span></Link>
            </Menu.Item>

          </SubMenu>
          <SubMenu
            key="sub2"
            title={<span><Icon type="pay-circle-o" /><span>股票交易</span></span>}
          >
            <Menu.Item key="/app/buystock">
              <Link to='/app/buystock'>
                <span>购买</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/app/sellstock">
              <Link to='/app/sellstock'>
                <span>出售</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/app/mycommand">
              <Link to='/app/mycommand'>
                <span>交易记录</span>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub3"
            title={<span><Icon type="setting" /><span>我的信息</span></span>}
          >
            <Menu.Item key="/app/myremind">
              <Link to='/app/myremind/item'><span>消息提醒</span></Link>
            </Menu.Item>
            <Menu.Item key="/app/changepwd">
              <Link to='/app/changpwd'><span>修改密码</span></Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
	}
}

export default SiderMenu;
