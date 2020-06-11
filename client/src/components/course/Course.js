import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getCourses, deleteCourseById } from '../../actions/course'
import Spinner from '../layout/Spinner'

const Course = ({
    getCourses,
    course: { courses, loading },
    deleteCourseById,
}) => {
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
            <Link className='btn btn-primary mt-4' to='/course/create'>
                <i className='fas fa-plus'></i> Create Course
            </Link>

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
}

const mapStateToProps = (state) => ({
    course: state.course,
})

export default connect(mapStateToProps, { getCourses, deleteCourseById })(
    Course
)
