/*
Author : Arman Ali
Module: AddUserType
github: https://github.com/Arman-Arzoo
*/
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import broomIcon from "../../../assets/icon/broom-solid.svg";
import CustomTextWithLine from "../../../components/CustomTextWithLine";
import { contractorFile, supplierFile } from "../../../constant/userType";
import useStyle from "../../../hooks/useStyle";
import { CreateEmployeeContractor, GetAllToContractor, GetEmployeeContractorByItId, GetStatus, UpdateEmployeeContractor } from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import { CreateEmployeeSupplier, GetEmployeeSupplierByItId, GetGenderListProvider, GetStatusListProvider, UpdateEmployeeSupplier } from "../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import BootstrapTooltip from "../../../utils/BootstrapTooltip";
import defaultImages from "../../../assets/defaultImages/userDef.svg";
import UploadImageModal from "../../../components/UploadImageModal";
import { userInfoStatus } from "../../../reduxToolkit/CompanyEmployees/CompanyEmployeesApi";
import DeleteModal from "../../Modals/DeleteModal";


const AddUserType = ({ userType, isUpdate }) => {

  // use hook importer
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const params = useParams()

  // use State hook for local state management
  const { getStatusListProvider, getGnderListProvider, getEmployeeSupplierByItId } = useSelector(state => state.EmployeeProviderSlice);
  const { getAllToContractor, getEmployeeContractorByItId } = useSelector(state => state.EmployeeContractorsSlice)
  const userInfoStatusList = useSelector(state => state?.CompanyEmployeesSlice?.userInfoStatusList);
  //use Selector hook to get state for redux store
  const [acronym, setAcronym] = useState();
  const [companyName, setCompanyName] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState()
  const [secondLastName, setSecondLastName] = useState()
  const [phoneNumber, setPhoneNumber] = useState();
  const [statusprovider, setStatusProvider] = useState();
  const [gender, setGender] = useState();
  const [description, setDescription] = useState("")
  const [dob, setDob] = useState("")
  const [address, setAddress] = useState("")
  const [contractorStatus, setContractorStatus] = useState("")
  const [supplierStatus, setSupplierStatus] = useState("")
  const [statusContractor, setStatusContractor] = useState("")
  const { textField, smallBoxStyle } = useStyle()
  const [previewImage, setPreviewImage] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [imageFile, setImageFile] = useState("")
  const [deleteUser, setDeleteUser] = useState(false)

  console.log(getEmployeeContractorByItId)
  //  reset function
  const resetForm = () => {
    setAcronym("")
    setCompanyName("")
    setAddress("")
    setDescription("")
    setName("")
    setLastName("")
    setSecondLastName("")
    setEmail("")
    setPhoneNumber("")
    setGender("")
    setDob("")
    setContractorStatus("")
    setSupplierStatus("")
    setStatusContractor("")
    setStatusProvider("")
  }
  // Form handeler Function 
  const FormHandler = () => {
    if (!acronym || !companyName || !address || !name || !lastName || !email || !phoneNumber || !gender) {
      toast.warn("Please Fill the All The Field")

    } else {
      const createData = {
        acronym,
        contractorCompanyName: userType == contractorFile && companyName,
        supplierCompanyName: userType == supplierFile && companyName,
        address,
        description,
        name,
        lastName,
        secondLastName,
        email,
        phoneNumber,
        genderId: gender,
        dob: dob ? dob?.getTime() : "",
      }
      const updateSupplier = {
        acronym,
        supplierCompanyName:companyName,
        supplierStatusId:supplierStatus,
        statusId:  statusprovider,
        address,
        description,
        name,
        lastName,
        secondLastName,
        email,
        phoneNumber,
        genderId: gender,
        dob: typeof dob === "number" ? dob : (dob ? dob.getTime() : undefined),
        userId: getEmployeeSupplierByItId?.userId,
        id:  getEmployeeSupplierByItId?.id

      }
      const updateContractor = {
        acronym,
        contractorCompanyName: companyName,
        contractorStatusId: contractorStatus,
        statusId:statusContractor,
        address,
        description,
        name,
        lastName,
        secondLastName,
        email,
        phoneNumber,
        genderId: gender,
        dob: typeof dob === "number" ? dob : (dob ? dob.getTime() : undefined),
        userId: getEmployeeContractorByItId?.userId,
        id:getEmployeeContractorByItId?.id 

      }

      if (isUpdate) {
        if (userType == contractorFile) {
          dispatch(UpdateEmployeeContractor({ data: updateContractor, file: imageFile })).then((res) => {
            if (res.payload.data.code === 200) {
              navigate(-1)
            }
          })
        }
        if (userType == supplierFile) {

          dispatch(UpdateEmployeeSupplier({ data: updateSupplier, file: imageFile })).then((res) => {
            if (res.payload.data.code === 200) {
              navigate(-1)
            }
          })

        }

      } else {
        if (userType == contractorFile) {
          dispatch(CreateEmployeeContractor({ data: createData, file: imageFile })).then((res) => {
            if (res.payload.data.code === 201) {
              resetForm()
              navigate(-1)
            }
          })
        }
        if (userType == supplierFile) {
          dispatch(CreateEmployeeSupplier({ data: createData, file: imageFile })).then((res) => {
            if (res.payload.data.code === 201) {
              resetForm()
              navigate(-1)
            }
          })
        }
      }
    }

  }

  // useEffect to get status and gender list
  useEffect(() => {
    dispatch(GetGenderListProvider())

    if (isUpdate && userType == supplierFile) {
      dispatch(GetStatusListProvider())
      dispatch(GetEmployeeSupplierByItId(params?.id))
      dispatch(userInfoStatus())
    }
    if (isUpdate && userType == contractorFile) {
      dispatch(GetEmployeeContractorByItId(params?.id))
      dispatch(GetAllToContractor())
      dispatch(userInfoStatus())
    }

  }, [])
  // useEffect to get updated value before update function
  useEffect(() => {
    if (isUpdate && userType === contractorFile) {
      setAcronym(getEmployeeContractorByItId?.acronym)
      setCompanyName(getEmployeeContractorByItId?.contractorCompanyName)
      setContractorStatus(getEmployeeContractorByItId?.contractorStatusId)
      setAddress(getEmployeeContractorByItId?.address)
      setDescription(getEmployeeContractorByItId?.description)
      setName(getEmployeeContractorByItId?.name)
      setLastName(getEmployeeContractorByItId?.lastName)
      setSecondLastName(getEmployeeContractorByItId?.secondLastName)
      setEmail(getEmployeeContractorByItId?.email)
      setPhoneNumber(getEmployeeContractorByItId?.phoneNumber)
      setGender(getEmployeeContractorByItId?.genderId)
      setDob(getEmployeeContractorByItId?.dob)
      setStatusContractor(getEmployeeContractorByItId?.statusId)

    }
    if (isUpdate && userType === supplierFile) {
      setAcronym(getEmployeeSupplierByItId?.acronym)
      setCompanyName(getEmployeeSupplierByItId?.supplierCompanyName)
      setSupplierStatus(getEmployeeSupplierByItId?.supplierStatusId)
      setAddress(getEmployeeSupplierByItId?.address)
      setDescription(getEmployeeSupplierByItId?.description)
      setName(getEmployeeSupplierByItId?.name)
      setLastName(getEmployeeSupplierByItId?.lastName)
      setSecondLastName(getEmployeeSupplierByItId?.secondLastName)
      setEmail(getEmployeeSupplierByItId?.email)
      setPhoneNumber(getEmployeeSupplierByItId?.phoneNumber)
      setGender(getEmployeeSupplierByItId?.genderId)
      setDob(getEmployeeSupplierByItId?.dob)
      setStatusProvider(getEmployeeSupplierByItId?.statusId)
    }


  }, [getEmployeeSupplierByItId?.id, getEmployeeContractorByItId?.id])

  // html code
  return (
    <>
      <div className="head ">
        <h2 style={{ color: "#146F62", font: "normal normal 600 32px/39px Montserrat" }}>
          <Link to={"#"}>

            <ArrowBackIcon
              onClick={() => navigate(-1)}
              style={{
                color: "#146F62",
                fontSize: "30px",
                marginRight: "30px",
              }}
            />
          </Link>

          {isUpdate == false && userType == supplierFile && t("add_supplier")}
          {isUpdate == false && userType == contractorFile && "ADD CONTRACTOR"}
          {isUpdate && userType == contractorFile && "UPDATE CONTRACTOR"}
          {isUpdate && userType == supplierFile && t('update_supplier')}
        </h2>
        {
          isUpdate &&
          <button className="delete-btn-1"

            onClick={() => {
              setDeleteUser(true)
            }}

          >
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            {t('delete')}
          </button>
        }

      </div>
      <div className="mt-5  add_user_type">

        <div className="col-md-6 add_provider_content">
          {/* image upload */}
          <div className='image_upload_container'>
            <div className='image_upload'>
              {
                isUpdate ?

                  // <img src={previewImage ? previewImage : 
                  //   userType == (contractorFile ? getEmployeeContractorByItId?.selfie : getEmployeeSupplierByItId?.selfie) ? `data:image/png;base64,${userType == (contractorFile ? getEmployeeContractorByItId?.selfie : getEmployeeSupplierByItId?.selfie)}` 
                  //   : defaultImages} />
                  // <img src={ previewImage ? previewImage : `data:image/png;base64,${getEmployeeContractorByItId?.selfie}`} alt="dd" />
                  <img src={`data:image/png;base64,${getEmployeeContractorByItId?.selfie}`} alt="dd" />
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

          <BootstrapTooltip title={t("clean_all_inputs")} placement="right">
            <button className='clear_all' onClick={() => {
              resetForm()
            }}>
              <img src={broomIcon} alt="" />
            </button>
          </BootstrapTooltip>

          <div className="space">
            <CustomTextWithLine title={(userType == supplierFile || userType == contractorFile) && t("company")} />

            <Box
              className="add_provider_text_field"
              style={{ marginTop: "28.5px" }}
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
            >
              <TextField size="small"
                focused={acronym}
                fullWidth
                label={t("acronym")}
                id="Acronym"
                value={acronym}
                onChange={(e) => setAcronym(e.target.value)}

              />
            </Box>
            <Box
              className="add_provider_text_field"
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
            >
              <TextField size="small"

                fullWidth

                label={t("company_name")}
                id="Company Name"
                focused={companyName}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}

              />
            </Box>
            {isUpdate && userType == contractorFile &&
              <Box className="add_provider_text_field">
                <FormControl
                  fullWidth
                  sx={textField}>
                  <InputLabel id="contractor_status" >
                    {t("contractor_status")}
                  </InputLabel >
                  <Select size="small"
                    labelId="contractor_status"
                    id="demo-simple-select"
                    defaultValue="employe"
                    label={t("contractor_status")}
                    value={contractorStatus}
                    onChange={(e) => setContractorStatus(e.target.value)}

                    sx={{
                      height: "36px"
                    }}
                  >
                    {
                      getAllToContractor?.map((item, index) => {
                        return (
                          <MenuItem key={index} sx={{ fontSize: "10px" }} value={item.id}>{item.name}</MenuItem>
                        )
                      })
                    }


                  </Select>
                </FormControl>
              </Box>

            }
            {isUpdate && userType == supplierFile &&
              <Box className="add_provider_text_field">
                <FormControl
                  fullWidth
                  sx={textField}>
                  <InputLabel id="supplier_status" >
                    {t("supplier_status")}
                  </InputLabel >
                  <Select size="small"
                    labelId="supplier_status"
                    id="demo-simple-select"
                    defaultValue="employe"
                    label={t("supplier_status")}
                    value={supplierStatus}
                    onChange={(e) => setSupplierStatus(e.target.value)}

                    sx={{
                      height: "36px"
                    }}
                  >
                    {
                      getStatusListProvider?.map((item, index) => {
                        return (
                          <MenuItem key={index} sx={{ fontSize: "10px" }} value={item.id}>{item.name}</MenuItem>
                        )
                      })
                    }


                  </Select>
                </FormControl>
              </Box>

            }
            <Box
              className="add_provider_text_field"

            >
              <TextField size="small"

                fullWidth

                label={t("address")}
                id="address"
                focused={address}
                value={address}
                onChange={(e) => setAddress(e.target.value)}

              />
            </Box>
            <Box className="add_provider_text_field" >
              <TextField size="small"
                fullWidth

                type="text"
                label={t("description")}
                id="description"
                value={description}
                focused={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={5}

                maxRows={10}
                InputLabelProps={{
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    background: "#ffffff",
                    padding: "0px 8px 0px 8px",
                  },
                }} // font size of input label
                inputProps={{
                  maxLength: 500,
                  sx: {
                    border: "none",
                    outline: "none",
                    fontSize: "14px",
                    letterSpacing: "0px",
                    innerHeight: "200px",

                    color: "#707070",
                    "&::placeholder": {
                      color: "#707070",
                      fontSize: "8px",
                    },
                  },
                }}
              />

            </Box>
            <CustomTextWithLine title={(userType == supplierFile || userType == contractorFile) && t("manager")} />


            <Box
              className="add_provider_text_field"
              style={{ marginTop: "28.5px" }}
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
            >
              <TextField size="small"

                fullWidth
                focused={name}
                label={t("name")}
                id="NAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=""
              />
            </Box>
            <Box
              className="add_provider_text_field"

              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
            >
              <TextField size="small"

                fullWidth
                focused={lastName}
                label={t("last_name")}
                id="LASTNAME"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className=""
              />
            </Box>
            <Box
              className="add_provider_text_field"

              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
            >
              <TextField size="small"

                fullWidth

                label={t("second last name")}
                id="SECONDLASTNAME"
                value={secondLastName}
                focused={secondLastName}
                onChange={(e) => setSecondLastName(e.target.value)}
                className=""
              />
            </Box>
            <Box
              className="add_provider_text_field"
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
            >
              <TextField size="small"

                fullWidth

                label={t("email")}
                id="Email"
                focused={email}
                value={email}
                disabled={isUpdate}
                onChange={(e) => {
                  setEmail(e.target.value);

                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MailOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              className="add_provider_text_field"
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
            >
              <TextField size="small"

                fullWidth

                label={t("phone_number")}
                id="Phone Number"

                value={phoneNumber}
                focused={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value)

                }}
                className="NoShadowInput"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PhoneIphoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {
              isUpdate && userType == contractorFile &&
              <Box
                className="add_provider_text_field"
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  fontSize: "20px",
                  height: "40px",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{t("status")}</InputLabel>
                  <Select size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={statusContractor}
                    onChange={(e) => setStatusContractor(e.target.value)}
                    label={t("status")}
                    focused={statusContractor}
                  >
                    {
                      userInfoStatusList?.map(item => {

                        return <MenuItem value={item?.id}>{item?.name}</MenuItem>

                      })
                    }

                  </Select>
                </FormControl>
              </Box>
            }
            {
              isUpdate && userType == supplierFile &&
              <Box
                className="add_provider_text_field"
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  fontSize: "20px",
                  height: "40px",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{t("status")}</InputLabel>
                  <Select size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={statusprovider}
                    onChange={(e) => setStatusProvider(e.target.value)}
                    label={t("status")}
                    focused={statusprovider}
                  >
                    {
                      userInfoStatusList?.map(item => {

                        return <MenuItem value={item?.id}>{item?.name}</MenuItem>

                      })
                    }

                  </Select>
                </FormControl>
              </Box>
            }
            <Box className="add_provider_text_field">
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
            <Box className="add_provider_text_field">

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
            </Box>
          </div>

          <div className="footer">

            <button
              className="custom_primary_btn_dark"
              style={{ width: "100%" }}
              onClick={() => {
                FormHandler()
              }}
            > {isUpdate && t("update").toUpperCase()} {!isUpdate && t('add')}</button>
          </div>
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
      <DeleteModal
        title_modal={t("delete_user")}
        show={deleteUser}
        onHide={() => setDeleteUser(false)}
        
      />
    </>
  );
};

export default AddUserType;
