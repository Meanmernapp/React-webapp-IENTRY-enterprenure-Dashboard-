import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import cancel from '../../../../../assets/images/ic-cancel.svg'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { DeleteVehicleImage, RemoveDriverEmployee } from "../../../../../reduxToolkit/Vehicle/VehicleApi";


const RemoveDriver = (props) => {

  
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    const {title_modal, modal_name,data}= props

    // tittle_modal is the heading name
    // modal_name is the condition for different calling

    

  
    // delete handler function
    const handleDelete = () => {
        if(modal_name === "delete_image"){
            const payload ={
                id:data?.id,
                option:"vehicle"
            }
            dispatch(DeleteVehicleImage(payload))
            props.onHide()
            
        }
        if(modal_name === "remove_driver"){

            dispatch(RemoveDriverEmployee(data?.id))
            props.onHide()
        }

        
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
                {t(title_modal)}
                </Modal.Title>
                <img onClick={() => props.onHide()} className="modalClose" src={cancel} alt="" />
            </Modal.Header>
            <Modal.Body className="department_modal_body">
                {
                    modal_name === "delete_image" &&
                    <p className="paragraph_deps">
                        Please. confirm the action to delete the image that belong to this vehicule.
                    </p>
                }
             {
                 modal_name === "remove_driver" &&
                    <p className="paragraph_deps">
                       
                    Please. confirm the action to remove the driver <span>{data?.name}</span> that belong to this card.
                        </p>
             }
                

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

export default RemoveDriver