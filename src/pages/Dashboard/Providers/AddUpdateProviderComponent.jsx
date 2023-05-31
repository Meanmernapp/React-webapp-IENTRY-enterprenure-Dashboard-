/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";


import { Box } from "@mui/system";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployeeProvider, CreateEmployeeProviderPreUser, GetEmployeeProviderByEmail, GetEmployeeProviderById, GetEmployeeProviderByPhoneNumber, GetGenderListProvider, GetStatusListProvider, UpdateEmployeeProviderCompany, UpdateEmployeeProviderInfo } from "../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../../Apis/Axios";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const AddUpdateProviderComponent = ({
  addProviderFlag,
  addContractorFlag,
  updateProviderFlag,
  updateContractorFlag,
}) => {


  // use hook importer
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  // use State hook for local state management
  const { getEmployeeProviderByEmail } = useSelector(state => state.EmployeeProviderSlice)
  const { getEmployeeProviderByPhoneNumber } = useSelector(state => state.EmployeeProviderSlice)
  const { getEmployeeProviderById } = useSelector(state => state.EmployeeProviderSlice);
  const { getStatusListProvider } = useSelector(state => state.EmployeeProviderSlice);
  const { getGnderListProvider } = useSelector(state => state.EmployeeProviderSlice);

  console.log(getEmployeeProviderByEmail)

  //use Selector hook to get state for redux store
  const [acronym, setAcronym] = useState();
  const [companyName, setCompanyName] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState()
  const [secondLastName , setSecondLastName] = useState()
  const [phoneNumber, setPhoneNumber] = useState();
  const [statusprovider, setStatusProvider] = useState();
  const [gender, setGender] = useState();
  const [updateProvider, setUpdateProvider] = useState(false);
  const [addContractor, setaddContractor] = useState(false);
  const [updateContractor, setupdateContractor] = useState(false);
  const [addProvider, setaddProvider] = useState(false);


  // a funtion to call when user stop typing to avoid bad performace
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }
  //  call debounce callback
  const debounceOnChangeEmail = React.useCallback(debounce(checkByEmail, 1000), []);
  const debounceOnChangePhone = React.useCallback(debounce(checkByPhone, 1000), []);
  // debouce callback for check email
  function checkByEmail(value) {
    dispatch(GetEmployeeProviderByEmail(value))
  }
  // debouce callback for check phone
  function checkByPhone(value) {
    dispatch(GetEmployeeProviderByPhoneNumber(value))
  }

  // create employee function
  const formHandle = async () => {
    if (
      !acronym ||
      !companyName ||
      !phoneNumber ||
      !name ||
      !lastName ||
      !email ||
      !statusprovider) {
      toast.warn("please fill all field")

    } else {
      // toast.success("all good")
      const createprovider = {
        acronym,
        supplierCompanyName: companyName,
        user: {
          id: getEmployeeProviderByPhoneNumber?.id || getEmployeeProviderByEmail?.id
        },
        company: {
          id: localStorage.getItem('cId')
        }
      }

      if (getEmployeeProviderByPhoneNumber?.id || getEmployeeProviderByEmail?.id) {
        dispatch(CreateEmployeeProvider({ createprovider, navigate }))
      }
      else {

        const data = {
          email,
          phoneNumber,
          name,
          lastName,
          secondLastName
        }
        dispatch(CreateEmployeeProviderPreUser(data)).then((res) => {
          console.log(res)
          const createprovider = {
            acronym,
            supplierCompanyName: companyName,
            user: {
              id: res?.payload?.data?.data?.id
            },
            company: {
              id: localStorage.getItem('cId')
            }
          }
          dispatch(CreateEmployeeProvider({ createprovider, navigate }))
        }

        )

      }

    }

  }

  // update employeee function
  const formHandleUpdate = () => {

    const body = {
      id: getEmployeeProviderById?.user?.id,
      phoneNumber,
      name,
      email,
      lastName,
      secondLastName,
      password: "1234",
      gender: {
        id: gender
      },
      userType: {
        id: getEmployeeProviderById?.user?.userType?.id
      },
      status: {
        id: getEmployeeProviderById?.user?.status?.id
      }
    }
    const updprovider = {
      id: getEmployeeProviderById?.id,
      status: {
        id: statusprovider
      },
      acronym,
      supplierCompanyName: companyName,
    }


    dispatch(UpdateEmployeeProviderInfo(body)).then(() => {
      navigate("/dashboard/employee/suppliers")
    })
    dispatch(UpdateEmployeeProviderCompany(updprovider))
  }

  // useEffect  for fetch all data from email or phone number or default
  useEffect(() => {
    setName(!updateProvider && getEmployeeProviderByPhoneNumber?.name || getEmployeeProviderByEmail?.name || name)
    setLastName(!updateProvider && getEmployeeProviderByPhoneNumber?.lastName || getEmployeeProviderByEmail?.lastName || lastName)
    setSecondLastName(!updateProvider && getEmployeeProviderByPhoneNumber?.secondLastName || getEmployeeProviderByEmail?.secondLastName || secondLastName)
    setEmail(!updateProvider && getEmployeeProviderByPhoneNumber?.email || getEmployeeProviderByEmail?.email || email)
    setPhoneNumber(!updateProvider && getEmployeeProviderByPhoneNumber?.phoneNumber || getEmployeeProviderByEmail?.phoneNumber || phoneNumber)
  }, [getEmployeeProviderByPhoneNumber?.id, getEmployeeProviderByEmail?.id])


  useEffect(() => {
    console.log(
      { addProviderFlag },
      { addContractorFlag },
      { updateProviderFlag },
      { updateContractorFlag }
    );
    setaddProvider(addProviderFlag);
    setaddContractor(addContractorFlag);
    setUpdateProvider(updateProviderFlag);
    setupdateContractor(updateContractorFlag);
  }, []);

  // useEffect to get status and gender list
  useEffect(() => {
    dispatch(GetStatusListProvider())
    dispatch(GetGenderListProvider())
    if (updateProvider) {
      const data = {
        id: localStorage.getItem("pid")
      }
      dispatch(GetEmployeeProviderById(data))
    }

  }, [getEmployeeProviderById?.id])
  // useEffect to get updated value before update function
  useEffect(() => {
    setAcronym(updateProvider && getEmployeeProviderById?.acronym || '')
    setCompanyName(updateProvider && getEmployeeProviderById?.supplierCompanyName || '')
    setName(updateProvider && getEmployeeProviderById?.user?.name || '')
    setLastName(updateProvider && getEmployeeProviderById?.user?.lastName || '')
    setSecondLastName(updateProvider && getEmployeeProviderById?.user?.secondLastName || '')
    setEmail(updateProvider && getEmployeeProviderById?.user?.email || '')
    setPhoneNumber(updateProvider && getEmployeeProviderById?.user?.phoneNumber || '')
    setGender(updateProvider && getEmployeeProviderById?.user?.gender?.id || '')
    setStatusProvider(updateProvider && getEmployeeProviderById?.user?.status?.id || '')

  }, [getEmployeeProviderById, updateProvider])

  // html code
  return (
    <>
      <div className="head ">
        <h2 style={{ color: "#146F62", font: "normal normal 600 32px/39px Montserrat" }}>
          <Link to={addProvider || updateProvider ? "/dashboard/employee/suppliers" : '#'}>
            <ArrowBackIcon
              style={{
                color: "#146F62",
                fontSize: "30px",
                marginRight: "30px",
              }}
            />
          </Link>

          {addProvider && t("add_supplier")}
          {addContractor && "ADD CONTRACTOR"}
          {updateContractor && "UPDATE CONTRACTOR"}
          {updateProvider && t('update_supplier')}
        </h2>

      </div>
      <div className="mt-5  add_provider">
        <div className="col-md-6 add_provider_content">
          <p className="provider_header">

            {(addProvider || updateProvider) && t("company_information")}
            {(addContractor || updateContractor) && "CONTRACTOR COMPANY"}
          </p>

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
              focused={acronym && updateProvider && getEmployeeProviderById?.acronym}
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
              focused={companyName && updateProvider && getEmployeeProviderById?.supplierCompanyName}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}

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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{t("status")}</InputLabel>
              <Select size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={statusprovider}
                onChange={(e) => setStatusProvider(e.target.value)}
                label={t("status")}
                focused={updateProvider && getEmployeeProviderById?.user?.status?.id}
              >
                {
                  getStatusListProvider?.map(item => {

                    return <MenuItem value={item?.id}>{item?.name}</MenuItem>

                  })
                }

              </Select>
            </FormControl>
          </Box>
          <p className="provider_header">
            {(addProvider || updateProvider) && t("supplier_company")}
            {(addContractor || updateContractor) && "CONTRACTOR COMPANY"}
          </p>
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
              focused={name && updateProvider && getEmployeeProviderById?.user?.name}
              label={t("name")}
              id="NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=""
            />
          </Box>
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
              focused={lastName && updateProvider && getEmployeeProviderById?.user?.lastName}
              label={t("last_name")}
              id="LASTNAME"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className=""
            />
          </Box>
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
              focused={secondLastName && updateProvider && getEmployeeProviderById?.user?.name}
              label={t("second last name")}
              id="SECONDLASTNAME"
              value={secondLastName}
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
              focused={email && updateProvider && getEmployeeProviderById?.user?.email}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                debounceOnChangeEmail(e.target.value)
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
              focused={phoneNumber && updateProvider && getEmployeeProviderById?.user?.phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value)
                debounceOnChangePhone(e.target.value)
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

          <div className="footer">
            <button className="custom_btn_cancel_gray_hover" style={{ width: "284px" }} 
            onClick={() => navigate("/dashboard/employee/suppliers")}
            >{t('cancel')}</button>
            <button
              className="custom_primary_btn_dark"
              style={{ width: "284px" }}
              onClick={() => { addProvider && formHandle(); updateProvider && formHandleUpdate() }}
            > {updateProvider && t("UPDATE")} {addProvider && t('add')}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUpdateProviderComponent;
