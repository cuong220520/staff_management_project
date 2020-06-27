import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getStaffById } from '../../actions/staff'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import Experience from './Experience'
import Education from './Education'
import Topic from './Topic'

const Profile = ({ getStaffById, match, staff: { staff, loading } }) => {
    useEffect(() => {
        getStaffById(match.params.id)
    }, [getStaffById, match])

    return loading || !staff ? (
        <Spinner />
    ) : (
        <div className='card mt-4 mb-4'>
            <div className='card-header main-color-bg'>
                <h4>
                    <i className='far fa-id-card'></i> Staff Profile
                </h4>
            </div>

            <div className='card-body'>
                <div className='row'>
                    <div className='col-lg-3'>
                        <img src={staff.image} alt={`${staff.name} profile`} />
                        <Link
                            to={`/profile/${staff._id}/edit`}
                            className='btn btn-info btn-equal mt-4'
                        >
                            Update Profile
                        </Link>

                        <Link
                            to={`/profile/${staff._id}/education`}
                            className='btn btn-primary btn-equal mt-2'
                        >
                            Update Education
                        </Link>

                        <Link
                            to={`/profile/${staff._id}/experience`}
                            className='btn btn-success btn-equal mt-2'
                        >
                            Update Experience
                        </Link>

                        <Link to={`/profile/${staff._id}/change-credentials`} className='btn btn-warning btn-equal mt-2'>
                            Update Credentials
                        </Link>
                    </div>

                    <div className='col-lg-9'>
                        <div className='form-group'>
                            <label className='font-weight-bold'>Name</label>
                            <div className='border-bottom pl-2'>
                                {staff.name}
                            </div>
                        </div>

                        <div className='form-group'>
                            <label className='font-weight-bold'>Email</label>
                            <div className='border-bottom pl-2'>
                                {staff.email}
                            </div>
                        </div>

                        <div className='form-group'>
                            <label className='font-weight-bold'>Gender</label>
                            <div className='border-bottom pl-2'>
                                {staff.gender}
                            </div>
                        </div>

                        <div className='form-group'>
                            <label className='font-weight-bold'>
                                Date of Birth
                            </label>
                            <div className='border-bottom pl-2'>
                                {staff.dateOfBirth}
                            </div>
                        </div>

                        <div className='form-group'>
                            <label className='font-weight-bold'>Position</label>
                            <div className='border-bottom pl-2'>
                                {staff.position}
                            </div>
                        </div>

                        <div className='form-group'>
                            <label className='font-weight-bold'>
                                Ielts Degree
                            </label>
                            <div className='border-bottom pl-2'>
                                {staff.ieltsDegree}
                            </div>
                        </div>

                        {staff.position === 'trainee' && (
                            <div className='form-group'>
                                <label className='font-weight-bold'>
                                    Attending Courses
                                </label>
                                <div className='border-bottom pl-2'>
                                    {!staff.courses ? (
                                        <>
                                            This staff has not attended any
                                            course
                                        </>
                                    ) : (
                                        staff.courses.map((course) => (
                                            <p key={course._id}>
                                                {course.name} - {course.code}
                                                <br />
                                            </p>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {staff.experience && (
                    <Experience
                        experience={staff.experience}
                        id={match.params.id}
                    />
                )}

                {staff.education && (
                    <Education
                        education={staff.education}
                        id={match.params.id}
                    />
                )}

                {staff.position === 'trainer' && (
                    <Topic topics={staff.topics} id={match.params.id} />
                )}
            </div>
        </div>
    )
}

Profile.propTypes = {
    staff: PropTypes.object.isRequired,
    getStaffById: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    staff: state.staff,
})

export default connect(mapStateToProps, { getStaffById })(Profile)
