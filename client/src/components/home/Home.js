import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import Spinner from '../layout/Spinner'
import Admin from '../staff/Admin'
import Trainer from '../staff/Trainer'
import TrainingStaff from '../staff/TrainingStaff'

const Landing = ({ auth: { loading, user } }) => {
    if (user.position === 'trainee' || user.position === 'trainer') {
        return <Redirect to={`/profile/${user._id}`} />
    }

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            {user.position === 'admin' || user.position === 'training-staff' ? (
                <Link className='btn btn-primary mt-4' to='/staff/profile'>
                    <i className='fas fa-plus'></i> Create Staff
                </Link>
            ) : null}

            <div className='card mt-4 mb-4'>
                <div className='card-header main-color-bg'>
                    <h4>
                        <i className='far fa-address-book'></i> Management System
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
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(Landing)
