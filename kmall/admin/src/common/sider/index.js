
import React,{ Component } from 'react'

import { Link } from 'react-router-dom'

import {
  Layout, Menu, Icon
} from 'antd';

const { SubMenu } = Menu;
const {	Sider } = Layout;

class AdminSider extends Component{
	render(){
		return (
			<div className="AdminSider">
				<Sider width={200} style={{ background: '#fff' }}>
					<Menu
						mode="inline"
						style={{ minHeight: 880, borderRight: 0 }}
					>
						<Menu.Item key="1">
							<Link to="/">首页</Link>
						</Menu.Item>
						<Menu.Item key="2">
							<Link to="/user">用户管理</Link>
						</Menu.Item>
						<Menu.Item key="3">option3</Menu.Item>
						<Menu.Item key="4">option4</Menu.Item>
					</Menu>
				</Sider>
			</div>
		)
	}
}

export default AdminSider;