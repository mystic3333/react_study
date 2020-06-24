import { combineReducers } from 'redux'
import counterReducer from './counterReducer'
import user from './userReducer'

export default combineReducers({
    counterReducer,
    user
})