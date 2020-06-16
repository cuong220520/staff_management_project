import axios from 'axios'

import {
    GET_CATEGORIES,
    GET_CATEGORIES_ERROR,
    CLEAR_CATEGORIES,
    GET_CATEGORY,
    CLEAR_CATEGORY,
} from './types'

import { setAlert } from './alert'

export const getCategories = () => async (dispatch) => {
    dispatch({
        type: CLEAR_CATEGORY,
    })

    try {
        const res = await axios.get('/api/category')

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: GET_CATEGORIES_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

export const getCategoryById = (id) => async (dispatch) => {
    dispatch({
        type: CLEAR_CATEGORIES,
    })

    try {
        const res = await axios.get(`/api/category/${id}`)

        dispatch({
            type: GET_CATEGORY,
            payload: res.data,
        })
    } catch (err) {
        const error = err.response.data

        dispatch(setAlert(error.msg, 'danger'))
    }
}

export const createCategory = (formData, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Types': 'application/json',
        },
    }

    try {
        await axios.post('/api/category', formData, config)

        dispatch(setAlert('Create category successfully', 'success'))

        history.push('/category')
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

export const updateCategoryById = (id, formData, history) => async (
    dispatch
) => {
    const config = {
        headers: {
            'Content-Types': 'application/json',
        },
    }

    try {
        await axios.put(`/api/category/${id}`, formData, config)

        dispatch(setAlert('Update category successfully', 'success'))

        history.push('/category')
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

export const deleteCategoryById = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/category/${id}`)

        dispatch(getCategories())

        dispatch(setAlert(res.data.msg, 'success'))
    } catch (err) {
        const error = err.response.data

        if (error) {
            dispatch(setAlert(error.msg, 'danger'))
        }
    }
}

export const searchCategories = (input) => async dispatch => {
    const config = {
        headers: {
            'ContentType': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/category/search', input, config)

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        })
    } catch (err) {
        const error = err.response.data

        dispatch(setAlert(error.msg, 'danger'))
    }
}

