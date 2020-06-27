import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getCourseById } from '../../actions/course'
import Spinner from '../layout/Spinner'

const CourseInfo = ({
    getCourseById,
    match,
    course: {
        course: { staffs },
        loading,
    },
}) => {
    useEffect(() => {
        getCourseById(match.params.id)
    }, [getCourseById, match])

    return loading ? (
        <Spinner />
    ) : (
        <div className='card mt-4'>
            <div className='card-header main-color-bg'>
                <h4>
                    <i className='fas fa-coins'></i> Trainees in Course
                </h4>
            </div>

            <div className='card-body card-table'>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Date Of Birth</th>
                        </tr>
                    </thead>

                    <tbody>
                        {staffs &&
                            staffs.map((staff) => (
                                <tr key={staff._id}>
                                    <td>
                                        <Link to={`/profile/${staff._id}`}>
                                            {staff.name}
                                        </Link>
                                    </td>
                                    <td>{staff.email}</td>
                                    <td>{staff.gender}</td>
                                    <td>{staff.dateOfBirth}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

CourseInfo.propTypes = {
    getCourseById: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    course: state.course,
})

export default connect(mapStateToProps, { getCourseById })(CourseInfo)
