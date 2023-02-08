import React, { useState } from 'react'
import { Modal } from "react-bootstrap";
import { TextField } from "@mui/material";
import Switch from "react-switch";
import { useDispatch, useSelector } from 'react-redux';
import { saveOunEmployeeData } from '../../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice';
import { toast } from 'react-toastify';



const OnuEmployeesModal = (props) => {
    const dispatch = useDispatch();
    const allEmployeesData = useSelector(state => state?.EmployeeEventsSlice?.allEmployees);
    const selectedEmployees = useSelector(state => state?.EmployeeEventsSlice?.onuEmployeeData);

    const [employeeExtraData, setEmployeeExtraData] = useState({
        organization: "",
        location: "",
        gzBadge: false,
        sharePdf: false
    });
    const [hostObject, setHostObject] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });
    const [addUserquery, setAddUserQuery] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState();
    // console.log(selectedEmployee)

    const handleAddUser = () => {
        if (hostObject?.name) {

            dispatch(saveOunEmployeeData(selectedEmployee));
            setHostObject({
                name: "",
                email: "",
                phoneNumber: "",
            })
            setEmployeeExtraData({
                organization: "",
                location: "",
                gzBadge: false,
                sharePdf: false
            })
            props.onHide();
        } else {
            toast.warn("Please Select Employee")
        }

    }

    const handleselected = (user) => {

        const checkUser = selectedEmployees?.find(item => item?.id === user?.id)

        if (checkUser) {
            toast.warn(`${checkUser?.name} is already Added`)
        } else {
            setHostObject({
                name: user?.name,
                email: user?.email,
                phoneNumber: user?.phoneNumber,
            })
            setSelectedEmployee(user);
            setAddUserQuery("")
        }

    }

    return (
        <Modal
            className="manage-role-panel-modal"
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    EMPLOYEES
                </Modal.Title>

                <i className="fa fa-times cross" aria-hidden="true" onClick={() => props.onHide()}></i>
            </Modal.Header>
            <Modal.Body className="manage_role_modal_body">


                <p className='mt-3' style={{ fontWeight: 'bold' }}>SEARCH FOR EMPLOYEE</p>

                {/* search bar role panel */}
                <div className="row">
                    <div className="col-12 mb-3">
                        <input
                            type="text"
                            class="form-control"
                            value={addUserquery}
                            onChange={(e) => setAddUserQuery(e.target.value)}

                        />
                        <span class="search_btn">
                            <button class="btn btn-default" type="button">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>
                    <div className="col-12 searchItem" style={{ display: addUserquery !== '' ? "block" : "none" }}>
                        {
                            allEmployeesData?.filter(user => {
                                if (addUserquery === '') {
                                    return user;
                                } else if (user.name.toLowerCase().includes(addUserquery.toLowerCase())) {
                                    return user;
                                }
                            }).map(user => (
                                <div
                                    className='add_some_one_item'
                                    key={user.id}
                                    onClick={() => handleselected(user)}
                                >
                                    <p>{user.name}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='mb-3'>
                    <TextField size="small"
                        sx={{ mt: "2px" }}
                        fullWidth


                        label="NAME"
                        defaultValue=" "
                        value={hostObject?.name}
                        // onChange={(e) => setHostObject({ ...hostObject, ["name"]: e.target.value })}
                        InputLabelProps={{
                            style: {
                                fontSize: "10px",
                                fontWeight: 600,
                                background: "#ffffff",
                                padding: "0px 0px 0px 4px",
                            },
                        }} // font size of input label
                        inputProps={{
                            sx: {
                                border: "none",
                                outline: "none",
                                fontSize: "10px",
                                letterSpacing: "0px",
                                color: "#707070",
                                "&::placeholder": {
                                    color: "#707070",
                                    fontSize: "12px",
                                },
                            },
                        }}
                    />
                </div>
                <div className='mb-3'>
                    <TextField size="small"
                        sx={{ mt: "2px" }}
                        fullWidth


                        label="EMAIL"
                        defaultValue=" "
                        value={hostObject?.email}
                        // onChange={(e) => setHostObject({ ...hostObject, ["email"]: e.target.value })}
                        InputLabelProps={{
                            style: {
                                fontSize: "10px",
                                fontWeight: 600,
                                background: "#ffffff",
                                padding: "0px 0px 0px 4px",
                            },
                        }} // font size of input label
                        inputProps={{
                            sx: {
                                border: "none",
                                outline: "none",
                                fontSize: "10px",
                                letterSpacing: "0px",
                                color: "#707070",
                                "&::placeholder": {
                                    color: "#707070",
                                    fontSize: "12px",
                                },
                            },
                        }}
                    />
                </div>
                <div className='mb-3'>
                    <TextField size="small"
                        sx={{ mt: "2px" }}
                        fullWidth


                        label="PHONE NUMBER"
                        defaultValue=" "
                        value={hostObject?.phoneNumber}
                        // onChange={(e) => setHostObject({ ...hostObject, ["phoneNo"]: e.target.value })}
                        InputLabelProps={{
                            style: {
                                fontSize: "10px",
                                fontWeight: 600,
                                background: "#ffffff",
                                padding: "0px 0px 0px 4px",
                            },
                        }} // font size of input label
                        inputProps={{
                            sx: {
                                border: "none",
                                outline: "none",
                                fontSize: "10px",
                                letterSpacing: "0px",
                                color: "#707070",
                                "&::placeholder": {
                                    color: "#707070",
                                    fontSize: "12px",
                                },
                            },
                        }}
                    />
                </div>

                <div className="my-3">
                    <h2
                        className='mb-3'
                        style={{
                            borderBottom: "2px solid #65ABA0",
                            color: "#65ABA0",
                            fontSize: "14px",
                            textAlign: "center",
                            fontWeight: "bold"
                        }}
                    >
                        EXTRA INFORMATION
                    </h2>
                    <div className='mb-3'>
                        <TextField size="small"
                            sx={{ mt: "2px" }}
                            fullWidth

                            label="organization"
                            defaultValue=" "
                            value={employeeExtraData.organization}
                            onChange={(e) => setEmployeeExtraData({ ...employeeExtraData, ["organization"]: e.target.value })}
                            InputLabelProps={{
                                style: {
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    background: "#ffffff",
                                    padding: "0px 0px 0px 4px",
                                },
                            }} // font size of input label
                            inputProps={{
                                sx: {
                                    border: "none",
                                    outline: "none",
                                    fontSize: "10px",
                                    letterSpacing: "0px",
                                    color: "#707070",
                                    "&::placeholder": {
                                        color: "#707070",
                                        fontSize: "12px",
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <TextField size="small"
                            sx={{ mt: "2px" }}
                            fullWidth


                            label="location"
                            defaultValue=" "
                            value={employeeExtraData.location}
                            onChange={(e) => setEmployeeExtraData({ ...employeeExtraData, ["location"]: e.target.value })}
                            InputLabelProps={{
                                style: {
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    background: "#ffffff",
                                    padding: "0px 0px 0px 4px",
                                },
                            }} // font size of input label
                            inputProps={{
                                sx: {
                                    border: "none",
                                    outline: "none",
                                    fontSize: "10px",
                                    letterSpacing: "0px",
                                    color: "#707070",
                                    "&::placeholder": {
                                        color: "#707070",
                                        fontSize: "12px",
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <p
                                style={{
                                    fontSize: "14px",
                                    color: "#707070",
                                    paddingRight: "1rem",
                                    fontWeight: "bold"
                                }}
                            >GZ BADGE</p>
                            <div className='d-flex align-items-center'>
                                <span
                                    style={{
                                        fontSize: "10px",
                                        color: employeeExtraData.gzBadge ? "#707070" : "#65ABA0",
                                        textDecoration: employeeExtraData.gzBadge ? "none" : "underline",
                                        paddingRight: "1rem"
                                    }}
                                >YES</span>
                                <Switch
                                    checked={employeeExtraData.gzBadge}
                                    onChange={() => setEmployeeExtraData({ ...employeeExtraData, "gzBadge": !employeeExtraData.gzBadge })}
                                    onColor="#65ABA0"
                                    onHandleColor="#178A7B"
                                    handleDiameter={14}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    boxShadow="0px 1px 2px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 2px rgba(0, 0, 0, 0.2)"
                                    height={11}
                                    width={26}
                                    className="react-switch"
                                    id="material-switch"
                                />
                                <span
                                    style={{
                                        fontSize: "10px",
                                        color: employeeExtraData.gzBadge ? "#65ABA0" : "#707070",
                                        textDecoration: employeeExtraData.gzBadge ? "underline" : "none",
                                        paddingLeft: "2rem"
                                    }}
                                >NO</span>
                            </div>
                        </div>
                        <div>
                            <p
                                style={{
                                    fontSize: "14px",
                                    color: "#707070",
                                    // paddingLeft: "1rem",
                                    textAlign: 'end',
                                    fontWeight: "600"
                                }}
                            >SHARE PDF</p>
                            <div className='d-flex align-items-center'>
                                <span
                                    style={{
                                        fontSize: "10px",
                                        color: employeeExtraData.sharePdf ? "#707070" : "#65ABA0",
                                        textDecoration: employeeExtraData.sharePdf ? "none" : "underline",
                                        paddingRight: "2rem"
                                    }}
                                >YES</span>
                                <Switch
                                    checked={employeeExtraData.sharePdf}
                                    onChange={() => setEmployeeExtraData({ ...employeeExtraData, "sharePdf": !employeeExtraData.sharePdf })}
                                    onColor="#65ABA0"
                                    onHandleColor="#178A7B"
                                    handleDiameter={14}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    boxShadow="0px 1px 2px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 2px rgba(0, 0, 0, 0.2)"
                                    height={11}
                                    width={26}
                                    className="react-switch"
                                    id="material-switch"
                                />
                                <span
                                    style={{
                                        fontSize: "10px",
                                        color: employeeExtraData.sharePdf ? "#65ABA0" : "#707070",
                                        textDecoration: employeeExtraData.sharePdf ? "underline" : "none",
                                        paddingLeft: "5px !important"
                                    }}
                                >NO</span>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="buttonArea mt-4 d-flex">
                    <button className="custom_btn_cancel_gray_hover"
                        style={{ width: "178px" }}
                        onClick={() => props.onHide()}>Cancel</button>
                    <button
                        className="custom_primary_btn_dark"
                        style={{ width: "178px" }}
                        onClick={handleAddUser}
                    >APPLY CHANGES
                        {/* {
                            loading ? "Deleting...!" : "Delete"
                        } */}
                    </button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default OnuEmployeesModal;