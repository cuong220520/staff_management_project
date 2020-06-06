import { GET_STAFFS, GET_STAFFS_ERROR, CLEAR_STAFF, CLEAR_STAFFS, GET_STAFF } from '../actions/types'

const initialState = {
    staff: {},
    staffs: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_STAFF:
            return {
                ...state,
                staff: payload,
                loading: false,
                error: {}
            }

        case GET_STAFFS:
            return {
                ...state,
                staffs: payload,
                loading: false,
                error: {}
            }

        case GET_STAFFS_ERROR:
            return {
                ...state,
                error: payload,
                staffs: [],
                loading: false
            }

        case CLEAR_STAFF: {
            return {
                ...state,
                staff: {},
                error: {},
                loading: false
            }
        }

        case CLEAR_STAFFS: {
            return {
                ...state,
                staffs: [],
                error: {},
                loading: false
            }
        }
    
        default:
            return state
    }
}