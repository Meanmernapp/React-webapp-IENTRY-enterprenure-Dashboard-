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
import broomIcon from "../../../assets/icon/broom-solid.svg";
import defaultImages from "../../../assets/defaultImages/userDef.svg";
import UploadImageModal from '../../../components/UploadImageModal';
import useStyle from '../../../hooks/useStyle';
import { GetGenderListProvider } from '../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi';
import { CheckProviderPreUser, GetAllStatusProvider, GetSingleProvider, SaveProviderImage, UpdateProviderData, UploadProviderImage } from '../../../reduxToolkit/Providers/providersApi';
import BootstrapTooltip from '../../../utils/BootstrapTooltip';
import CustomTextWithLine from "../../../components/CustomTextWithLine";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Stack from "@mui/material/Stack";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { CheckContractorPreUser, CreateContractorUserRelationship, GetContractorInfoById, GetContractorStatus, UpdateContractorUserRelationship } from "../../../reduxToolkit/Contractor/ContractorApi";

// Main Component
const AddNewEmploye = ({ isUpdate }) => {

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
  const [contractStatus,setContractStatus] = useState("")


  // useSelctor state from store slice employeesupplierSlice
  const { getGnderListProvider } = useSelector(state => state.EmployeeProviderSlice);
  const { user } = useSelector(state => state.authenticatioauthennSlice);
  const { getSingleProvider, getAllStatusProvider, getProviderImage } = useSelector(state => state?.providersSlice)
  const { getContractorStatus,getContractorInfoById,updateContractorUserRelationship } = useSelector(state => state.ContractorSlice);
  
  console.log(getContractorInfoById)
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
        contractorId: localStorage.getItem("contractorId"),
        dob: typeof dob === "number" ? dob : (dob ? dob.getTime() : undefined),
        id:getContractorInfoById?.id,
        email,
        genderId: gender,
        lastName,
        name,
        secondLastName,
        statusId:isStatus,
        phoneNumber: phone,
        userId: params?.id,
        contractorEmployeeStatusId:contractStatus
      }
      if (!name || !email || !lastName || !phone || !gender) {
        toast.warn("please Fill all the Data")
      } else {
        dispatch(UpdateContractorUserRelationship({data,file:imageFile})).then((res) => {
          if (res.payload.data.code === 200) {
            resetForm()
            navigate(-1)
          }
        })
      }

    } else {

      const data = {
        contractorId: localStorage.getItem("contractorId"),
        dob: dob ? dob?.getTime() :"",
        email,
        genderId: gender,
        lastName,
        name,
        secondLastName,
        // statusId:isStatus,
        phoneNumber: phone,
        userId: params?.id,

      }
      console.log(data)
      if (!name || !email || !lastName || !phone || !gender) {
        toast.warn("please Fill all the Data")
      } else {
        dispatch(CreateContractorUserRelationship({ data, file: imageFile })).then((res) => {
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
    dispatch(GetContractorStatus())
  
  }, [])

  useEffect(()=>{
    dispatch(GetContractorInfoById(params?.id))
  },[updateContractorUserRelationship])

  // get field data if want to update
  useEffect(() => {
    if (isUpdate) {
      setName(getContractorInfoById?.name || "")
      setEmail(getContractorInfoById?.email || "")
      setPhone(getContractorInfoById?.phoneNumber || "")
      setGender(getContractorInfoById?.genderId || "")
      setLastName(getContractorInfoById?.lastName || "")
      setSecondLastName(getContractorInfoById?.secondLastName || "")
      setIsStatus(getContractorInfoById?.statusId || "")
      setDob(getContractorInfoById?.dob || "")
      setContractStatus(getContractorInfoById?.contractorEmployeeStatusId || "")
      // setPreviewImage(getSingleProvider?.selfie || "")
    } else {
      return
    }

  }, [getContractorInfoById?.id])
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
                    <img src={previewImage ? previewImage : getContractorInfoById?.selfie ? `data:image/png;base64,${getContractorInfoById?.selfie}` : defaultImages} />
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
                  isUpdate && user?.data?.userType?.name == "CONTRACTOR_IN_CHARGE" &&
                  <>
                    <CustomTextWithLine title={t("contract")} spacing={"pb-2"} />
                    <Grid container spacing={2} sx={{
                      paddingBottom: "0.5rem"
                    }}>

                      <Grid item xs={12} >
                        <Box  >
                          <FormControl

                            fullWidth
                            sx={textField}>
                            <InputLabel id="contractstatusId" >
                              {t("contract_status")}
                            </InputLabel >
                            <Select size="small"
                              labelId="contractstatusId"
                              id="demo-simple-select-contract"
                              // defaultValue="employe"
                              label={t("contract_status")}
                              value={contractStatus}
                              onChange={(e) => setContractStatus(e.target.value)}

                              sx={{
                                height: "36px",
                                paddingBottom: "0.5rem"
                              }}
                            >
                              {
                                getContractorStatus?.map((item, index) => {
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
                    user?.data?.userType?.name == "CONTRACTOR_IN_CHARGE" &&
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

export default AddNewEmploye

