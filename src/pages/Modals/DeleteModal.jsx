/*
Author : Arman Ali
Module: Delete Records (resueable component)
github: https://github.com/Arman-Arzoo
website: https://www.toplinegeeks.com
*/
import React from "react";
import { Modal } from "react-bootstrap";
import cancel from '../../assets/images/ic-cancel.svg'
import { useTranslation } from 'react-i18next'

const DeleteModal = (props) => {

    const { t } = useTranslation();
    //  funtion to call delete api
    const handleDelete = (e) => {
        props?.onClickFn(e)
        props?.onHide()
        props?.isReset([])
        props?.isAllReset(false)
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
                <img onClick={() => {
                    props.onHide();
                    props?.isReset([]);
                    props?.isAllReset(false)
                }} className="modalClose" src={cancel} alt="" />
            </Modal.Header>
            <Modal.Body className="department_modal_body">

                <p className="paragraph_deps">

                    {props?.description ? t(`${props?.description}`) : t("are_you_sure_you_want_to_delete")}  <span>{props?.data?.length}</span>  <span>  {t(props.element_modal)}</span>?</p>
                <div className="d-flex">
                    <button className="custom_btn_cancel_gray_hover"
                        style={{ width: '180px' }}
                        onClick={() => { props.onHide() ; 
                            props?.isReset([]);
                            props?.isAllReset(false)
                            }}>
                        {t("cancel")}
                    </button>
                    <button className="custom_primary_btn_dark"
                        style={{ width: '180px' }}
                        onClick={() => handleDelete()}
                    >
                        {t("confirm")}
                    </button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default DeleteModal