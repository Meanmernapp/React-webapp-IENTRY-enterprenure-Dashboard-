import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import cancel from '../../../../assets/images/ic-cancel.svg'
import { Link } from "react-router-dom";
const options = ['WEEK 1', 'WEEK 2', 'WEEK3'];

const CreateEventModal = (props) => {
    const [value, setValue] = React.useState(options[0]);
    const [isActive, setIsActive] = useState(1)
    const [inputValue, setInputValue] = useState('');
    const { title, check } = props;


    const handleButton = (index) => {
        setIsActive(index)
    }

    return (
        <Modal
            className="events_modal"
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <img
                    src={cancel}
                    onClick={() => props.onHide()}
                    className="modalClose"
                    alt=""
                />
            </Modal.Header>
            <Modal.Body className="docsModalBody">
                <div className="heading">
                    EVENT TYPE
                </div>
                <div className="modal_excerpt">
                    What type of event would you like tu create?
                </div>
                <ul>
                    <li>
                        <Link to={'/dashboard/employee/events/normal-events'} >
                            Normal Event
                        </Link>
                    </li>

                    <li>
                        <Link to={'/dashboard/employee/events/onu-events'} >
                            ONU Event
                        </Link>
                    </li>
                </ul>
            </Modal.Body>

        </Modal>

    );
};

export default CreateEventModal;