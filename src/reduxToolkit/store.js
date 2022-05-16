

import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authentication/authenticationSlice';

const store = configureStore({
    reducer: {
        userData: authenticationSlice
    }
})


export default store;
