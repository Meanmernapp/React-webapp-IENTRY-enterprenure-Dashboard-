import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from '../../Apis/Axios';
import { toast } from "react-toastify";
import { UploadImage } from "../ShareSlice/shareApi";
import { UploadProviderImage, UploadProviderVehicleImage } from "../Providers/providersApi";

//Update User
export const UpdateUserExtraData = createAsyncThunk("contractor/UpdateUserExtraData", async (params) => {
  const {id,body}=params
  let result = await apiInstance.put(`extra-data-service/update-by-user-id/${id}`,body).then(function (response) {
    if(response.status == 201 || response.status == 200){
      toast.success("Data Updated")
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})
//Update User
export const UpdateUserProfileData = createAsyncThunk("contractor/UpdateUserProfileData", async (body) => {
  let result = await apiInstance.put(`user-service/update`,body).then(function (response) {
    if(response.status == 201 || response.status == 200){
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})
//Get User By User id
export const GetUserExtraDetailByUserId = createAsyncThunk("contractor/GetUserExtraDetailByUserId", async (contractID) => {
  let result = await apiInstance.get(`extra-data-service/get-by-user-id/${contractID}`).then(function (response) {
    if(response.status == 201 || response.status == 200){
    // toast.success("Fail contractor get by id");
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})
//Get User By User id
export const GetUserDetailByUserId = createAsyncThunk("contractor/GetUserDetailByUserId", async (contractID) => {
  let result = await apiInstance.get(`user-service/get-by-id/${contractID}`).then(function (response) {
    if(response.status == 201 || response.status == 200){
      console.log("user data")
    // toast.success("Fail contractor get by id");
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})
//Get contract By contractor ID
export const GetByUserId = createAsyncThunk("contractor/GetByUserId", async (contractID) => {
    let result = await apiInstance.get(`contractor-service/get-by-user-id/${contractID}`).then(function (response) {
      if(response.status == 201 || response.status == 200){
      // toast.success("Fail contractor get by id");
      }
       return response
        }).catch(function (error) {

            return error.response
        }) 
    const { data, status } = result
    return { data, status }
  })

//Get Contracts by incoming
export const GetActiveContracts = createAsyncThunk("contractor/GetActiveContracts", async (param) => {
    const {inCommingActive, contractPagination}=param
      const result = await apiInstance.post(`contract-service/contractor/get-all-pageable/${inCommingActive}`,contractPagination)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error.response;
        });
    
    const { data, status } = result
    return { data, status }
});


//Get Contracts by Date
export const GetContractsByTime = createAsyncThunk("contractor/GetContractsByTime", async (param) => {
    const {inCommingActive, contractPagination}=param
      const result = await apiInstance.post(`contract-service/contractor/get-all-pageable/${inCommingActive}`,contractPagination)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error.response;
        });
    
    const { data, status } = result
    return { data, status }
});

//Get Contracts Detail

export const GetContractById = createAsyncThunk("contractor/GetContractById", async (contractID) => {
    let result = await apiInstance.get(`contract-service/get-by-id/${contractID}`).then(function (response) {
        if(response.status == 201 || response.status == 200){

      }
       return response
        }).catch(function (error) {
      toast.error("contract fetch faild");

            return error.response
        }) 
    const { data, status } = result
    return { data, status }
  })

//Get vehicle work on Contract
export const GetVehicleOnContractById = createAsyncThunk("contractor/GetVehicleOnContractById", async (param) => {
    const {id, contractPagination}=param
    let result = await apiInstance.post(`contractor-vehicle-service/contract/get-all-pageable/by-contract-id/${id}`,contractPagination).then(function (response) {
      if(response.status == 201 || response.status == 200){
      }
       return response
        }).catch(function (error) {
            return error.response
        }) 
    const { data, status } = result
    return { data, status }
})

export const CreatelistofContractorEmployeeContract = createAsyncThunk("contractor/CreatelistofContractorEmployeeContract", async (body) => {
  let result = await apiInstance.post(`contractor-employee-service/contract/create-list`,body).then(function (response) {
    if(response.status == 201 || response.status == 200){
      
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})

//
export const GetEmployeOnContractById = createAsyncThunk("contractor/GetEmployeOnContractById", async (param) => {
    const {id, contractPagination}=param
    let result = await apiInstance.post(`contractor-employee-service/contract/get-all-pageable-employees/by-contract-id/${id}`,contractPagination).then(function (response) {
      if(response.status == 201 || response.status == 200){
     
      }
       return response
        }).catch(function (error) {
            return error.response
        }) 
    const { data, status } = result
    return { data, status }
})

export const GetlistofcontractorEmployees = createAsyncThunk("contractor/GetlistofcontractorEmployees", async (id) => {
  let result = await apiInstance.get(`contractor-employee-service/get-all/by-contractor-id/${id}`).then(function (response) {
    if(response.status == 201 || response.status == 200){
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})

export const GetlistofEmployeWorkOnContract = createAsyncThunk("contractor/GetlistofEmployeWorkOnContract", async (id) => {
  let result = await apiInstance.get(`contractor-employee-service/contract/get-all-employees/by-contract-id/${id}`).then(function (response) {
    if(response.status == 201 || response.status == 200){
     
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})

export const DeleteEmployeeContractByContractAndUserID = createAsyncThunk("contractor/DeleteEmployeeContractByContractAndUserID", async (body) => {
  const {contractId,userId}=body
     let result = await apiInstance.delete(`contractor-employee-service/contract/delete-by-contract-id/${contractId}/by-user-id/${userId}`).then(function (response) {
       if(response.status == 201 || response.status == 200){
        toast.success("User Removed From contract")
       }
        return response
         }).catch(function (error) {
             return error.response
         }) 
     const { data, status } = result
     return { data, status }
   });
//Get Vehicle Work On Contract

export const VehicleWorkOnContract = createAsyncThunk("contractor/VehicleWorkOnContract", async (contractId) => {
    let result = await apiInstance.get(`contractor-vehicle-service/contract/get-all/by-contract-id/${contractId}`).then(function (response) {
      if(response.status == 201 || response.status == 200){
      }
       return response
        }).catch(function (error) {
            return error.response
        }) 
    const { data, status } = result
    return { data, status }
  });

  export const DeleteVehicleWorkOnContract = createAsyncThunk("contractor/DeleteVehicleWorkOnContract", async (body) => {
   const {contractId,vehicleId}=body
      let result = await apiInstance.delete(`contractor-vehicle-service/contract/delete-by-contract-id/${contractId}/by-vehicle-id/${vehicleId}`).then(function (response) {
        if(response.status == 201 || response.status == 200){
        }
         return response
          }).catch(function (error) {
              return error.response
          }) 
      const { data, status } = result
      return { data, status }
    });

  //Get Vehicle Work On Contract

export const GetAllVehicleByContractor = createAsyncThunk("contractor/GetAllVehicleByContractor", async (contractId) => {

    let result = await apiInstance.get(`contractor-vehicle-service/get-all/by-contractor-id/${contractId}`).then(function (response) {
      if(response.status == 201 || response.status == 200){
      }
       return response
        }).catch(function (error) {
            return error.response
        }) 
    const { data, status } = result
    return { data, status }
  });

// Delete Vehicle From Contract
export const DeleteVehicleFromContract = createAsyncThunk("contractor/DeleteVehicleFromContract", async(params) => {
    const { contractId, vehicleId } = params || {};
    const result = await apiInstance.get(`contractor-vehicle-service/contract/delete-by-contract-id/${contractId}/by-vehicle-id/${vehicleId}`)
      .then(function (response) {
          return response;
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
        return error.response;
      });
  
      const { data, status } = result
      return { data, status }
  });

//
export const UploadFileToServer = createAsyncThunk("contractor/UploadFileToServer", async (file) => {
    let result = await apiInstance.put(`image-service/upload`,file).then(function (response) {
      if(response.status == 201 || response.status == 200){
      toast.success("file Upload SuccessFully");
      }
       return response
        }).catch(function (error) {
            return error.response
        }) 
    const { data, status } = result
    return { data, status }
})

export const CreateDocumentTitle = createAsyncThunk("contractor/CreateDocumentTitle", async (doc) => {
  let result = await apiInstance.post(`document-service/external-vehicle/create-to-vehicle-external `,doc).then(function (response) {
    if(response.status == 201 || response.status == 200){
      console.log("rssssssss",response)
    toast.success("Titlle Added SuccessFully");
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})

export const UploadExternalDocumentComment = createAsyncThunk("contractor/UploadExternalDocumentComment", async (doc) => {
  let result = await apiInstance.put(`document-service/external-vehicle/set-comment`,doc).then(function (response) {
    if(response.status == 201 || response.status == 200){
    toast.success("comment Added SuccessFully");
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})

///ApI Releated //////////Vehicle   ///////////////////////

//Add Vehicle
export const AddNewVehicle = createAsyncThunk("contractor/AddNewVehicle", async (param) => {
    const {contactorId, body}=param

    let result = await apiInstance.post(`vehicle-service/create-for-contractor/${contactorId}`,body).then(function (response) {
      if(response.status == 201 || response.status == 200){
        toast.success("Vehicle Added SuccessFully")
      }
       return response
        }).catch(function (error) {
            return error.response
        }) 
    const { data, status } = result
    return { data, status }
  });

  //APi to Get Vehicle Fillter
  export const GetVehicleFilter = createAsyncThunk("contractor/GetVehicleFilter", async () => {
    let result = await apiInstance.get(`assets-service/contractor-vehicle/get-filters`).then(function (response) {
      if(response.status == 201 || response.status == 200){
      
      }
       return response
        }).catch(function (error) {
            return error.response
        }) 
    const { data, status } = result
    return { data, status }
  });

  //Get List of vehicle by Contractor id

  export const ContractorlistOfVehicles = createAsyncThunk("contractor/contractorlistOfVehicles", async (params, { dispatch, getState }) => {
    const { contractorId } = params
    let result = await apiInstance.post(`contractor-vehicle-service/get-all-pageable/by-contractor-id/${contractorId}`, params?.pagination).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    //console.log(result)

    return { data, status }
});


//Get Vehicle Detail By Vehicle Detail
export const GetVehicleDetailById = createAsyncThunk("contractor/GetVehicleDetailById", async (id) => {
  let result = await apiInstance.get(`contractor-vehicle-service/company/get-by-vehicle-id/${id}`).then(function (response) {
    if(response.status == 201 || response.status == 200){
    
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
});

// create document exernal value
export const CreateToExternalVehicle = createAsyncThunk("contractor/createToExternalVehicle", async (params, { dispatch, getState }) => {

  let result = await apiInstance.post(`document-service/contractor-vehicle/create `, params?.data).then(function (response) {
      if (params?.file) {

          let formData = new FormData();
          formData.append('id', response?.data?.data?.id);
          formData.append('option', "contractor_vehicle_document");
          formData.append('file', params?.file);
          dispatch(UploadImage(formData))
      }
      return response
  }).catch(function (error) {
      return error.response
  })
  const { data, status } = result
  //console.log(result)
  return { data, status }
})

// create a vehicle and relationship with provider
export const CreateVehicleAndRelation = createAsyncThunk("contractor/createVehicleAndRelation", async (params, { dispatch, getState }) => {
    
  let result = await apiInstance.post(`vehicle-service/create-for-contractor/${localStorage.getItem('contractorId')}`, params?.vehicleData).then(function (response) {
      
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
      if (params?.imageFile != "") {
          dispatch(UploadProviderVehicleImage({ imgData, file: params?.imageFile }))
      }
      return response
  }).catch(function (error) {
      return error.response
  })
  const { data, status } = result


  return { data, status }
});

// set document exernal value
export const SetToExternalVehicle = createAsyncThunk("contractor/setToExternalVehicle", async (params, { dispatch, getState }) => {

  let result = await apiInstance.put(`document-service/contractor-vehicle/set-comment`, params).then(function (response) {
     
      return response
  }).catch(function (error) {
      return error.response
  })
  const { data, status } = result
  //console.log(result)
  return { data, status }
})


export const GetVehicleStatus = createAsyncThunk("contractor/GetVehicleStatus", async () => {
  let result = await apiInstance.get(`status-service/get-all-to-vehicle`).then(function (response) {
    if(response.status == 201 || response.status == 200){
    
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
});

export const UpdateVehicleData = createAsyncThunk("contractor/UpdateVehicleData", async (body) => {
  let result = await apiInstance.put(`vehicle-service/update`,body).then(function (response) {
    if(response.status == 201 || response.status == 200){
      toast.success("Vehicle Updated")
    }
     return response
      }).catch(function (error) {
          toast.error("Insert All Data")
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
});

export const CreateRelationForVehicleImg = createAsyncThunk("contractor/CreateRelationForVehicleImg", async (body) => {
  let result = await apiInstance.post(`vehicle-service/vehicle-image/create`,body).then(function (response) {
    if(response.status == 201 || response.status == 200){
      toast.success("Vehicle image reation created")
    }
     return response
      }).catch(function (error) {
          toast.error("Insert All Data")
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
});

export const CheckVehicleImgStatus = createAsyncThunk("contractor/CheckVehicleImgStatus", async (vehicleId) => {
  let result = await apiInstance.get(`vehicle-service/vehicle-image/check-image/get-by-vehicle-id/${vehicleId}`).then(function (response) {
    if(response.status == 201 || response.status == 200){
    
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
});

export const GetVehicleImgUsingId = createAsyncThunk("contractor/GetVehicleImgUsingId", async (vehicleId) => {
  let result = await apiInstance.get(`vehicle-service/vehicle-image/get-image/get-by-vehicle-id/${vehicleId}`).then(function (response) {
    if(response.status == 201 || response.status == 200){
    
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
});

export const GetAllVehicleByContractorId = createAsyncThunk("contractor/GetAllVehicleByContractorId", async (id) => {
  let result = await apiInstance.get(`contractor-vehicle-service/get-all/by-contractor-id/${id}`).then(function (response) {
    if(response.status == 201 || response.status == 200){
      console.log("this is contractor vehicle",response)
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
});

export const AddVehicleWithContractId = createAsyncThunk("contractor/AddVehicleWithContractId", async (body) => {
  let result = await apiInstance.post(`contractor-vehicle-service/contract/create-list`,body).then(function (response) {
    if(response.status == 201 || response.status == 200){
      console.log("this is contractor vehicle",response)
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
});

//Employee Section API

//Get Gender api
export const GetAllGender = createAsyncThunk("contractor/GetAllGender", async () => {
  let result = await apiInstance.get(`gender-service/get-all`).then(function (response) {
    if(response.status == 201 || response.status == 200){
    
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
});

//Create Pre Employee
export const AddNewEmployee = createAsyncThunk("contractor/AddNewEmployee", async (param) => {
  const {contactorId, body}=param

  let result = await apiInstance.post(`authentication-service/pre-register-user`,body).then(function (response) {
    if(response.status == 201 || response.status == 200){
      toast.success("user was created successfully")
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
});

export const AddContractorsEmployee = createAsyncThunk("contractor/AddContractorsEmployee", async (param) => {
  const {contactorId, body}=param

  let result = await apiInstance.post(`contractor-employee-service/create`,body).then(function (response) {
    if(response.status == 201 || response.status == 200){
      toast.success("contractor employee was created successfully")
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
});


export const GetAllEmployeeFilter = createAsyncThunk("contractor/GetAllEmployeeFilter", async () => {
  let result = await apiInstance.get(`assets-service/contractor-employee/get-filters`).then(function (response) {
    console.log("filters????",response)
    if(response.status == 201 || response.status == 200){
    
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
});

export const GetEmployeByContractorId = createAsyncThunk("contractor/GetEmployeByContractorId", async (param) => {
  const {contractorID, contractPagination}=param
  let result = await apiInstance.post(`contractor-employee-service/get-all-pageable/by-contractor-id/0f1c83d7-599f-4282-b103-94de71bdcb8f`,contractPagination).then(function (response) {
    if(response.status == 201 || response.status == 200){
    }
     return response
      }).catch(function (error) {
    toast.error("Emloyee fetch failed");

          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})

export const GetEmployeDetailById = createAsyncThunk("contractor/GetEmployeDetailById", async (employeId) => {
  let result = await apiInstance.get(`contractor-employee-service/company/get-by-user-id/${employeId}`).then(function (response) {
    if(response.status == 201 || response.status == 200){
    }
     return response
      }).catch(function (error) {
          toast.error("Emloyee Detail get failed");
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})

export const CheckUserProfile = createAsyncThunk("contractor/CheckUserProfile", async (employeId) => {
  let result = await apiInstance.get(`user-service/user-image/check-selfie/by-user-id/${employeId}`,).then(function (response) {
    if(response.status == 201 || response.status == 200){
    // toast.success("use Detail get SuccessFully");
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})

export const GetUserProfileImage = createAsyncThunk("contractor/GetUserProfileImage", async (employeId) => {
  let result = await apiInstance.get(`user-service/user-image/get-selfie/by-user-id/${employeId}`,).then(function (response) {
    if(response.status == 201 || response.status == 200){
    // toast.success("use Detail get SuccessFully");
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})

export const CreateUserImage = createAsyncThunk("contractor/CreateUserImage", async (body) => {
  let result = await apiInstance.post(`user-service/user-image/create`,body).then(function (response) {
    if(response.status == 201 || response.status == 200){
    // toast.success("use Detail get SuccessFully");
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})


export const GetUserStatus = createAsyncThunk("contractor/GetUserStatus", async () => {
  let result = await apiInstance.get(`status-service/get-all-to-user`).then(function (response) {
    if(response.status == 201 || response.status == 200){
    
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
});

export const GetUserDetailForUpdate = createAsyncThunk("contractor/GetUserDetailForUpdate", async (employeId) => {
  let result = await apiInstance.get(`user-service/get-by-id/${employeId}`,).then(function (response) {
    if(response.status == 201 || response.status == 200){
    // toast.success("use Detail get SuccessFully");
    }
     return response
      }).catch(function (error) {
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})

export const UpdateEmployeData = createAsyncThunk("contractor/GetUserDetailForUpdate", async (body) => {
  let result = await apiInstance.put(`user-service/update`,body).then(function (response) {
    if(response.status == 201 || response.status == 200){
    toast.success("user Updated SuccessFully");
    }
     return response
      }).catch(function (error) {
          toast.error("Fill All Fields");
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})

//Download Docments

export const DownloadCompanyExternalDocuments = createAsyncThunk("contractor/DownloadCompanyExternalDocuments", async(params) => {
    const { id, option } = params || {};
    console.log("img download",params)
    // const result = await apiInstance.get(`image-service/download-by-id/${id}/option/company_document_external`)

    const result = await apiInstance.get(`image-service/download-by-id/${id}/option/${option}`)
    .then((response) => {console.log("image--->",response);
    toast.info("file downloaded successfully")
    return response} )
    .catch(function (error) {
      toast(error?.response?.data?.message);
      document.getElementById("overlay").style.display = "none";
      return error.response;
    });
  
       console.log("result",result)
      return result
  });


  export const UnlinkDevicefromUser = createAsyncThunk("contractor/UnlinkDevicefromUser", async (userID) => {
    let result = await apiInstance.put(`user-service/unlink-device/by-id/${userID}`).then(function (response) {
      if(response.status == 201 || response.status == 200){
      toast.success("device unlink SuccessFully");
      }
       return response
        }).catch(function (error) {
      toast.erroe("device unlink Faild");

            return error.response
        }) 
    const { data, status } = result
    return { data, status }
  })

  
  export const SetCommentaToExternalDoc = createAsyncThunk("contractor/SetCommentaToExternalDoc", async (body) => {
    console.log("upload doc",body)
    let result = await apiInstance.put(`document-service/external/set-comment`,body).then(function (response) {
      if(response.status == 201 || response.status == 200){
      toast.success("Doc Updated");
      }
       return response
        }).catch(function (error) {
      toast.error("Doc Update Faild");

            return error.response
        }) 
    const { data, status } = result
    return { data, status }
  })

  export const SetTitleToExternalDoc = createAsyncThunk("contractor/SetTitleToExternalDoc", async (body) => {
    let result = await apiInstance.post(`document-service/external/create-to-external`,body).then(function (response) {
      if(response.status == 201 || response.status == 200){
      toast.success("Doc Created");
      }
       return response
        }).catch(function (error) {
      toast.error("Doc Creating Faild");

            return error.response
        }) 
    const { data, status } = result
    return { data, status }
  })
//Check restriction

export const CheckCompanyRestriction = createAsyncThunk("contractor/CheckCompanyRestriction", async (body) => {
  let result = await apiInstance.get(`company-service/company-restriction`).then(function (response) {
    if(response.status == 201 || response.status == 200){
    }
     return response
      }).catch(function (error) {
        toast.error("Company Restriction Faild");
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})

//Documents for contractors

export const GetAllContractorDocuments = createAsyncThunk("contractor/getAllContractorDocuments", async (id) => {
  let result = await apiInstance.get(`document-service/contractor/get-all/by-user-id/${id}`).then(function (response) {
    if(response.status == 201 || response.status == 200){
    console.log("All DOC?????",response)
    }
     return response
      }).catch(function (error) {
        toast.error("Company Restriction Faild");
          return error.response
      }) 
  const { data, status } = result
  return { data, status }
})

// create contractor document value
export const CreateContractorDocValue = createAsyncThunk("contractor/createContractorDocValue", async (params, { dispatch, getState }) => {

  let result = await apiInstance.post(`document-service/contractor/create`, params?.data).then(function (response) {
      if (params?.file) {

          let formData = new FormData();
          formData.append('id', response?.data?.data?.id);
          formData.append('option', "contractor_document");
          formData.append('file', params?.file);
          dispatch(UploadImage(formData))
      }
      return response
  }).catch(function (error) {
      return error.response
  })
  const { data, status } = result
  //console.log(result)
  return { data, status }
})

// set cotractor document value
export const SetContractorDocValue = createAsyncThunk("contractor/setContractorDocValue", async (params, { dispatch, getState }) => {

  let result = await apiInstance.put(`document-service/contractor/set-comment`, params).then(function (response) {
      return response
  }).catch(function (error) {
      return error.response
  })
  const { data, status } = result
  //console.log(result)
  return { data, status }
})


// contractor Employee
export const ContractorslistOfEmployees = createAsyncThunk("contractor/contractorslistOfEmployees", async (params, { dispatch, getState }) => {
  const { contractorId } = params
  let result = await apiInstance.post(`contractor-employee-service/get-all-pageable/by-contractor-id/${contractorId}`, params?.pagination).then(function (response) {
      return response
  }).catch(function (error) {
      return error.response
  })
  const { data, status } = result
  //console.log(result)

  return { data, status }
});
// get contractor by user id
export const GetContractorsByUserId = createAsyncThunk("contractor/getContractorsByUserId", async (params, { dispatch, getState }) => {
  const { userId } = params
  let result = await apiInstance.get(`contractor-service/get-by-user-id/${userId}`).then(function (response) {
      return response
  }).catch(function (error) {
      return error.response
  })
  const { data, status } = result
  //console.log(result)

  return { data, status }
});

// details of contractor employee
export const GetContractorEmployeeDetail = createAsyncThunk("contractor/getContractorEmployeeDetail", async (params, { dispatch, getState }) => {

  let result = await apiInstance.get(`contractor-employee-service/company/get-by-user-id/${params}`).then(function (response) {
      return response
  }).catch(function (error) {
      return error.response
  })
  const { data, status } = result
  //console.log(result)
  return { data, status }
});

// check preregister user 



// create employee contractor
export const CreateContractorUserRelationship = createAsyncThunk("contractor/createContractorUserRelationship", async (params, { dispatch, getState }) => {

  let result = await apiInstance.post(`contractor-employee-service/v1/create`, params?.data).then(function (response) {
      toast.success(" successfully  created")
      console.log(response?.data?.data?.userId)
      const imgData = {
        user: {
            id: response?.data?.data?.userId,
        },
        accessMethod: {
            id: "5"
        },
        description: "Face recognition"

    }
    // want to update or create image
    if (params?.file != "") {
        dispatch(UploadProviderImage({ imgData, file:params?.file }))
    }
      return response
  }).catch(function (error) {
      return error.response
  })
  const { data, status } = result
  //console.log(result)

  return { data, status }
});


// get contractor status
export const GetContractorStatus = createAsyncThunk("contractor/getContractorStatus", async (params, { dispatch, getState }) => {
  
  let result = await apiInstance.get(`status-service/get-all-to-contractor`).then(function (response) {
      return response
  }).catch(function (error) {
      return error.response
  })
  const { data, status } = result
  return { data, status }
});

// get contractor info by id
export const GetContractorInfoById = createAsyncThunk("contractor/getContractorInfoById", async (params, { dispatch, getState }) => {
  
  let result = await apiInstance.get(`contractor-employee-service/v1/get-by-user-id/${params}`).then(function (response) {
      return response
  }).catch(function (error) {
      return error.response
  })
  const { data, status } = result
  return { data, status }
});



// update employee contractor
export const UpdateContractorUserRelationship = createAsyncThunk("contractor/updateContractorUserRelationship", async (params, { dispatch, getState }) => {

  let result = await apiInstance.put(`contractor-employee-service/v1/update`, params?.data).then(function (response) {
      toast.success(" successfully  updated")
      console.log(response?.data?.data?.userId)
      const imgData = {
        user: {
            id: response?.data?.data?.userId,
        },
        accessMethod: {
            id: "5"
        },
        description: "Face recognition"

    }
    // want to update or create image
    if (params?.file != "") {
        dispatch(UploadProviderImage({ imgData, file:params?.file }))
    }
      return response
  }).catch(function (error) {
      return error.response
  })
  const { data, status } = result
  //console.log(result)

  return { data, status }
});

