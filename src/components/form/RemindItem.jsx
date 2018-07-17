import React from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';

import {message, Table, Icon, Divider } from 'antd';

function handleClick(values,events){
  /*预备好的数据*/
  let userinfo=JSON.parse(sessionStorage.getItem('userinfo'))
  let username=userinfo['username']
  let code=values.code
  console.log(username)
  console.log(code)

  /*给账户业务发送用户名和股票代码,对方帮忙删除,如果删除成功,返回1,否则返回0*/
  fetch('http://127.0.0.1:8080/account/name_code_delete.json')
  .then(res=>res.json())
  .then(res=>{
    if(res['code']==200){
      /*如果code为200,则data也一定为1,就不用判断了*/
      message.success('删除成功')

      setTimeout(()=>{
        window.location.reload()
      },1000)
      // setTimeout(()=>{
      //   window.location.reload()
      // },1000)
    }
    else{
      message.error('删除失败')
      console.log(res['msg'])
    }
  })

}
const columns = [{
  title: '股票代码',
  dataIndex: 'code',
  key: 'code',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '提醒价格',
  dataIndex: 'remind_price',
  key: 'remind_price',
}, {
  title: '当前价格',
  dataIndex: 'curr_price',
  key: 'curr_price',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;" onClick={handleClick.bind(this,record)}>撤销</a>
    </span>
  ),
}];

class RemindItem extends React.Component{
  constructor(){
    super()
    this.state={
      data:[],
    }

  }
  componentDidMount(){
    /*从账户业务那里拿到一组股票代码和提醒价格*/
    fetch("http://47.96.148.130:3000/account/name_to_code_remindprice.json")
    .then(res=>res.json())
    .then(res=>{
      if(res['code']==200){
        let i=0;
        for(i=0;i<res['data'].length;++i)
        {
          let stock={}
          stock['key']=i
          stock['code']=res['data'][i].code;
          stock['remind_price']=res['data'][i].remind_price

          /*从网上信息发布那里,通过股票代码获得当前价格*/
          fetch('http://47.96.148.130:3000/publish/code_to_name_price.json')
          .then(res=>res.json())
          .then(res=>{
            if(res['code']==200){
              stock['curr_price']=res['data']['price']
              if(stock['curr_price']>stock['remind_price']){
                stock['status']="ok"
              }
              else{
                stock['status']="not ok"
              }

              let data=this.state.data;
              data.push(stock)
              this.setState({
                data:data
              })

            }
            else{
              console.log(res['msg'])

            }

          })

        }
      }
      else{
        console.log(res['msg'])

      }

    })
  }
  render(){
    return (
      <Table columns={columns} dataSource={this.state.data}  />
    )
  }
}
export default RemindItem;
