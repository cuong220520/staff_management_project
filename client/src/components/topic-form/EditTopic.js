import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTopicById, updateTopicById } from '../../actions/topic'
import { getCourses } from '../../actions/course'

const EditTopic = ({
    history,
    getTopicById,
    topic: { topic, loading },
    match,
    updateTopicById,
    getCourses,
    course,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        courseCode: ''
    })

    useEffect(() => {
        getCourses()
        getTopicById(match.params.id)

        setFormData({
            name: loading || !topic.name ? '' : topic.name,
            code: loading || !topic.code ? '' : topic.code,
            description: loading || !topic.description ? '' : topic.description,
        })
        // eslint-disable-next-line
    }, [
        loading,
        getCourses,
        match,
        topic._id,
        getTopicById
    ])

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const { name, code, description, courseCode } = formData

    console.log(formData)

    const onSubmit = (event) => {
        event.preventDefault()

        updateTopicById(match.params.id, formData, history)
    }

    return (
        <div className='container mt-4'>
            <h1 className='text-center mb-4'>
                <i className='fas fa-edit'></i>
                {'  '}Update Topic
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
                                placeholder='Enter Description'
                            ></textarea>
                        </div>

                        <div className='form-group'>
                            <label>Courses</label>
                            <select
                                name='courseCode'
                                className='form-control'
                                onChange={onChange}
                                value={courseCode}
                            >
                                <option value=''>Choose Course</option>
                                {course.courses.map((course) => (
                                    <option
                                        key={course._id}
                                        value={course.code}
                                    >
                                        {course.name} - {course.code}
                                    </option>
                                ))}
                            </select>
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

EditTopic.propTypes = {
    updateTopicById: PropTypes.func.isRequired,
    getTopicById: PropTypes.func.isRequired,
    getCourses: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    course: state.course,
    topic: state.topic,
})

export default connect(mapStateToProps, {
    updateTopicById,
    getTopicById,
    getCourses,
})(EditTopic)