import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getStaffsByPosition } from '../../actions/staff'

const TrainingStaff = ({ getStaffsByPosition, staff: { loading, staffs } }) => {
    useEffect(() => {
        getStaffsByPosition('trainee')
        getStaffsByPosition('trainer')
    }, [getStaffsByPosition])

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
                                            <td>{staff.name}</td>
                                            <td>{staff.email}</td>
                                            <td>{staff.gender}</td>
                                            <td>{staff.dateOfBirth}</td>
                                            <td>{staff.position}</td>
                                            <td></td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan='6' className='text-muted'>No Staff found</td>
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
                                            <td>{staff.name}</td>
                                            <td>{staff.email}</td>
                                            <td>{staff.gender}</td>
                                            <td>{staff.dateOfBirth}</td>
                                            <td>{staff.position}</td>
                                            <td></td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan='6' className='text-muted'>No Staff found</td>
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
}

const mapStateToProps = (state) => ({
    staff: state.staff,
})

export default connect(mapStateToProps, { getStaffsByPosition })(TrainingStaff)
