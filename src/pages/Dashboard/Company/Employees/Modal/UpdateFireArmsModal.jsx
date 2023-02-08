import React from "react";
import cancel from '../../../../../assets/images/ic-cancel.svg';
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

const UpdateFireArmsModal = (props) => {
    return (
        <Modal
            className="fireArms_model"
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
                    FIRE ARMS
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
                <table className="detailFireArmsTable my-3" style={{ width: "100%" }}>
                    <thead>
                        <th className='first'>KEY</th>
                        <th>CODE</th>
                        <th>DESCRIPTION</th>
                    </thead>
                    <tbody>
                        {
                            ['P', 'M', 'S', 'R']?.map(item => (
                                <tr key={item}>
                                    <td
                                        className='first'
                                        style={{
                                            color: "#146F62",
                                            fontWeight: "bold",
                                            fontSize: "16px"
                                        }}
                                    >
                                        {item}
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateFireArmsModal