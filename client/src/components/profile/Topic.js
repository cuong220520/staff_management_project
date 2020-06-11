import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { deleteTopic } from '../../actions/staff'

const Topic = ({ topics, deleteTopic, id }) => {
    const topicsOfTrainer = topics.map((topic) => (
        <tr key={topic._id}>
            <td>{topic.name}</td>
            <td>{topic.code}</td>
            <td>{topic.courses && 
                topic.courses.map(course => (
                    <>{course.name} - {course.code} <br /></>
                ))
            }</td>

            <td>
                <button
                    className='btn btn-danger'
                    onClick={() => deleteTopic(id, topic._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    ))

    return topics.length === 0 ? (
        <div className='card mt-4'>
            <div className='card-header'>
                This staff have no topic information
            </div>
        </div>
    ) : (
        <div className='card mt-4'>
            <div className='card-header'>
                <i className='far fa-file-alt'></i> Trainer Topic
            </div>

            <div className='card-body'>
                <table className='table table-hover table-striped'>
                    <thead>
                        <tr>
                            <th>Topic Name</th>
                            <th>Topic Code</th>
                            <th>Courses</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>{topicsOfTrainer}</tbody>
                </table>
            </div>
        </div>
    )
}

Topic.propTypes = {
    deleteTopic: PropTypes.func.isRequired,
}

export default connect(null, { deleteTopic })(Topic)
