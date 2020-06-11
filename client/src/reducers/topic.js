import {
    GET_TOPIC,
    GET_TOPICS,
    GET_TOPICS_ERROR,
    CLEAR_TOPIC,
    CLEAR_TOPICS,
} from '../actions/types'

const initialState = {
    topic: {},
    topics: [],
    loading: true,
    error: {},
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_TOPICS:
            return {
                ...state,
                topics: payload,
                loading: false,
                error: {},
            }

        case GET_TOPIC:
            return {
                ...state,
                topic: payload,
                loading: false,
                error: {}
            }

        case GET_TOPICS_ERROR: {
            return {
                ...state,
                topics: [],
                loading: false,
                error: payload,
            }
        }

        case CLEAR_TOPIC: {
            return {
                ...state,
                topic: {},
                error: {},
                loading: false,
            }
        }

        case CLEAR_TOPICS: {
            return {
                ...state,
                topics: [],
                error: {},
                loading: false,
            }
        }

        default:
            return state
    }
}
