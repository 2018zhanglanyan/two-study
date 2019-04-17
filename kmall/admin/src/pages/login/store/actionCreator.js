
import * as types from './actionTypes.js'
import axios from 'axios';

import { message } from 'antd'

const getLoginRequestAction = ()=>{
	return {
		type:types.LOGIN_REQUEST
	}
}

export const getLoginAction = (values)=>{
	return (dispatch)=>{
		// 1.让登录按钮处于加载状态
		// 1.1其实就是需要改变state.login.isFetching 为 true
		// 1.2方法就是派发action
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
			// 2.让登录按钮处于活动状态
		})
	}
}


