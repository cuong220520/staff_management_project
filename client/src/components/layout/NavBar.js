import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logout } from '../../actions/auth'

const NavBar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    const authLink = (
        <Fragment>
            <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/'>
                        Dashboard
                        <span className='sr-only'>(current)</span>
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='pages.html'>
                        Pages
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='posts.html'>
                        Posts
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='users.html'>
                        Users
                    </Link>
                </li>
            </ul>

            <ul className='nav navbar-nav navbar-right'>
                <li className='nav-item'>
                    <Link className='nav-link' to="#">
                        Welcome, {user.name} ({user.position})
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='#' onClick={logout}>
                        Logout
                    </Link>
                </li>
            </ul>
        </Fragment>
    )

    const guestLink = (
        <Fragment>
            <ul className='navbar-nav mr-auto'></ul>
            <ul className='nav navbar-nav'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/login'>
                        Login
                    </Link>
                </li>
            </ul>
        </Fragment>
    )

    return (
        <Fragment>
            <nav className='navbar navbar-expand-md navbar-dark main-color-bg'>
                <div className='container'>
                    <Link className='navbar-brand' to='#'>
                        AdminStrap
                    </Link>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-toggle='collapse'
                        data-target='#navbarsExampleDefault'
                        aria-controls='navbarsExampleDefault'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div
                        className='collapse navbar-collapse'
                        id='navbarsExampleDefault'
                    >
                        {!loading && (
                            <Fragment>
                                {isAuthenticated ? authLink : guestLink}
                            </Fragment>
                        )}
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

NavBar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logout })(NavBar)
