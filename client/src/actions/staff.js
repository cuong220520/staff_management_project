import axios from 'axios'

import { GET_STAFFS, GET_STAFFS_ERROR } from './types'
import { setAlert } from './alert'

export const getStaffs = () => async dispatch => {
    try {
        const res = await axios.get('/api/staff')

        dispatch({
            type: GET_STAFFS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_STAFFS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            }
        })
    }
}

export const getStaffsByPosition = (position) => async dispatch => {
    try {
        const res = await axios.get(`/api/staff/${position}`)

        dispatch({
            type: GET_STAFFS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_STAFFS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            }
        })
    }
}

export const createStaff = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Types': 'application/json'
        }
    }

    try {
        await axios.post('/api/staff/profile', formData, config)

        dispatch(setAlert('Create staff successfully', 'success'))

        history.push('/')
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}