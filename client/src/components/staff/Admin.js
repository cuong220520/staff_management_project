import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getStaffs, deleteStaffById } from '../../actions/staff'

const Admin = ({ getStaffs, staff: { loading, staffs }, deleteStaffById }) => {
    useEffect(() => {
        getStaffs()
    }, [getStaffs])

    const deleteStaff = (id) => {
        deleteStaffById(id)
    }

    return loading ? (
        <h3 className='text-muted mt-3'>Loading staffs ...</h3>
    ) : (
        <div className='card mt-3'>
            <div className='card-header'>Latest Users</div>

            <div className='card-body card-table'>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Date Of Birth</th>
                            <th>Ielts Degree</th>
                            <th>Position</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {staffs.length > 0 ? (
                            staffs.map(staff => 
                                <tr key={staff._id}>
                                    <td><Link to={`/profile/${staff._id}`}>{staff.name}</Link></td>
                                    <td>{staff.email}</td>
                                    <td>{staff.gender}</td>
                                    <td>{staff.dateOfBirth}</td>
                                    <td>{staff.ieltsDegree}</td>
                                    <td>{staff.position}</td>
                                    <td>
                                        <Link to={`/profile/${staff._id}/change-credentials`}>
                                            <i className='fas fa-edit'></i>
                                        </Link>

                                        <label onClick={() => deleteStaff(staff._id)} id='remove-item' className='pl-2'>
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
    deleteStaffById: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    staff: state.staff,
})

export default connect(mapStateToProps, { getStaffs, deleteStaffById })(Admin)
