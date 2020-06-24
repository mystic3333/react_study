import {FETCH_USER, FETCH_REQUEST, FETCH_ERROR} from '../constant/constant'

const initState = {
    user: {},
    isFetching: false,
    error: null
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case FETCH_REQUEST:
            return {
                isFetching: true,
                error: null,
                user: {}
            }
        case FETCH_ERROR:
            return {
                isFetching: false,
                error: action.error
            }
        case FETCH_USER:
            return {
                isFetching: false,
                error: null,
                user: action.user
            }
        default:
            return state
    }
}

export default userReducer

