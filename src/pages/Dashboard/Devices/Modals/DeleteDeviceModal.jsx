import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import cancel from '../../../../assets/images/ic-cancel.svg'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { DeleteDevicesApi } from "../../../../reduxToolkit/Devices/DevicesApi";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const DeleteDeviceModal = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const navigate = useNavigate();

    const uuid = props?.data?.id

    // delete handler function
    const handleDelete = () => {
        const body = [uuid]
        dispatch(DeleteDevicesApi(body)).then(({ payload: { data: { data, success } } }) => {
            props.onHide()
            // if (data){
            //     props.onDelete()
            // }
            {
                success === true && props.onDelete()
            }
            {
                success === true ? toast.success(t('deviceDeletedSuccess')) : toast.error(t('somethingWentWrong'))
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
                <Modal.Title
                    className='title_name'
                >
                    {t('remove_device')}
                </Modal.Title>
                <img onClick={() => props.onHide()} className="modalClose" src={cancel} alt="" />
            </Modal.Header>
            <Modal.Body className="department_modal_body">

                <p className="paragraph_deps">

                    {t('If_you_want_to_remove_the_device_')} <span>  {props?.data?.name}</span> {t('_please_confirm_the_action_')}
                     {/* <span>{props?.data?.length}</span>  <span>  {t('employees')}</span>? */}
                     </p>


                <div className="d-flex">
                    <button className="custom_btn_cancel_gray_hover"
                        style={{ width: '180px' }}
                        onClick={() => props.onHide()}>{t("cancel")}</button>
                    <button className="custom_primary_btn_dark"
                        style={{ width: '180px' }}
                        onClick={handleDelete}
                    >
                        {t("confirm")}
                    </button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default DeleteDeviceModal