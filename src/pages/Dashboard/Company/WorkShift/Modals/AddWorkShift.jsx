/*
Author: Mazhar Iqbal
Module: Work Shift Panel      
*/

//Add Work Shift
import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CreateCompanyWorkShift, GetAllWorkShifts, UpdateWorkShiftName } from "../../../../../reduxToolkit/CompanyWorkShift/CompanyWorkShiftApi";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { useState } from "react";
import { useEffect } from "react";
import { TextField } from "@mui/material";
import ReusableTextField from "../../../../../components/ReusableTextField ";


const AddWorkShift = (props) => {
  console.log(props?.data)
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const [workshiftName, setWorkShiftName] = useState("")
  const [nameError, setNameError] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false);

  const textField = {
    textAlign: lCode === "ar" ? "right" : "left",
    "& 	.MuiOutlinedInput-notchedOutline": {
      textAlign: lCode === "ar" ? "right" : "left",
    },
    "& 	.MuiInputLabel-root": {
      fontSize: 12,
      marginTop: '2px',
      alignItems: 'center',
      display: 'flex',
      left: lCode === "ar" ? "inherit" : "0",
      right: lCode === "ar" ? "1.75rem" : "0",
      transformOrigin: lCode === "ar" ? "right" : "left",
      zIndex: 0,
    },
    "& 	.MuiFormLabel-filled": {
      marginTop: '-5px',
    },
  }

  // use hook importer
  const dispatch = useDispatch();

  //  
  const handleNameChange = (value) => {
    // Perform validation logic
    if (value === '' ) {
      setNameError('name cannot be empty');
    } else {
      setNameError('');
    }

    setWorkShiftName(value);
  };

  // create work shift
  const handleSubmit = () => {
    if (props?.isUpdate) {
      const payload = {
        id: props?.data?.id,
        name: workshiftName
      }
      if (workshiftName) {

        dispatch(UpdateWorkShiftName(payload)).then(res => {
          console.log(res)
          if (res.payload?.data?.code === 200) {
            props.onHide()
            setWorkShiftName("")
            toast.success("Successfuly Updated")
          }
        })
      } else {
        setSubmitClicked(true)
        // toast.info("Please Change Sift Name")
      }


    } else {
      if (workshiftName) {
        dispatch(CreateCompanyWorkShift(workshiftName))
          .then(() => {
            props.onHide()
            setWorkShiftName("")
          })
      } else {
        setSubmitClicked(true)
        // toast.info("Please Add Sift Name")
      }
    }

  }


  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <button onClick={ () => {props.onHide(); setSubmitClicked(false)}} className="modal-close-btn">
        X
      </button>
      <span className="main-modal-heading">{props?.isUpdate ? t("change_name") : t('add_new_work_shift')}</span>
      <div className="unlink-modal-body">

        {
          props.isUpdate ?
            <span
              className="modal-desc-text"
              style={{ color: "#707070", fontSize: "12px", fontWeight: "normal", textAlign: "left" }}
            >
              Enter the new name for the work shift: <span style={{ fontWeight: "bold" }}>{props?.data?.name}</span>

            </span> :

            <span
              className="modal-desc-text"
              style={{ color: "#707070", fontSize: "12px", fontWeight: 400, textAlign: "left" }}
            >
              Enter the name of work shift

            </span>
        }
        <div className="mt-2" style={{ position: "relative" }}>

          {/* <TextField size="small"
            // error={formSubmitted && !deviceName === ''}
            fullWidth
            required
            label={t("work_shift_panel")}
            id="ID"
            value={workshiftName}
            onChange={(e) => setWorkShiftName(e.target.value)}
            // helperText={
            //     formSubmitted && deviceName === '' ? t('requiredField') : ''
            // }
            sx={textField}
          /> */}

          <ReusableTextField
            label={t("name")}
            onChange={handleNameChange}
            value={workshiftName}
            helperText={nameError}
            isRequired={true}
            submitClicked={submitClicked}
            validate={(value) => value === ''}
          />
          
        </div>
        <div className="btn-div">
          <button
            className="custom_btn_cancel_gray_hover"
            style={{ width: '100%' }}
            
            onClick={ () => {props.onHide(); setSubmitClicked(false)}} 
          >
            {t('cancel')}
          </button>
          <button
            className="custom_primary_btn_dark"
            style={{ width: '100%' }}
            onClick={() => { handleSubmit() }}
          >
            {props?.isUpdate ? t("update").toUpperCase() : t('create')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddWorkShift;
