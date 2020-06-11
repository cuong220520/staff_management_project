import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addExperience } from '../../actions/staff'

const AddExperience = ({ addExperience, match, history }) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    } = formData

    const onSubmit = (event) => {
        event.preventDefault()

        addExperience(match.params.id, formData, history)
    }

    return (
        <div className='container mt-4 mb-4'>
            <h1 className='text-center mb-4'>
                <i className='fas fa-edit'></i>
                {'  '}Update Staff Education
            </h1>

            <div className='row'>
                <div className='col-md-3'></div>

                <div className='col-md-6 col-md-offset-6'>
                    <form className='card card-padding' onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label>Title</label>
                            <input
                                type='text'
                                className='form-control'
                                name='title'
                                value={title}
                                onChange={onChange}
                                placeholder='Enter Title'
                            />
                        </div>

                        <div className='form-group'>
                            <label>Company</label>
                            <input
                                type='text'
                                className='form-control'
                                name='company'
                                value={company}
                                onChange={onChange}
                                placeholder='Enter Company'
                            />
                        </div>

                        <div className='form-group'>
                            <label>Location</label>
                            <input
                                type='text'
                                className='form-control'
                                name='location'
                                value={location}
                                onChange={onChange}
                                placeholder='Enter Location'
                            />
                        </div>

                        <div className='form-group'>
                            <label>From</label>
                            <input
                                type='date'
                                className='form-control'
                                name='from'
                                value={from}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label>Current Job</label>
                            <input
                                type='checkbox'
                                className='form-control'
                                name='current'
                                value={current}
                                checked={current}
                                onChange={() => {
                                    setFormData({...formData, current: !current})
                                    toggleDisabled(!toDateDisabled)
                                }}
                            />
                        </div>

                        <div className='form-group'>
                            <label>To</label>
                            <input
                                type='date'
                                className='form-control'
                                name='to'
                                value={to}
                                onChange={onChange}
                                disabled={toDateDisabled ? 'disabled' : ''}
                            />
                        </div>

                        <div className='form-group'>
                            <label>Description</label>
                            <textarea
                                className='form-control'
                                name='description'
                                value={description}
                                onChange={onChange}
                            >
                            </textarea>
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

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(AddExperience)
