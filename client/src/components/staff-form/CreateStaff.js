import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { createStaff } from '../../actions/staff'
import { connect } from 'react-redux'

const CreateStaff = ({ createStaff, history }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: 'Male',
        dateOfBirth: '',
        ieltsDegree: 0,
        position: 'trainer',
    })

    const { name, email, password, gender, dateOfBirth, ieltsDegree, position } = formData

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault()

        createStaff(formData, history)
    }

    return (
        <div className='container mt-4'>
            <h1 className='text-center mb-4'>
                <i className='fas fa-edit'></i>
                {'  '}Create Staff
            </h1>

            <div className='row'>
                <div className='col-md-3'></div>

                <div className='col-md-6 col-md-offset-6'>
                    <form id='login' className='card card-padding' onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label>Name</label>
                            <input
                                type='text'
                                className='form-control'
                                name='name'
                                value={name}
                                onChange={onChange}
                                placeholder='Enter Name'
                            />
                        </div>

                        <div className='form-group'>
                            <label>Email Address</label>
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
                                type='password'
                                className='form-control'
                                name='password'
                                value={password}
                                onChange={onChange}
                                placeholder='Password'
                            />
                        </div>

                        <div className='form-group'>
                            <label>Gender</label>
                            <select
                                name='gender'
                                className='form-control'
                                onChange={onChange}
                                value={gender}
                                
                            >
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <label>Date Of Birth</label>
                            <input
                                type='date'
                                className='form-control'
                                name='dateOfBirth'
                                value={dateOfBirth}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label>Ielts Degree</label>
                            <input
                                type='text'
                                className='form-control'
                                name='ieltsDegree'
                                value={ieltsDegree}
                                onChange={onChange}
                                placeholder='Enter Ielts Degree'
                            />
                        </div>

                        <div className='form-group'>
                            <label>Position</label>
                            <select
                                name='position'
                                className='form-control'
                                onChange={onChange}
                                value={position}
                            >
                                <option value='trainer'>Trainer</option>
                                <option value='training-staff'>Training Staff</option>
                                <option value='trainee'>Trainee</option>
                            </select>
                        </div>

                        <button
                            type='submit'
                            className='btn btn-light btn-block'
                        >
                            Create
                        </button>
                    </form>
                </div>

                <div className='col-md-3'></div>
            </div>
        </div>
    )
}

CreateStaff.propTypes = {
    createStaff: PropTypes.func.isRequired,
}

export default connect(null, { createStaff })(CreateStaff)
