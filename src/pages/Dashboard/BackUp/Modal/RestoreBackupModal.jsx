/*
Author: Mazhar Iqbal
Module: Create DataBase Backup     
*/

//Restore Full DataBase
import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fullDBRestore } from "../../../../reduxToolkit/CompanyBackup/BackUpApi";
import { restoreData } from "../../../../reduxToolkit/CompanyBackup/backUpSlice";
import { t } from "i18next";
import securekey from "../../../../config";
import cryptoJs from 'crypto-js';

const RestoreBackupModal = (props) => {

  const file = useSelector(restoreData)
  // use hook importer
  const dispatch = useDispatch();

  //bearer token


  const token = sessionStorage.getItem('bearerToken');
  const bytes = cryptoJs.AES.decrypt(token, securekey)
  const bearerToken = bytes.toString(cryptoJs.enc.Utf8);

  // Restore Full DataBase function
  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('file', file);
    dispatch(fullDBRestore(formData))
    // for (const value of formData.values()) {
    //   console.log(value);
    // }
    // await axios.get(
    //   `http://38.65.139.14:8080/corporate-user-pre-prod-v1/assets-service/database-restore`,formData,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer " + bearerToken,
    //       "Content-Type": "multipart/form-data",
    //     }
    //   }
    // ).then((response)=> {
    //   console.log("this is reponse",response)
    //   props.onHide()
    // })
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
      <span className="main-modal-heading">{t("restore_backup")}</span>
      <div className="unlink-modal-body">
        <span
          className="modal-desc-text my-4  px-3"
          style={{ color: "#000", fontSize: "16px", fontWeight: 400, textAlign: "center" }}
        >
          {t("restore_full_backup_text")}
        </span>
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
            onClick={() => handleSubmit()}
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </Modal>
  );
};



export default RestoreBackupModal