
import React,{ Component } from 'react'
import { connect } from 'react-redux'

import { Card, Col, Row } from 'antd'

import Layout from 'common/layout'

class Home extends Component{
	render(){
		const {usernum,productnum,ordernum} = this.props
		return (
			<div className="Home">
				<Layout>
					<Row gutter={16}>
						<Col span={8}>
							<Card title="用户数量" bordered={false}>{usernum}</Card>
						</Col>
						<Col span={8}>
							<Card title="商品数据" bordered={false}>{productnum}</Card>
						</Col>
						<Col span={8}>
							<Card title="订单数量" bordered={false}>{ordernum}</Card>
						</Col>
				    </Row>
				</Layout>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return {
		usernum:state.get('home').get('usernum'),
		productnum:state.get('home').get('productnum'),
		ordernum:state.get('home').get('ordernum')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);