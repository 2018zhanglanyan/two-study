
import React,{ Component } from 'react'
// react-redux 里面的connect方法负责把store里面的数据和方法映射到UI组件
import { connect } from 'react-redux'
import axios from 'axios';
import {
	Form, Icon, Input, Button, message,
} from 'antd';


import './index.css'

class NormalLoginForm extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			isFething:false
		}
	}
	handleSubmit(e){	
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// console.log('Received values of form: ', values);
				this.setState(()=>({isFething:true}))
				axios({
					method:'post',
					url:'http://127.0.0.1:3000/admin/login',
					data:values
				})
				.then(result=>{
					// console.log(result);
					if (result.data.code == 0) { // 登录成功
						// 跳转到后台首页
						window.location.href = "/"
					}else if (result.data.code == 1) { // 登录失败
						message.error(result.data.message)
					}
				})
				.catch(err=>{
					console.log(err);
					message.error('网络请求失败,请稍后重试!')
				})
				.finally(()=>{
					this.setState(()=>({isFething:false}))
				})
			}
		});
	}

  	render() {
	    const { getFieldDecorator } = this.props.form;
	    return (
	    	<div className="Login">
				<Form className="login-form">
					<Form.Item>
					{getFieldDecorator('username', {
					rules: [{ required: true, message: '请输入用户名' },{ pattern: /^[a-z0-9_]{3,6}$/, message: '用户名为3-6位字母,数字或下划线!' }],
					})(
					<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
					)}
					</Form.Item>
					<Form.Item>
					{getFieldDecorator('password', {
					rules: [{ required: true, message: '请输入密码' },{ pattern: /^\w{3,6}$/, message: '密码为3-6位字符!' }],
					})(
					<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
					)}
					</Form.Item>
					<Form.Item>
					<Button 
						type="primary" 
						onClick={this.handleSubmit} 
						className="login-form-button"
						loading={this.props.isFething}
					>
						登录
					</Button>
					</Form.Item>
				</Form>
			</div>
	    );
  	}
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

// 1.这个方法是connect的第一个参数
// 2.connect方法会把整个应用的顶层数据(state)作为参数传递到这个方法
// 3.整个应用的顶层数据(state)由创建store时传入的reducer生成,即src/store/reducer.js生成
// 4.src/store/reducer.js里面的数据是由每一个组件自己的reducer合并而成
// 5.因此state里面有每一个组件自己的数据
// 6.该方法返回一个对象,这个对象的属性会映射到connect方法返回的方法指定的UI组件上的this.props上
const mapStateToProps = (state)=>{
	console.log(state);
	return {
		isFething:state.get('login').get('isFething')
	}
}

// 1.这个方法是connect的第二个参数
// 2.connect方法会把store上的dispatch方法作为参数传递到这个方法
// 3.该方法返回一个对象,这个对象的属性会映射到connect方法返回的方法指定的UI组件上的this.props上
// 4.返回对象的属性对应的值是一个方法
const mapDispatchToProps = (dispatch)=>{
	return {

	}
}

// 1.connect方法第一个参数指定映射数据的方法
// 2.connect方法第一个参数指定映射方法的方法
// 3.connect方法返回一个方法,这个方法用来指定UI组件,这个方法会返回一个容器组件
export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm);