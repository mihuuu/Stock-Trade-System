import React from 'react';
import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import './welcome.less'
import pic1 from '../imgs/i1.png';
import pic2 from '../imgs/i2.png';
import pic3 from '../imgs/i3.png';
const {Meta} = Card;


class Welcome extends React.Component {
	render() {
		return (
			<Row class="welcome" gutter={36} style={{ margin: '50px', textAlign:'center'}}>
				<Col span={8}>
				<Link to='/app/myfund'>
					<Card
					hoverable
					style={{ display:'inlineBlock' }}
					cover={<img alt="pic1" src={pic1}/>}
					>
					<Meta
						title="Wealth"
						//description="Good luck with stock trading!"
					/>
					</Card>
				</Link>
			</Col>
				<Col span={8}>
					<Link to='/app/search'>
					<Card
					hoverable
					//style={{ width: 100 }}
					cover={<img alt="pic" src={pic2}/>}
					>
					<Meta
						title="Stock"
						//description="Good luck with stock trading!"
					/>
					</Card>
					</Link>
				</Col>
				<Col span={8}>
					<Link to='app/mycommand'>
					<Card
					hoverable
					//style={{ width: 100 }}
					cover={<img alt="pic3" src={pic3}/>}
					>
					<Meta
						title="Trade"
						//description="Good luck with stock trading!"
					/>
					</Card>
					</Link>
				</Col>
			</Row>
			
			
		);
	}
}

export default Welcome;