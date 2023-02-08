import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const NotificationsSlice = createSlice({
    name: "notifications",
    initialState: {
        getListNotifications: [],
        notifyTypes: [],
        employeesData: [],
    },
    reducers: {},
    extraReducers: {
        ["notifications/getListNotifications/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getListNotifications = data
            }
            else if (status >= 400 && status < 500) {
                toast("Something went wrong")
            }
        },
        ["notifications/notificationTypes/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.notifyTypes = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong")
            }
        },
        ["notifications/createNotification/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                // state.notificationsTypes = data
                toast.success("Notification Created Successfully..!")

            }
            else if (status >= 400 && status < 500) {
                toast("Something went wrong")
            }
        },
        ["notifications/sendToAllScope/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                toast.success("sent to all..!")
            }
            else if (status >= 400 && status < 500) {
                toast("Something went wrong")
            }
        },
        ["notifications/sendByTopicScope/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                toast.success(`sent to topic scope`)
            }
            else if (status >= 400 && status < 500) {
                toast("Something went wrong")
            }
        },
        ["notifications/sendToSomeEmployees/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                toast.success(`sent to some employees`)
            }
            else if (status >= 400 && status < 500) {
                toast.error("Something went wrong")
            }
        },
        ["notifications/getEmployeesPageable/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.employeesData = data;
            } else if (status >= 400 && status < 500) {
                toast.error("Something went wrong")
            }
        },
        ["notifications/uploadImg/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                toast.success("Media uploaded successfully..!")
            } else if (status >= 400 && status < 500) {
                toast.error("Something went wrong")
            }
        },
    },

})

export const { } = NotificationsSlice.actions;

export default NotificationsSlice.reducer;