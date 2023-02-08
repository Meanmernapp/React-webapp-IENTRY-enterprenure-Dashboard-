

import React from "react";
import cancel from '../../../../../assets/images/ic-cancel.svg';
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { qrCodeByEmail, unlinkDevice } from "../../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesApi";

const UpdateCodeAndDeviceModal = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { dataobj } = props;

    const handleChange = () => {
        if (dataobj?.option === true) {
            dispatch(qrCodeByEmail(id));
            props.onHide();
        } else {
            dispatch(unlinkDevice(id));
            props.onHide();
        }
    }


    return (
        <Modal
            className="filter_Event_model"
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='fiter_event_model_head'>
                <Modal.Title
                    style={{
                        width: "100%",
                        color: '#146F62',
                        fontSize: "20px",
                        fontWeight: "600",
                        textAlign: "center",
                        marginTop: "10px"
                    }}
                >
                    {dataobj?.title}
                </Modal.Title>
                <img
                    src={cancel}
                    style={{
                        position: "absolute",
                        padding: "1px",
                        right: "3px",
                        width: "15px",
                        height: "15px",
                        top: "3px",
                        cursor: "pointer",
                    }}
                    onClick={() => props.onHide()}
                />
            </Modal.Header>
            <Modal.Body>
                <p style={{ fontSize: '12px', textAlign: 'center' }}>
                    {dataobj?.desc}
                </p>
                <div className="changeImgBottomDiv">
                    <button
                        className="changeImgCancelBtn"
                        onClick={() => props.onHide()}
                    >
                        CANCEL
                    </button>
                    <button
                        className="changeImgChangeBtn"
                        onClick={handleChange}
                    >
                        CHANGE
                    </button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default UpdateCodeAndDeviceModal;