
import axios from "axios";
import { logout } from "../redux/actions/auth.action";
import { endpoints, URL } from "./Constants";

const bearerToken = sessionStorage.getItem("bearerToken");

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const getToken = (params) => {
    return axios.post(URL + endpoints.TOKEN, params, config);
}

export const login = (authValues) => {
    return fetch(URL + endpoints.LOGIN, authValues, {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + bearerToken,
            "Content-Type": "application/json",
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export const formatError = (errorResponse) => {
    switch (errorResponse) {
        case 'EMAIL_EXISTS':
            return 'Email already exists';
        case 'EMAIL_NOT_FOUND':
            return 'Email not found';
        case 'INVALID_PASSWORD':
            return 'Invalid Password';
        case 'USER_DISABLED':
            return 'User Disabled';
        default:
            return '';
    }
}


export function saveTokenInSessionStorage(tokenDetails) {
    // tokenDetails.expireDate = new Date(
    //     new Date().getTime() + tokenDetails.expiresIn * 1000,
    // );
    sessionStorage.setItem('bearerToken', tokenDetails);
}

// export function runLogoutTimer(dispatch, timer, navigate) {
//     setTimeout(() => {
//         dispatch(logout(navigate));
//     }, timer);
// }

export const checkAutoLogin = (dispatch, navigate) => {
    const tokenDetailsString = sessionStorage.getItem('bearerToken');
    // let tokenDetails = '';
    if (!tokenDetailsString) {
        dispatch(logout(navigate));
        return;
    }

    // tokenDetails = JSON.parse(tokenDetailsString);
    // let expireDate = new Date(tokenDetails.expireDate);
    // let todaysDate = new Date();

    // if (todaysDate > expireDate) {
    //     dispatch(logout(navigate));
    //     return;
    // }
    // dispatch(loginConfirmedAction(tokenDetails));

    // const timer = expireDate.getTime() - todaysDate.getTime();
    // runLogoutTimer(dispatch, timer, navigate);
}


