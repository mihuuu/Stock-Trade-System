import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {message, Table, Icon, Divider } from 'antd';


var central_url='http://95.169.8.179:5000/'

function handleClick(values,events){
  /*预备数据*/
  let userinfo=JSON.parse(sessionStorage.getItem('userInfo'))
  let username=userinfo['username']
  let timestamp=values.timestamp
  console.log('values',values)
  console.log('username',username)
  console.log('timestamp',timestamp)

  if(values.state=='bought'||values.state=='sold'){
    message.error('已经出售或已经买入,无法撤销!')
    return;
  }
  else if(values.state=='buying'){
    fetch(central_url+'buyrecall',{
      method:"POST",
      // mode:'cors',
      headers:new Headers({
        'Content-Type': 'application/json',
      }),
      body:JSON.stringify({
        buyer_instruction_id:values.id,
      })
    })
    .then(res=>{
      console.log(res)
      if(res['status']==200){
        return res.text()
      }
      else{
        return 0
      }
    })
    .then(res=>{
      if(res==0||res=='fail!'){
        message.error('撤销失败')
        return;
      }
      else{
        message.success('撤销成功')
        setTimeout(()=>{
          window.location.reload()
        },3000)
      }
    })
  }
  else if(values.state=='selling'){
    fetch(central_url+'sellrecall',{
      method:"POST",
      // mode:'cors',
      headers:new Headers({
        'Content-Type': 'application/json',
      }),
      body:JSON.stringify({
        buyer_instruction_id:values.id,
      })
    })
    .then(res=>{
      console.log(res)
      if(res['status']==200){
        return res.text()
      }
      else{
        return 0
      }
    })
    .then(res=>{
      if(res==0||res=='fail!'){
        message.error('撤销失败')
        return;
      }
      else{
        message.success('撤销成功')
        setTimeout(()=>{
          window.location.reload()
        },3000)
      }
    })
  }
  /*将用户名和时间戳发给中央交易系统,如果返回1,说明撤销成功,刷新页面,否则撤销失败*/
  // fetch('http://127.0.0.1:8080/central/cmd_cancle.json')
  // .then(res=>{
  //   if(res.status==200){
  //     return res.json();
  //   }
  //   else{
  //     return 0;
  //   }
  // })
  // .then(res=>{
  //   console.log(res)
  //   // if(res['code']==200){
  //   //   /*如果操作码是200,说明data为1,说明操作成功*/
  //   //   message.success('撤销成功')
  //   //
  //   //   setTimeout(()=>{
  //   //     window.location.reload()
  //   //   },1000)
  //   //
  //   // }
  //   // else{
  //   //   message.error('撤销失败')
  //   //   console.log(res['msg'])
  //   // }
  //
  //
  // })
  //
}


