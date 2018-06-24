import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'

class Bread extends Component {
	Breadcrumbs(){
        const { paths } = this.props;
        let v = paths.map(function(item,index){
            return (
                <Breadcrumb.Item key="item">
                    {item==="首页"?<Link to={"/app"}>{item}</Link>:item}
                </Breadcrumb.Item>
            )
        });
        return v;
	}
	
	render() {
		return (
			<Breadcrumb style={{ margin: '12px 0' }}>
                {this.Breadcrumbs()}
            </Breadcrumb>
		);
	}
}

export default Bread;