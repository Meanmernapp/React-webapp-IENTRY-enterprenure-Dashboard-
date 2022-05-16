import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints, URL } from "../../Apis/Constants";


export const loginMiddleware = createAsyncThunk(
    'users/loginMiddleware',
    async (authValues, thunkAPI) => {
        try {
            // if (bearerToken) {
            //     console.log(bearerToken)
                const response = await fetch(
                    URL + endpoints.LOGIN,
                    {
                        method: 'POST',
                        headers: {
                            "Accept": "application/json",
                            "Authorization": "Bearer " + sessionStorage.getItem("bearerToken"),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(authValues),
                    }
                );
            // }
            let data = await response.json();
            // console.log('data', data, response.status);

            if (response.status === 200) {
                sessionStorage.setItem("userdata", JSON.stringify(data))
                return { ...data };
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            // console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const authenticationSlice = createSlice({
    name: "authenticationSlice",
    initialState: {
        user: []
    },
    extraReducers: {
        [loginMiddleware.fulfilled]: (state, { payload }) => {
            if(payload){
                state.user = payload;
                console.log(payload)
            }
            // state.value = action.payload;
        },

        [loginMiddleware.pending]: (state) => {
            // console.log(state)
        },

        [loginMiddleware.rejected]: (state, { payload }) => {
            // console.log(payload)
        }
    }

})

export default authenticationSlice.reducer;
export const userSelector = (state) => state.user;