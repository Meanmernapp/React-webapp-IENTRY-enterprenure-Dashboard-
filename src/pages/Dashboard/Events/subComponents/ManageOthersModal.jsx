import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import Switch from "react-switch";
import { useDispatch, useSelector } from 'react-redux';
import { Box, InputAdornment, TextField } from '@mui/material';
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import searchIcon from '../../../../assets/images/ic-search.svg';
import userregular from "../../../../assets/images/user-regular.svg";
import { preRegisterUser, searchByEmail, searchByPhone } from '../../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi';
import { SaveEmailPhoneSearchList, setReadOnly } from '../../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify';

const ManageOthersModal = (props) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    const emailPhoneSearchData = useSelector(state => state?.EmployeeEventsSlice?.emailPhoneSearchData);
    const readOnly = useSelector(state => state?.EmployeeEventsSlice?.readOnly);
    const [errorEmail, setErrorEmail] = useState("")
    const [errorNumber, setErrorNumber] = useState("")
    // console.log(emailPhoneSearchData)
    // +15554006679
    const [checked, setChecked] = useState(true);
    const [cellular, setCellular] = useState();
    const [email, setEmail] = useState();
    const [preRegisterObj, setPreRegisterObj] = useState({
        name: "",
        email: "",
        phoneNumber: ""
    })

    useEffect(() => {
        if (props.show === false) {
            setPreRegisterObj({
                name: "",
                email: "",
                phoneNumber: ""
            });
            setEmail('');
            setCellular('');
            dispatch(setReadOnly(false))
        }
        if (readOnly === false) {
            setPreRegisterObj({
                name: "",
                email: "",
                phoneNumber: ""
            });
            setEmail('');
            setCellular('');
        }
    }, [props.show, readOnly])

    const handleSwitch = (checked) => {
        setChecked(checked);
        setCellular("");
        setEmail("");
        setPreRegisterObj({
            name: "",
            email: "",
            phoneNumber: ""
        });
    }

    const handleSearch = () => {
        if (checked) {
            dispatch(searchByPhone(cellular)).then((res) => {
                if (res?.payload?.data?.code == 831) {
                    setErrorNumber(res?.payload?.data?.message)
                } else {
                    setErrorNumber("")
                }

                setPreRegisterObj({
                    name: res?.payload?.data?.data?.name,
                    email: res?.payload?.data?.data?.email,
                    phoneNumber: res?.payload?.data?.data?.phoneNumber
                })
            })
        } else {
            dispatch(searchByEmail(email)).then((res) => {
                if (res?.payload?.data?.code == 831) {

                    setErrorEmail(res?.payload?.data?.message)
                } else {
                    setErrorEmail("")
                }
                setPreRegisterObj({
                    name: res?.payload?.data?.data?.name,
                    email: res?.payload?.data?.data?.email,
                    phoneNumber: res?.payload?.data?.data?.phoneNumber
                })
            })
        }
    }


    const handleConfirm = () => {

        if (readOnly === true) {
            if (preRegisterObj?.name) {

                dispatch(SaveEmailPhoneSearchList(emailPhoneSearchData))
                props.onHide();
                setErrorNumber("")
                setErrorEmail("")
            } else {
                toast.warn("Please Find user or Field info")
            }
        } else if (readOnly === false) {
            if (preRegisterObj?.name && preRegisterObj.email && preRegisterObj.phoneNumber) {
                dispatch(preRegisterUser({
                    email: preRegisterObj.email,
                    name: preRegisterObj.name,
                    phoneNumber: preRegisterObj.cellular
                })).then((
                    res
                    // { payload: { data: { data: data } } }
                ) => {
                    if (res?.payload?.data?.data === null) {
                        toast.error(res?.payload?.data?.message)
                    } else {
                        dispatch(SaveEmailPhoneSearchList(res?.payload?.data?.data))
                        setErrorNumber("")
                        setErrorEmail("")
                    }

                })
            } else {
                toast.warn("Please Find user or Field info")
            }

        }
        // props.onHide();
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
                    {t('find_person')}
                </Modal.Title>

                <i className="fa fa-times cross" aria-hidden="true" onClick={() => props.onHide()}></i>
            </Modal.Header>
            <Modal.Body className="manage_others_modal_body">
                <div className="d-flex align-items-center justify-content-between">
                    <span
                        style={{
                            fontSize: "15px",
                            color: checked ? "#707070" : "#65ABA0",
                            textDecoration: checked ? "none" : "underline",
                            fontWeight: 'bold'
                        }}
                    >{t('find_by_email')}</span>
                    <Switch
                        checked={checked}
                        onChange={handleSwitch}
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
                            fontSize: "15px",
                            color: checked ? "#65ABA0" : "#707070",
                            textDecoration: checked ? "underline" : "none",
                            fontWeight: 'bold'
                        }}
                    >{t('find_by_phone_number')}</span>
                </div>
                <div className="findPersonDiv">
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        {
                            checked ?
                                <TextField size="small"
                                    fullWidth

                                    label="NUMBER"
                                    id="CELULAR"
                                    value={cellular}
                                    onChange={(e) => setCellular(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <PhoneIphoneIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                /> :
                                <TextField size="small"
                                    fullWidth

                                    label="EMAIL"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="EMAIL"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <MailOutlineIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                        }
                        <div
                            style={{
                                padding: "5px",
                                borderRadius: "5px",
                                backgroundColor: "rgb(20, 111, 98)",
                                height: "35px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "3rem",
                                marginLeft: "10px",
                                cursor: "pointer"
                            }}
                            onClick={handleSearch}
                        >
                            <img
                                src={searchIcon}
                                alt="searchIcon"
                                style={{
                                    width: "20px",
                                    height: "20px"
                                }}
                            />
                        </div>
                    </Box>
                </div>
                {
                    errorEmail === "email not exists." || errorNumber === "phone_number not exists." &&

                    <p className='bottomText text-center mt-2'><span>USER NOT FOUDED </span>, please pre-register the user</p>
                }
                <div className="preRegisterUserFields">
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                            marginBottom: "0.5rem"
                        }}
                    >
                        <TextField size="small"
                            fullWidth

                            label="NAME"
                            id="NAME"
                            value={preRegisterObj?.name}
                            // defaultValue=" "
                            disabled={readOnly}
                            required
                            onChange={(e) => setPreRegisterObj({ ...preRegisterObj, "name": e.target.value })}
                            className=""
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img
                                            src={userregular}
                                            className="user_regular_img"
                                            alt="acadd_logo"
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                            marginBottom: "0.5rem"
                        }}
                    >
                        <TextField size="small"
                            fullWidth

                            label="NUMBER"
                            id="CELULAR"
                            disabled={readOnly}
                            value={preRegisterObj?.phoneNumber}
                            // defaultValue=" "
                            onChange={(e) => setPreRegisterObj({ ...preRegisterObj, "phoneNumber": e.target.value })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <PhoneIphoneIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                            marginBottom: "0.5rem"
                        }}
                    >
                        <TextField size="small"
                            fullWidth

                            label="EMAIL"
                            value={preRegisterObj?.email}
                            // defaultValue=" "
                            disabled={readOnly}
                            onChange={(e) => setPreRegisterObj({ ...preRegisterObj, "email": e.target.value })}
                            id="EMAIL"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <MailOutlineIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </div>
                <div className="buttonArea mt-4 d-flex">
                    <button
                        style={{ width: "180px" }}
                        className="custom_btn_cancel_gray_hover" onClick={() => props.onHide()}

                    >CANCEL</button>
                    <button
                        style={{ width: "180px" }}
                        className="custom_primary_btn_dark"
                        onClick={handleConfirm}
                    >CONFIRM
                        {/* {
                            loading ? "Deleting...!" : "Delete"
                        } */}
                    </button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default ManageOthersModal