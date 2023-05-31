import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import cancel from '../../assets/images/ic-cancel.svg'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { RemoveDevicesZone } from "../../reduxToolkit/Devices/DevicesApi";
import { toast } from "react-toastify";


const RemoveModal = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    const uuids = props.data

    // This section is in charge of remove the respectively items
    const handleDelete = () => {
        const body = uuids

        let apiFunction;

        switch (props.element_modal) {
            case 'device_s':
                apiFunction = RemoveDevicesZone
        }  
        dispatch(apiFunction(body)).then(({ payload: { data: { data, success } } }) => {
            props.onHide()
            {
                success === true && props.onDelete()
            }
            {
                success === true ? toast.success(t('device_removed_success')) : toast.error(t('something_went_wrong'))
            }
        })
    }
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
                    {t(props.title_modal_remove)}
                </Modal.Title>
                <img onClick={() => props.onHide()} className="modalClose" src={cancel} alt="" />
            </Modal.Header>
            <Modal.Body className="department_modal_body">
                <p className="paragraph_deps">
                    {t("are_you_sure_you_want_to_remove")}  <span>{props?.data?.length}</span>  <span>  {t(props.element_modal)}</span>?</p>
                <div className="d-flex">
                    <button className="custom_btn_cancel_gray_hover"
                        style={{ width: '180px' }}
                        onClick={() => props.onHide()}>{t("cancel")}</button>
                    <button className="custom_primary_btn_dark"
                        style={{ width: '180px' }}
                        onClick={handleDelete}
                    >
                        {t("CONFIRM")}
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default RemoveModal