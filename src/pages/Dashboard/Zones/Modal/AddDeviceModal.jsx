import React, { useState } from "react";
import { Box } from "@mui/material";
import { Modal } from "react-bootstrap";
import cancel from '../../../../assets/images/ic-cancel.svg'
import { Link } from "react-router-dom";
import { permissionObj } from "../../../../Helpers/permission";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllDevicesZoneNull, AddFreeDevice } from "../../../../reduxToolkit/Devices/DevicesApi";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

const AddDeviceModal = (props) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  // use hook importer
  const dispatch = useDispatch()

  // destructure from prop
  const { title, check, item, freeadded, setfreeadded, added, flag } = props;

  //use Selector hook to get state for redux store
  const { getAllDevicesZoneNull } = useSelector(state => state.DevicesSlice)

  //use Selector hook to get state for redux store
  const { permission } = useSelector(state => state.authenticatioauthennSlice);

  //use State hook for local state management
  const [freeDevice, setFreeDevice] = useState("");

  // This section is in charge of update the current zone to a device with zone null
  const handleAddFreeDevice = () => {
    const params = {
      id: freeDevice,
      zoneId: item?.id
    }
    dispatch(AddFreeDevice(params)).then(({ payload: { data: { data, success } } }) => {
      if (success === true) {
        setFreeDevice("") 
        props.onAdded()
      }
      {
        success === true ? toast.success(t('device_added_successfully_to_zone')) : toast.error(t('fail_adding_device_to_zone'))
      }
    })
    setFreeDevice("")
    props.onAdded()
    props.onHide()
    
  }


// useEffect lifeCyle for dispatch list of device with zone null
useEffect(() => {
  dispatch(GetAllDevicesZoneNull());
}, [added, flag]);

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
    className="add_device_modal"
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter" style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '1.5rem', letterSpacing: '0.3rem', textAlign: 'center', width: '100%' }}>
        {title}
      </Modal.Title>
      <img onClick={() => {
        props.onHide();
      }} src={cancel} alt="cancel" style={{ paddingTop: "12px", cursor: "pointer" }} />
    </Modal.Header>
    <Modal.Body>
      <div>
        <div className="mt-3">
          <Box sx={{
            width: "100%",
            maxWidth: "100%",
            fontSize: "20px",
            height: "50px",

          }} >
            <FormControl fullWidth
              sx={textField}>
              <InputLabel id="demo-simple-select-label" className="select_input_field">
                {t("select_one_available")}
              </InputLabel>
              <Select size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={t("select_one_available")}
                value={freeDevice}
                onChange={(e) => setFreeDevice(e.target.value)}
              >
                {
                  getAllDevicesZoneNull?.map((item, index) => {
                    return (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Box>
          {
            permission?.includes(permissionObj?.WEB_DEVICE_CREATE) &&
            <Link
              to="/dashboard/employee/zones/create-device"
              state={{ zoneNameProps: item?.name }}
              className="device_button"
            >
              {t("or_add_a_new_one")} +
            </Link>
          }
          <Box sx={{ display: 'flex', gap: '0.4rem', marginTop: '1rem' }}>
            <button className="cancelBtn" onClick={() => props.onHide()}>{t("cancel").toUpperCase()}</button>
            <button className="addBtn" disabled={freeDevice === ""} onClick={() => { handleAddFreeDevice() }}>{t("add")}</button>
          </Box>
        </div>
      </div>
    </Modal.Body>
  </Modal>
);
};

export default AddDeviceModal;