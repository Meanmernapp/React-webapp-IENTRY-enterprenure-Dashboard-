import React from 'react'
import { Modal } from "react-bootstrap";
import cancel from '../../../assets/images/ic-cancel.svg';
import { useDispatch } from 'react-redux';
import { cancelEvent, getEventDetail, GetIncomingEventsPageable, GetValidationEventsPageable } from '../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'

const CancelEventModal = (props) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    const { id } = useParams();
    var today = new Date();
    let time_in_miliseconds = today.getTime();

    const handleCancel = () => {
        dispatch(cancelEvent(props?.eventid)).then(() => {

            const body = {
                date: time_in_miliseconds,
                pagination: {
                    "order": true,
                    "page": 0,
                    "size": 10,
                    "sortBy": "id"
                }
            }
            dispatch(GetValidationEventsPageable(body));
            dispatch(GetIncomingEventsPageable(body));
            dispatch(getEventDetail(id));
            props.onHide();
        })

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
                        fontSize: "16px",
                        fontWeight: "600",
                        textAlign: "center",
                        marginTop: "10px"
                    }}
                >
                    {t('cancel_event')}
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
                    All invitations and the reservation will be deleted too. Please confirm to apply.
                </p>
                <div className="changeImgBottomDiv mt-3">
                    <button
                        className="changeImgCancelBtn"
                        style={{ fontSize: "12px" }}
                        onClick={() => props.onHide()}
                    >
                        {t('cancel')}
                    </button>
                    <button
                        className="changeImgChangeBtn"
                        style={{ fontSize: "12px" }}
                        onClick={handleCancel}
                    >
                        {t('apply')}
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default CancelEventModal