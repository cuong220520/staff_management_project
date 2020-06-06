import React from 'react'
import { Link } from 'react-router-dom'

const PermissionPage = () => {
    return (
        <div className='container text-center mt-4'>
            <h1 className='text-danger'>Permission Denied <span><i className='fas fa-exclamation-triangle'></i></span></h1>
            <h4>Ooops! You do not have permission to access this page!</h4>

            <Link to='/' className='btn btn-primary mt-4'>Back HomePage</Link>
        </div>
    )
}

export default PermissionPage
