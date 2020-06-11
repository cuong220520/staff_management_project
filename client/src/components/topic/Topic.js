import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { getTopics, deleteTopicById } from '../../actions/topic'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'

const Topic = ({ getTopics, deleteTopicById, topic: { topics, loading } }) => {
    useEffect(() => {
        getTopics()
    }, [getTopics, loading])

    const deleteTopic = (id) => {
        deleteTopicById(id)
    }

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link className='btn btn-primary mt-4' to='/course/create'>
                <i className='fas fa-plus'></i> Create Topic
            </Link>

            <div className='card mt-4'>
                <div className='card-header main-color-bg'>
                    <h4>
                        <i className='fas fa-coins'></i> Topics Management
                    </h4>
                </div>

                <div className='card-body'>
                    <div className='card mt-3'>
                        <div className='card-header'>
                            All topics in program
                        </div>

                        <div className='card-body card-table'>
                            <table className='table table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Code</th>
                                        <th>Courses</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {topics.length > 0 ? (
                                        topics.map((topic) => (
                                            <tr key={topic._id}>
                                                <td>{topic.name}</td>
                                                <td>{topic.code}</td>
                                                <td>
                                                    {topic.courses && 
                                                        topic.courses.map(course => (
                                                            <>{course.name} - {course.code} <br /></>
                                                        ))
                                                    }
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/topic/${topic._id}/edit`}
                                                    >
                                                        <i className='fas fa-edit'></i>
                                                    </Link>

                                                    <label
                                                        onClick={() =>
                                                            deleteTopic(
                                                                topic._id
                                                            )
                                                        }
                                                        id='remove-item'
                                                        className='pl-2'
                                                    >
                                                        <i className='fas fa-times'></i>
                                                    </label>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan='3'
                                                className='text-muted mt-3'
                                            >
                                                No profile found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

Topic.propTypes = {
    getTopics: PropTypes.func.isRequired,
    topic: PropTypes.object.isRequired,
    deleteTopicById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    topic: state.topic
})

export default connect(mapStateToProps, { getTopics, deleteTopicById })(Topic)
