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
const AddUpdateProviderComponent = ({
  addProviderFlag,
  addContractorFlag,
  updateProviderFlag,
  updateContractorFlag,
}) => {


  // use hook importer
  const dispatch = useDispatch()
  const navigate = useNavigate();

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
      !email ||
      !statusprovider) {
      toast.warn("please fill all field")

    } else {
      // toast.success("all good")
      const createprovider = {
        acronym,
        providerCompanyName: companyName,
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
          name
        }
        dispatch(CreateEmployeeProviderPreUser(data)).then((res) => {
          console.log(res)
          const createprovider = {
            acronym,
            providerCompanyName: companyName,
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
      providerCompanyName: companyName,
    }


    dispatch(UpdateEmployeeProviderInfo(body)).then(() => {
      navigate("/dashboard/employee/providers")
    })
    dispatch(UpdateEmployeeProviderCompany(updprovider))
  }

  // useEffect  for fetch all data from email or phone number or default
  useEffect(() => {
    setName(!updateProvider && getEmployeeProviderByPhoneNumber?.name || getEmployeeProviderByEmail?.name || name)
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
    setCompanyName(updateProvider && getEmployeeProviderById?.providerCompanyName || '')
    setName(updateProvider && getEmployeeProviderById?.user?.name || '')
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
          <Link to={addProvider || updateProvider ? "/dashboard/employee/providers" : '#'}>
            <ArrowBackIcon
              style={{
                color: "#146F62",
                fontSize: "30px",
                marginRight: "30px",
              }}
            />
          </Link>

          {addProvider && "ADD PROVIDER"}
          {addContractor && "ADD CONTRACTOR"}
          {updateContractor && "UPDATE CONTRACTOR"}
          {updateProvider && "UPDATE PROVIDER"}
        </h2>

      </div>
      <div className="mt-5  add_provider">
        <div className="col-md-6 add_provider_content">
          <p className="provider_header">

            {(addProvider || updateProvider) && "Company Information"}
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
              label="Acronym"
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

              label="Company Name"
              id="Company Name"
              focused={companyName && updateProvider && getEmployeeProviderById?.providerCompanyName}
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
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={statusprovider}
                onChange={(e) => setStatusProvider(e.target.value)}
                label="Status"
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
            {(addProvider || updateProvider) && "Provider Company"}
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
              label="NAME"
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

              label="Email"
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

              label="Phone Number"
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
            <button className="custom_btn_cancel_gray_hover" style={{ width: "284px" }} >cancel</button>
            <button
              className="custom_primary_btn_dark"
              style={{ width: "284px" }}
              onClick={() => { addProvider && formHandle(); updateProvider && formHandleUpdate() }}
            > {updateProvider && "UPDATE "} {addProvider && "ADD"}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUpdateProviderComponent;
