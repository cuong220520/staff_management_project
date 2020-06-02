import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { login } from '../../actions/auth'
import { Redirect } from 'react-router-dom'

const Login = ({ isAuthenticated, login }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const onSubmit = (event) => {
        event.preventDefault()

        login({ email, password })
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className='container mt-4'>
            <h1 className='text-center mb-4'><i className='fas fa-cogs'></i>{'  '}Staff Management</h1>

            <div className='row'>
                <div className='col-md-4'></div>

                <div className='col-md-4 col-md-offset-4'>
                    <form id='login' onSubmit={onSubmit} className='card card-padding'>
                        <div className='form-group'>
                            <label>Email Address</label>
                            <input
                                type='text'
                                className='form-control'
                                name='email'
                                value={email}
                                onChange={event => onChange(event)}
                                placeholder='Enter Email'
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input
                                type='password'
                                className='form-control'
                                name='password'
                                value={password}
                                onChange={event => onChange(event)}
                                placeholder='Password'
                            />
                        </div>
                        <button
                            type='submit'
                            className='btn btn-light btn-block'
                        >
                            Login
                        </button>
                    </form>
                </div>

                <div className='col-md-4'></div>
            </div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
