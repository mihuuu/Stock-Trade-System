import React, { Component } from 'react';
import { Popover, Menu, Layout, Icon, Badge } from 'antd';
import history from './history'
const { Header } = Layout;
const SubMenu = Menu.SubMenu;


const text = <span>新消息</span>;
const content = (
  <div>
    <p>Message 1</p>
    <p>Message 2</p>
  </div>
);

class HeaderBar extends Component {
  logout(){
    localStorage.removeItem("userinfo");
    history.push('/login');
  }

  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Menu mode="horizontal" 
        style={{ lineHeight: '64px', float: 'right', marginRight:'20px' }}
        >
          <Menu.Item style={{ marginRight:'20px' }}>
            <Popover placement="leftTop" title={text} content={content} trigger="click">
              <Badge count={5} overflowCount={99} style={{height:'15px',lineHeight:'15px'}}>
                <Icon type="mail" style={{fontSize:18, color: '#1890ff'}}/>
              </Badge>
            </Popover>
          </Menu.Item>
          <SubMenu
            title={<span>
              <Icon type="user" style={{fontSize:18, color: '#1890ff'}}/> {this.props.username}
            </span>}
            >
            <Menu.Item key="profile" style={{textAlign:'center'}}>
              <span>profile</span>
            </Menu.Item>
            <Menu.Item key="logout" style={{textAlign:'center'}}>
              <span onClick={this.logout}>logout</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
    );
  }
}

export default HeaderBar;

