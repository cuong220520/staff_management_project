import {
    GET_CATEGORIES,
    GET_CATEGORY,
    CLEAR_CATEGORY,
    CLEAR_CATEGORIES,
    GET_CATEGORIES_ERROR
} from '../actions/types'

const initialState = {
    category: {},
    categories: [],
    loading: true,
    error: {},
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload,
                loading: false,
                error: {},
            }

        case GET_CATEGORY:
            return {
                ...state,
                category: payload,
                loading: false,
                error: {}
            }

        case GET_CATEGORIES_ERROR: {
            return {
                ...state,
                categories: [],
                loading: false,
                error: payload,
            }
        }

        case CLEAR_CATEGORY: {
            return {
                ...state,
                category: {},
                error: {},
                loading: false,
            }
        }

        case CLEAR_CATEGORIES: {
            return {
                ...state,
                categories: [],
                error: {},
                loading: false,
            }
        }

        default:
            return state
    }
}
