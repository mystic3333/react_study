import {FETCH_USER, FETCH_REQUEST, FETCH_ERROR} from '../constant/constant'

export function fetch_user(user) {
    return {
        type: FETCH_USER,
        user
    }
}

export const fet_req = () => {
    return {
        type: FETCH_REQUEST
    }
}

export const fet_err = (error) => {
    return {
        type: FETCH_ERROR,
        error
    }
}

export const get_user = () => {
    return dispatch => {
        dispatch(fet_req())
        fetch('http://iwenwiki.com/api/blueberrypai/getChengpinDetails.php')
        .then(res => res.json())
        .then(res => {
            dispatch(fetch_user(res.chengpinDetails[0]))
        })
        .catch(error => {
            dispatch(fet_err(error))
        })
    }
}
