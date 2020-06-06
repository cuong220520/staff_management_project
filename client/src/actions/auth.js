import axios from 'axios'

import { LOGIN_FAIL, LOGIN_SUCCESS, AUTH_ERROR, USER_LOADED, LOGOUT } from './types'
import setAuthToken from '../utils/setAuthToken'
import { setAlert } from './alert'

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth')

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const login = ({ email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post('/api/auth', body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload:res.data
        })

        dispatch(loadUser())

        dispatch(setAlert('Login successfully', 'success'))
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        const error = err.response.data

        dispatch(setAlert(error.msg, 'danger'))

        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })

    dispatch(setAlert('Logout successfully', 'success'))
}