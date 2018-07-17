import React, { Component } from 'react';
import { message,Modal,Avatar, Popover, Menu, Layout, Icon, Badge } from 'antd';
import history from './history'
import './App.less'
import my_avatar from '../imgs/zju_avatar.jpg'
const { Header } = Layout;
const confirm=Modal.confirm;
const SubMenu = Menu.SubMenu;

const text = <span>新消息</span>;
const content = (
  <div>
    <p>Message 1</p>
    <p>Message 2</p>
  </div>
);

class HeaderBar extends Component {
  logout=(e)=>{
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    history.push('/start');
  }
  upgrade = (e) => {
    e.preventDefault();

    let vip_url = 'http://111.231.75.113:5002/api/account/vip'
    let userInfo=JSON.parse(localStorage.getItem("userInfo"))
    let account_id = userInfo.account_id//资金
    let id=userInfo.id

    console.log(JSON.parse(localStorage.getItem("userInfo")))
    console.log(account_id)
    fetch(vip_url, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        account_id:account_id,
       })
    })
    .then(res => {
      console.log(res);
      if(res.status!=200){
        message.error("充值失败!余额不足或您已经是高级用户");
        return 0;
      }
      return res.json()
    })
    .then(res => {

        if(res==0){
          return;
        }
      message.success('升级成功,您已经是高级用户')
      console.log(res);
    })
  }

  showConfirm () {
    confirm({
      title: '账户升级',
      content: '是否升级为高级用户？',
      onOk() {
        console.log('OK');

            let vip_url = 'http://111.231.75.113:5002/api/account/vip'
            let userInfo=JSON.parse(localStorage.getItem("userInfo"))
            let account_id = userInfo.account_id//资金
            let id=userInfo.id

            console.log(JSON.parse(localStorage.getItem("userInfo")))
            console.log(account_id)
            fetch(vip_url, {
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
              },
              body:JSON.stringify({
                accountId:account_id,
               })
            })
            .then(res => {
              console.log(res);
              if(res.status!=200){
                message.error("充值失败!余额不足或您已经是高级用户");
                return 0;
              }
              return 1;
            })
            .then(res => {
              if(res==0){
                return;
              }
              message.success('升级成功,您已经是高级用户')
              let userInfo_tmp=JSON.parse(localStorage.getItem("userInfo"))
              userInfo_tmp.account_type='g'
              localStorage.setItem('userInfo',JSON.stringify(userInfo_tmp))

              setTimeout(()=>{
                window.location.reload()
              },3000)
              console.log(res);
            })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }



  render() {
    let username=JSON.parse(localStorage.getItem('userInfo')).name;
    let type=JSON.parse(localStorage.getItem('userInfo')).account_type
    return (
      <Header style={{ background: '#fff', padding: 0 }} className="mainHeader">
        <Menu mode="horizontal" className="mainHeaderMenu"
          style={{float: 'right', marginRight: '20px'}}
        >
          <Menu.Item style={{ marginRight:'20px' }}>
            <Popover placement="leftTop" title={text} content={this.props.message} trigger="click">
              <Badge  count={this.props.count} overflowCount={99} style={{height:'15px',lineHeight:'15px'}}>
                <Icon type="mail" style={{fontSize:18, color: '#1890ff'}}/>
              </Badge>
            </Popover>
          </Menu.Item>
          <SubMenu
            title={<span>
              <Avatar src={my_avatar} style={{width:'26px', height:'26px', marginRight:'8px'}}/>
                {type=='g'&&<span style={{color:'red'}}>{username}</span>}
                {type=='n'&&<span>{username}</span>}
            </span>}
            >
            <Menu.Item key="profile" style={{textAlign:'center'}}>
              <span>个人信息</span>
            </Menu.Item>
            <Menu.Item key="vip" style={{textAlign:'center'}}>
              <span onClick={this.showConfirm}>账户升级</span>
            </Menu.Item>
            <Menu.Item key="logout" style={{textAlign:'center'}}>
              <span onClick={this.logout}>用户注销</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
    );
  }
}

export default HeaderBar;
