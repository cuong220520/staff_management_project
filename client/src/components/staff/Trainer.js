import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getStaffsByPosition } from '../../actions/staff'

const Admin = ({ getStaffsByPosition, staff: { loading, staffs } }) => {
    useEffect(() => {
        getStaffsByPosition('trainee')
    }, [getStaffsByPosition])

    return loading ? (
        <h3 className='text-muted mt-3'>Loading staffs ...</h3>
    ) : (
        <div className='card mt-3'>
            <div className='card-header'>Latest Users</div>

            <div className='card-body'>
                <table className='table table-striped'>
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
                            staffs.map(staff => 
                                <tr key={staff._id}>
                                    <td>{staff.name}</td>
                                    <td>{staff.email}</td>
                                    <td>{staff.gender}</td>
                                    <td>{staff.dateOfBirth}</td>
                                    <td>{staff.position}</td>
                                    <td></td>
                                </tr>    
                            )
                        ) : (
                            <tr>No staffs found</tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

Admin.propTypes = {
    getStaffsByPosition: PropTypes.func.isRequired,
    staff: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    staff: state.staff,
})

export default connect(mapStateToProps, { getStaffsByPosition })(Admin)