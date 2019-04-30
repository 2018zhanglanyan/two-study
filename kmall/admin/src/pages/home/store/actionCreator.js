
import * as types from './actionTypes.js'
import { request } from 'util';
import { ADMIN_COUNT } from 'api'


export const getCountAction = ()=>{
	return (dispatch)=>{
		request({
			url:ADMIN_COUNT
		})
		.then(result=>{
			console.log(result);
		})
	}
}


