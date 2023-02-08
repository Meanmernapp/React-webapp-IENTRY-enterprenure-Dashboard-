import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import cancel from '../../../../assets/images/ic-cancel.svg'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateChildZone, CreateFatherZone, GetListStatusZone } from "../../../../reduxToolkit/EmployeeZones/EmployeeZonesApi";
import ZoneLeaflet from "../../../../components/ZoneLeaflet";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

const AddZoneModal = (props) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  // use hook importer
  const dispatch = useDispatch()

  // destructure from prop
  const { title, check, isFatherZone } = props;

  //use Selector hook to get state for redux store
  const { getListStatusZone } = useSelector(state => state.EmployeeZonesSlice)
  // const { latLngObj } = useSelector((state) => state.UpdateCompanySlice);

  //use State hook for local state management
  const [name, setName] = useState("");
  const [isStatus, setIsStatus] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const reset = () => {
    setIsStatus("")
    setLatitude("")
    setName("")
    setLongitude("")
  }
  const data = {
    name,
    isStatus,
    latitude,
    longitude
  }
  console.log(data)
  // a function to handel payload and dispatch api end function
  const handelCreateZone = () => {
    // payload for father zone data
    const createFatherZoneFormData = {
      name,
      status: {
        id: isStatus
      },
      latitud: Number(latitude),
      longitud: Number(longitude),
    }
    // payload for chilid zone data
    const createChildZoneFormData = {
      father: {
        id: isFatherZone?.id
      },
      name,
      status: {
        id: isStatus
      },
      latitud: Number(latitude),
      longitud: Number(longitude),
    }



    // condition to check  father zone or child zone
    if (check === 'true') {
      if (name === "" || isStatus === "" || latitude === "" || longitude === "") {

        toast.warn("Please Enter All The Fields")
      } else {
        dispatch(CreateChildZone(createChildZoneFormData))
        reset()
        props.onHide()
      }


    } else {
      if (name === "" || isStatus === "" || latitude === "" || longitude === "") {

        toast.warn("Please Enter All The Fields")
      }
      else {
        dispatch(CreateFatherZone(createFatherZoneFormData))
        reset()
        props.onHide()
      }
    }



  }

  // useEffect lifeCyle for dispatch list of status zone
  useEffect(() => {
    dispatch(GetListStatusZone());
  }, []);

  const textField = {
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
  }

  // return main page modal 
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="add_zone_modal"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '0.5rem', letterSpacing: '0.3rem' }}>
          {title}
        </Modal.Title>
        <img onClick={() => {
          props.onHide();
          reset()
        }} src={cancel} alt="cancel" style={{ paddingTop: "12px", cursor: "pointer" }} />
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6 mt-3">
            {
              check === "true" ?
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    fontSize: "20px",
                    height: "50px",
                  }}
                >
                  <TextField size="small"
                    fullWidth

                    label={t("father_zone")}
                    id="FATHER ZONE*"
                    value={isFatherZone?.name}
                    // onChange={(e) => setFatherZone(e.target.value)}
                    disabled
                    sx={textField}
                  />
                </Box> : ""
            }
            <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "50px",
              }}
            >
              <TextField size="small"
                fullWidth

                label={t("name")}
                id="NAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={textField}
              />
            </Box>

            <Box sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "50px",

            }} >
              <FormControl fullWidth
                sx={textField}>
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
            <div className="row">
              <div className="col-md-6">
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    fontSize: "20px",
                    height: "50px",
                  }}
                >
                  <TextField size="small"
                    fullWidth

                    label={t("latitude")}
                    id="LATITUDE"
                    disabled
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    sx={textField}
                  />
                </Box>
              </div>
              <div className="col-md-6">
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    fontSize: "20px",
                    height: "50px",
                  }}
                >
                  <TextField size="small"
                    fullWidth

                    label={t("longitude")}
                    id="LONGTITID"
                    disabled
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    sx={textField}
                  />
                </Box>
              </div>
            </div>
            <Box sx={{ display: 'flex', gap: '0.4rem' }}>
              <button className="cancelBtn" onClick={() => props.onHide()}>{t("cancel")}</button>
              <button className="addBtn" onClick={() => { handelCreateZone() }}>{t("create")}</button>
            </Box>
          </div>
          <div className="col-md-6 text-center">
            <ZoneLeaflet
              // latlng={[latLngObj.lat, latLngObj.lng]}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              latlng={[11.96, 24.92]}

            />
            <p className="seeLocation">{t("click_location_in_the_map")}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddZoneModal;
