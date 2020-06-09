import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCourses } from '../../actions/course'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

const Course = ({ getCourses, course: { courses, loading } }) => {
    useEffect(() => {
        getCourses()
    }, [getCourses, loading])

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link className='btn btn-primary mt-4' to='#'><i className='fas fa-plus'></i>  Create Course</Link>

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
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {courses.length > 0 ? (
                                        courses.map((course) => (
                                            <tr key={course._id}>
                                                <td>{course.name}</td>
                                                <td>{course.code}</td>
                                                <td></td>
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
}

const mapStateToProps = (state) => ({
    course: state.course,
})

export default connect(mapStateToProps, { getCourses })(Course)
