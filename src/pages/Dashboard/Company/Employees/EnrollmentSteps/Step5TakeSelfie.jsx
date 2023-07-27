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



const Step5TakeSelfie = ({ extraData, onChange, setExtraData }) => {

    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    return (
        <div className="step5-take-selfie mb-4">
            <div className="image-box mb-4" style={{ backgroundImage: `url(${siluetPerson})` }}>
                <div className='red-circle'>
                    <img className='selfie-camera' src={icCamera} />
                </div>
            </div>
        </div>
    );
};

export default Step5TakeSelfie;