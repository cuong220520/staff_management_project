import { GET_COURSES, GET_COURSES_ERROR } from '../actions/types'

const initialState = {
    course: {},
    courses: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_COURSES:
            return {
                ...state,
                courses: payload,
                loading: false,
                error: {}
            }

        case GET_COURSES_ERROR: {
            return {
                ...state,
                courses: [],
                loading: false,
                error: payload
            }
        }
    
        default:
            return state
    }
}