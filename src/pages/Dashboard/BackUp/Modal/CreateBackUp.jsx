/*
Author: Mazhar Iqbal
Module: Create DataBase Backup     
*/

//Create DataBase Backup
import { t } from "i18next";
import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CreateDataBaseBackUp } from "../../../../reduxToolkit/CompanyBackup/BackUpApi";

const CreateBackUp = (props) => {
  const inputRef = useRef(null);

  // use hook importer
  const dispatch = useDispatch();

  //Create DataBase Backup function
  const handleSubmit = () => {
    if (inputRef.current.value !== '') {
      dispatch(CreateDataBaseBackUp(inputRef.current.value))
      props.onHide()
    } else {
      toast.info("Fill Field")
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
      <span className="main-modal-heading">{t("create_backup")}</span>
      <div className="unlink-modal-body">
        <span
          className="modal-desc-text mt-2 mb-4 px-3"
          style={{ color: "#000", fontSize: "14px", fontWeight: 400, textAlign: "center" }}
        >
          {t("backup_complete_text")}
        </span>
        <div className="mt-3" style={{ position: "relative" }}>
          <label className="rejection-note-label">{t("name")}</label>
          <input
            style={{
              height: "45px",
              borderRadius: "4px", paddingLeft: "14px"
            }}
            ref={inputRef}
            type="tex"

            id="message"
            name="message"
            className="rejection-note-field w-100"
          />
        </div>
        <div className="btn-div mt-4">
          <button
            className="button-sec btn-cancel"
            style={{ color: "red" }}
            onClick={props.onHide}
          >
            {t("cancel")}
          </button>
          <button
            className="button-sec btn-confirm"
            onClick={() => { handleSubmit() }}
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateBackUp;
