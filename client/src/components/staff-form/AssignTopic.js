import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTopics } from '../../actions/topic'
import { assignTopic, getStaffById } from '../../actions/staff'
import Spinner from '../layout/Spinner'

const AssignTopic = ({
    getTopics,
    assignTopic,
    topic: { topics, loading },
    staff,
    match,
    getStaffById,
    history,
}) => {
    const [code, setCode] = useState('')

    const onChange = (event) => {
        setCode(event.target.value)
    }

    useEffect(() => {
        getTopics()
        getStaffById(match.params.id)


    }, [getTopics, getStaffById, loading, match])

    const onSubmit = (event) => {
        event.preventDefault()

        assignTopic(match.params.id, { code }, history)
    }

    return loading || staff.loading ? (
        <Spinner />
    ) : (
        <div className='container mt-4'>
            <h1 className='text-center mb-4'>
                <i className='fas fa-edit'></i>
                {'  '}Assign trainer to a topic
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
                            <p className='form-control'>{staff.name}</p>
                        </div>

                        <div className='form-group'>
                            <label>Position</label>
                            <p className='form-control'>{staff.position}</p>
                        </div>

                        <div className='form-group'>
                            <label>Topic</label>
                            <select
                                name='code'
                                className='form-control'
                                onChange={onChange}
                                value={code}
                            >
                                <option value=''>Choose Topic</option>
                                {topics.map((topic) => (
                                    <option key={topic._id} value={topic.code}>
                                        {topic.name}
                                    </option>
                                ))}
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

AssignTopic.propTypes = {
    topic: PropTypes.object.isRequired,
    staff: PropTypes.object.isRequired,
    getTopics: PropTypes.func.isRequired,
    assignTopic: PropTypes.func.isRequired,
    getStaffById: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    topic: state.topic,
    staff: state.staff.staff,
})

export default connect(mapStateToProps, {
    getTopics,
    assignTopic,
    getStaffById,
})(AssignTopic)