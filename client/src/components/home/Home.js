import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from '../layout/Spinner'
import Admin from '../staff/Admin'
import Trainer from '../staff/Trainer'

const Landing = ({ auth: { loading, user } }) => {
    return loading ? (
        <Spinner />
    ) : (
        <div className='row mt-4'>
            <div className='col-md-3'>
                <div className='list-group'>
                    <a
                        href='index.html'
                        className='list-group-item active main-color-bg'
                    >
                        <i className='fas fa-cogs'></i> Dashboard
                    </a>
                    <a href='pages.html' className='list-group-item'>
                        <i className='far fa-list-alt'></i> Pages
                        <span className='badge badge-secondary float-right'>
                            12
                        </span>
                    </a>
                    <a href='posts.html' className='list-group-item'>
                        <i className='far fa-edit'></i> Posts
                        <span className='badge badge-secondary float-right'>
                            230
                        </span>
                    </a>
                    <a href='users.html' className='list-group-item'>
                        <i className='far fa-user'></i> Users
                        <span className='badge badge-secondary float-right'>
                            19
                        </span>
                    </a>
                </div>

                <div className='card bg-light mt-3 card-padding'>
                    <h4>Disk Space Used</h4>
                    <div className='progress'>
                        <div
                            className='progress-bar'
                            role='progressbar'
                            aria-valuenow='50'
                            aria-valuemin='0'
                            aria-valuemax='100'
                        >
                            50%
                        </div>
                    </div>
                    <h4>Bandwidth Used</h4>
                    <div className='progress'>
                        <div
                            className='progress-bar'
                            role='progressbar'
                            aria-valuenow='75'
                            aria-valuemin='0'
                            aria-valuemax='100'
                        >
                            75%
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-md-9'>
                <div className='card'>
                    <div className='card-header main-color-bg'>
                        Website Overview
                    </div>

                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-3'>
                                <div className='card card-pd text-center bg-light'>
                                    <h2>
                                        <i className='far fa-user'></i> 19
                                    </h2>
                                    <h4>Users</h4>
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className='card card-pd text-center bg-light'>
                                    <h2>
                                        <i className='far fa-edit'></i> 230
                                    </h2>
                                    <h4>Posts</h4>
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className='card card-pd text-center bg-light'>
                                    <h2>
                                        <i className='far fa-list-alt'></i> 12
                                    </h2>
                                    <h4>Pages</h4>
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className='card card-pd text-center bg-light'>
                                    <h2>
                                        <i className='far fa-chart-bar'></i>{' '}
                                        1023
                                    </h2>
                                    <h4>Visitors</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {user.position === 'admin' && <Admin />}
                {user.position === 'trainer' && <Trainer />}
            </div>
        </div>
    )
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(Landing)
