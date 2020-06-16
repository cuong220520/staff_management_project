import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import Spinner from '../layout/Spinner'
import Admin from '../staff/Admin'
import Trainer from '../staff/Trainer'
import TrainingStaff from '../staff/TrainingStaff'
import { searchStaffs } from '../../actions/staff'

const Landing = ({ auth: { loading, user }, searchStaffs }) => {
    const [input, setInput] = useState('')

    const onChange = (event) => {
        setInput(event.target.value)
    }

    const onSubmit = event => {
        event.preventDefault()
        searchStaffs({ input })
    }

    if (user.position === 'trainee' || user.position === 'trainer') {
        return <Redirect to={`/profile/${user._id}`} />
    }

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            {user.position === 'admin' || user.position === 'training-staff' ? (
                <div className='row mt-4'>
                    <div className='col-md-6'>
                        <Link
                            className='btn btn-primary'
                            to='/staff/profile'
                        >
                            <i className='fas fa-plus'></i> Create Staff
                        </Link>
                    </div>

                    <div className='col-md-6'>
                        <form onSubmit={onSubmit}>
                            <div className='form-group d-flex'>
                                <input
                                    className='form-control'
                                    type='text'
                                    name='input'
                                    value={input}
                                    onChange={onChange}
                                />

                                <button type='submit' className='btn btn-info'>
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}

            <div className='card mt-4 mb-4'>
                <div className='card-header main-color-bg'>
                    <h4>
                        <i className='far fa-address-book'></i> Management
                        System
                    </h4>
                </div>

                <div className='card-body'>
                    {user.position === 'admin' && <Admin />}
                    {user.position === 'trainer' && <Trainer />}
                    {user.position === 'training-staff' && <TrainingStaff />}
                </div>
            </div>
        </Fragment>
    )
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired,
    searchStaffs: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { searchStaffs })(Landing)
