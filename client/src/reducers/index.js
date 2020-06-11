import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import staff from './staff'
import course from './course'
import category from './category'
import topic from './topic'

export default combineReducers({
    alert,
    auth,
    staff,
    course,
    category,
    topic
})