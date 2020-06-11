import axios from 'axios'

import {
    GET_TOPIC,
    GET_TOPICS,
    GET_TOPICS_ERROR,
    CLEAR_TOPIC,
    CLEAR_TOPICS,
} from './types'
import { setAlert } from './alert'

export const getTopics = () => async dispatch => {
    dispatch({
        type: CLEAR_TOPIC
    })

    try {
        const res = await axios.get('/api/topic')

        dispatch({
            type: GET_TOPICS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_TOPICS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        })

        const error = err.response.data

        if (error) {
            dispatch(setAlert(error.msg, 'danger'))
        }
    }
}

export const getTopicById = (id) => async dispatch => {
    dispatch({
        type: CLEAR_TOPICS
    })

    try {
        const res = await axios.get(`/api/topic/${id}`)

        dispatch({
            type: GET_TOPIC,
            payload: res.data
        })
    } catch (err) {
        const error = err.response.data

        if (error) {
            dispatch(setAlert(error.msg, 'danger'))
        }
    }
}

export const createTopic = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Types': 'application/json',
        },
    }

    try {
        await axios.post('/api/topic', formData, config)

        dispatch(setAlert('Create topic successfully', 'success'))

        history.push('/topic')
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

export const updateTopicById = (id, formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Types': 'application/json',
        },
    }

    try {
        await axios.put(`/api/topic/${id}`, formData, config)

        dispatch(setAlert('Update topic successfully', 'success'))

        history.push('/topic')
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }

        const errorMessage = err.response.data.msg
        
        if (errorMessage) dispatch(setAlert(errorMessage, 'danger'))
    }
}

export const deleteTopicById = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/topic/${id}`)

        dispatch(getTopics())

        dispatch(setAlert(res.data.msg, 'success'))
    } catch (err) {
        const error = err.response.data

        if (error) {
            dispatch(setAlert(error.msg, 'danger'))
        }
    }
}
