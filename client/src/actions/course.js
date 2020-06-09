import axios from 'axios'

import { GET_COURSES, GET_COURSES_ERROR } from './types'

export const getCourses = () => async dispatch => {
    try {
        const res = await axios.get('/api/course')

        dispatch({
            type: GET_COURSES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_COURSES_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}