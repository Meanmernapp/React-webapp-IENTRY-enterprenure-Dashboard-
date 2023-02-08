import React from 'react'
import { Modal } from "react-bootstrap";
import cancel from '../../../../assets/images/ic-cancel.svg';
import { useDispatch } from 'react-redux';
import { allowDenyEvent, GetValidationEventsPageable } from '../../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi';

const AllowDenyModal = (props) => {
    const { event } = props;
    const dispatch = useDispatch();
    let body;
    var today = new Date();
    let time_in_miliseconds = today.getTime();
    // console.log(props?.eventid)

    const handleCancelAllow = (option) => {
        const body = {
            id: event?.id,
            option: option
        }
        dispatch(allowDenyEvent(body));
        body = {
            date: time_in_miliseconds,
            pagination: {
                order: true,
                page: 0,
                size: 4,
                sortBy: "id"
            }
        }
        dispatch(GetValidationEventsPageable(body));
        props.onHide();
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
                    ALLOW EVENT
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
                <p style={{ fontSize: '10px', textAlign: 'center' }}>
                    DO YOU LIKE TO PERMIT THE EVENT
                    <span
                        style={{
                            fontWeight: "bold"
                        }}
                    >
                        {` ${event?.name} `}
                    </span>?
                </p>
                <div className="changeImgBottomDiv mt-3">
                    <button
                        className="changeImgCancelBtn"
                        style={{ fontSize: "12px" }}
                        onClick={() => handleCancelAllow("34")}
                    >
                        NOT ALLOW
                    </button>
                    <button
                        className="changeImgChangeBtn"
                        style={{ fontSize: "12px" }}
                        onClick={() => handleCancelAllow("33")}
                    >
                        ALLOW
                    </button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default AllowDenyModal