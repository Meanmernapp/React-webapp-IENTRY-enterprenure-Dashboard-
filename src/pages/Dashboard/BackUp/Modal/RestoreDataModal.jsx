/*
Author: Mazhar Iqbal
Module: Create DataBase Backup     
*/

//Restore Data Only
import { t } from "i18next";
import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetInformationById } from "../../../../reduxToolkit/CompanyBackup/BackUpApi";
import { fileDetail } from "../../../../reduxToolkit/CompanyBackup/backUpSlice";

const RestoreDataModal = (props) => {
  const singleFileDetail = useSelector(fileDetail)
  console.log("data recived", singleFileDetail)

  // use hook importer
  const dispatch = useDispatch();

  // Restore Data only function
  const handleSubmit = () => {
    dispatch(GetInformationById(singleFileDetail))
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ background: "rgba(0,0,0,0.5)", margin: "auto", justifyContent: "center" }}
    >
      <button onClick={props.onHide} className="modal-close-btn">
        X
      </button>
      <span className="main-modal-heading">{t("restore_data")}</span>
      <div className="unlink-modal-body">
        <span
          className="modal-desc-text my-4  px-3"
          style={{ color: "#000", fontSize: "14px", fontWeight: 400, textAlign: "center" }}
        >
          {t("you_will_restore")} <b>{singleFileDetail?.id}</b> {t("items_from_model")} <b>{singleFileDetail?.table?.replaceAll("_", " ")}</b>, {t("to_restore_data_confirm_option")}
        </span>
        <div className="btn-div mt-4">
          <button
            className="button-sec btn-cancel"
            style={{ color: "red" }}
            onClick={props.onHide}
          >
            {("cancel")}
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

export default RestoreDataModal;
