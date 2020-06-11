import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createTopic } from '../../actions/topic'

const CreateTopic = ({ createTopic, history }) => {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: ''
    })

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const { name, code, description } = formData

    const onSubmit = (event) => {
        event.preventDefault()

        createTopic(formData, history)
    }

    return (
        <div className='container mt-4'>
            <h1 className='text-center mb-4'>
                <i className='fas fa-edit'></i>
                {'  '}Create Topic
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

                        <div className='form-group'>
                            <label>Description</label>
                            <textarea
                                type='text'
                                className='form-control'
                                name='description'
                                value={description}
                                onChange={onChange}
                                placeholder='Enter description'
                            ></textarea>
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

CreateTopic.propTypes = {
    createTopic: PropTypes.func.isRequired,
}

export default connect(null, { createTopic })(CreateTopic)