const express = require('express')

const UserModel = require('../models/user.js')

const router = express.Router()

router.post("/register",(req,res)=>{
	const {username,password} = req.body
	const result = {
		status:0, // 成功
		message:''
	}
	// 1. 检查是否已注册过
	UserModel.findOne({username})
	.then(user=>{
		// console.log('user:::',user);
		if (user) { // 用户已存在
			result.status = 10
			result.message = '用户已存在'
			res.json(result)
		}else{
			// 插入新用户
			UserModel.insertMany({
				username,
				password
			})
			.then(user=>{
				result.data = user
				res.json(result)
			})
			.catch(err=>{
				throw err
			})
		}
	})
	.catch(err=>{ // 不是查询不到时的err
		result.status = 10
		result.message = '服务器端错误,请稍后再试'
		res.json(result)
	})
})

module.exports = router