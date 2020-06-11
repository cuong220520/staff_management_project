import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createCourse } from '../../actions/course'

const CreateCourse = ({ createCourse, history }) => {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
    })

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const { name, code } = formData

    const onSubmit = (event) => {
        event.preventDefault()

        createCourse(formData, history)
    }

    return (
        <div className='container mt-4'>
            <h1 className='text-center mb-4'>
                <i className='fas fa-edit'></i>
                {'  '}Create Course
            </h1>

            <div className='row'>
                <div className='col-md-3'></div>

                <div className='col-md-6 col-md-offset-6'>
                    <form
                        id='login'
                        className='card card-padding'
                        onSubmit={onSubmit}
                    >
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
                            <label>Code</label>
                            <input
                                type='text'
                                className='form-control'
                                name='code'
                                value={code}
                                onChange={onChange}
                                placeholder='Enter Code'
                            />
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

CreateCourse.propTypes = {
    createCourse: PropTypes.func.isRequired,
}

export default connect(null, { createCourse })(CreateCourse)
