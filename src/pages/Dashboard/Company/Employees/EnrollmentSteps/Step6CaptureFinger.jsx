import React from 'react';
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Switch, Divider, Grid, FormHelperText, InputAdornment, List, ListItem, ListItemText } from '@mui/material';
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Stack from "@mui/material/Stack";
import userregular from "../../../../../assets/images/user-regular.svg";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import ClearButton from '../../../../../components/ClearButton';
import siluetPerson from '../../../../../assets/defaultImages/silueta_persona.png';
import icCamera from '../../../../../assets/defaultImages/ic-camera.svg';
import icFingerPrint from '../../../../../assets/defaultImages/ic-fingerprint.svg';
import ellipsis67 from '../../../../../assets/defaultImages/Ellipse67.svg';



const Step6CaptureFinger = ({ extraData, onChange, setExtraData }) => {

    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    const [nameFinger, setNameFinger] = React.useState('');

    const smallBoxStyle = {
        width: "100%",
        maxWidth: "100%",
        fontSize: "20px",
        height: "50px",
    }

    const textField = {
        textAlign: lCode === "ar" ? "right" : "left",
        "& 	.MuiOutlinedInput-notchedOutline": {
            textAlign: lCode === "ar" ? "right" : "left",
        },
        "& 	.MuiInputLabel-root": {
            fontSize: 12,
            marginTop: '2px',
            alignItems: 'center',
            display: 'flex',
            left: lCode === "ar" ? "inherit" : "0",
            right: lCode === "ar" ? "1.75rem" : "0",
            transformOrigin: lCode === "ar" ? "right" : "left",
            zIndex: 0,
        },
        "& 	.MuiFormLabel-filled": {
            marginTop: '-5px',
        }
    }

    return (
        <>
            <div className="step6-capture-finger mb-4">
                <span>{"PUT YOUR FINGER ON THE READER"}</span>
                <div className="image-box mb-4">
                    {/* <div className='red-circle'> */}
                    <img className='selfie-camera' src={icFingerPrint} />
                    {/* </div> */}
                </div>
            </div>
            <div className='create-enrollment-data'>
                <div className='form-field position-relative start-50 translate-middle w-25 mt-5'>
                    <Box sx={smallBoxStyle}>
                        <TextField size="small"
                            fullWidth
                            name="field1"
                            label={t("name")}
                            id="header1"
                            value={nameFinger}
                            onChange={onChange}
                            sx={textField}
                        />
                    </Box>
                </div>
            </div>
        </>
    );
};

export default Step6CaptureFinger;