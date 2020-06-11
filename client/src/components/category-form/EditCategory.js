import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCategoryById, updateCategoryById } from '../../actions/category'

const EditCategory = ({
    history,
    getCategoryById,
    updateCategoryById,
    category: { category, loading },
    match
}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    })

    useEffect(() => {
        getCategoryById(match.params.id)

        setFormData({
            name: loading || !category.name ? '' : category.name,
            description:
                loading || !category.description ? '' : category.description,
        })
        // eslint-disable-next-line
    }, [loading, getCategoryById, match, category._id])

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const { name, description } = formData

    const onSubmit = (event) => {
        event.preventDefault()

        updateCategoryById(match.params.id, formData, history)
    }

    return (
        <div className='container mt-4'>
            <h1 className='text-center mb-4'>
                <i className='fas fa-edit'></i>
                {'  '}Update Course
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
                            <input
                                type='text'
                                className='form-control'
                                name='name'
                                value={name}
                                onChange={onChange}
                                placeholder='Enter Name'
                            />
                        </div>

                        <div className='form-group'>
                            <label>Description</label>
                            <textarea
                                type='text'
                                className='form-control'
                                name='description'
                                value={description}
                                onChange={onChange}
                                placeholder='Enter Description'
                            ></textarea>
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

EditCategory.propTypes = {
    updateCategoryById: PropTypes.func.isRequired,
    getCategoryById: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    category: state.category,
})

export default connect(mapStateToProps, {
    updateCategoryById,
    getCategoryById,
})(EditCategory)
