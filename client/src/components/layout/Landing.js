import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadUser } from '../../actions/auth'
import Spinner from './Spinner'

const Landing = ({ auth: { loading, position } }) => {
    useEffect(() => {
        loadUser()
    }, [])

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    Landing Page
                </div> 
            )}
        </div>
    )
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loadUser })(Landing)
