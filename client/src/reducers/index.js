import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import staff from './staff'

export default combineReducers({
    alert,
    auth,
    staff
})