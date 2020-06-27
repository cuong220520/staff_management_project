import {
    GET_COURSES,
    GET_COURSES_ERROR,
    CLEAR_COURSE,
    CLEAR_COURSES,
    GET_COURSE
} from '../actions/types'

const initialState = {
    course: {},
    courses: [],
    loading: true,
    error: {},
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_COURSES:
            return {
                ...state,
                courses: payload,
                loading: false,
                error: {},
            }

        case GET_COURSE:
            return {
                ...state,
                course: payload,
                loading: false,
                error: {}
            } 

        case GET_COURSES_ERROR: {
            return {
                ...state,
                courses: [],
                loading: false,
                error: payload,
            }
        }

        case CLEAR_COURSE: {
            return {
                ...state,
                course: {},
                error: {},
                loading: false,
            }
        }

        case CLEAR_COURSES: {
            return {
                ...state,
                courses: [],
                error: {},
                loading: false,
            }
        }

        default:
            return state
    }
}
