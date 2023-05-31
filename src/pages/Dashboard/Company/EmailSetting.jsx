import { Grid, TextField } from '@mui/material'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetEmailSetting, UpdateEmailSetting } from '../../../reduxToolkit/EmployeePayRoll/EmployeePayRollApi';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { permissionObj } from '../../../Helpers/permission';

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

// Email Setting module main funtion
const EmailSetting = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    // use hook importer
    const dispatch = useDispatch("")

    //use Selector hook to get state for redux store
    const { getEmailSetting } = useSelector(state => state.employeePayrollSlice)
    const { updateEmailSetting } = useSelector(state => state.employeePayrollSlice)
    const { permission } = useSelector(state => state.authenticatioauthennSlice);


    console.log(updateEmailSetting)
    //use State hook for local state management
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imap, setImap] = useState("")
    const [port, setPort] = useState("")
    const [passwordShown, setPasswordShown] = useState(false);


    const navigate = useNavigate();
    const location = useLocation();
    const goBack = () => navigate(-1);


    

    // a function for Password toggle handler
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    // A funtion to manage payload and dispatch update email setting 
    const handelEmailSettingUpdate = () => {

        const data = {
            id: getEmailSetting?.id,
            imapHost: imap,
            port,
            password,
            email,
            time: getEmailSetting?.time
        }

        dispatch(UpdateEmailSetting(data)).then(() => {

        })
    }

    // useEffect for dispatch get email setting data
    useEffect(() => {
        dispatch(GetEmailSetting())
    }, [updateEmailSetting?.id, getEmailSetting?.id])

    // useEffect for set email data for update
    useEffect(() => {
        setEmail(getEmailSetting?.email || '')
        setPassword(getEmailSetting?.password || '')
        setImap(getEmailSetting?.imapHost || '')
        setPort(getEmailSetting?.port || '')

    }, [updateEmailSetting?.id, getEmailSetting?.id])


    return (
        <>
            <div className='custom_head'>
                <div className='left'>
                    {/* <Link to="/dashboard/employee/payroll/manage-attendence"> */}
                    {
                        location.state === "yes" &&
                        <i className="fa fa-arrow-left" aria-hidden="true"
                            onClick={() => goBack()}
                            style={{
                                transform: lCode === "ar" ? "scaleX(-1)" : ""
                            }}
                        ></i>
                    }

                    {/* </Link> */}
                    <p>{t('email_settings')}</p>
                </div>
            </div>
            <div className="email_setting_container">
                <Grid display='flex' gap="0.8rem" alignItems="baseline">
                    <h4>{t('sender')}
                    </h4>
                    <div className='span' ></div>
                </Grid>

                <Grid container gap="1.5rem" width='48%' ml='2rem'>
                    <Grid item xs={12} sx={{ marginTop: '2rem', }} >
                        <TextField size="small"
                            fullWidth

                            type="email"
                            label={t('email')}
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputLabelProps={{
                                style: {
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    background: "#ffffff",
                                    padding: "0px 8px 0px 8px",
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
                                        fontSize: "8px",
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ position: "relative" }}>
                        <TextField size="small"
                            fullWidth
                            type={passwordShown ? "text" : "password"}

                            label={t('password')}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputLabelProps={{
                                style: {
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    background: "#ffffff",
                                    padding: "0px 8px 0px 8px",
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
                                        fontSize: "8px",
                                    },
                                },
                            }}
                        />
                        <span className="input-icons">
                            {
                                passwordShown ?
                                    <VisibilityIcon onClick={() => { togglePassword() }} />
                                    :
                                    <VisibilityOffIcon onClick={() => { togglePassword() }} />
                            }

                        </span>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField size="small"
                            fullWidth

                            type="text"
                            label={t('imap_host')}
                            id="IMAP"
                            value={imap}
                            onChange={(e) => setImap(e.target.value)}
                            InputLabelProps={{
                                style: {
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    background: "#ffffff",
                                    padding: "0px 8px 0px 8px",
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
                                        fontSize: "8px",
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField size="small"
                            fullWidth

                            type="text"
                            label={t('port')}
                            id="PORT"
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                            InputLabelProps={{
                                style: {
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    background: "#ffffff",
                                    padding: "0px 8px 0px 8px",
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
                                        fontSize: "8px",
                                    },
                                },
                            }}
                        />
                    </Grid>

                </Grid>
                {
                    permission?.includes(permissionObj?.WEB_EMAIL_SETTINGS_UPDATE) &&
                    <Grid className='email_footer'>

                        <button onClick={() => { handelEmailSettingUpdate() }}>SAVE SETTINGS</button>
                    </Grid>
                }
            </div>
        </>
    )
}

export default EmailSetting