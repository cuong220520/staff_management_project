import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'

import { deleteExperience } from '../../actions/staff'

const Experience = ({ experience, deleteExperience, id }) => {
    const experiences = experience.map((exp) => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
                {exp.to === null ? (
                    ' Now'
                ) : (
                    <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                )}
            </td>

            <td>
                <button
                    className='btn btn-danger'
                    onClick={() => deleteExperience(id, exp._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    ))

    return experience.length === 0 ? (
        <div className='card mt-4'>
            <div className='card-header'>
                This staff have no experience information
            </div>
        </div>
    ) : (
        <div className='card mt-4'>
            <div className='card-header'>
                <i className='fas fa-file-invoice'></i> Staff Experience
            </div>

            <div className='card-body'>
                <table className='table table-hover table-striped'>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>{experiences}</tbody>
                </table>
            </div>
        </div>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, { deleteExperience })(Experience)
