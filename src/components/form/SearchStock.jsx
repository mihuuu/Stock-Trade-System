import React from 'react';
import { Input, Row, Col, Card } from 'antd';
import ReactEcharts from 'echarts-for-react';
const Search = Input.Search;

class SearchStock extends React.Component {
    getOption(){
        let option = {
            backgroundColor: "#fff",
            color: ['rgb(216, 151, 235)', 'rgb(246, 152, 153)', 'rgb(100, 234, 145)'],
            title: [{
                text: '股票价格/元',
                left: '2%',
                top: '6%',
                textStyle: {
                    fontWeight:'normal',
                },
            }],
            tooltip: {
                trigger: 'axis'
            },
            grid:{
                left:'6%',
                width:'90%',
            },
            legend: {
                //x: 300,
                top: '7%',
                right: '3%',
                textStyle: {
                    color: 'gray',
                },
                data: ['A', 'B', 'C']
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLine:{
                    lineStyle:{
                        color:'lightgray',
                    },
                },
                axisLabel:{
                    color:'gray'
                },
                data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017']
            },
            yAxis: {
                min: 0,
                max: 100,
                type: 'value',
                axisLine:{
                    lineStyle:{
                        color:'lightgray',
                    },
                },
                axisLabel:{
                    color:'gray'
                },
            },
            series: [{
                name: 'A',
                smooth: true,
                type: 'line',
                symbolSize: 8,
                symbol: 'circle',
                data: [10, 40, 32, 20, 80, 90, 97]
            }, {
                name: 'B',
                smooth: true,
                type: 'line',
                symbolSize: 8,
                symbol: 'circle',
                data: [70, 50, 50, 87, 90, 80, 70]
            },{
                name: 'C',
                smooth: true,
                type: 'line',
                symbolSize: 8,
                symbol: 'circle',
                data: [30, 40, 10, 20, 33, 66, 54]
            }]
        };
        return option;
	}
	
	render() {
		return (
			<div>
				<div>
					<Search
						placeholder="输入股票名字或代码"
						onSearch={value => console.log(value)}
						enterButton
						style={{ width: 250 }}
					/>
				</div>
				<br/>
				<div>
					<Row gutter={16}>
						<Col md={16}>
							<Card
								style={{marginBottom:16}}
								bodyStyle={{padding: 0,height:'277px',overflow:'hidden'}}>
								<ReactEcharts
									option={this.getOption()}
								/>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

export default SearchStock;