import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


// export const loginMiddleware = createAsyncThunk('users/loginMiddleware', async (authValues, thunkAPI) => {
//     try {
//         let response = await apiInstance.post(endpoints.LOGIN, authValues.values);
//         console.log("this is response",response)
//         if (response.status === 200) {
//           
//             authValues.navigate('/login-option');
//             return { ...response.data };
//         } else {
//             return thunkAPI.rejectWithValue(response.data);
//         }
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response);
//     }
// });


export const authenticationSlice = createSlice({
    name: "authenticationSlice",
    reducers: {
        logOut: (state, action) => {
            state.user = {}
            sessionStorage.removeItem("userdata");
            sessionStorage.removeItem("bearerToken");
            localStorage.removeItem("companyId")
            localStorage.removeItem("deleteId")
            localStorage.removeItem("cId")
            localStorage.removeItem("pid")
            localStorage.removeItem("userId")
            localStorage.removeItem("singlezoneId")
            localStorage.removeItem("providerId")
            localStorage.removeItem("provideridfordetail")
            localStorage.removeItem("vehicleidfordetail")
            localStorage.removeItem("onBoardingRoleName")
            localStorage.removeItem("lng")
            localStorage.removeItem("lat")
            localStorage.removeItem("onBoardingRoleId")
            localStorage.removeItem("providerOrderDetail")
            localStorage.removeItem("employeeProviderDetail")
            localStorage.removeItem("vehicleProviderDetail")


        }
    },
    initialState: {
        user: {},
        permission: []
    },
    extraReducers: {
        ["authenticationSlice/tokenApi/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.user = data
            } else if (status >= 400 && status < 500) {
                toast.error(data?.message)
            }
        },
        ["authenticationSlice/roleCheck/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {

                state.permission = data?.data.map(item => {
                    return item.id
                })


                // sessionStorage.setItem("premission", state.roleCheck)

                console.log(state.permission)
            } else if (status >= 400 && status < 500) {
                // toast.error(data?.message)
            }
        },
        ["authenticationSlice/loginMiddleware/fulfilled"]: (state, { payload }) => {
            state.user = payload;
        },
    },

})

export const { logOut } = authenticationSlice.actions;
export const userDetail = (state) => state?.authenticationSlice?.user;
export default authenticationSlice.reducer;