const columns = [{
  title: '序号',
  dataIndex: 'no',
  key: 'no',
  //render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '时间戳',
  dataIndex: 'timestamp',
  key: 'timestamp',
  sorter: (a, b) => a.timestamp.length - b.timestamp.length,
  //render: text => <a href="javascript:;">{text}</a>,
},  {
  title: '买卖数量',
  dataIndex: 'amount',
  key: 'amount',
}, {
  title: '买卖价格',
  dataIndex: 'price',
  key: 'price',
}, {
  title: '指令状态',
  dataIndex: 'state',
  key: 'state',
  filters: [{
    text: 'bought',
    value: 'bought',
  }, {
    text: 'sold',
    value: 'sold',
  },{
    text: 'buying',
    value: 'buying',
  },{
    text: 'selling',
    value: 'selling',
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.state.indexOf(value) === 0,
},{
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
    // let url = "http://10.189.134.68:5000/search"

      let account_id=JSON.parse(localStorage.getItem('userInfo')).account_id
      fetch(central_url+'fuckyou',{
        method:"POST",
        // mode:'cors',
        headers:new Headers({
          'Content-Type': 'application/json',
        }),
        body:JSON.stringify({
          id:account_id
        })
      })
      .then(res=>{
        if(res['status']==200){
          return res.json()
        }
        else{
          return 0
        }
      })
      .then(res=>{
        if(res==0){
          return;
        }
        console.log(res)
        let num=1;

        let data=this.state.data

        let type='bought'
        let i=0;

        for(i=0;i<res['bought'].length;++i){
          let one_data={}
          one_data['key']=num
          // one_data['id']=res[type][i]['transaction_id']
          one_data['timestamp']=res[type][i]['time_stamp']
          one_data['state']=type
          one_data['amount']=res[type][i]['number']
          one_data['price']=res[type][i]['price']
          one_data['no']=num;
          num+=1;
          data.push(one_data)
        }

        type='buying'
        for(i=0;i<res['buying'].length;++i){
          let one_data={}
          one_data['key']=num
          one_data['id']=res[type][i]['buyer_instruction_id']
          one_data['timestamp']=res[type][i]['time_stamp']
          one_data['state']=type
          one_data['amount']=res[type][i]['number']
          one_data['price']=res[type][i]['price']
          one_data['no']=num;
          num+=1;
          data.push(one_data)
        }
        type='selling'
        for(i=0;i<res['selling'].length;++i){
          let one_data={}
          one_data['key']=num
          one_data['id']=res[type][i]['seller_instruction_id']
          one_data['timestamp']=res[type][i]['time_stamp']
          one_data['state']=type
          one_data['amount']=res[type][i]['number']
          one_data['price']=res[type][i]['price']
          one_data['no']=num;
          num+=1;
          data.push(one_data)
        }
        type='sold'
        for(i=0;i<res['sold'].length;++i){
          let one_data={}
          one_data['key']=num
          // one_data['id']=res[type][i]['transaction_id']
          one_data['timestamp']=res[type][i]['time_stamp']
          one_data['state']=type
          one_data['amount']=res[type][i]['number']
          one_data['price']=res[type][i]['price']
          one_data['no']=num;
          num+=1;
          data.push(one_data)
        }
        this.setState({
          data:data
        })


      })


      /*先通过账户获得股票代码*/
      // let project_url='111.231.75.113:5002'
      // let token=localStorage.getItem('token')
      // console.log(token)
      // fetch('http://'+project_url+'/api/stock/select',
      // {
      //   method:"GET",//#method: "POST",
      //   headers:{
      //     'Authorization': 'Bearer '+token,
      //     },
      // })
      // .then(res=>{
      //   if(res['status']==200){
      //     return res.json()
      //   }
      //   else{
      //     return 0;
      //   }
      // })
      // .then(res=>{
      //   console.log(res)
      //   if(res==0||res['status']==0){
      //     return;
      //   }
      //   let i =0;
      //   for(i=0;i<res.length;++i)
      //   {
      //     let stock_code=res[i]['stockCode']
      //
      //     console.log(stock_code)
      //
      //     let end=new Date()
      //     let start=new Date(end.getTime()-24*60*60*1000)
      //
      //     // console.log('12123')
      //     let central_url='http://192.168.1.122:5000/search'
      //
      //     // let account_id=JSON.parse(localStorage.getItem('userInfo')).account_id
      //     // console.log(account_id)
      //     // console.log(Date.parse(new Date()))
      //
      //     fetch(central_url, {
      //       method:"POST",
      //       // mode:'cors',
      //       headers:new Headers({
      //         'Content-Type': 'application/json',
      //       }),
      //       body:JSON.stringify({
      //         stock_code:stock_code,
      //         start:start,
      //         end:end,
      //       })
      //     })
      //     .then(res=>
      //       {
      //         console.log(res)
      //         if(res['status']==200){
      //           return res.json();
      //         }
      //         else{
      //           return 0;
      //         }
      //
      //       })
      //     .then(res=>{
      //       if(res==0){
      //         return;
      //       }
      //
      //       console.log(res);
      //       // if(res['code']==200){
      //       //   let i=0;
      //       //   for(i=0;i<res['data'].length;++i)
      //       //   {
      //       //     let stock={}
      //       //     stock['key']=i
      //       //     stock['id']=res['data'][i].id;
      //       //     stock['timestamp']=res['data'][i].timestamp
      //       //     stock['status1']=res['data'][i].status1
      //       //     stock['price']=res['data'][i].price
      //       //     stock['amount']=res['data'][i].amount
      //       //     stock['status2']=res['data'][i].status2
      //       //     stock['traded_price']=res['data'][i].traded_price
      //       //     stock['traded_amount']=res['data'][i].traded_amount
      //
      //       //     let data=this.state.data;
      //       //     data.push(stock)
      //       //     this.setState({
      //       //       data:data
      //       //     })
      //       // }
      //       // }
      //       // else{
      //       //   console.log(res['msg'])
      //
      //       // }
      //
      //     })
      //
      //
      //
      //   }
      //
      //
      // })


  }

  render(){
    return(
      <Table columns={columns} dataSource={this.state.data}  />
    )


  }

}

export default MyCommand;
