/*
Author: Mazhar Iqbal
Module: Work Shift Panel      
*/

//Add Work Shift
import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CreateCompanyWorkShift, GetAllWorkShifts } from "../../../../../reduxToolkit/CompanyWorkShift/CompanyWorkShiftApi";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'


const AddWorkShift = (props) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const inputRef = useRef(null);

  // use hook importer
  const dispatch = useDispatch();

  // create work shift
  const handleSubmit = () => {
    if (inputRef.current.value !== '') {
      dispatch(CreateCompanyWorkShift(inputRef.current.value)).then(() => {
        const pagination = {
          "order": true,
          "page": 1,
          "size": 8,
          "sortBy": "id"
        }
        // get work shift list
        dispatch(GetAllWorkShifts(pagination));
        props.onHide()
      })
    } else {
      toast.info("Please Add Sift Name")
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
      <button onClick={props.onHide} className="modal-close-btn">
        X
      </button>
      <span className="main-modal-heading">{t('add_new_work_shift')}</span>
      <div className="unlink-modal-body">
        <span
          className="modal-desc-text"
          style={{ color: "#000", fontSize: "14px", fontWeight: 400, textAlign: "left" }}
        >
          Enter the name of work shift
        </span>
        <div className="mt-3" style={{ position: "relative" }}>
          <label className="rejection-note-label">{t('work_shift_panel')}</label>
          <input
            style={{
              height: "45px",
              borderRadius: "12px", paddingLeft: "14px"
            }}
            ref={inputRef}
            type="tex"
            id="message"
            name="message"
            className="rejection-note-field w-100"
          />
        </div>
        <div className="btn-div">
          <button
            className="button-sec btn-cancel"
            style={{ color: "red" }}
            onClick={props.onHide}
          >
            {t('cancel')}
          </button>
          <button
            className="button-sec btn-confirm"
            onClick={() => { handleSubmit() }}
          >
            {t('create')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddWorkShift;
