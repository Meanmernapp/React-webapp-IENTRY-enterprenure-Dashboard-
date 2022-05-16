import { toast } from "react-toastify";
import { formatError, login, saveTokenInSessionStorage } from "../../Apis/Authentication";
import { CREATE_NEW_EMPLOYEE } from "../actionTypes";




export const createEmployee = (authValues, navigate) => {
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
                dispatch(loginConfirmedAction(data));
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