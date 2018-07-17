import React from 'react';
import { Redirect, Route, Switch,Link } from 'react-router-dom';

import { Layout, Menu, Breadcrumb } from 'antd';
import SetRemind from './SetRemind.jsx';
import RemindItem from './RemindItem.jsx';
const { Header, Content, Footer } = Layout;

class MyRemind extends React.Component{
  constructor(props){
    super(props)
    let curr_path=props.history.location.pathname
    console.log(props.history.location.pathname)
    let pos=curr_path.endsWith('/set')?2:1
    this.state={
      pos:pos.toString()
    }



  }
  render(){

    return (
      <Layout className="layout">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[this.state.pos]}
            style={{ lineHeight: '64px' }}

          >
            <Menu.Item key="1"><Link to="/app/myremind/item">当前提醒项</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/app/myremind/set">设定</Link></Menu.Item>
          </Menu>

        <Switch>
          <Route exact path='/app/myremind/item' component={RemindItem} />
          <Route exact path='/app/myremind/set' component={SetRemind} />
        </Switch>
      </Layout>
    )
  }
}
export default MyRemind;
