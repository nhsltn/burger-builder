import * as actionTypes from './actionTypes';
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userID) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userID: userID
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT  
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const API = 'AIzaSyAWp-hw0W7LgUYy0lNtGd0rrLDyctpyoZo';
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API}`;
        if (!isSignUp) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API}`
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response.data);
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error.response.data.error.message);
                dispatch(authFail(error.response.data.error))
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};