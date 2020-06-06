import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getStaffs } from '../../actions/staff'

const Admin = ({ getStaffs, staff: { loading, staffs } }) => {
    useEffect(() => {
        getStaffs()
    }, [getStaffs])

    return loading ? (
        <h3 className='text-muted mt-3'>Loading staffs ...</h3>
    ) : (
        <div className='card mt-3'>
            <div className='card-header'>Latest Users</div>

            <div className='card-body card-table'>
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
                                    <td>
                                        <Link to={`/profile/${staff._id}`}>
                                            <i className='fas fa-edit'></i>
                                        </Link>
                                        <label id='remove-item'>
                                            <i className='fas fa-times'></i>
                                        </label>
                                    </td>
                                </tr>    
                            )
                        ) : (
                            <tr>
                                <td colSpan='6'>No profile found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

Admin.propTypes = {
    getStaffs: PropTypes.func.isRequired,
    staff: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    staff: state.staff,
})

export default connect(mapStateToProps, { getStaffs })(Admin)
