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
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error))
            })
    }
}