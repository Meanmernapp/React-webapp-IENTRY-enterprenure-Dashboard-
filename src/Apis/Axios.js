import axios from "axios";
import { URL } from "./Constants";
import { toast } from "react-toastify";
import cryptoJs from 'crypto-js';
import securekey from "../config";




// axios.defaults.withCredentials = true;

export const apiInstance =  axios.create({
  baseURL: URL,
  headers: {
    Accept: "application/json",
  },
});

const responseSuccessHandler = (response) => {
  document.getElementById("overlay").style.display = "none";
  return response;
};

const responseErrorHandler = (error) => {
  document.getElementById("overlay").style.display = "none";
  if (!navigator.onLine) {
    toast.error("Request failed, Please check your network connection!");
  }
  console.log(error, "err in response");

  // if (error && error.response && error.response.status === 401) {
  //     if (error.response.status === 401) {
  //         toast['error'](error.response.data.message, error)
  //         window.location = "/auth/login";
  //     }
  // }
  // if (error && error.response && error.response.status === 403) {
  //     toast["warning"](error.response.data.message, 'Un-Authorized');
  // }
  // if (error && error.response && error.response.status === 422) {
  //     toast["success"](error.response.data.message, 'Validation errors');
  // }

  // if (error && error.response && error.response.status === 404) {
  //     toast["info"](error.response.data.message, 'Not Found');
  // }
  // if (error && error.response && error.response.status > 404 && error.response.status !== 422) {
  //     toast.error(error.response.data.message);
  // }

  return Promise.reject(error);
};

apiInstance.interceptors.request.use(
  function (config) {
    document.getElementById("overlay").style.display = "block";
    const token = sessionStorage.getItem('bearerToken');
    const bytes = cryptoJs.AES.decrypt(token, securekey)
    const tokenDecrpt = bytes.toString(cryptoJs.enc.Utf8);
    config.headers.Authorization = `Bearer ${tokenDecrpt}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => responseSuccessHandler(response),
  (error) => responseErrorHandler(error)
);

export default apiInstance;
