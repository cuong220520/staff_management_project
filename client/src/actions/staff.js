import axios from 'axios'

import {
    GET_STAFFS,
    GET_STAFFS_ERROR,
    GET_STAFF,
    CLEAR_STAFF,
    CLEAR_STAFFS,
    GET_STAFFS_POSITION
} from './types'
import { setAlert } from './alert'

export const getStaffs = () => async (dispatch) => {
    dispatch({
        type: CLEAR_STAFF,
    })

    try {
        const res = await axios.get('/api/staff')

        dispatch({
            type: GET_STAFFS,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: GET_STAFFS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

export const getStaffsByPosition = (position) => async (dispatch) => {
    dispatch({
        type: CLEAR_STAFF,
    })

    dispatch({
        type: CLEAR_STAFFS
    })

    try {
        const res = await axios.get(`/api/staff/${position}`)

        dispatch({
            type: GET_STAFFS_POSITION,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: GET_STAFFS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

export const createStaff = (formData, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Types': 'application/json',
        },
    }

    try {
        await axios.post('/api/staff/profile', formData, config)

        dispatch(setAlert('Create staff successfully', 'success'))

        history.push('/')
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

export const getStaffById = (id) => async (dispatch) => {
    dispatch({
        type: CLEAR_STAFFS,
    })

    try {
        const res = await axios.get(`/api/staff/profile/${id}`)

        dispatch({
            type: GET_STAFF,
            payload: res.data,
        })
    } catch (err) {
        const error = err.response.data
        dispatch(setAlert(error.msg, 'danger'))
    }
}

export const updateStaffById = (id, formData, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        await axios.put(`/api/staff/profile/${id}`, formData, config)

        dispatch(setAlert('Update staff profile successfully', 'success'))

        history.push('/')
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

export const deleteStaffById = (id) => async (dispatch) => {
    if (window.confirm('Are you sure? This CANNOT be undone!')) {
        try {
            const res = await axios.delete(`/api/staff/profile/${id}`)

            dispatch(getStaffs())
    
            dispatch(setAlert(res.data.msg, 'success'))
        } catch (err) {
            const error = err.response.data
    
            dispatch(setAlert(error.msg, 'danger'))
        }
    }
}

export const changeCredentials = (id, formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        await axios.put(`/api/staff/profile/${id}/change-credentials`, formData, config)

        dispatch(setAlert('Update credentials successfully', 'success'))

        history.push('/')
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}
