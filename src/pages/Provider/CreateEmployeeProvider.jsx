import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import personPng from "../../assets/images/person.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { useDispatch, useSelector } from "react-redux";



import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { CheckProviderPreUser } from "../../reduxToolkit/Providers/providersApi";
import ChangeImageModal from "./Modal/ChangeImageModal";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const CreateEmployeeProvider = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [ProfileImage, setProfileImage] = useState("");
  const [file, setFile] = useState("")
  // useSelector
  const { getGnderListProvider } = useSelector(state => state.EmployeeProviderSlice);
  console.log(getGnderListProvider);
  console.log(file);
  // function
  const resetFrom = () => {
    setName("");
    setEmail("");
    setPhone("");
    setGender("");
    setProfileImage("");
    setFile("");
  }
  const handelCreateProviderEmployee = () => {
    const data = {
      name,
      email,
      phone,
      gender: {
        id: gender
      },
      file
    }

    console.log(data)
    dispatch(CheckProviderPreUser(data))
    resetFrom()
  }
  return (
    <>
      <div className="head">
        <div className="headLeft">
          <h2>
            <Link to="/dashboard/provider/employees">
              <ArrowBackIcon
                style={{
                  color: "#146F62",
                  fontSize: "30px",
                  marginRight: "30px",
                  transform: lCode === "ar" ? "scaleX(-1)" : "",
                  margin: "0 10px"
                }}
              />
            </Link>
            {t("create_employee")}
            {/* {employeeDetails && "Employee PROVIDER Detail"} */}
            {/* {approveDocument && "APPROVE DOCUMENTS"} */}
          </h2>


        </div>
      </div>
      <div className="row create_employee">

        <div className="col-md-4 __userData">

          <img src={ProfileImage ? ProfileImage : personPng} className="__userImage" />
          <div className="user_upload"
            data-toggle="modal"
            data-target="#profileImageChange"
          >
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
          </div>

          <div className="__form_create_provider_employee">
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ position: "relative" }}>
                <TextField size="small"

                  fullWidth


                  label={t("name")}
                  id="NAME"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputLabelProps={{
                    style: {
                      fontSize: "10px",
                      fontWeight: 600,
                      background: "#ffffff",
                      padding: "0px 8px 0px 8px",
                    },
                  }} // font size of input label
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
              </Grid>
              <Grid item xs={12} sx={{ position: "relative", marginTop: '1rem' }}>
                <TextField size="small"

                  fullWidth

                  label={t("email")}
                  id="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputLabelProps={{
                    style: {
                      fontSize: "10px",
                      fontWeight: 600,
                      background: "#ffffff",
                      padding: "0px 8px 0px 8px",
                    },
                  }} // font size of input label
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
                <span className="input-icons">
                  <MailOutlineIcon />
                </span>
              </Grid>
              <Grid item xs={12} sx={{ position: "relative", marginTop: '1rem' }}>
                <TextField size="small"

                  fullWidth


                  label={t("phone_number")}
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  InputLabelProps={{
                    style: {
                      fontSize: "10px",
                      fontWeight: 600,
                      background: "#ffffff",
                      padding: "0px 8px 0px 8px",
                    },
                  }} // font size of input label
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
                <span className="input-icons">
                  <PhoneIphoneIcon />
                </span>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: '1rem' }}>
                <Box sx={{ mt: "6px" }} >
                  <FormControl fullWidth sx={{
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
                  }}>

                    <InputLabel id="demo-simple-select-label" >{t("gender")}</InputLabel >
                    <Select size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue="employe"
                      label={t("gender")}
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}

                      sx={{
                        fontSize: "10px",
                        padding: "3px 3px 3px 10px",
                      }}
                    >
                      {
                        getGnderListProvider.map((item, index) => {
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
          </div>
        </div>

        <div className="create_employee_btn">
          <button
            onClick={() => {
              handelCreateProviderEmployee();
            }}
          >
            {t("create_employee")}<span> <i class="fa fa-floppy-o" aria-hidden="true"></i></span>
          </button>
        </div>
      </div>

      <ChangeImageModal setProfileImage={setProfileImage} setFile={setFile} />

    </>
  );
};

export default CreateEmployeeProvider;
