
/*
Author : Arman Ali
Module: create/update employee
github: https://github.com/Arman-Arzoo
*/

// import libarary and other
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { Box, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import broomIcon from "../../assets/icon/broom-solid.svg";
import defaultImages from "../../assets/defaultImages/userDef.svg";
import UploadImageModal from '../../components/UploadImageModal';
import useStyle from '../../hooks/useStyle';
import { GetGenderListProvider } from '../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi';
import { CheckProviderPreUser, CreateProviderUserRelationship, GetAllStatusProvider, GetSingleProvider, GetSupplierInfoById, GetSupplierStatus, SaveProviderImage, UpdateProviderData, UploadProviderImage } from '../../reduxToolkit/Providers/providersApi';
import BootstrapTooltip from '../../utils/BootstrapTooltip';
import CustomTextWithLine from "../../components/CustomTextWithLine";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Stack from "@mui/material/Stack";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { CheckContractorPreUser, CreateContractorUserRelationship, UpdateContractorUserRelationship } from "../../reduxToolkit/Contractor/ContractorApi";

// Main Component
const CreateEmployeeProvider = ({ isUpdate }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams();
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const { textField, smallBoxStyle } = useStyle()
  const [showModal, setShowModal] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  // form field state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [imageFile, setImageFile] = useState("")
  const [lastName, setLastName] = useState("")
  const [secondLastName, setSecondLastName] = useState("")
  const [isStatus, setIsStatus] = useState("")
  const [dob, setDob] = useState("")
  const [supplierStatus,setSupplierStatus] = useState("")


  // useSelctor state from store slice employeesupplierSlice
  const { getGnderListProvider } = useSelector(state => state.EmployeeProviderSlice);
  const { user } = useSelector(state => state.authenticatioauthennSlice);
  const { getAllStatusProvider,getSupplierInfoById, updateProviderData,getSupplierStatus } = useSelector(state => state?.providersSlice)

  
  console.log(getSupplierInfoById)
  const resetForm = () => {
    setName("")
    setEmail("")
    setPhone("")
    setGender("")
    // setImageFile("")
    setLastName("")
    setSecondLastName("")
    setPreviewImage("")

  }

  // funtions
  const handelEmployee = () => {
    if (isUpdate) {
      const data = {
        contractorId: localStorage.getItem("providerId"),
        dob: typeof dob === "number" ? dob : (dob ? dob.getTime() : undefined),
        id:getSupplierInfoById?.id,
        email,
        genderId: gender,
        lastName,
        name,
        secondLastName,
        statusId:isStatus,
        phoneNumber: phone,
        userId: localStorage.getItem("provideridfordetail"),
        supplierEmployeeStatusId:supplierStatus
      }
      if (!name || !email || !lastName || !phone || !gender) {
        toast.warn("please Fill all the Data")
      } else {
        dispatch(UpdateProviderData({data,file:imageFile})).then((res) => {
          if (res.payload.data.code === 200) {
            resetForm()
            navigate(-1)
          }
        })
      }

    } else {

      const data = {
        supplierId: localStorage.getItem("providerId"),
        dob: dob ? dob?.getTime() :"",
        email,
        genderId: gender,
        lastName,
        name,
        secondLastName,
        phoneNumber: phone,
       

      }
    
      if (!name || !email || !lastName || !phone || !gender) {
        toast.warn("please Fill all the Data")
      } else {
        dispatch(CreateProviderUserRelationship({ data, file: imageFile })).then((res) => {
          if (res.payload.data.code === 201) {
            resetForm()
            navigate(-1)
          }
        })
      }
    }
  }
  // get gender 
  useEffect(() => {
    dispatch(GetGenderListProvider())
    dispatch(GetAllStatusProvider())
    dispatch(GetSupplierStatus())
  
  }, [])

  useEffect(()=>{
    dispatch(GetSupplierInfoById(localStorage.getItem("provideridfordetail")))
  },[updateProviderData])

  // get field data if want to update
  useEffect(() => {
    if (isUpdate) {
      setName(getSupplierInfoById?.name || "")
      setEmail(getSupplierInfoById?.email || "")
      setPhone(getSupplierInfoById?.phoneNumber || "")
      setGender(getSupplierInfoById?.genderId || "")
      setLastName(getSupplierInfoById?.lastName || "")
      setSecondLastName(getSupplierInfoById?.secondLastName || "")
      setIsStatus(getSupplierInfoById?.statusId || "")
      setDob(getSupplierInfoById?.dob || "")
      setSupplierStatus(getSupplierInfoById?.supplierEmployeeStatusId || "")
      // setPreviewImage(getSingleProvider?.selfie || "")
    } else {
      return
    }

  }, [getSupplierInfoById?.id])
  return (
    <>
      {/* head with back link */}
      <div className='head'>
        <div className='headLeft'>
          <Link to="#">
            <i className="fa fa-arrow-left" aria-hidden="true"
              onClick={() => { navigate(-1) }}
              style={{
                transform: lCode === "ar" ? "scaleX(-1)" : "",
                margin: "0 10px"
              }}

            ></i>
          </Link>
          <h2>
            {isUpdate ? t('update_employee') : t('create_employee')}
          </h2>
        </div>
      </div>
      {/* employee create card */}
      <div className="employee_supplier_create_container">
        <div className='employee_create_container_main'>
          <div className="create_employee_card">
            <BootstrapTooltip title={t("clean_all_inputs")} placement="right">
              <button className='clear_all' onClick={() => { resetForm() }}>
                <img src={broomIcon} alt="" />
              </button>
            </BootstrapTooltip>
            {/* image upload */}
            <div className='image_upload_container'>
              <div className='image_upload'>
                {
                  isUpdate ?
                    <img src={previewImage ? previewImage : getSupplierInfoById?.selfie ? `data:image/png;base64,${getSupplierInfoById?.selfie}` : defaultImages} />
                    :
                    <img src={previewImage ? previewImage : defaultImages} alt="vehicle" />
                }
              </div>
              <div
                className="upload_icon_btn"
                onClick={() => setShowModal(true)}
              >
                <i className="fa fa-long-arrow-right height" aria-hidden="true"></i>
                <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
              </div>
            </div>
            <div className='input_form_container p-4' style={{ position: "relative" }}>
              <div className="row pt-2">
                {
                  isUpdate && user?.data?.userType?.name == "SUPPLIER_IN_CHARGE" &&
                  <>
                    <CustomTextWithLine title={t("supplier")} spacing={"pb-2"} />
                    <Grid container spacing={2} sx={{
                      paddingBottom: "0.5rem"
                    }}>

                      <Grid item xs={12} >
                        <Box  >
                          <FormControl

                            fullWidth
                            sx={textField}>
                            <InputLabel id="supplierstatusId" >
                              {t("supplier_status")}
                            </InputLabel >
                            <Select size="small"
                              labelId="supplierstatusId"
                              id="demo-simple-select-contract"
                              // defaultValue="employe"
                              label={t("supplier_status")}
                              value={supplierStatus}
                              onChange={(e) => setSupplierStatus(e.target.value)}

                              sx={{
                                height: "36px",
                                paddingBottom: "0.5rem"
                              }}
                            >
                              {
                                getSupplierStatus?.map((item, index) => {
                                  return (
                                    <MenuItem key={index} sx={{ fontSize: "10px" }} value={item.id}>{item.name}</MenuItem>
                                  )
                                })
                              }


                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                }
                <CustomTextWithLine title={t("user")} spacing={"pb-2"} />
                <Grid container spacing={2}>

                  <Grid item xs={12} sx={{ position: "relative" }}>
                    <TextField size="small"
                      fullWidth
                      label={t("name")}
                      id="NAME"
                      value={name}
                      onChange={(e) => setName(e.target.value)}

                      // font size of input label
                      inputProps={{
                        sx: {
                          border: "none",
                          outline: "none",
                          fontSize: "10px",
                          letterSpacing: "0px",
                          color: "#707070",
                          "&::placeholder": {
                            color: "#707070",
                            fontSize: "8px",
                          },
                        },
                      }}
                      sx={textField}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ position: "relative" }}>
                    <TextField size="small"
                      fullWidth
                      label={t("last_name")}
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}

                      // font size of input label
                      inputProps={{
                        sx: {
                          border: "none",
                          outline: "none",
                          fontSize: "10px",
                          letterSpacing: "0px",
                          color: "#707070",
                          "&::placeholder": {
                            color: "#707070",
                            fontSize: "8px",
                          },
                        },
                      }}
                      sx={textField}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ position: "relative" }}>
                    <TextField size="small"
                      fullWidth
                      label={t("second_last_name")}
                      id="secondLastName"
                      value={secondLastName}
                      onChange={(e) => setSecondLastName(e.target.value)}

                      // font size of input label
                      inputProps={{
                        sx: {
                          border: "none",
                          outline: "none",
                          fontSize: "10px",
                          letterSpacing: "0px",
                          color: "#707070",
                          "&::placeholder": {
                            color: "#707070",
                            fontSize: "8px",
                          },
                        },
                      }}
                      sx={textField}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ position: "relative" }}>
                    <TextField size="small"
                      fullWidth
                      label={t("email")}
                      id="Email"
                      value={email}
                      disabled={isUpdate}
                      onChange={(e) => setEmail(e.target.value)}

                      // font size of input label
                      inputProps={{
                        sx: {
                          border: "none",
                          outline: "none",
                          fontSize: "10px",
                          letterSpacing: "0px",
                          color: "#707070",
                          "&::placeholder": {
                            color: "#707070",
                            fontSize: "8px",
                          },
                        },
                      }}
                      sx={textField}
                    />
                    <span className="input-icons">
                      <MailOutlineIcon />
                    </span>
                  </Grid>
                  <Grid item xs={12} sx={{ position: "relative", }}>
                    <TextField size="small"
                      fullWidth
                      label={t("phone_number")}
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}

                      // font size of input label
                      inputProps={{
                        sx: {
                          border: "none",
                          outline: "none",
                          fontSize: "10px",
                          letterSpacing: "0px",
                          color: "#707070",
                          "&::placeholder": {
                            color: "#707070",
                            fontSize: "8px",
                          },
                        },
                      }}
                      sx={textField}
                    />
                    <span className="input-icons">
                      <PhoneIphoneIcon />
                    </span>
                  </Grid>
                  <Grid item xs={12} >
                    <Box  >
                      <FormControl
                        fullWidth
                        sx={textField}>
                        <InputLabel id="genderId" >
                          {t("gender")}
                        </InputLabel >
                        <Select size="small"
                          labelId="genderId"
                          id="demo-simple-select"
                          defaultValue="employe"
                          label={t("gender")}
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}

                          sx={{
                            height: "36px"
                          }}
                        >
                          {
                            getGnderListProvider?.map((item, index) => {
                              return (
                                <MenuItem key={index} sx={{ fontSize: "10px" }} value={item.id}>{item.name}</MenuItem>
                              )
                            })
                          }


                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  {
                    isUpdate &&
                    <Grid item xs={12} >
                      <Box  >
                        <FormControl

                          fullWidth
                          sx={textField}>
                          <InputLabel id="statusId" >
                            {t("status")}
                          </InputLabel >
                          <Select size="small"
                            labelId="statusId"
                            id="demo-simple-select"
                            defaultValue="employe"
                            label={t("status")}
                            value={isStatus}
                            onChange={(e) => setIsStatus(e.target.value)}

                            sx={{
                              height: "36px",
                              paddingBottom: "0.5rem"
                            }}
                          >
                            {
                              getAllStatusProvider?.map((item, index) => {
                                return (
                                  <MenuItem key={index} sx={{ fontSize: "10px" }} value={item.id}>{item.name}</MenuItem>
                                )
                              })
                            }


                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  }
                  {
                    user?.data?.userType?.name == "SUPPLIER_IN_CHARGE" &&
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>

                          <DesktopDatePicker

                            label="DOB"
                            inputFormat="MM/dd/yyyy"
                            value={dob}
                            onChange={(e) => setDob(e)}
                            renderInput={(params) => <TextField size="small" {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                  }

                </Grid>
              </div>
            </div>
          </div>
          <button className='custom_primary_btn_dark mt-3'
            style={{ width: "650px" }}
            onClick={() => handelEmployee()}
          >
            {isUpdate ? t("update")?.toUpperCase() : t("create")?.toUpperCase()}
          </button>
        </div>
      </div>

      <UploadImageModal
        title={t("add_image")}
        show={showModal}
        setImage={setImageFile}
        preview={previewImage}
        setPreview={setPreviewImage}
        onHide={() => setShowModal(false)}
      />

    </>
  )
}

export default CreateEmployeeProvider


