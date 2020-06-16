import axios from 'axios'

import {
    GET_COURSES,
    GET_COURSES_ERROR,
    CLEAR_COURSES,
    GET_COURSE,
    CLEAR_COURSE,
} from './types'
import { setAlert } from './alert'

export const getCourses = () => async (dispatch) => {
    dispatch({
        type: CLEAR_COURSE,
    })

    try {
        const res = await axios.get('/api/course')

        dispatch({
            type: GET_COURSES,
            payload: res.data,
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

export const getCourseById = (id) => async (dispatch) => {
    dispatch({
        type: CLEAR_COURSES,
    })

    try {
        const res = await axios.get(`/api/course/${id}`)

        dispatch({
            type: GET_COURSE,
            payload: res.data,
        })
    } catch (err) {
        const error = err.response.data

        dispatch(setAlert(error.msg, 'danger'))
    }
}

export const createCourse = (formData, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Types': 'application/json',
        },
    }

    try {
        await axios.post('/api/course', formData, config)

        dispatch(setAlert('Create course successfully', 'success'))

        history.push('/course')
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

export const updateCourseById = (id, formData, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Types': 'application/json',
        },
    }

    try {
        console.log(formData)

        await axios.put(`/api/course/${id}`, formData, config)

        dispatch(setAlert('Update course successfully', 'success'))

        history.push('/course')
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

export const deleteCourseById = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/course/${id}`)

        dispatch(getCourses())

        dispatch(setAlert(res.data.msg, 'success'))
    } catch (err) {
        const error = err.response.data

        if (error) {
            dispatch(setAlert(error.msg, 'danger'))
        }
    }
}

export const searchCourses = (input) => async dispatch => {
    const config = {
        headers: {
            'ContentType': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/course/search', input, config)

        dispatch({
            type: GET_COURSES,
            payload: res.data
        })
    } catch (err) {
        const error = err.response.data

        dispatch(setAlert(error.msg, 'danger'))
    }
}

