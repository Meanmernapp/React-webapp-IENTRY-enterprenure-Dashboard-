import { toast } from "react-toastify";
import { formatError, login, saveTokenInSessionStorage } from "../../Apis/Authentication";
import { LOGIN_CONFIRMED_ACTION, LOGIN_REQUEST_ACTION, LOGIN_FAILED_ACTION, LOG_OUT_ACTION } from "../actionTypes";



export const loginAction = (authValues, navigate) => {
  return (dispatch) => {
    dispatch(loginRequestAction());
    
    login(authValues)
      .then(data => {
        // console.log(data.userType.name);/
        saveTokenInSessionStorage(data);
        // runLogoutTimer(
        //   dispatch,
        //   response.data.expiresIn * 1000,
        //   history,
        // );
        // dispatch(loginConfirmedAction(data));
        // toast.success(`Login As ${data.userType.name}`)
        navigate('/login-option');
      })
      .catch((error) => {
        const errorMessage = formatError(error);
        console.log(error)
        // toast.error("errorMessage");
        dispatch(loginFailedAction(errorMessage));
      });
  };
}

export const logout = (navigate) => {
  sessionStorage.removeItem('bearerToken');
  sessionStorage.removeItem('userdata');
  navigate('/');
  return {
    type: LOG_OUT_ACTION,
  };
}

export const loginRequestAction = () => {
  return {
    type: LOGIN_REQUEST_ACTION,
  };
}

export const loginFailedAction = (data) => {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export const loginConfirmedAction = (data) => {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}