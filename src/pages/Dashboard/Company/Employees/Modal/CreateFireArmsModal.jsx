
import React, { useEffect, useState } from "react";
import cancel from '../../../../../assets/images/ic-cancel.svg';
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { creatFireArms, getFireArm, updateFireArms } from "../../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesApi";

const CreateFireArmsModal = (props) => {
    const dispatch = useDispatch();
    const singleEmployeeDetail = useSelector(state => state?.CompanyEmployeesSlice?.singleEmployeeDetail);
    const fireArmStatus = useSelector(state => state?.CompanyEmployeesSlice?.fireArmStatus);
    const singleFireArm = useSelector(state => state?.CompanyEmployeesSlice?.singleFireArm);
    const [fireArmsObj, setFireArmsObj] = useState({
        codeP: "",
        codeM: "",
        codeS: "",
        codeR: "",
        descP: "",
        descM: "",
        descS: "",
        descR: "",
    })

    useEffect(() => {
        if (fireArmStatus === true) {
            dispatch(getFireArm(singleEmployeeDetail?.user?.id)).then(({ payload: { data: { data } } }) => {
                // console.log(data)
                setFireArmsObj({
                    codeP: data?.codeP,
                    codeM: data?.codeM,
                    codeS: data?.codeS,
                    codeR: data?.codeR,
                    descP: data?.descP,
                    descM: data?.descM,
                    descS: data?.descS,
                    descR: data?.descR,
                })
            })
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFireArmsObj({ ...fireArmsObj, [name]: value })
    }

    const saveChanges = () => {
        const body = {
            codeM: fireArmsObj?.codeM,
            codeP: fireArmsObj?.codeP,
            codeR: fireArmsObj?.codeR,
            codeS: fireArmsObj?.codeS,
            descM: fireArmsObj?.descM,
            descP: fireArmsObj?.descP,
            descR: fireArmsObj?.descR,
            descS: fireArmsObj?.descS,
            id: singleFireArm ? singleFireArm?.id : null,
            permit: "string",
            user: {
                id: singleEmployeeDetail?.user?.id,
            }
        }
        if (fireArmStatus === false) {
            dispatch(creatFireArms(body)).then(() => {
                dispatch(getFireArm(singleEmployeeDetail?.user?.id))
            })
            props.onHide();
        } else {
            dispatch(updateFireArms(body)).then(() => {
                dispatch(getFireArm(singleEmployeeDetail?.user?.id))
            })
            props.onHide();
        }
    }

    return (
        <Modal
            className="fireArms_model"
            {...props}
            size="lg"
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
                        <tr>
                            <td
                                className='first'
                                style={{
                                    color: "#146F62",
                                    fontWeight: "bold",
                                    fontSize: "16px"
                                }}
                            >
                                P
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="fireArmsInput"
                                    name="codeP"
                                    value={fireArmsObj.codeP}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="fireArmsInput"
                                    name="descP"
                                    value={fireArmsObj.descP}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td
                                className='first'
                                style={{
                                    color: "#146F62",
                                    fontWeight: "bold",
                                    fontSize: "16px"
                                }}
                            >
                                M
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="fireArmsInput"
                                    name="codeM"
                                    value={fireArmsObj.codeM}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="fireArmsInput"
                                    name="descM"
                                    value={fireArmsObj.descM}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td
                                className='first'
                                style={{
                                    color: "#146F62",
                                    fontWeight: "bold",
                                    fontSize: "16px"
                                }}
                            >
                                S
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="fireArmsInput"
                                    name="codeS"
                                    value={fireArmsObj.codeS}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="fireArmsInput"
                                    name="descS"
                                    value={fireArmsObj.descS}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td
                                className='first'
                                style={{
                                    color: "#146F62",
                                    fontWeight: "bold",
                                    fontSize: "16px"
                                }}
                            >
                                R
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="fireArmsInput"
                                    name="codeR"
                                    value={fireArmsObj.codeR}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="fireArmsInput"
                                    name="descR"
                                    value={fireArmsObj.descR}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="changeImgBottomDiv">
                    <button
                        className="changeImgCancelBtn"
                        onClick={() => props.onHide()}
                    >
                        CANCEL
                    </button>
                    <button
                        className="changeImgChangeBtn"
                        onClick={saveChanges}
                    >
                        SAVE CHANGES
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default CreateFireArmsModal