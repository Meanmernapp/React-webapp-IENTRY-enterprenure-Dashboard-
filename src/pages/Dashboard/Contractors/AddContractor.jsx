/*
Author: Mazhar Iqbal
Module: Contractor Module  
*/

//Add Contractor
import React, { useMemo, useState } from "react";
import { debounce } from "lodash";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { InputAdornment, TextField } from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import apiInstance from "../../../Apis/Axios";
import { useTranslation } from "react-i18next";

let no;
let mail;

const AddContractor = () => {
  const { t, i18n } = useTranslation()
  const [acronym, setAcronym] = useState();
  const [companyName, setCompanyName] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const [findEmail, setFindEmail] = useState(false);
  const [findNo, setFindNo] = useState(false);

  const [userID, setUserID] = useState();
  let navigate = useNavigate();

  no = phoneNumber;
  mail = email;
  //check record with email contractor exist or not
  const getByEmail = async () => {
    await apiInstance
      .get(`user-service/get-by-email/${mail}`)
      .then(function (response) {
        if (response.status == 200) {
          console.log("user find", response);
          toast.info(response?.data?.message);
          let id = response?.data?.data?.id;
          setUserID(id);
          setFindEmail(true);
          setName(response?.data?.data?.name);
          setPhoneNumber(response?.data?.data?.phoneNumber);
        }
      })
      .catch(function (error) {
        // toast.error(error?.response?.data?.message);
        return error.response;
      });
  };

  // let phone = "+524427065909"
  //check record with phone number contractoe exist or not
  const getByPhone = async () => {
    await apiInstance
      .get(`user-service/get-by-phone-number/${no}`)
      .then(function (response) {
        if (response.status == 200) {
          let id = response?.data?.data?.id;
          toast.success(response.data.message);
          console.log("thi si the response", response);
          setUserID(id);
          setFindNo(true);
          setName(response?.data?.data?.name);
          setEmail(response?.data?.data?.email);
        }
      })
      .catch(function (error) {
        // toast.error(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };

  //dalay funcation for call "GetByPhone"
  const delayedPhoneSearch = useMemo(
    () => debounce(() => getByPhone(), 100),
    []
  );

  //dalay funcation for call "GetByEmail"
  const delayedEmailSearch = useMemo(
    () => debounce(() => getByEmail(), 100),
    []
  );

  //only create company information if contractor is already register
  const onlyCreateContract = async (id) => {
    await apiInstance
      .post(`contractor-service/create`, {
        user: {
          id: id,
        },
        acronym: acronym,
        contractorCompanyName: companyName,
      })
      .then(function (response) {
        toast.success(response?.data?.message);
        navigate("/dashboard/employee/contractors", { replace: true });
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };

  //Add contractor
  const handleSubmit = async () => {
    if (findNo == false && findEmail == false) {
      //if contractor not already register then first register contractor
      await apiInstance
        .post(`authentication-service/pre-register-user`, {
          email,
          name,
          phoneNumber,
        })
        .then(function (response) {
          if (response.status == 201) {
            let id = response?.data?.data?.id;
            onlyCreateContract(id);
            toast.success(response?.data?.message);
          }
        })
        .catch(function (error) {
          toast.error(error?.response?.data?.message);
          document.getElementById("overlay").style.display = "none";
        });
    } else {
      //only create company information if contractor is already register
      onlyCreateContract(userID);
    }
  };

  return (
    <>
      <div className="head">
        <div className="headLeft mt-3 addcontractor">
          <Link to="/dashboard/employee/contractors">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: i18n.dir() == "rtl" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}></i>
          </Link>
          <h2> {t('add_contractor')}</h2>
        </div>
      </div>
      <div className="mt-5  add_provider addcontractor">
        <div
          className="col-md-6 add_provider_content"
          style={{ paddingBottom: "60px" }}
        >
          <p className="provider_header">{t('company_information')}</p>

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

              label={t('acronym')}
              id="Acronym"
              className="NoShadowInput"
              value={acronym}
              onChange={(e) => setAcronym(e.target.value)}
              sx={{
                textAlign: i18n.dir() == "rtl" ? "right" : "left",
                "& 	.MuiOutlinedInput-notchedOutline": {
                  textAlign: i18n.dir() == "rtl" ? "right" : "left",
                },
                "& 	.MuiInputLabel-root": {
                  fontSize: 12,
                  left: i18n.dir() == "rtl" ? "inherit" : "0",
                  right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                  transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
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
              className="NoShadowInput"

              label={t('company_name')}
              id="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              sx={{
                textAlign: i18n.dir() == "rtl" ? "right" : "left",
                "& 	.MuiOutlinedInput-notchedOutline": {
                  textAlign: i18n.dir() == "rtl" ? "right" : "left",
                },
                "& 	.MuiInputLabel-root": {
                  fontSize: 12,
                  left: i18n.dir() == "rtl" ? "inherit" : "0",
                  right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                  transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
                }
              }}
            />
          </Box>
          <p className="provider_header">{t('contractor_information')}</p>
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

              label={t('name')}
              id="NAME"
              className="NoShadowInput"
              focused={name ? true : null}
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                textAlign: i18n.dir() == "rtl" ? "right" : "left",
                "& 	.MuiOutlinedInput-notchedOutline": {
                  textAlign: i18n.dir() == "rtl" ? "right" : "left",
                },
                "& 	.MuiInputLabel-root": {
                  fontSize: 12,
                  left: i18n.dir() == "rtl" ? "inherit" : "0",
                  right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                  transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
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

              label={t('email')}
              id="Email"
              focused={email ? true : false}
              className="NoShadowInput"
              value={email}
              onBlur={() => (findEmail ? null : delayedEmailSearch())}
              sx={{
                textAlign: i18n.dir() == "rtl" ? "right" : "left",
                "& 	.MuiOutlinedInput-notchedOutline": {
                  textAlign: i18n.dir() == "rtl" ? "right" : "left",
                },
                "& 	.MuiInputLabel-root": {
                  fontSize: 12,
                  left: i18n.dir() == "rtl" ? "inherit" : "0",
                  right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                  transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
                }
              }}
              onChange={(e) => setEmail(e.target.value)}
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

              label={t('phone_number')}
              value={phoneNumber}
              focused={phoneNumber ? true : false}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              onBlur={() =>
                findEmail ? null : delayedPhoneSearch(phoneNumber)
              }
              sx={{
                textAlign: i18n.dir() == "rtl" ? "right" : "left",
                "& 	.MuiOutlinedInput-notchedOutline": {
                  textAlign: i18n.dir() == "rtl" ? "right" : "left",
                },
                "& 	.MuiInputLabel-root": {
                  fontSize: 12,
                  left: i18n.dir() == "rtl" ? "inherit" : "0",
                  right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                  transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
                }
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
            <div className="d-flex my-4">
              <button
                className="custom-primary-btn cancel-custom-btn"
                onClick={() => {
                  if (acronym && companyName && name && email && phoneNumber) {
                    handleSubmit();
                  } else {
                    toast.info("Please fill all fields");
                  }
                }}
              >
                {t('cancel')}
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
                {t('create')}
              </button>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default AddContractor;
