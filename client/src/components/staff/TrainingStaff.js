import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getStaffsByPosition, deleteStaffById } from '../../actions/staff'

const TrainingStaff = ({
    getStaffsByPosition,
    staff: { loading, staffs },
    deleteStaffById,
}) => {
    useEffect(() => {
        getStaffsByPosition('trainee')
        getStaffsByPosition('trainer')
    }, [getStaffsByPosition])

    const deleteStaff = (id) => {
        deleteStaffById(id)
    }

    return loading ? (
        <h3 className='text-muted mt-3'>Loading staffs ...</h3>
    ) : (
        <Fragment>
            <div className='card mt-3'>
                <div className='card-header'>Trainer</div>

                <div className='card-body card-table'>
                    <table className='table table-striped table-hover'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Date Of Birth</th>
                                <th>Position</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {staffs.length > 0 ? (
                                staffs
                                    .filter(
                                        (staff) => staff.position === 'trainer'
                                    )
                                    .map((staff) => (
                                        <tr key={staff._id}>
                                            <td>
                                                <Link
                                                    to={`/profile/${staff._id}`}
                                                >
                                                    {staff.name}
                                                </Link>
                                            </td>
                                            <td>{staff.email}</td>
                                            <td>{staff.gender}</td>
                                            <td>{staff.dateOfBirth}</td>
                                            <td>{staff.position}</td>
                                            <td>
                                                <Link
                                                    to={`/staff/${staff._id}/topic`}
                                                >
                                                    <i className='fas fa-plus'></i>
                                                </Link>
                                                <Link
                                                    to={`/profile/${staff._id}/edit`}
                                                    className='pl-2'
                                                >
                                                    <i className='fas fa-edit'></i>
                                                </Link>

                                                <label
                                                    onClick={() =>
                                                        deleteStaff(staff._id)
                                                    }
                                                    className='pl-2'
                                                    id='remove-item'
                                                >
                                                    <i className='fas fa-times'></i>
                                                </label>
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan='6' className='text-muted'>
                                        No Staff found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='card mt-3'>
                <div className='card-header'>Trainee</div>

                <div className='card-body card-table'>
                    <table className='table table-striped table-hover'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Date Of Birth</th>
                                <th>Position</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {staffs.length > 0 ? (
                                staffs
                                    .filter(
                                        (staff) => staff.position === 'trainee'
                                    )
                                    .map((staff) => (
                                        <tr key={staff._id}>
                                            <td>
                                                <Link
                                                    to={`/profile/${staff._id}`}
                                                >
                                                    {staff.name}
                                                </Link>
                                            </td>
                                            <td>{staff.email}</td>
                                            <td>{staff.gender}</td>
                                            <td>{staff.dateOfBirth}</td>
                                            <td>{staff.position}</td>
                                            <td>
                                                <Link
                                                    to={`/staff/${staff._id}/course`}
                                                >
                                                    <i className='fas fa-plus'></i>
                                                </Link>
                                                {'  '}
                                                <Link
                                                    to={`/profile/${staff._id}/edit`}
                                                    className='pl-2'
                                                >
                                                    <i className='fas fa-edit'></i>
                                                </Link>
                                                <Link
                                                    to={`/profile/${staff._id}/change-credentials`}
                                                    className='pl-2'
                                                >
                                                    <i className="fas fa-key"></i>
                                                </Link>
                                                <label
                                                    onClick={() =>
                                                        deleteStaff(staff._id)
                                                    }
                                                    className='pl-2'
                                                    id='remove-item'
                                                >
                                                    <i className='fas fa-times'></i>
                                                </label>
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan='6' className='text-muted'>
                                        No Staff found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

TrainingStaff.propTypes = {
    getStaffsByPosition: PropTypes.func.isRequired,
    staff: PropTypes.object.isRequired,
    deleteStaffById: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    staff: state.staff,
})

export default connect(mapStateToProps, {
    getStaffsByPosition,
    deleteStaffById,
})(TrainingStaff)
