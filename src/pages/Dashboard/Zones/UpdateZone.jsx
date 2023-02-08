import React, { useEffect, useState } from "react";
import saveregular from "../../../assets/images/save-regular.svg";
// Material ui
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
import TimePicker from "@mui/lab/TimePicker";

import { useSelector } from "react-redux";
import { CreateCommonAreaZone, GetListStatusZone, GetListZoneMap, UpdateCommonAreaZone, UpdateZone } from "../../../reduxToolkit/EmployeeZones/EmployeeZonesApi";
import { useDispatch } from "react-redux";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

const AddRoomUpdateData = (props) => {
  // translation
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  // use hook importer
  const dispatch = useDispatch()
  const navigate = useNavigate();

  // use State hook for local state management
  const [name, setName] = useState("");
  const [isStatus, setIsStatus] = useState("");
  const [formDate, setFormDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isCommonArea, setIsCommonArea] = useState(false);

  //use Selector hook to get state for redux store
  const { zoneDetailFatherAndChild } = useSelector(state => state.EmployeeZonesSlice)
  const { getListStatusZone } = useSelector(state => state.EmployeeZonesSlice)



  const accessType = [
    {
      value: '1',
      label: 'Arman'
    },
    {
      value: '2',
      label: 'ALI'
    }
  ]

  // update zone funtion
  const updateZoneHandler = () => {
    const updateZoneFormData = {
      name,
      id: zoneDetailFatherAndChild?.id,
      status: {
        id: isStatus
      },
    }
    const commonAreaZoneFormData = {
      id: zoneDetailFatherAndChild?.commonArea?.id,
      zone: {
        id: zoneDetailFatherAndChild?.id
      },
      fromTime: formDate && formDate?.getHours() + ':' + formDate?.getMinutes() + ':' + formDate?.getSeconds(),
      toTime: toDate && toDate?.getHours() + ':' + toDate?.getMinutes() + ':' + toDate?.getSeconds(),
    }

    if (zoneDetailFatherAndChild?.commonArea == null && isCommonArea) {
      dispatch(CreateCommonAreaZone(commonAreaZoneFormData))
    }
    else {
      dispatch(UpdateCommonAreaZone(commonAreaZoneFormData))
    }

    // console.log(commonAreaZoneFormData)
    // console.log(updateZoneFormData)
    dispatch(UpdateZone({ updateZoneFormData, navigate }))

  }

  // useeffect to get zone list status
  useEffect(() => {
    dispatch(GetListStatusZone())

  }, [])

  // useEffect to set update zone field data
  useEffect(() => {
    setName(zoneDetailFatherAndChild?.name || "")
    setIsStatus(zoneDetailFatherAndChild?.status?.id || "")
    setFormDate(new Date(`2014-08-18T${zoneDetailFatherAndChild?.commonArea?.fromTime}`) || "")
    setToDate(new Date(`2014-08-18T${zoneDetailFatherAndChild?.commonArea?.toTime}`) || "")
    // setIsCommonArea(true)
  }, [])

  return (
    <div>

      {/* update Zone Section header  Start*/}
      <div className="update_zone_header">
        <div className="update_zone_header_Left">
          <Link to="/dashboard/employee/zones/singlezonedetails">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </Link>
          <h2>{t("update_zone")}</h2>
        </div>
        <div className="update_zone_header_right">
          <Link to={""}

          >
            {/* <button
                className="btn btn-primary"
                onClick={() => { updateZoneHandler() }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2rem"
                }}
              >
                {t("update_zone")}
                <img
                  src={saveregular}
                  alt=""
                  style={{
                    margin: "0 5px"
                  }}
                />
              </button> */}
          </Link>
        </div>
      </div>
      {/* update Zone Section header End */}
      <div className="wrapper_update_zone">
        {/* Add Room And Update Data Main Section Start */}
        <div className="container-fluid" >
          <div className="zone_Data_info" >
            <div className="heading_zone">
              <h1>{t("data")}</h1>
              <div className="zline"></div>
            </div>

            <div className="form_data_zone_info">
              <Box
                sx={{
                  width: "342px",
                  maxWidth: "100%",
                  fontSize: "20px",
                  height: "50px",
                }}
              >
                <TextField
                  size="small"
                  fullWidth

                  label={t("zone_name")}
                  id="ZONE NAME"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
            </div>

            <div className="form_data_zone_select">
              {/*  <Select size="small" class="form-select" aria-label="Default select example">
                <option selected>status</option>
                <option value="1">active</option>
                <option value="2">vications</option>
                <option value="3">non active</option>
              </select> */}
              <Box sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "50px",

              }} >
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
                  <InputLabel id="demo-simple-select-label">
                    {t("status")}
                  </InputLabel>
                  <Select size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={t("status")}
                    value={isStatus}
                    onChange={(e) => setIsStatus(e.target.value)}
                  >
                    {
                      getListStatusZone?.map((item, index) => {
                        return (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        )
                      })

                    }

                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="bottom_line"></div>
          </div>
        </div>


        {/* common area section start */}
        <div className="mt-4" >
          <div className="common_area_zone_update">
            <h2>
              {t("common_area")}
            </h2>
            <div>
              <input type="checkbox"
                // checked={zoneDetailFatherAndChild?.commonArea == null ? true : false}
                value={isCommonArea}
                onChange={() => setIsCommonArea(!isCommonArea)}
              />
              <span>{" "} (Is common area)</span>

            </div>
            <div className="cline"></div>
          </div>
          <div className="common_area_zone_upadate_sub_section">
            <h4>{t("service_hours")}</h4>
            <div className="row mt-3">
              <div className="col-md-5">
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                  <TimePicker
                    renderInput={(props) => <TextField
                      size="small" {...props}
                      fullWidth
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
                      }} />}
                    ampm={false}
                    openTo="hours"
                    views={["hours", "minutes", "seconds"]}
                    inputFormat="HH:mm:ss"
                    mask="__:__:__"
                    label={t("from")}
                    disabled={!isCommonArea}
                    // defaultValue={zoneDetailFatherAndChild?.commonArea?.fromTime}
                    value={formDate}
                    onChange={(date) => setFormDate(date)}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-md-5">
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                  <TimePicker
                    renderInput={(props) => <TextField
                      size="small" {...props}
                      fullWidth
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
                    />}
                    ampm={false}
                    openTo="hours"
                    views={["hours", "minutes", "seconds"]}
                    inputFormat="HH:mm:ss"
                    mask="__:__:__"
                    label={t("to")}
                    disabled={!isCommonArea}
                    value={toDate}
                    onChange={(date) => setToDate(date)}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>
        <div
          className="update_zone_btn"
        >
          <button
            className="custom_primary_btn_dark"
            onClick={() => { updateZoneHandler() }}
            style={{

              width: "331px",

            }}
          >
            {t("update_zone")}
            <img
              src={saveregular}
              alt=""

            />
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddRoomUpdateData;
