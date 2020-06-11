import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCourses } from '../../actions/course'
import { assignCourse, getStaffById } from '../../actions/staff'
import Spinner from '../layout/Spinner'

const AssignCourse = ({
    getCourses,
    assignCourse,
    course: { courses, loading },
    staff,
    match,
    getStaffById,
    history,
}) => {
    const [code, setCode] = useState('')

    const onChange = (event) => {
        setCode(event.target.value)
    }

    useEffect(() => {
        getCourses()
        getStaffById(match.params.id)


    }, [getCourses, getStaffById, loading, match])

    const onSubmit = (event) => {
        event.preventDefault()

        assignCourse(match.params.id, { code }, history)
    }

    return loading ? (
        <Spinner />
    ) : (
        <div className='container mt-4'>
            <h1 className='text-center mb-4'>
                <i className='fas fa-edit'></i>
                {'  '}Assign trainee to a course
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
                            <p className='form-control'>{staff.name}</p>
                        </div>

                        <div className='form-group'>
                            <label>Position</label>
                            <p className='form-control'>{staff.position}</p>
                        </div>

                        <div className='form-group'>
                            <label>Course</label>
                            <select
                                name='position'
                                className='form-control'
                                onChange={onChange}
                                value={code}
                            >
                                {courses.map((course) => (
                                    <option key={course._id} value={course.code}>
                                        {course.name}
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

AssignCourse.propTypes = {
    course: PropTypes.object.isRequired,
    staff: PropTypes.object.isRequired,
    getCourses: PropTypes.func.isRequired,
    assignCourse: PropTypes.func.isRequired,
    getStaffById: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    course: state.course,
    staff: state.staff.staff,
})

export default connect(mapStateToProps, {
    getCourses,
    assignCourse,
    getStaffById,
})(AssignCourse)
