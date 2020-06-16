import React, { useEffect, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
    getCourses,
    deleteCourseById,
    searchCourses,
} from '../../actions/course'
import Spinner from '../layout/Spinner'

const Course = ({
    getCourses,
    course: { courses, loading },
    deleteCourseById,
    searchCourses,
}) => {
    const [input, setInput] = useState('')

    const onChange = (event) => {
        setInput(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        searchCourses({ input })
    }

    useEffect(() => {
        getCourses()
    }, [getCourses, loading])

    const deleteCourse = (id) => {
        deleteCourseById(id)
    }

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className='row mt-4'>
                <div className='col-md-6'>
                    <Link className='btn btn-primary' to='/course/create'>
                        <i className='fas fa-plus'></i> Create Course
                    </Link>
                </div>

                <div className='col-md-6'>
                    <form onSubmit={onSubmit}>
                        <div className='form-group d-flex'>
                            <input
                                className='form-control'
                                type='text'
                                name='input'
                                value={input}
                                onChange={onChange}
                            />

                            <button type='submit' className='btn btn-info'>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='card mt-4'>
                <div className='card-header main-color-bg'>
                    <h4>
                        <i className='fas fa-coins'></i> Courses Management
                    </h4>
                </div>

                <div className='card-body'>
                    <div className='card mt-3'>
                        <div className='card-header'>
                            All courses in program
                        </div>

                        <div className='card-body card-table'>
                            <table className='table table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Code</th>
                                        <th>Category</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {courses.length > 0 ? (
                                        courses.map((course) => (
                                            <tr key={course._id}>
                                                <td>{course.name}</td>
                                                <td>{course.code}</td>
                                                <td>
                                                    {course.category && (
                                                        <>
                                                            {
                                                                course.category
                                                                    .name
                                                            }
                                                        </>
                                                    )}
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/course/${course._id}/edit`}
                                                    >
                                                        <i className='fas fa-edit'></i>
                                                    </Link>

                                                    <label
                                                        onClick={() =>
                                                            deleteCourse(
                                                                course._id
                                                            )
                                                        }
                                                        id='remove-item'
                                                        className='pl-2'
                                                    >
                                                        <i className='fas fa-times'></i>
                                                    </label>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan='3'
                                                className='text-muted mt-3'
                                            >
                                                No profile found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

Course.propTypes = {
    getCourses: PropTypes.func.isRequired,
    deleteCourseById: PropTypes.func.isRequired,
    searchCourses: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    course: state.course,
})

export default connect(mapStateToProps, {
    getCourses,
    deleteCourseById,
    searchCourses,
})(Course)
