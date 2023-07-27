import React from 'react';
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Switch, Divider, Grid, FormHelperText, InputAdornment, List, ListItem, ListItemText } from '@mui/material';
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Stack from "@mui/material/Stack";
import { DatePicker, DateRangePicker, LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import userregular from "../../../../../assets/images/user-regular.svg";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import ClearButton from '../../../../../components/ClearButton';
import { status } from '../../../../../enums/statusEnum';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import es from 'react-phone-input-2/lang/es.json'
import fr from 'react-phone-input-2/lang/fr.json'
import ar from 'react-phone-input-2/lang/ar.json'

const Step1Details = ({ userData, onChange, setUserData }) => {

    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    const countyLanguage = {
        'en': "",
        'sp': es,
        'fr': fr,
        'ar': ar
    }


    const [phone, setPhone] = React.useState("");

    const userInfoStatusList = useSelector(state => state?.CompanyEmployeesSlice?.userInfoStatusList);

    const handleDateChange = (selectedDate) => {
        setUserData((prevData) => ({
            ...prevData,
            dob: selectedDate
        }));
    };

    const handlePhoneChange = (phone) => {
        setUserData((prevData) => ({
            ...prevData,
            phoneNumber: phone
        }));
    };

    //This section indicates what to do when we click clean button
    const handleClear = () => {
        setUserData({
            name: '',
            lastName: '',
            secondLastName: '',
            genderId: '',
            phoneNumber: '',
            statusId: '',
            email: '',
            dob: null
        })
    }

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
        <div>
            <div className='create-enrollment-data'>
                <ClearButton className='mt-0 pt-0' handleClear={handleClear} flagTooltip={true} textTooltip={t('clean_all_fields').toUpperCase()} />
                <div>
                    <div className="form-field">
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                required
                                name="name"
                                label={t('name')}
                                id="name"
                                value={userData.name}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                        <Box
                            sx={smallBoxStyle}
                        >
                            <TextField size="small"
                                fullWidth
                                required
                                name="lastName"
                                label={t("last_name")}
                                id="lastName"
                                value={userData.lastName}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>

                    </div>
                    <div className="form-field">
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                name="secondLastName"
                                label={t("second_last_name")}
                                id="secondLastName"
                                value={userData.secondLastName}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                        <Box
                            sx={smallBoxStyle}
                        >
                            <TextField size="small"
                                fullWidth
                                required
                                name="email"
                                label={t("email")}
                                value={userData.email}
                                onChange={onChange}
                                sx={textField}
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
                    <div className="form-field">

                        <Box sx={smallBoxStyle}>
                            <FormControl fullWidth sx={textField}>
                                <InputLabel size="small" id="demo-simple-select-label">
                                    {t('gender')}
                                </InputLabel>
                                <Select size="small"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="genderId"
                                    label={t("gender")}
                                    value={userData.genderId}
                                    onChange={onChange}
                                >
                                    <MenuItem value={1}>{t('male').toUpperCase()}</MenuItem>
                                    <MenuItem value={2}>{t('female').toUpperCase()}</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            sx={smallBoxStyle}
                        >
                          
                            <FormControl fullWidth sx={textField}>

                                <PhoneInput
                                    country={"mx"}
                                    enableSearch={true}
                                    name="phoneNumber"
                                    value={userData.phoneNumber}
                                    onChange={handlePhoneChange}
                                    localization={countyLanguage[lCode]}
                                    inputProps={{
                                        name: 'phoneNumber'
                                    }}

                                />
                            </FormControl>

                        </Box>


                    </div>
                    <div className="form-field">


                        <Box sx={smallBoxStyle}>
                            <FormControl fullWidth required sx={textField}>
                                <InputLabel size="small" id="demo-simple-select-label">
                                    {t("status")}
                                </InputLabel>
                                <Select size="small"
                                    labelId="demo-simple-select-label"
                                    name="statusId"
                                    id="demo-simple-select"
                                    label={t("status")}
                                    value={userData.statusId}
                                    onChange={onChange}
                                >
                                    {
                                        userInfoStatusList?.map(item => (
                                            <MenuItem value={item?.id}>{t(status[item?.id])}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>

                        <Box
                            sx={smallBoxStyle}
                        >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    allowSameDateSelection
                                    name="dob"
                                    label="DOB"
                                    inputFormat="dd/MM/yyyy"
                                    value={userData.dob}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField name="dob" size="small" sx={textField} fullWidth {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step1Details;
