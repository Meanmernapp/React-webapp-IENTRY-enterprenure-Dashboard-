import {
    CREATE_NEW_EMPLOYEE
  } from "../actionTypes";
  
  const initialState = {
    email: null,
    status: null,
  };
  
  export const authReducer = (prevState = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case LOGIN_REQUEST_ACTION:
        return {
          ...prevState,
          loading: true,
        };
      case LOGIN_CONFIRMED_ACTION:
        return {
          error: false,
          userData: payload.data,
          loading: false,
        };
      case LOGIN_FAILED_ACTION:
        return {
          email: null,
          token: null,
          loading: false,
          error: true,
        };
      case LOG_OUT_ACTION:
        return {
          loading: false,
          error: false,
          email: null,
          token: null,
          user: null,
        };
      default:
        return prevState;
    }
  };
  