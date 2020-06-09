import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import staff from './staff'
import course from './course'

export default combineReducers({
    alert,
    auth,
    staff,
    course
})