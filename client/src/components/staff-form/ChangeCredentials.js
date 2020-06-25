import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { changeCredentials, getStaffById } from '../../actions/staff'
import { connect } from 'react-redux'

const ChangeCredentials = ({ changeCredentials, history, match, staff: { loading, staff }, getStaffById }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        getStaffById(match.params.id)

        setFormData({
            email: loading || !staff.email ? '' : staff.email
        })
    // eslint-disable-next-line
    }, [getStaffById, staff._id])

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const {
        email,
        password
    } = formData

    const onSubmit = event => {
        event.preventDefault()

        changeCredentials(match.params.id, formData, history)
    }

    return (
        <div className='container mt-4'>
            <h1 className='text-center mb-4'>
                <i className='fas fa-edit'></i>
                {'  '}Update Credentials
            </h1>

            <div className='row'>
                <div className='col-md-3'></div>

                <div className='col-md-6 col-md-offset-6'>
                    <form className='card card-padding' onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label>Email</label>
                            <input
                                type='text'
                                className='form-control'
                                name='email'
                                value={email}
                                onChange={onChange}
                                placeholder='Enter Email'
                            />
                        </div>

                        <div className='form-group'>
                            <label>Password</label>
                            <input
                                className='form-control'
                                type='password'
                                name='password'
                                value={password}
                                onChange={onChange}
                                placeholder='Enter Password'
                            />
                        </div>

                        <button
                            type='submit'
                            className='btn btn-light btn-block'
                        >
                            Update
                        </button>
                    </form>
                </div>

                <div className='col-md-3'></div>
            </div>
        </div>
    )
}

ChangeCredentials.propTypes = {
    changeCredentials: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    staff: state.staff
})

export default connect(mapStateToProps, { changeCredentials, getStaffById })(ChangeCredentials)
