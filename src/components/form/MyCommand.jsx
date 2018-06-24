import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {message, Table, Icon, Divider } from 'antd';



function handleClick(values,events){
  /*预备数据*/
  let userinfo=JSON.parse(sessionStorage.getItem('userinfo'))
  let username=userinfo['username']
  let timestamp=values.timestamp
  console.log(username)
  console.log(timestamp)

  /*将用户名和时间戳发给中央交易系统,如果返回1,说明撤销成功,刷新页面,否则撤销失败*/
  fetch('http://127.0.0.1:8080/central/cmd_cancle.json')
  .then(res=>res.json())
  .then(res=>{
    if(res['code']==200){
      /*如果操作码是200,说明data为1,说明操作成功*/
      message.success('撤销成功')

      setTimeout(()=>{
        window.location.reload()
      },1000)

    }
    else{
      message.error('撤销失败')
      console.log(res['msg'])
    }


  })

}


const columns = [{
  title: '编号',
  dataIndex: 'id',
  key: 'id',
  //render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '时间戳',
  dataIndex: 'timestamp',
  key: 'timestamp',
  //render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '买卖',
  dataIndex: 'status1',
  key: 'status1',
  //render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '买卖价格',
  dataIndex: 'price',
  key: 'price',
}, {
  title: '买卖数量',
  dataIndex: 'amount',
  key: 'amount',
}, {
  title: '指令状态',
  dataIndex: 'status2',
  key: 'status2',
}, {
  title: '交易价格',
  dataIndex: 'traded_price',
  key: 'traded_price',
}, {
  title: '交易数量',
  dataIndex: 'traded_amount',
  key: 'traded_amount',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;" onClick={handleClick.bind(this,record)}>撤销</a>
    </span>
  ),
}];



class MyCommand extends React.Component{
  constructor(){
    super()
    this.state={
      data:[],
    }
  }

  componentDidMount(){
    /*发送用户名过去,从中央交易系统那里拿到关于该用户的所有指令*/
    //fetch("http://127.0.0.1:8080/central/name_to_cmd.json")
    let url = "http://10.189.134.68:5000/search"
    let account_id=localStorage.getItem('account_id')
    fetch(url, {
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        account_id:account_id,
        // stock_id:stock_code,
        // number:buy_number,
        // price:buy_price,
      })
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res);
      // if(res['code']==200){
      //   let i=0;
      //   for(i=0;i<res['data'].length;++i)
      //   {
      //     let stock={}
      //     stock['key']=i
      //     stock['id']=res['data'][i].id;
      //     stock['timestamp']=res['data'][i].timestamp
      //     stock['status1']=res['data'][i].status1
      //     stock['price']=res['data'][i].price
      //     stock['amount']=res['data'][i].amount
      //     stock['status2']=res['data'][i].status2
      //     stock['traded_price']=res['data'][i].traded_price
      //     stock['traded_amount']=res['data'][i].traded_amount

      //     let data=this.state.data;
      //     data.push(stock)
      //     this.setState({
      //       data:data
      //     })
      // }
      // }
      // else{
      //   console.log(res['msg'])

      // }
      
    })
  }

  render(){
    return(
      <Table columns={columns} dataSource={this.state.data}  />
    )


  }

}

export default MyCommand;
