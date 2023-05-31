import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import cancel from '../../assets/images/ic-cancel.svg'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { toast } from "react-toastify";
import { TABLES } from "../../Apis/Tables";
import { DeleteItemsApi } from "../../reduxToolkit/Commons/CommonsApi";


const DeleteModal = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    const tableName = props.delete_table

    const uuids = props.data

    console.log('uuids')
    console.log(uuids)

    const handleDelete = () => {
        const body = uuids

        //This section is in charge of delete the respectively items
        dispatch(DeleteItemsApi({ tableName, body})).then(({ payload: { data: { data, success } } }) => {
            props.onHide()
            {
                success === true && props.onDelete()
            }
            switch (tableName) {
                case `${TABLES.DEVICES}`:
                  return success === true ? toast.success(t('device_deleted_success')) : toast.error(t('something_went_wrong'));
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
                    {t(props.title_modal)}
                </Modal.Title>
                <img onClick={() => props.onHide()} className="modalClose" src={cancel} alt="" />
            </Modal.Header>
            <Modal.Body className="department_modal_body">

                <p className="paragraph_deps">

                    {t("are_you_sure_you_want_to_delete")}  <span>{props?.data?.length}</span>  <span>  {t(props.element_modal)}</span>?</p>
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

export default DeleteModal