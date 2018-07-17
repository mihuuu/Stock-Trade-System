import React from 'react'
import {Input, List, Avatar, Button } from 'antd';
import myLogo from '../imgs/money.png'
import Candlestick from './Candlestick.jsx'
import Script from 'react-load-script'
const Search = Input.Search;

class SearchStock extends React.Component{
  constructor(){
    super()
    this.state={
      data:[],
      list_state:'block',
      k_state:'none',
      code:600838,
      result:{},
      count:0,
      height:0,
      interval:null,
    }

    setTimeout(()=>{
      this.setState({
        k_state:"block",


      })
    },5000)
  }

  /*通过输入股票代码,从而更新k线图*/
  update_k(code){
      let script=document.getElementById('content');
      document.body.removeChild(script)

      this.setState({
        code:code
      })

      script=document.createElement('script')
      script.id="content"
      script.innerHTML=this.get_string(code)
      document.body.appendChild(script);


  }
  handleSearch(value){
    if(this.state.interval!=null){
      clearInterval(this.state.interval)
    }
    // this.setState({
    //   interval:setInterval(()=>{
    //             if(this.props.history.location.pathname.endsWith('search'))
    //               console.log('interval',this.props.history.location.pathname)
    //           },5000)
    // })
    let publish_url='http://192.144.171.192:3000'
    let code=value
    let get_url1=publish_url+'/api/stockprice?code='+code+"&mode="+'single'
    let price;

    let get_url=publish_url+'/api/stockinfo?line='+code
    console.log(get_url)
    fetch(get_url)
    .then(res=>{
      if(res['status']==200){
        return res.json()
      }
      else{
        return 0
      }
    })
    .then(res=>{
      console.log(res['list'])
      if(res==0||res['list']==null){
        return;
      }
      let i=0;
      /*destroy the original data*/
      let old_data=this.state.data;
      old_data.splice(0,old_data.length);
      this.setState({
        data:old_data
      })
      /*push new data to the state.data*/
      let data=this.state.data;
      for(i=0;i<res['list'].length;++i)
      {

        let one_data={}
        one_data['title']=res['list'][i]['name']+'('+res['list'][i]['code']+')'
        data.push(one_data)
      }
        this.setState({
          data:data
        })
    })



  }

