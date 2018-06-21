import React from 'react';
import { Card } from 'antd';
import welcomePic from '../imgs/background.jpg';
const {Meta} = Card;

class Welcome extends React.Component {
	render() {
		return (
			<Card
			hoverable
			style={{ width: 500 }}
			cover={<img alt="pic" src={welcomePic} />}
		  >
			<Meta
			  title="Welcome to iStock :)"
			  description="Good luck with stock trading!"
			/>
		  </Card>
		);
	}
}

export default Welcome;