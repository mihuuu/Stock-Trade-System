/*eslint-disable import/first*/

import React, { Component } from 'react';
import { Redirect, Route, Switch,Link } from 'react-router-dom';
import SiderMenu from './SiderMenu';
import HeaderBar from './HeaderBar';
import Bread from './Bread'
import { Layout, Breadcrumb } from 'antd';
import './App.less';
const { Content, Footer } = Layout;

import Welcome from '../form/Welcome';
import SearchStock from '../form/SearchStock';
import MyFund from '../form/MyFund';
import MyStock from '../form/MyStock';
import BuyStock from '../form/BuyStock';
import SellStock from '../form/SellStock';
import ChangePassword from '../form/ChangePassword.jsx';
import MyRemind from '../form/MyRemind.jsx';
import MyCommand from '../form/MyCommand.jsx';
import Candlestick from '../form/Candlestick.jsx';
import Test from '../form/test.jsx';



class App extends Component {
  constructor(){
    super();
    this.state={
      messages:[],
    }
    this.state={
      count:0,
      message:(
        <div>
          {this.state.messages}
        </div>
      )
    }
  }






  /*高级提醒功能*/
  componentDidMount(){
    /*如果登录,就高级提醒*/
    // if(localStorage.getItem('userInfo')!=null){
    //
    //     /*每5分钟用户名去访问一次账户业务模块,得到用户名对应的股票代码和提醒价格,
    //     然后凭借股票代码去得到股票当前价格,
    //     如果股票当前价格大于提醒价格,就修改右上角邮箱里的值,并且增加
    //     如果点击了右上角的邮箱,(红色的数字和里面的结果消失)
    //     如果点击里面的结果,就跳转到我的提醒那里*/
    //     setInterval(()=>{
    //       /*预备数据*/
    //       let userinfo=JSON.parse(sessionStorage.getItem('userInfo'))
    //       /*没有登录,就不做了*/
    //       if(userinfo===null){
    //         return;
    //       }
    //       let username=userinfo['username']
    //         /*从账户业务那里拿到一组股票代码和提醒价格*/
    //       // fetch("http://127.0.0.1:8080/account/name_to_code_remindprice.json")
    //       fetch("http://47.96.148.130:3000/account/name_to_code_remindprice.json")
    //       .then(res=>res.json())
    //       .then(res=>{
    //         if(res['code']==200){
    //           let i=0;
    //           for(i=0;i<res['data'].length;++i)
    //           {
    //             let code=res['data'][i].code;
    //             let remind_price=res['data'][i].remind_price;
    //             /*从网上信息发布那里,通过股票代码获得当前价格*/
    //             fetch('http://47.96.148.130:3000/publish/code_to_name_price.json')
    //             .then(res=>res.json())
    //             .then(res=>{
    //               if(res['code']==200){
    //                 let curr_price=res['data']['price']
    //
    //                 /*当前价格大于提醒价格,需要提醒*/
    //                 if(curr_price>remind_price){
    //                   let new_msg=<p key={code}><Link to='/app/myremind/item'>{code}</Link></p>
    //                   let messages=this.state.messages
    //
    //                   /*第一次的消息时,为null*/
    //                   if(messages==null)
    //                   {
    //                     messages=[new_msg]
    //                     let count=this.state.count+1;
    //                     this.setState({
    //                       count:count
    //                     })
    //                   }
    //                   else{
    //                     /*如果new_msg不再messages里面的话,就不用push了*/
    //                     let j=0;
    //                     let push_ok=true;
    //                     for(j=0;j<messages.length;++j){
    //                       if(new_msg.key==messages[j].key){
    //                         push_ok=false;
    //                         break;
    //                       }
    //                     }
    //                     if(push_ok){
    //                       messages.push(new_msg)
    //                       let count=this.state.count+1;
    //                       this.setState({
    //                         count:count
    //                       })
    //                     }
    //                   }
    //                   this.setState({
    //                     messages:messages
    //                   })
    //                   this.setState({
    //                     message:(
    //                       <div>
    //                         {this.state.messages}
    //                       </div>
    //                     )
    //                   })
    //                 }
    //               }
    //               else{
    //                 console.log(res['msg'])
    //               }
    //             })
    //           }
    //         }
    //         else{
    //           console.log(res['msg'])
    //
    //         }
    //
    //       })
    //
    //
    //     },5000)
    // }
    // /*没有登录,就关闭计时器*/
    // else{
    //
    // }



  }




  render() {
    let name;

    /*状态规定:1. 已登录<=>sessionStorage里面有userinfo,没有的话从localStorage里获取 2.未登录<=>sessionStorage和localStorage里面都没有userinfo*/
    /*思路:
    如果已登录,访问login:跳转到/app;
              访问其他:不跳转;
    如果未登录,访问login,不跳转;
              访问其他,跳转到/login;*/

    /*进入其他页面,如果没有登录的话,就跳转到login里面*/
    if (localStorage.getItem("userInfo") === null) {
      return <Redirect to="/login"/>
    } else {
      /*已登录状态,访问其他网站,不处理*/
      /*确保sessionStorage里面有userInfo*/
      if(sessionStorage.getItem('userInfo')===null){
        let tmp=localStorage.getItem('userInfo')
        sessionStorage.setItem('userInfo',tmp)
      }

      name = JSON.parse(sessionStorage.getItem("userInfo")).username;
    }

    return (
      <div className="App">
        <Layout style={{ minHeight: '100vh' }} className="mainLayout">
          <SiderMenu/>
          <Layout>
            <HeaderBar username={name} message={this.state.message} count={this.state.count} />
            <Content style={{margin: '0 16px'}}>
              <Breadcrumb style={{ margin: '12px 0' }} >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 420 }}>
              <Switch>
                <Route exact path='/app' component={Welcome} />
                <Route exact path='/app/search' component={SearchStock} />
                <Route exact path='/app/myfund' component={MyFund} />
                <Route exact path='/app/mystock' component={MyStock} />
                <Route exact path='/app/changpwd' component={ChangePassword} />
                <Route exact path='/app/mycommand' component={MyCommand} />
                <Route exact path='/app/buystock' component={BuyStock} />
                <Route exact path='/app/sellstock' component={SellStock} />
                <Route exact path='/app/test' component={Test} />
                <Route exact path='/app/candlestick' component={Candlestick} />
                <Route path='/app/myremind' component={MyRemind} />
              </Switch>
              </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
              iStock ©2017-2018 Created by ZJUer
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
