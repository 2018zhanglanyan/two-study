
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	isFething:false
})

export default (state=defaultState,action)=>{

	
	return state;
}