  set_curr_price(code){

          /*通过股票代码获得股票的价格*/
          let publish_url='http://192.144.171.192:3000'
          let get_url1=publish_url+'/api/stockprice?code='+code+"&mode="+'single'
          /*price*/
          fetch(get_url1)
          .then(res=>{
            console.log(res)
            if(res['status']==200){
              return res.json()
            }
            else{
              console.log(res)
              return false;
              return 0;
            }})
          .then(res=>{
            console.log(res)
            if(res==0){
              return;
            }
            if(res['data']['state_code']!=1){
              let price=res['data']['list']['price']

              let elm=document.getElementById('curr_price')
              if(elm==null){
                return;
              }
              elm.innerHTML=price

              console.log(price)


            }

          })  }
  handleClick(value){
    /*隐藏list,
    将对应k线图显示出来*/


    this.setState({
      list_state:'none'
    })
    let code=Number(value.match(/^[^(]*\(([0-9]+)\)/)[1])

    this.update_k(code)
    this.setState({
      height:700
    })

    let elm=document.getElementById('curr_price')
    elm.innerHTML=""
    if(this.state.interval!=null){
      clearInterval(this.state.interval)
    }
    this.set_curr_price(code)
      this.setState({
        interval:setInterval(()=>{

          this.set_curr_price(code)



        },5000)

      })

  }

  componentDidMount(){
    fetch("http://192.144.171.192:3000/api/stockprice?mode=day&code="+this.state.code)
    .then(res=>{
      if(res['status']==200){
        return res.json()
      }
      else{
        return 0;
      }
    })
    .then(res=>{
      if(res==0){
        return ;
      }
      this.setState({
        result:res
      })
    })

  }


  handleScriptLoad(){
    if(this.state.count==29){
      console.log('ok')

    /*如果之前没有id为content的script,就创建一个,并取名,否则不用*/
      let script;
      script=document.createElement('script');
      script.id="content"
      script.innerHTML=this.get_string(this.state.code)
      document.body.appendChild(script);
      }
      else{
        this.setState({
          count:this.state.count+1
        })
        // console.log(this.state.count)

      }
  }

  handleReturn(){
    this.setState({
      height:0
    })

    this.setState({
      list_state:'block'
    })

  }
  render(){
    return(
      <div>
					<Search
						placeholder="输入股票名字或代码"
						onSearch={this.handleSearch.bind(this)}
						enterButton
						style={{ width: 250 ,display:this.state.list_state}}
					/>
          <List
            style={{display:this.state.list_state}}
            itemLayout="horizontal"
            dataSource={this.state.data}
            pagination={{
              onChange:(page)=>{
                console.log(page)
              },
              pageSize:10,
            }}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta

                  avatar={<Avatar style={{height:48,width:48}} src={myLogo} />}
                  title={<a href="javascript:;" onClick={this.handleClick.bind(this,item.title)}>{item.title}</a>}
                  description="是股份公司发行的所有权凭证，是股份公司为筹集资金而发行给各个股东作为持股凭证并借以取得股息和红利的一种有价证券。"
                />
                </List.Item>
            )}
          />
        <div id="parent" style={{height:this.state.height,overflow:'hidden'}}>
          <div><Button onClick={this.handleReturn.bind(this)} style={{marginBottom:50}}>Return</Button></div>
          <div>当前价格:<span id="curr_price"></span></div>
         <div id="container" style={{height:600,}}></div>

        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts-gl/echarts-gl.min.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts-stat/ecStat.min.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts/extension/dataTool.min.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts/map/js/china.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts/map/js/world.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://api.map.baidu.com/api?v=2.0&ak=ZUONbpqGBsYGXNIYHicvbAbM"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts/extension/bmap.min.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/simplex.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js" ></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts-gl/echarts-gl.min.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts-stat/ecStat.min.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts/extension/dataTool.min.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts/map/js/china.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts/map/js/world.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://api.map.baidu.com/api?v=2.0&ak=ZUONbpqGBsYGXNIYHicvbAbM"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts/extension/bmap.min.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/simplex.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js" ></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts-gl/echarts-gl.min.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts-stat/ecStat.min.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts/extension/dataTool.min.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts/map/js/china.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts/map/js/world.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://api.map.baidu.com/api?v=2.0&ak=ZUONbpqGBsYGXNIYHicvbAbM"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/echarts/extension/bmap.min.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="http://echarts.baidu.com/gallery/vendors/simplex.js"></Script>
        <Script  onLoad={this.handleScriptLoad.bind(this)} url="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js" ></Script>
      </div>
      </div>
    )
  }

  get_string(code){
    return `
    var dom = document.getElementById("container");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    var upColor = '#ec0000';
    var upBorderColor = '#8A0000';
    var downColor = '#00da3c';
    var downBorderColor = '#008F28';




    $.ajax({url:"http://192.144.171.192:3000/api/stockprice?mode=day&code=`+code+`",success:function(result){
    var data0 = splitData(result.data.list);
    console.log(result.data.list);
    // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)



    function splitData(rawData) {
        var categoryData = [];
        var values = []
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i])
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }

    function calculateMA(dayCount) {
        var result = [];
        for (var i = 0, len = data0.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += data0.values[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }



    option = {
        title: {
            text: '上证指数',
            left: 0
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: data0.categoryData,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        },
        yAxis: {
            scale: true,
            splitArea: {
                show: true
            }
        },
        dataZoom: [
            {
                type: 'inside',
                start: 50,
                end: 100
            },
            {
                show: true,
                type: 'slider',
                y: '90%',
                start: 50,
                end: 100
            }
        ],
        series: [
            {
                name: '日K',
                type: 'candlestick',
                data: data0.values,
                itemStyle: {
                    normal: {
                        color: upColor,
                        color0: downColor,
                        borderColor: upBorderColor,
                        borderColor0: downBorderColor
                    }
                },
                markPoint: {
                    label: {
                        normal: {
                            formatter: function (param) {
                                return param != null ? Math.round(param.value) : '';
                            }
                        }
                    },
                    data: [
                        {
                            name: 'XX标点',
                            coord: ['2013/5/31', 2300],
                            value: 2300,
                            itemStyle: {
                                normal: {color: 'rgb(41,60,85)'}
                            }
                        },
                        {
                            name: 'highest value',
                            type: 'max',
                            valueDim: 'highest'
                        },
                        {
                            name: 'lowest value',
                            type: 'min',
                            valueDim: 'lowest'
                        },
                        {
                            name: 'average value on close',
                            type: 'average',
                            valueDim: 'close'
                        }
                    ],
                    tooltip: {
                        formatter: function (param) {
                            return param.name + '<br>' + (param.data.coord || '');
                        }
                    }
                },
                markLine: {
                    symbol: ['none', 'none'],
                    data: [
                        [
                            {
                                name: 'from lowest to highest',
                                type: 'min',
                                valueDim: 'lowest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    normal: {show: false},
                                    emphasis: {show: false}
                                }
                            },
                            {
                                type: 'max',
                                valueDim: 'highest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    normal: {show: false},
                                    emphasis: {show: false}
                                }
                            }
                        ],
                        {
                            name: 'min line on close',
                            type: 'min',
                            valueDim: 'close'
                        },
                        {
                            name: 'max line on close',
                            type: 'max',
                            valueDim: 'close'
                        }
                    ]
                }
            },
            {
                name: 'MA5',
                type: 'line',
                data: calculateMA(5),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },
            {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },
            {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },

        ]
    };

    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

    }});
    `
  }


}

export default SearchStock;
