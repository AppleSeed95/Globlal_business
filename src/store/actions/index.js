import axios from 'axios'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/type'

export const login = (data) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            const { data: response } = await axios.post('http://localhost:8000/login', data);
            if (response.success) {
                localStorage.setItem('userToken', response.result.token);
                localStorage.setItem('userCredential', JSON.stringify(data));
                dispatch({
                    type: LOGIN_SUCCESS, payload:
                    {
                        token: response.result.token,
                        email: data.email,
                        password: data.password
                    }
                });
            } else {
                dispatch({ type: LOGIN_FAILURE, error: response });
            }
        } catch (error) {
            dispatch({ type: LOGIN_FAILURE, error });
        }
    };
};
export const logout = () => {
    return async (dispatch) => {
        dispatch({ type: LOGOUT });
        localStorage.removeItem('userToken');
        localStorage.removeItem('userCredential');
    };
};