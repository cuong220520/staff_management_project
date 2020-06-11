import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/staff'
import { connect } from 'react-redux'

const Education = ({ education, deleteEducation, id }) => {
    const educations = education.map((edu) => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>{edu.fieldOfStudy}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                {edu.to === null ? (
                    ' Now'
                ) : (
                    <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                )}
            </td>

            <td>
                <button
                    className='btn btn-danger'
                    onClick={() => deleteEducation(id, edu._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    ))

    return education.length === 0 ? (
        <div className='card mt-4'>
            <div className='card-header'>
                This staff have no education information
            </div>
        </div>
    ) : (
        <div className='card mt-4 card-overflow'>
            <div className='card-header'>
                <i className='far fa-file-alt'></i> Staff Education
            </div>

            <div className='card-body'>
                <table className='table table-hover table-striped'>
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Field of Study</th>
                            <th>Years</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>{educations}</tbody>
                </table>
            </div>
        </div>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, { deleteEducation })(Education)
