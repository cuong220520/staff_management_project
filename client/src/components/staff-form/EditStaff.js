import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getStaffById, updateStaffById } from '../../actions/staff'

const EditStaff = ({
    match,
    staff: { staff, loading },
    getStaffById,
    updateStaffById,
    history
}) => {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        dateOfBirth: '',
        ieltsDegree: 0,
        position: '',
    })

    const fetchUser = () => {
        getStaffById(match.params.id)
    }

    useEffect(() => {
        fetchUser()

        setFormData({
            name: loading || !staff.name ? '' : staff.name,
            gender: loading || !staff.gender ? '' : staff.gender,
            dateOfBirth: loading || !staff.dateOfBirth ? '' : staff.dateOfBirth,
            ieltsDegree: loading || !staff.ieltsDegree ? '' : staff.ieltsDegree,
            position: loading || !staff.position ? '' : staff.position,
        })
        // eslint-disable-next-line
    }, [loading, staff._id])

    const { name, gender, dateOfBirth, ieltsDegree, position } = formData

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const onSubmit = (event) => {
        event.preventDefault()

        updateStaffById(match.params.id, formData, history)
    }

    return (
        <div className='container mt-4'>
            <h1 className='text-center mb-4'>
                <i className='fas fa-edit'></i>
                {'  '}Update Staff Profile
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
                            <input
                                type='text'
                                className='form-control'
                                name='name'
                                value={name}
                                onChange={onChange}
                                placeholder='Enter Name'
                            />
                        </div>

                        <div className='form-group'>
                            <label>Gender</label>
                            <select
                                name='gender'
                                className='form-control'
                                onChange={onChange}
                                value={gender}
                            >
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <label>Date Of Birth</label>
                            <input
                                className='form-control'
                                type='date'
                                name='dateOfBirth'
                                value={dateOfBirth}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label>Ielts Degree</label>
                            <input
                                type='text'
                                className='form-control'
                                name='ieltsDegree'
                                value={ieltsDegree}
                                onChange={onChange}
                                placeholder='Enter Ielts Degree'
                            />
                        </div>

                        <div className='form-group'>
                            <label>Position</label>
                            <select
                                name='position'
                                className='form-control'
                                onChange={onChange}
                                value={position}
                            >
                                <option value='trainer'>Trainer</option>
                                <option value='trainee'>Trainee</option>
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

EditStaff.propTypes = {
    staff: PropTypes.object.isRequired,
    getStaffById: PropTypes.func.isRequired,
    updateStaffById: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    staff: state.staff,
})

export default connect(mapStateToProps, { updateStaffById, getStaffById })(
    EditStaff
)
