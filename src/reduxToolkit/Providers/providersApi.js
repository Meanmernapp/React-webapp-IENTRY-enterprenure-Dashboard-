import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from '../../Apis/Axios';
import { toast } from 'react-toastify'


//#######################################  Order ###########################################

// /get-by-user-id/{userId}provider-module in provider-controller
export const GetProvidersByUserId = createAsyncThunk("providers/getProvidersByUserId", async (params, { dispatch, getState }) => {
    const { userId } = params
    let result = await apiInstance.get(`provider-service/get-by-user-id/${userId}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)

    return { data, status }
});

//Call API, to get orders page after date
export const GetProvidersIncoming = createAsyncThunk("providers/getProvidersIncoming", async (params, { dispatch, getState }) => {
    console.log(params)
    let result = await apiInstance.post(`order-service/provider/get-all-pageable/by-provider-id/${params?.providerId}/by-after-date/${params?.date}`, params?.pagination).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)

    return { data, status }
});
//Call API, to get orders page after date
export const GetProvidersRecord = createAsyncThunk("providers/getProvidersRecord", async (params, { dispatch, getState }) => {

    let result = await apiInstance.post(`order-service/provider/get-all-pageable/by-provider-id/${params?.providerId}/by-before-date/${params?.date}`, params?.pagination).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)

    return { data, status }
});

//Call API, to get single order by id
export const GetOrderDetails = createAsyncThunk("providers/getOrderDetails", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`order-service/get-by-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)

    return { data, status }
});

//complete order get all provider vehicle list
export const GetAllProviderVehicleListDown = createAsyncThunk("providers/getAllProviderVehicleListDown", async (params, { dispatch, getState }) => {
    // params here is providerId


    let result = await apiInstance.post(`provider-vehicle-service/get-all/by-provider-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)

    return { data, status }
});
//complete order get all provider vehicle list
export const GetAllProviderEmployeeListDown = createAsyncThunk("providers/getAllProviderEmployeeListDown", async (params, { dispatch, getState }) => {
    // params here is providerId
    let result = await apiInstance.get(`provider-employee-service/get-all/by-provider-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)

    return { data, status }
});

// complete order 

export const CompleteOrderProvider = createAsyncThunk("providers/completeOrderProvider", async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`order-service/complete-order/${params?.orderId}`, params?.data).then(function (response) {
        toast.success("Update Successfully")
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)

    return { data, status }
});

//#######################################  Employee ###########################################

//corporate-user-pre-prod-v1/provider-employee-service/get-all-pageable/by-provider-id/{providerId}
export const ProviderslistOfEmployees = createAsyncThunk("providers/providerslistOfEmployees", async (params, { dispatch, getState }) => {
    const { providerId } = params
    let result = await apiInstance.post(`provider-employee-service/get-all-pageable/by-provider-id/${providerId}`, params?.pagination).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)

    return { data, status }
});

//provider-employee/get-filters assets-module asset-controller
export const GetProvidersEmployeeSortList = createAsyncThunk("providers/getProvidersEmployeeSortList", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`assets-service/order/get-filters`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)

    return { data, status }
});

// check user exist or not
export const CheckProviderPreUser = createAsyncThunk("providers/checkProviderPreUser", async (params, { dispatch, getState }) => {

    const { email, name, phone, gender, file } = params || {};

    let result = await apiInstance.post(`authentication-service/pre-register-user`, { email, name, phoneNumber: phone, gender }).then(function (response) {
        toast.success("User created successfully")
        console.log(response)
        const data = {
            user: {
                id: response?.data?.data?.id
            },
            provider: {
                id: localStorage.getItem('providerId')
            }
        }
        // call()

        dispatch(CreateProviderUserRelationship(data))
        const imgData = {
            user: {
                id: response?.data?.data?.id,
            },
            accessMethod: {
                id: "5"
            },
            description: "Face recognition"

        }
        // want to update or create image
        if (file != "") {
            dispatch(UploadProviderImage({ imgData, file }))
        }
        console.log(data)
        return response
    }).catch(function (error) {
        console.log(error.response)
        toast.error(error.response?.data?.message)
        // toast.error("Email/phoneNumber is already exist")
        return error.response

    })
    const { data, status } = result
    //console.log(result)


    return { data, status }


});

