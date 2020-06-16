import React, { useEffect, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getCategories, deleteCategoryById, searchCategories } from '../../actions/category'
import Spinner from '../layout/Spinner'

const Category = ({
    getCategories,
    category: { categories, loading },
    deleteCategoryById,
    searchCategories
}) => {
    const [input, setInput] = useState('')

    const onChange = (event) => {
        setInput(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        searchCategories({ input })
    }

    useEffect(() => {
        getCategories()
    }, [getCategories, loading])

    const deleteCategory = (id) => {
        deleteCategoryById(id)
    }

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className='row mt-4'>
                <div className='col-md-6'>
                    <Link className='btn btn-primary' to='/category/create'>
                        <i className='fas fa-plus'></i> Create Category
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

            <div className='card mt-4'>
                <div className='card-header main-color-bg'>
                    <h4>
                        <i className='fas fa-coins'></i> Category Management
                    </h4>
                </div>

                <div className='card-body'>
                    <div className='card mt-3'>
                        <div className='card-header'>
                            All categories in program
                        </div>

                        <div className='card-body card-table'>
                            <table className='table table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {categories.length > 0 ? (
                                        categories.map((category) => (
                                            <tr key={category._id}>
                                                <td>{category.name}</td>
                                                <td>
                                                    {category.description}
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/category/${category._id}/edit`}
                                                    >
                                                        <i className='fas fa-edit'></i>
                                                    </Link>

                                                    <label
                                                        onClick={() =>
                                                            deleteCategory(
                                                                category._id
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

Category.propTypes = {
    getCategories: PropTypes.func.isRequired,
    deleteCategoryById: PropTypes.func.isRequired,
    searchCategories: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    category: state.category
})

export default connect(mapStateToProps, { getCategories, deleteCategoryById, searchCategories })(
    Category
)
