import { toast } from "react-toastify"
import { getCompanyData, createCompanyData, updateCompanyData } from "../../Apis/companydata"
import { GET_COMPANY_DATA } from "../actionTypes"



export const updateCompanyAction = (body, navigate) => {
    return (dispatch) => {

        updateCompanyData(body).then(data => {
            // dispatch(getCompanyAction());

            navigate('/dashboard/company');
        }).catch(error => {
            toast.error("something went wrong.")
        })
    }
}

// export const createCompanyAction = (body) => {
//     return (dispatch) => {

//         createCompanyData(body).then(data => {
//             dispatch(getCompanyAction(data));

//         }).catch(error => {
//             toast.error("something went wrong.")
//         })
//     }
// }

export const getCompanyAction = (id) => {
    getCompanyData(id).then(data => {
        return {
            type: GET_COMPANY_DATA,
            payload: data
        };
    }).catch(error => {
        toast.error("something went wrong.")
    })

}