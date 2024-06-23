import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/type'

const initialState = {
    token: null,
    loading: false,
    loggedIn: null,
    error: null,
    email: null,
    password: null
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, loggedIn: true, token: action.payload.token, email: action.payload.email, password: action.payload.password };
        case LOGIN_FAILURE:
            return { ...state, loading: false, loggedIn: false, error: action.error };
        case LOGOUT:
            return { ...state, loading: false, loggedIn: false, token: null };
        default:
            return state;
    }
};

export default dataReducer;