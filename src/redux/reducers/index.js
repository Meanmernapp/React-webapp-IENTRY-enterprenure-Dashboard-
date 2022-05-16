import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { companyReducer } from "./companydata.reducer";


const rootReducer = combineReducers({
    authReducer,
    companyReducer,
})

export default rootReducer;