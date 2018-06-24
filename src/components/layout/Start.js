import React, { Component } from 'react';
import { Button, Layout, Menu, Icon, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import './start.less'
import cover1 from '../imgs/cover1m.jpg'
import cover2 from '../imgs/cover2.jpg'
import cover3 from '../imgs/cover3.jpg'
import cover4 from '../imgs/cover4.jpg'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Footer, Content } = Layout;

class Start extends Component {
	state = {
    current: 'mail',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
	}
	
	render() {
		return (

		<div>
    <Layout class="startLayout" style={{minHeight: '100vh'}}>
      <Header>
					<Menu 
						theme="dark"
						onClick={this.handleClick}
						selectedKeys={[this.state.current]}
						mode="horizontal"
					>
						<Menu.Item key="home" style={{float:'left'}}>
							<Link to='/login'>
							<Button type="primary" icon="user" >Login</Button>
							</Link>
						</Menu.Item>
						
						<Menu.Item key="home">
							<Icon type="home" />Home
						</Menu.Item>
						<Menu.Item key="about">
							<Icon type="appstore-o" />About
						</Menu.Item>
						<Menu.Item key="admin">
							<a href="http://111.231.75.113:5003/" target="_blank" rel="noopener noreferrer"> 
							<Icon type="setting" />Admin </a>
						</Menu.Item>
					</Menu>
			</Header>

      <Content>
				<Carousel autoplay>
					<div>
						<img alt="pic1" src={cover1} />
					</div>
					<div>
						<img alt="pic2" src={cover2} />
					</div>
					<div>
						<img alt="pic3" src={cover3} />
					</div>
					<div>
						<img alt="pic4" src={cover4} />
					</div>
				</Carousel>
			</Content>
      
    </Layout>
		</div>
		)
	};
}

export default Start;
