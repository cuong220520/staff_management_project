import axios from 'axios'

import {
    GET_STAFFS,
    GET_STAFFS_ERROR,
    GET_STAFF,
    CLEAR_STAFF,
    CLEAR_STAFFS,
    GET_STAFFS_POSITION,
    UPDATE_PROFILE
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

            dispatch(getStaffsByPosition('trainer'))
            dispatch(getStaffsByPosition('training-staff'))
    
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
        const res = await axios.put(`/api/staff/profile/${id}/change-credentials`, formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Update credentials successfully', 'success'))

        history.push('/')
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

export const assignCourse = (id, code, history) => async dispatch => {
    const config = {
        headers: {
            'ContentType': 'application/json'
        }
    }

    try {
        await axios.put(`/api/staff/profile/${id}/course`, code, config)

        dispatch(setAlert('Assign trainee to course successfully', 'success'))

        history.push('/')
    } catch (err) {
        const error = err.response.data

        dispatch(setAlert(error.msg, 'danger'))
    }
}

export const addEducation = (id, formData, history) => async dispatch => {
    const config = {
        headers: {
            'ContentType': 'application/json'
        }
    }

    try {
        const res = await axios.put(`/api/staff/education/${id}`, formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Update staff education successfully', 'success'))

        history.push(`/profile/${id}`)
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

export const deleteEducation = (id, edu_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/staff/education/${id}/${edu_id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education removed', 'success'))
    } catch (err) {
        const error = err.response.data

        dispatch(setAlert(error.msg, 'danger'))
    }
}

export const addExperience = (id, formData, history) => async dispatch => {
    const config = {
        headers: {
            'ContentType': 'application/json'
        }
    }

    try {
        const res = await axios.put(`/api/staff/experience/${id}`, formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Update staff experience successfully', 'success'))

        history.push(`/profile/${id}`)
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

export const deleteExperience = (id, exp_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/staff/experience/${id}/${exp_id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience removed', 'success'))
    } catch (err) {
        const error = err.response.data

        dispatch(setAlert(error.msg, 'danger'))
    }
}

export const assignTopic = (id, code, history) => async dispatch => {
    const config = {
        headers: {
            'ContentType': 'application/json'
        }
    }

    try {
        await axios.put(`/api/staff/profile/${id}/topic`, code, config)

        dispatch(setAlert('Assign trainer to topic successfully', 'success'))

        history.push('/')
    } catch (err) {
        const error = err.response.data

        dispatch(setAlert(error.msg, 'danger'))
    }
}

export const deleteTopic = (id, topic_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/staff/profile/${id}/topic/${topic_id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Topic removed', 'success'))
    } catch (err) {
        const error = err.response.data

        dispatch(setAlert(error.msg, 'danger'))
    }
}

export const searchStaffs = (input) => async dispatch => {
    const config = {
        headers: {
            'ContentType': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/staff/search', input, config)

        dispatch({
            type: GET_STAFFS,
            payload: res.data
        })
    } catch (err) {
        const error = err.response.data

        dispatch(setAlert(error.msg, 'danger'))
    }
}



