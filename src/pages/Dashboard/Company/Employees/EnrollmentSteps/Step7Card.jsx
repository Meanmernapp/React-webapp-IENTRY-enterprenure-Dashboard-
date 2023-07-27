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



const Step7Card = ({ extraData, onChange, setExtraData }) => {

    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    return (
        <div>
            <label htmlFor="file-input" className="dottedborderbox">
                <div className="dragAndDrop">
                    <p>{t('add_new_card')}</p>
                    {/* <span>file size 20MB</span> */}
                </div>
                <input
                    type="file"
                    id="file-input"
                    accept="application/pdf,application/xlsx,application/docx,application/pptx"
                // onChange={onFileChange}
                />
                <div className="dragAndDrop">
                <i class="fa fa-plus" aria-hidden="true"></i>
                </div>
            </label>
        </div>
    );
};

export default Step7Card;