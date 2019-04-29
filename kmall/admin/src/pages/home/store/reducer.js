
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	usernum:111,
	productnum:222,
	ordernum:333
})
export default (state=defaultState,action)=>{

	
	return state;
}