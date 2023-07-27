import { useDispatch } from "react-redux";
import { DeleteimgZonePlane } from "../../../../reduxToolkit/EmployeeZones/EmployeeZonesApi";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import cancel from '../../../../assets/images/ic-cancel.svg'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'

const RemovePlanModal = (props) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const dispatch = useDispatch()
  return (
  
    <Modal
      className="department_and_user_delete-modal"
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {t(props.title_modal)}
        </Modal.Title>
        <img onClick={() => props.onHide()} className="modalClose" src={cancel} alt="" />
      </Modal.Header>
      <Modal.Body className="removePlanModal">
            <div
              className="row zoneCardMoadlBody"
            >
              <h1>
                <b>{t("remove_plane")}</b>
              </h1>
              <br />
              <h4 className="mt-3">{t("remove_confirmation_msg")}</h4>
              <div className="mt-3 col-md-10 cardModalFooter">
                <button className="custom_btn_cancel_gray_hover" style={{width:'100%'}} onClick={()=>props.onHide()}>
                  {t("cancel")}
                </button>
                <button className="custom_primary_btn_dark" style={{width:'100%'}}
                  onClick={() => {
                    const data = {
                      id: props.id,
                    }
                    dispatch(DeleteimgZonePlane(data))
                    props.onHide()
                  }}
                  data-dismiss="modal"
                >
                  {t("confirm")}
                </button>
              </div>
            </div> 
      </Modal.Body>

    </Modal>
  );
};

export default RemovePlanModal;
