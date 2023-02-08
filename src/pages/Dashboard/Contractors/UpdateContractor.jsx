/*
Author: Mazhar Iqbal
Module: Contractor Module  
*/

//Update Contractor
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import apiInstance from "../../../Apis/Axios";
import { useDispatch, useSelector } from "react-redux";
import { GetAllToContractor } from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import {
  allToContractor,
} from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice";

import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";

const UpdateContractor = () => {
  // use state hook  for local state managment
  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();

  const [acronym, setAcronym] = useState();
  const [contractorData, setContractorData] = useState();
  const [companyName, setCompanyName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [status, setStatus] = useState();
  const [gender, setGender] = useState();
  const [addContractor, setaddContractor] = useState(false);

  const navigate = useLocation();
  const navigates = useNavigate()
  let { state } = navigate;

  let contractId = state?.state?.id;
  const dispatch = useDispatch();

  const goBack = () => navigates(-1);


  const getAllToContractor = useSelector(allToContractor);

  //get contractor detail from DB
  const getContractorDetails = async () => {
    await apiInstance
      .get(`contractor-service/get-by-id/${contractId || state?.state}`)
      .then(function (response) {
        setContractorData(response?.data?.data);
        setAcronym(response?.data?.data?.acronym);
        setCompanyName(response?.data?.data?.contractorCompanyName);
        setEmail(response?.data?.data.user?.email);
        setName(response?.data?.data.user?.name);
        setPhoneNumber(response?.data?.data.user?.phoneNumber);
        setStatus(response?.data?.data.status?.id);
        setGender(response?.data?.data.user?.gender?.id);
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };

  //update company data
  const updateContractCompanyData = async () => {
    const updateCont = {
      id: contractorData?.id,
      status: {
        id: contractorData?.status?.id,
      },
      acronym,
      contractorCompanyName: companyName,
    };
    await apiInstance
      .put(`contractor-service/update`, updateCont)
      .then(function (response) {
        toast.success(response?.data?.message);
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };
  //update contractor data
  const updateContracUsertData = async () => {
    const body = {
      id: contractorData?.user?.id,
      phoneNumber,
      name,
      email,
      gender: {
        id: gender,
      },
      userType: {
        id: contractorData?.user?.userType?.id,
      },
      status: {
        id: status ? status : contractorData?.user?.status?.id,
      },
    };
    await apiInstance
      .put(`user-service/update`, body)
      .then(function (response) {
        getContractorDetails();

        toast.success(response?.data?.message);
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };
  const handleSubmit = () => {
    //update company data
    updateContractCompanyData();
    //update contractor data
    updateContracUsertData();
  };

  useEffect(() => {
    //get contractor and company detail
    getContractorDetails();
    //get contractor status
    dispatch(GetAllToContractor());
  }, []);

  return (
    <>
      <div className="head">
        <div className="headLeft mt-3 addcontractor">
          {/* <Link to="/dashboard/employee/contractors/contractor-details"> */}
          <i className="fa fa-arrow-left"
            aria-hidden="true"
            onClick={() => { goBack(); }}
            style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}></i>
          {/* </Link> */}
          <h2>UPDATE CONTRACTOR</h2>
        </div>
      </div>
      <div className="mt-5  add_provider">
        <div
          className="col-md-6 add_provider_content"
          style={{ paddingBottom: "30px" }}
        >
          <p className="provider_header">CONTRACTOR COMPANY</p>

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

              label={t("acronym")}
              id="Acronym"
              value={acronym}
              onChange={(e) => setAcronym(e.target.value)}
              className=""
              sx={{
                textAlign: lCode === "ar" ? "right" : "left",
                "& 	.MuiOutlinedInput-notchedOutline": {
                  textAlign: lCode === "ar" ? "right" : "left",
                },
                "& 	.MuiInputLabel-root": {
                  fontSize: 12,
                  left: lCode === "ar" ? "inherit" : "0",
                  right: lCode === "ar" ? "1.75rem" : "0",
                  transformOrigin: lCode === "ar" ? "right" : "left"
                }
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

              label={t("company_name")}
              id="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className=""
              sx={{
                textAlign: lCode === "ar" ? "right" : "left",
                "& 	.MuiOutlinedInput-notchedOutline": {
                  textAlign: lCode === "ar" ? "right" : "left",
                },
                "& 	.MuiInputLabel-root": {
                  fontSize: 12,
                  left: lCode === "ar" ? "inherit" : "0",
                  right: lCode === "ar" ? "1.75rem" : "0",
                  transformOrigin: lCode === "ar" ? "right" : "left"
                }
              }}
            />
          </Box>
          {/* <Box
                style={{ width: "100%" }}
                className="add_provider_text_field"
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                  <strong className="me-2">STATUS</strong>
                  </InputLabel>
                   <Select size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="CHOOSE A PROVIDER"
                    value={contractStatus}
                    onChange={(e) => setContractorData(e.target.value)}
                  >
                    {contractAllStatus &&
                      contractAllStatus.map((item, index) => {
                        return (
                          <MenuItem value={item?.id} key={index}>
                          <span style={{fontSize:"14px"}}>{item?.name.replace("_", " ")}</span>
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Box> */}
          <p className="provider_header">CONTRACTOR INFORMATION</p>
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

              label={t("name")}
              id="NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=""

              sx={{
                textAlign: lCode === "ar" ? "right" : "left",
                "& 	.MuiOutlinedInput-notchedOutline": {
                  textAlign: lCode === "ar" ? "right" : "left",
                },
                "& 	.MuiInputLabel-root": {
                  fontSize: 12,
                  left: lCode === "ar" ? "inherit" : "0",
                  right: lCode === "ar" ? "1.75rem" : "0",
                  transformOrigin: lCode === "ar" ? "right" : "left"
                }
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
              label={t("email")}
              id="Email"
              value={email}

              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                textAlign: lCode === "ar" ? "right" : "left",
                "& 	.MuiOutlinedInput-notchedOutline": {
                  textAlign: lCode === "ar" ? "right" : "left",
                },
                "& 	.MuiInputLabel-root": {
                  fontSize: 12,
                  left: lCode === "ar" ? "inherit" : "0",
                  right: lCode === "ar" ? "1.75rem" : "0",
                  transformOrigin: lCode === "ar" ? "right" : "left"
                }
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
              id="PHONE NUMBER"
              value={phoneNumber}

              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              className="NoShadowInput"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneIphoneIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                textAlign: lCode === "ar" ? "right" : "left",
                "& 	.MuiOutlinedInput-notchedOutline": {
                  textAlign: lCode === "ar" ? "right" : "left",
                },
                "& 	.MuiInputLabel-root": {
                  fontSize: 12,
                  left: lCode === "ar" ? "inherit" : "0",
                  right: lCode === "ar" ? "1.75rem" : "0",
                  transformOrigin: lCode === "ar" ? "right" : "left"
                }
              }}
            />
          </Box>
          {!addContractor && (
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
                  label={t("status")}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {getAllToContractor &&
                    getAllToContractor?.map((item, index) => {
                      return (
                        <MenuItem value={item?.id} key={index}>
                          <span style={{ fontSize: "14px" }}>
                            {" "}
                            {item?.name.replace("_", " ")}
                          </span>
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>
          )}

          <Box
            style={{ padding: "0px 12px" }}
            sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "40px",
            }}
          >
            <div className="d-flex my-4">
              <button
                className="custom-primary-btn cancel-custom-btn"
                onClick={() => {
                  navigate("/dashboard/employee/contractors", { replace: true });
                }}
              >
                {t("cancel")}
              </button>
              <button
                className="custom-primary-btn create-custom-btn"
                onClick={() => {
                  if (acronym && companyName && name && email && phoneNumber) {
                    handleSubmit();
                  } else {
                    toast.info("Please fill all fields");
                  }
                }}
              >
                {t("update")}
              </button>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default UpdateContractor;
