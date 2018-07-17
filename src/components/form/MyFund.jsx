import React from 'react';
import CountUp from 'react-countup';
import { Card, Row, Col, Icon } from 'antd';

const { Meta } = Card;
class MyFund extends React.Component {
    constructor(){
      super()
      this.state={
        count:["0","0"]// default
      }
    }
    // fetch the avaliable funds and the fronzen fund
    componentDidMount(){
      // fetch('http://127.0.0.1:8080/account/myfund.json')

      let project_url='111.231.75.113:5002'
      let token=localStorage.getItem('token')
      fetch('http://'+project_url+'/api/account/select',
      {
        method:"GET", //#method: "POST",
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
        if(res==0){
          return;
        }
        // if(res['code'] ==200){
          let new_count=[res['balance_available'],res['balance_unavailable']]
          this.setState({
            count:new_count
          })
        // }
      })
    }

    CountUp(){
        let imgSrc = ["balance1","balance2"];
        let imgName = ["可用资金","冻结资金"];
        //let count = ["1379","768"];
        let cu = imgSrc.map((item,index)=>{
            return(
                <Col md={8} key={item}>
                    <Card style={{cursor:'pointer', marginBottom:16}}
                          actions={[<Icon type="info-circle-o" />, <Icon type="ellipsis" />]}>
                        <Meta
                            style={{fontSize:30}}
                            avatar={<img src={require('../imgs/'+item+'.png')} style={{padding:5, width:70, marginRight:30}} alt=""/>}
                            title={imgName[index]}
                            description={<CountUp start={0} end={this.state.count[index]} duration={2.75}/>}
                        />
                    </Card>
                </Col>
            )
        });
        return cu;
	}

	render() {
		return (
		<div>
			<Row gutter={20}>
				{this.CountUp()}
			</Row>
		</div>
		);
	}
}

export default MyFund;
