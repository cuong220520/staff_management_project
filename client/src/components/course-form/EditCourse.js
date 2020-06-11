import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCourseById, updateCourseById } from '../../actions/course'
import { getCategories } from '../../actions/category'

const EditCourse = ({
    history,
    getCourseById,
    course: { course, loading },
    match,
    updateCourseById,
    getCategories,
    category,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        categoryName: '',
    })

    useEffect(() => {
        getCategories()
        getCourseById(match.params.id)

        console.log(category.categories)
        setFormData({
            name: loading || !course.name ? '' : course.name,
            code: loading || !course.code ? '' : course.code
        })
        // eslint-disable-next-line
    }, [
        loading,
        getCourseById,
        match,
        course._id,
        getCategories,
        category.loading,
    ])

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const { name, code, categoryName } = formData

    console.log(formData)

    const onSubmit = (event) => {
        event.preventDefault()

        updateCourseById(match.params.id, formData, history)
    }

    return (
        <div className='container mt-4'>
            <h1 className='text-center mb-4'>
                <i className='fas fa-edit'></i>
                {'  '}Update Course
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
                            <label>Category</label>
                            <select
                                name='category'
                                className='form-control'
                                onChange={onChange}
                                value={categoryName}
                            >
                                <option value=''>Choose Category</option>
                                {category.categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category.name}
                                    >
                                        {category.name}
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

EditCourse.propTypes = {
    updateCourseById: PropTypes.func.isRequired,
    getCourseById: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    course: state.course,
    category: state.category,
})

export default connect(mapStateToProps, {
    updateCourseById,
    getCourseById,
    getCategories,
})(EditCourse)
