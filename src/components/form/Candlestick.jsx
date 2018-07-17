import React from 'react';
import Script from 'react-load-script'

class Candlestick extends React.Component{
  constructor(){
    super()
    this.state={
      result:{},
      count:0

    }


  }

componentDidMount(){

  fetch("http://192.144.171.192:3000/api/stockprice?mode=day&code="+this.props.code)
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



      // const script1=document.createElement('script')
      // script1.innerHTML=`alert('123')`
      // document.body.appendChild(script);

/*如果之前没有id为content的script,就创建一个,并取名,否则不用*/
      let script;
      if(document.getElementById('content')==null){
        script=document.createElement('script');
        script.id="content"
      }
      else{
        script=document.getElementById('content')

      }
      script.innerHTML=`
      var dom = document.getElementById("container");
      var myChart = echarts.init(dom);
      var app = {};
      option = null;
      var upColor = '#ec0000';
      var upBorderColor = '#8A0000';
      var downColor = '#00da3c';
      var downBorderColor = '#008F28';




      $.ajax({url:"http://192.144.171.192:3000/api/stockprice?mode=day&code=`+this.props.code+`",success:function(result){
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

      document.body.appendChild(script);
    }
    else{
      this.setState({
        count:this.state.count+1
      })
      console.log(this.state.count)

    }
  }

  render(){

    return(

      <div>
         <div id="container" style={{height:600,display:this.props.display}}></div>

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

    )
  }


}
export default Candlestick;
