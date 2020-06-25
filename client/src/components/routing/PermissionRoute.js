import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

import { connect } from 'react-redux'

import Spinner from '../layout/Spinner'

const PermissionRoute = ({
    component: Component,
    permissions,
    auth: {
        isAuthenticated,
        loading,
        user: { position },
    },
    ...rest
}) => {
    return loading ? (
        <Spinner />
    ) : (
        <Route
            {...rest}
            render={(props) =>
                !isAuthenticated && !loading ? (
                    <Redirect to='/login' />
                ) : !permissions.includes(position) ? (
                    <Redirect to='/403error' />
                ) : (
                    <Component {...props} />
                )
            }
        />
    )
}

PermissionRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(PermissionRoute)
