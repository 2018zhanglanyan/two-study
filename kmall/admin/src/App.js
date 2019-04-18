
import React,{ Component,Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

// 引入Login组件
// 等价于引入'./pages/login/index.js'
import Login from 'pages/login'
import Home from 'pages/home'

import { getUserName } from 'util'

import './App.css'

class App extends Component{

	render(){
		const ProtectRoute = ()=>(
			<Route 
				{...rest}
				render={(props)=>{
					getUserName()
					? <Component {...props} />
					: <Redirect to="/login" />
				}}
			/>
		)
		return(
			<Router>
				<div className="App">
					<ProtectRoute exact path="/" component={Home} />
					{
						// 当匹配到路由"login"后,渲染Login组件
					}
					<Route path="/login" component={Login} />
				</div>
			</Router>
		)
	}
}


export default App;