import {
    UPDATE_COMPANY_DATA,
    GET_COMPANY_DATA
} from "../actionTypes";

const initialState = {
    id: "",
    status: {
        id: null
    },
    acronym: "",
    name: "",
    address: "",
    latitud: null,
    longitud: null,
    ip: null
};

export const companyReducer = (prevState = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_COMPANY_DATA:
            return {
                ...prevState,
                loading: true,
            };
        case GET_COMPANY_DATA:
            return {
                companyData: payload,
                loading: false,
            };
        default:
            return prevState;
    }
};
