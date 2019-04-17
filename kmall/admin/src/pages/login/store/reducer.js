
// 1.这个reducer是login组件自己的reducer
// 2.需要把这个reducer合并到整个应用的reducer中,即/src/store/reducer.js
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	isFething:false
})

export default (state=defaultState,action)=>{

	
	return state;
}