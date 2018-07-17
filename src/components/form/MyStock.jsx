import React from 'react';
import {Table} from 'antd'

const columns = [{
  title: '代码',
  dataIndex: 'code',
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.code.length - b.code.length,
}, {
  title: '名称',
  dataIndex: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '持有股数(可用)',
  dataIndex: 'number1',
  // sorter: (a, b) => a.number - b.number,
}, {
  title: '持有股数(冻结)',
  dataIndex: 'number2',
  // sorter: (a, b) => a.number - b.number,
}, {
  title: '当前价格',
  dataIndex: 'price',
  sorter: (a, b) => a.price - b.price,
}, {
  title: '持有成本',
  dataIndex: 'cost',
  sorter: (a, b) => a.cost - b.cost,
}, {
  title: '股票损益',
  dataIndex: 'income',
}

];

const data = [{
  key: '1',
  code: 'A1',
  name: '阿里巴巴',
  number: 10,
  price: 25.38,
  cost: 45.95,
  income: '+2.3%'
}, {
  key: '2',
  code: 'B1',
  name: '腾讯',
  number: 15,
  price: 14.38,
  cost: 25.95,
  income: '+6.4%'
}, {
  key: '3',
  code: 'Z4',
  name: '百度',
  number: 20,
  price: 32.44,
  cost: 45.95,
  income: '-4.9%'
}];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}


class MyStock extends React.Component {

  constructor(){
    super()
    this.state={
      data:[],
    }
  }

  cal_cost(){
    return 1
  }

  componentDidMount(){
    /*从账户业务那里拿到一组股票代码和提醒价格*/
      let project_url='111.231.75.113:5002'
      let token=localStorage.getItem('token')
      console.log(token)
      fetch('http://'+project_url+'/api/stock/select',
      {
        method:"GET",//#method: "POST",
        headers:{
          'Authorization': 'Bearer '+token,
          },
      })
      .then(res=>{
        if(res['status']==200){
          return res.json()
        }
        else{
          return 0;
        }
      })
      .then(res=>{

        console.log(res)
        if(res['status']==0){
          return;
        }
        let i =0;
        for(i=0;i<res.length;++i)
        {
          let key=i;
          let code=res[i]['stockCode']

          let number1=res[i]['sharesNumAvailable'];
          let number2=res[i]['sharesNumUnavailable']
          let cost=res[i]['averageCost']

          let publish_url='http://192.144.171.192:3000'
          let get_url=publish_url+'/api/stockinfo?line='+code
          /*通过股票代码获得股票名称*/
          console.log(get_url)
          fetch(get_url)
          .then(res=>{
            if(res['status']==200){
              return res.json()
            }
            else{
              console.log(res)
              return 0
            }
          })
          .then(res=>{
            if(res==0){
              return;
            }
            let i=0;
            for(i=0;i<res['list'].length;++i)
            {
              let stock={}
              stock['key']=key;
              stock['code']=code
              stock['number1']=number1
              stock['number2']=number2
              stock['cost']=cost
              stock['name']=res['list'][i]['name']

              /*通过股票代码获得股票的价格*/
              let get_url1=publish_url+'/api/stockprice?code='+code+"&mode="+'single'
              /*price*/
              fetch(get_url1)
              .then(res=>{
                if(res['status']==200){
                  return res.json()
                }
                else{
                  console.log('cannot get price',res)
                  return 0;
                }})
              .then(res=>{
                console.log('code->price:',res)
                if(res==0){
                  return;
                }
                if(res['data']['state_code']!=1){
                  stock['price']=res['data']['list']['price']
                  // stock['income']=stock['price']*stock['number']%100*0.01+"%"
                  // stock['income']=(Math.random()*10)-5+"%"

                }
                console.log('getting price',res)
                let data=this.state.data;
                data.push(stock)
                this.setState({
                  data:data
                })
              })
            }
          })
        }
      })
    // fetch("http://127.0.0.1:8080/account/name_to_code_amount.json")
    // .then(res=>res.json())
    // .then(res=>{
    //   if(res['code']==200){
    //     let i=0;
    //     for(i=0;i<res['data'].length;++i)
    //     {
    //       let stock={}
    //       stock['key']=i
    //       stock['code']=res['data'][i].code;
    //       stock['number']=res['data'][i].amount
    //
    //       /*从网上信息发布那里,通过股票代码获得当前价格*/
    //       fetch('http://127.0.0.1:8080/publish/code_to_name_price.json')
    //       .then(res=>res.json())
    //       .then(res=>{
    //         if(res['code']==200){
    //           stock['name']=res['data']['name']
    //           stock['price']=res['data']['price']
    //
    //           /*发送用户名过去,从中央交易系统那里拿到关于该用户的所有指令,从而计算股票的持有成本*/
    //           fetch("http://127.0.0.1:8080/central/name_to_cmd.json")
    //           .then(res=>res.json())
    //           .then(res=>{
    //             if(res['code']==200){
    //               let i=0;
    //               let denominator=res['data'].length==0?1:0;
    //               let numerator=0;
    //               /*交易价格*交易数量*/
    //               for(i=0;i<res['data'].length;++i)
    //               {
    //                 numerator+=res['data'][i].traded_price*res['data'][i].traded_amount
    //                 denominator+=res['data'][i].traded_amount;
    //               }
    //               stock['cost']=numerator/denominator;
    //
    //               /*计算股票损益,当前价格*持有股数-sigma(交易价格*交易数量)*/
    //               stock['income']=stock['price']*stock['number']-numerator;
    //
    //
    //               let data=this.state.data;
    //               data.push(stock)
    //               this.setState({
    //                 data:data
    //               })
    //
    //
    //             }
    //             else{
    //               console.log(res['msg'])
    //
    //             }
    //
    //           })
    //
    //         }
    //         else{
    //           console.log(res['msg'])
    //
    //         }
    //
    //       })
    //
    //     }
    //   }
    //   else{
    //     console.log(res['msg'])
    //
    //   }
    //
    // })
  }  render() {
    return (
      <Table columns={columns} dataSource={this.state.data} onChange={onChange} />
    );
  }
}

export default MyStock;
