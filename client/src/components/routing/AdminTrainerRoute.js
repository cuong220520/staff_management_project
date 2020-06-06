import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

import { connect } from 'react-redux'

const AdminTrainerRoute = ({
    component: Component,
    auth: {
        isAuthenticated,
        loading,
        user: { position },
    },
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) =>
            !isAuthenticated && !loading ? (
                <Redirect to='/login' />
            ) : position === 'trainee' ? (
                <Redirect to='/403error' />
            ) : (
                <Component {...props} />
            )
        }
    />
)

AdminTrainerRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(AdminTrainerRoute)