// create relation between provider and user
//corporate-user-pre-prod-v1/provider-employee-service/create
export const CreateProviderUserRelationship = createAsyncThunk("providers/createProviderUserRelationship", async (params, { dispatch, getState }) => {

    let result = await apiInstance.post(`provider-employee-service/create`, params).then(function (response) {
        toast.success(" successfully relation created")
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)

    return { data, status }
});

// upload image 
export const UploadProviderImage = createAsyncThunk("providers/uploadProviderImage", async (params, { dispatch, getState }) => {

    console.log(params?.file)
    let result = await apiInstance.post(`user-service/user-image/create`, params?.imgData).then(function (response) {
        // toast.success("create object image")
        let formData = new FormData();
        formData.append('id', response?.data?.data?.id);
        formData.append('option', "user");
        formData.append('file', params?.file[0]);
        dispatch(SaveProviderImage(formData))
        // toast.success("Image uploaded successfully")
        return response
    }).catch(function (error) {
        // toast.error(" failed")
        toast.error(error?.response?.data?.message)
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }


});

// save image
export const SaveProviderImage = createAsyncThunk("providers/saveProviderImage", async (params, { dispatch, getState }) => {
    let formData = new FormData();
    formData.append('id', params?.id);
    formData.append('option', "user");
    formData.append('file', params?.file);

    let result = await apiInstance.put(`image-service/upload`, formData).then(function (response) {
        toast.success(" successfully image uploaded")
        return response
    }).catch(function (error) {
        toast.error(error?.response?.data?.message)
        // toast.error("Image upload failed")
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }


});

// details of provider employee
export const GetProviderEmployeeDetail = createAsyncThunk("providers/getProviderEmployeeDetail", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`provider-employee-service/company/get-by-user-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});

// unlink device from provider employee

export const UnLinkDeviceProvider = createAsyncThunk("providers/unLinkDeviceProvider", async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`user-service/unlink-device/by-id/${params}`).then(function (response) {
        toast.success("Device unlinked successfully")
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});

// get list of all status
export const GetAllStatusProvider = createAsyncThunk("providers/getAllStatusProvider", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`status-service/get-all-to-user`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});

// get single user data
export const GetSingleProvider = createAsyncThunk("providers/getSingleProvider", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`user-service/get-by-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});

//update provider employee
export const UpdateProviderData = createAsyncThunk("providers/updateProviderData", async (params, { dispatch, getState }) => {
    const { id, file, name, email, gender, phoneNumber, statusid, dbo } = params
    let result = await apiInstance.put(`user-service/update`, { id, name, email, gender, phoneNumber, status: statusid, dbo }).then(function (response) {

        // want to update
        // let formData = new FormData();
        // formData.append('id', id);
        // formData.append('option', "user");
        // formData.append('file', file[0]);
        // dispatch(SaveProviderImage(formData))

        //want to create or update
        // if (file != "") {


        //     const imgData = {
        //         user: {
        //             id: id,
        //         },
        //         accessMethod: {
        //             id: "5"
        //         },
        //         description: "Face recognition"

        //     }
        //     dispatch(UploadProviderImage({ imgData, file }))

        // }
        toast.success("successfully updated")
        return response
    }).catch(function (error) {

        return error.response
    })
    const { data, status } = result
    console.log(result?.data)
    if (result?.data?.code == 832) {
        toast.warn(result.data?.message)
    }
    return { data, status }
});


// check user aleready image or not
export const CheckProviderImage = createAsyncThunk("providers/checkProviderImage", async (params, { dispatch, getState }) => {
    let result = await apiInstance.get(`user-service/user-image/check-selfie/by-user-id/${params}`).then(function (response) {
        if (response?.data?.data === true) {
            dispatch(GetProviderImage(params))
        }
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});

// get selfie image
export const GetProviderImage = createAsyncThunk("providers/getProviderImage", async (params, { dispatch, getState }) => {
    let result = await apiInstance.get(`user-service/user-image/get-selfie/by-user-id/${params}`).then(function (response) {
        dispatch(DownloadProviderImage(response?.data?.data?.id))
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});

//download image
export const DownloadProviderImage = createAsyncThunk("providers/downloadProviderImage", async (params, { dispatch, getState }) => {
    const option = "user"
    let result = await apiInstance.get(`image-service/download-by-id/${params}/option/${option}`, {
        responseType: 'blob'
    }).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});


// download external  files
export const DownloadExternalFile = createAsyncThunk("providers/downloadExternalFile", async (params, { dispatch, getState }) => {
    const option = "document_external"
    let result = await apiInstance.get(`image-service/download-by-id/${params}/option/${option}`).then(function (response) {
        const url = window?.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'image.jpg'); //or any other extension
        document.body.appendChild(link);
        link.click();
        // toast.success("successfully downloaded")
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});

// download external  files
export const DownloadCompanyFile = createAsyncThunk("providers/downloadCompanyFile", async (params, { dispatch, getState }) => {
    const option = "company_document_external"
    let result = await apiInstance.get(`image-service/download-by-id/${params}/option/${option}`, { responseType: 'blob' }).then(function (response) {
        // toast.success("successfully downloaded")
        console.log(response)
        const url = window?.URL.createObjectURL(new Blob([response.data]));
        // console.log(response?.data)
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Car_Image.png'); //or any other extension
        document.body.appendChild(link);
        link.click();
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});


// create document exernal value
export const CreateToExternal = createAsyncThunk("providers/createToExternal", async (params, { dispatch, getState }) => {

    let result = await apiInstance.post(`document-service/external/create-to-external`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
})

// set document exernal value
export const SetToExternal = createAsyncThunk("providers/setToExternal", async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`document-service/external/set-comment`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
})


//##################################################  vehicle ###############################################################

//corporate-user-pre-prod-v1/provider-employee-service/get-all-pageable/by-provider-id/{providerId}
export const ProviderlistOfVehicles = createAsyncThunk("providers/providerlistOfVehicles", async (params, { dispatch, getState }) => {
    const { providerId } = params
    let result = await apiInstance.post(`provider-vehicle-service/get-all-pageable/by-provider-id/${providerId}`, params?.pagination).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)

    return { data, status }
});

//provider-employee/get-filters assets-module asset-controller
export const ProviderVehicleSortList = createAsyncThunk("providers/providerVehicleSortList", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`assets-service/provider-vehicle/get-filters`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)

    return { data, status }
});
// create a vehicle and relationship with provider
export const CreateVehicleAndRelation = createAsyncThunk("providers/createVehicleAndRelation", async (params, { dispatch, getState }) => {
    const { providerId, file, vehicle } = params
    console.log(vehicle)
    let result = await apiInstance.post(`vehicle-service/create-for-provider/${providerId}`, {
        brand: vehicle.brand,
        subBrand: vehicle.subBrand,
        color: vehicle.color,
        model: vehicle.model,
        plate: vehicle.plate,
        vin: vehicle.vin,
        serialNumber: vehicle.serialNumber,
        status: vehicle?.statusid
    }).then(function (response) {
        const imgData = {
            vehicle: {
                id: response?.data?.data?.vehicle?.id,
            },
            accessMethod: {
                id: "5"
            },
            description: "Face recognition"

        }
        // want to update or create image
        if (file != "") {
            dispatch(UploadProviderVehicleImage({ imgData, file }))
        }
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)

    return { data, status }
});

// check vehicle aleready image or not
export const CheckProviderVehicleImage = createAsyncThunk("providers/checkProviderVehicleImage", async (params, { dispatch, getState }) => {
    //params here is vehicleId
    let result = await apiInstance.get(`vehicle-service/vehicle-image/check-image/get-by-vehicle-id/${params}`).then(function (response) {
        if (response?.data?.data === true) {
            dispatch(GetProviderVehicleImage(params))
        }
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});

// get vehicle selfie image
export const GetProviderVehicleImage = createAsyncThunk("providers/getProviderVehicleImage", async (params, { dispatch, getState }) => {
    // params here is vehicleId
    let result = await apiInstance.get(`vehicle-service/vehicle-image/get-image/get-by-vehicle-id/${params}`).then(function (response) {
        dispatch(DownloadProviderVehicleImage(response?.data?.data?.id))
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});

//download vehicle image
export const DownloadProviderVehicleImage = createAsyncThunk("providers/downloadProviderVehicleImage", async (params, { dispatch, getState }) => {
    const option = "vehicle"
    let result = await apiInstance.get(`image-service/download-by-id/${params}/option/${option}`, {
        responseType: 'blob'
    }).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});

// upload image 
export const UploadProviderVehicleImage = createAsyncThunk("providers/uploadProviderVehicleImage", async (params, { dispatch, getState }) => {

    let result = await apiInstance.post(`vehicle-service/vehicle-image/create`, params?.imgData).then(function (response) {
        // toast.success("create object image")
        let formData = new FormData();
        formData.append('id', response?.data?.data?.id);
        formData.append('option', "vehicle");
        formData.append('file', params?.file[0]);
        dispatch(SaveProviderVehicleImage(formData))
        // toast.success("Image uploaded successfully")
        return response
    }).catch(function (error) {
        // toast.error(" failed")
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }


});

// save image
export const SaveProviderVehicleImage = createAsyncThunk("providers/saveProviderVehicleImage", async (params, { dispatch, getState }) => {


    let result = await apiInstance.put(`image-service/upload`, params).then(function (response) {
        toast.success(" successfully image uploaded")
        return response
    }).catch(function (error) {
        // toast.error("Image upload failed")
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }


});


// get single user data
export const GetSingleProviderVehicle = createAsyncThunk("providers/getSingleProviderVehicle", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`vehicle-service/get-by-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});

//get vehicle Status list

export const GetProviderVehicleStatus = createAsyncThunk("providers/getProviderVehicleStatus", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`status-service/get-all-to-vehicle`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});


// vehicle details pages
export const GetProviderVehicleDetail = createAsyncThunk("providers/getProviderVehicleDetail", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`provider-vehicle-service/company/get-by-vehicle-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});

//update provider employee
export const UpdateProviderVehicleData = createAsyncThunk("providers/updateProviderVehicleData", async (params, { dispatch, getState }) => {
    const { brand,
        id,
        subBrand,
        color,
        model,
        plate: plates,
        vin: vIn,
        serialNumber,
        statusid, file } = params
    let result = await apiInstance.put(`vehicle-service/update`, {
        id,
        brand,
        subBrand,
        color,
        model,
        plate: plates,
        vin: vIn,
        serialNumber,
        status: statusid
    }).then(function (response) {

        // want to update
        // let formData = new FormData();
        // formData.append('id', id);
        // formData.append('option', "user");
        // formData.append('file', file[0]);
        // dispatch(SaveProviderImage(formData))

        //want to create or update


        toast.success("successfully updated")
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});


// download external  files
export const DownloadExternalVehicleFile = createAsyncThunk("providers/downloadExternalVehicleFile", async (params, { dispatch, getState }) => {
    const option = "document_external_vehicle"
    let result = await apiInstance.get(`image-service/download-by-id/${params}/option/${option}`, {
        responseType: 'blob'
    }).then(function (response) {
        const url = window?.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Car_Image.jpg'); //or any other extension
        document.body.appendChild(link);
        link.click();
        // toast.success("successfully downloaded")
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});

// download external  files
export const DownloadCompanyVehicleFile = createAsyncThunk("providers/downloadCompanyVehicleFile", async (params, { dispatch, getState }) => {
    const option = "company_document_external_vehicle"
    let result = await apiInstance.get(`image-service/download-by-id/${params}/option/${option}`).then(function (response) {
        toast.success("successfully downloaded")
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});

// create document exernal value
export const CreateToExternalVehicle = createAsyncThunk("providers/createToExternalVehicle", async (params, { dispatch, getState }) => {

    let result = await apiInstance.post(`document-service/external-vehicle/create-to-vehicle-external `, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
})

// set document exernal value
export const SetToExternalVehicle = createAsyncThunk("providers/setToExternalVehicle", async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`document-service/external-vehicle/set-comment`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
})




// user doc for provider

//get user docs
export const GetUserDocuments = createAsyncThunk("providers/getUserDocuments", async (params, { dispatch, getState }) => {
    // params here is userId
    let result = await apiInstance.get(`document-service/external/get-all/by-user-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
})


// user profile extra data

export const GetUserExtraData = createAsyncThunk("providers/getUserExtraData", async (params, { dispatch, getState }) => {
    // params here is userId

    let result = await apiInstance.get(`extra-data-service/get-by-user-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
})
//company restriction for user data
export const GetUserCompanyRestrictionData = createAsyncThunk("providers/getUserCompanyRestrictionData", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`company-service/company-restriction`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
})

// unlink device user profile

export const UnlinkUserDevice = createAsyncThunk("providers/unlinkUserDevice", async (params, { dispatch, getState }) => {

    //prams here is id
    let result = await apiInstance.put(`user-service/unlink-device/by-id/${params}`).then(function (response) {
        toast.success("The device was unlink successfully")
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
})


//update provider employee


// get single user data
export const GetSingleUserProvider = createAsyncThunk("providers/getSingleUserProvider", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`user-service/get-by-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});
//Update User
export const UpdateProviderExtraData = createAsyncThunk("providers/updateProviderExtraData", async (params, { dispatch, getState }) => {
    const { id, body } = params

    let result = await apiInstance.put(`extra-data-service/update-by-user-id/${id}`, body).then(function (response) {
        if (response.status == 201 || response.status == 200) {
            toast.success("Extra data updated")
        }
        return response
    }).catch(function (error) {
        toast.error(error?.response?.data?.message)
        return error.response
    })
    const { data, status } = result
    return { data, status }
})

//update provider employee
export const UpdateProviderUserData = createAsyncThunk("providers/updateProviderUserData", async (params, { dispatch, getState }) => {
    const { id, file, name, email, gender, phoneNumber, statusid, dob } = params
    let result = await apiInstance.put(`user-service/update`, { id, name, email, gender, phoneNumber, status: statusid, dob }).then(function (response) {
        toast.success("User Data Updated Successfully")
        return response
    }).catch(function (error) {
        toast.error(error?.response?.data?.message)
        return error.response
    })
    const { data, status } = result
    //console.log(result)
    return { data, status }
});
