
import React,{ Component } from 'react'
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

const mapStateToProps = (state)=>{
	console.log(state);
	return {
		isFething:state.get('login').get('isFething')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {

	}
}


export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm);