/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstanceV2 } from '../../Apis/AxiosV2';
import fileDownload from 'js-file-download'

//List all the employee doc by id
export const GetAllEmployeeDoc = createAsyncThunk("documentPanel/getAllEmployeeDoc", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.get(`document-service/employee-company/get-all`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});

//List all the Supplier doc by id
export const GetAllSupplierDoc = createAsyncThunk("documentPanel/getAllSupplierDoc", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.get(`document-service/supplier-company/get-all`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});

//List all the contractor doc by id
export const GetAllContractorDoc = createAsyncThunk("documentPanel/getAllContractorDoc", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.get(`document-service/contractor-company/get-all`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});

// downlod document by id
export const DownloadDocumentById = createAsyncThunk("documentPanel/downloadDocumentById", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.get(`image-service/full-response/download-by-id/${params?.id}/option/${params?.option}`,{
        responseType: 'blob',
      }).then(function (response) {
        console.log("dkjfkdjkfj",response)
        // const url = window.URL.createObjectURL(new Blob([response.data]));
        // const link = document.createElement("a");
        // link.href = url;
        // link.setAttribute(
        //     "download",
        //     `a.pdf`
        // );
        // document.body.appendChild(link);
        // link.click();
        // link.parentNode.removeChild(link);
        fileDownload(response?.data, params?.filename)
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
   
    

    return { data, status }
});

// delete document by id
export const DeleteDocumentById = createAsyncThunk("documentPanel/deleteDocumentById", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.delete(`image-service/delete-by-id/${params?.id}/option/${params?.option}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});


// delete all docuemnts
export const DeleteAllDocument = createAsyncThunk("documentPanel/deleteAllDocument", async (params, { dispatch, getState }) => {

const name = params?.name ==="employee" && "employee-company"||
params?.name ==="supplier" && "supplier-company"||
params?.name ==="contractor" && "contractor-company"
    let result = await apiInstanceV2.delete(`document-service/${name}/delete-all`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});


// get all departments 
export const GetAllDepartments = createAsyncThunk("documentPanel/getAllDepartments", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.get(`department-service/get-all`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});


// create emplyee doc

export const CreateEmployeeDoc = createAsyncThunk("documentPanel/createEmployeeDoc", async (params, { dispatch, getState }) => {

    const payload = {
        departmentId:params?.departmentName,
        document:params?.documentName,
        instruction:params?.instructions,
        isCompanyDocument:true

    }
    let result = await apiInstanceV2.post(`document-service/employee-company/create`, payload).then(function (response) {
       
        if(params?.uploadFile){
            const formData = new FormData()
            formData.append("file", params?.uploadFile)
            formData.append("id",response?.data?.data?.id)
            formData.append("option","employee_document_company")
            dispatch(UploadDocImg(formData))

        }
        return response
    }).catch(function (error) {
        return error.response
    })
    
    const { data, status } = result

    return { data, status }
});

// create supplier doc

export const CreateSupplierDoc = createAsyncThunk("documentPanel/createSupplierDoc", async (params, { dispatch, getState }) => {
 const payload = {
        departmentId:params?.departmentName,
        document:params?.documentName,
        instruction:params?.instructions,
        isCompanyDocument:true

    }
    let result = await apiInstanceV2.post(`document-service/supplier-company/create`, payload).then(function (response) {
        
        if(params?.uploadFile){
            const formData = new FormData()
            formData.append("file", params?.uploadFile)
            formData.append("id",response?.data?.data?.id)
            formData.append("option","supplier_document_company")
            dispatch(UploadDocImg(formData))

        }
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});
// create contractor doc

export const CreateContractorDoc = createAsyncThunk("documentPanel/createContractorDoc", async (params, { dispatch, getState }) => {
    const payload = {
        departmentId:params?.departmentName,
        document:params?.documentName,
        instruction:params?.instructions,
        isCompanyDocument:true

    }
    let result = await apiInstanceV2.post(`document-service/contractor-company/create`, payload).then(function (response) {
        
        if(params?.uploadFile){
            const formData = new FormData()
            formData.append("file", params?.uploadFile)
            formData.append("id",response?.data?.data?.id)
            formData.append("option","contractor_document_company")
            dispatch(UploadDocImg(formData))

        }
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

// upload doc image

export const UploadDocImg = createAsyncThunk("documentPanel/uploadDocImg", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.put(`image-service/upload`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});