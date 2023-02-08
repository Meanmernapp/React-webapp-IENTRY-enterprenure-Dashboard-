
import axios from "axios";
import { logOut } from "../reduxToolkit/authentication/authenticationSlice";
import { endpoints, URL } from "./Constants";

import cryptoJs from 'crypto-js';
import securekey from "../config";


const config = {
    headers: {
        "Accept": "application/json",
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const getToken = (params) => {
    return axios.post(URL + endpoints.TOKEN, params, config);
}

// export function runLogoutTimer(dispatch, timer, navigate) {
//     setTimeout(() => {
//         dispatch(logout(navigate));
//     }, timer);
// }

export const logoutUser = (navigate, dispatch) => {
    // sessionStorage.removeItem("userdata");
    // sessionStorage.removeItem("bearerToken");
    dispatch(logOut())
    navigate('/')
}



export const checkAutoLogin = (navigate) => {


    const token = sessionStorage.getItem('bearerToken');
    const bytes = cryptoJs.AES.decrypt(token, securekey)
    const tokenDetailsString = bytes.toString(cryptoJs.enc.Utf8);
    // let tokenDetails = '';
    if (!tokenDetailsString) {
        logoutUser(navigate);
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