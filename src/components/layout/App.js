/*eslint-disable import/first*/

import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SiderMenu from './SiderMenu';
import HeaderBar from './HeaderBar';
import Bread from './Bread'
import { Layout, Breadcrumb } from 'antd';
import './App.css';
const { Content, Footer } = Layout;

import Welcome from '../form/Welcome';
import SearchStock from '../form/SearchStock';
import MyFund from '../form/MyFund';
import MyStock from '../form/MyStock';
import BuyStock from '../form/BuyStock';
import SellStock from '../form/SellStock';


class App extends Component {
  render() {
    let name;
    if (localStorage.getItem("userinfo") === null) {
      return <Redirect to="/login"/>
    } else {
      name = JSON.parse(localStorage.getItem("userinfo")).username;
    }

    return (
      <div className="App">
        <Layout style={{ minHeight: '100vh' }}>
          <SiderMenu/>
          <Layout>
            <HeaderBar username={name}/>
            <Content style={{margin: '0 16px'}}>
              <Breadcrumb style={{ margin: '12px 0' }} >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 400 }}>
              <Switch>	
                <Route exact path='/app' component={Welcome} />
                <Route exact path='/app/search' component={SearchStock} />
                <Route exact path='/app/myfund' component={MyFund} />
                <Route exact path='/app/mystock' component={MyStock} />
                <Route exact path='/app/buystock' component={BuyStock} />
                <Route exact path='/app/sellstock' component={SellStock} />
              </Switch>
              </div>          
            </Content>
            <Footer style={{textAlign: 'center'}}>
              iStock ©2017-2018 Created by G7
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
