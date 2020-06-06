import { GET_STAFFS, GET_STAFFS_ERROR } from '../actions/types'

const initialState = {
    staff: {},
    staffs: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
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
    
        default:
            return state
    }
}