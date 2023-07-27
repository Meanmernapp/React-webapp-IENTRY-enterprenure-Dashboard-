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
// import { GetHeaders } from '../../../../../reduxToolkit/headers/HeadersApi';



const Step2OtherDetails = ({ extraData, onChange, setExtraData, headersList }) => {

    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    const userInfoStatusList = useSelector(state => state?.CompanyEmployeesSlice?.userInfoStatusList);
    // const { headersList } = useSelector(state => state.headersSlice);

    // const handleDateChange = (selectedDate) => {
    //     setUserData((prevData) => ({
    //         ...prevData,
    //         dob: selectedDate
    //     }));
    // };

    //This section indicates what to do when we click clean button
    const handleClear = () => {
        setExtraData({
            field1: '',
            field2: '',
            field3: '',
            field4: '',
            field5: '',
            field6: '',
            field7: '',
            field8: '',
            field9: '',
            field10: '',
            field11: '',
            field12: '',
            field13: '',
            field14: '',
            field15: ''
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
                                name="field1"
                                label={headersList?.header1 || t("header_1")}
                                id="header1"
                                value={extraData.field1}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                        <Box
                            sx={smallBoxStyle}
                        >
                            <TextField size="small"
                                fullWidth
                                name="field2"
                                label={headersList?.header2 || t("header_2")}
                                id="header2"
                                value={extraData.field2}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>

                    </div>
                    <div className="form-field">
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                name="field3"
                                label={headersList?.header3 || t("header_3")}
                                id="header3"
                                value={extraData.field3}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                name="field4"
                                label={headersList?.header4 || t("header_4")}
                                id="header4"
                                value={extraData.field4}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                    </div>
                    <div className="form-field">
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                name="field5"
                                label={headersList?.header5 || t("header_5")}
                                id="header5"
                                value={extraData.field5}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                name="field6"
                                label={headersList?.header6 || t("header_6")}
                                id="header6"
                                value={extraData.field6}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                    </div>
                    <div className="form-field">
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                name="field7"
                                label={headersList?.header7 || t("header_7")}
                                id="header7"
                                value={extraData.field7}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                name="field8"
                                label={headersList?.header8 || t("header_8")}
                                id="header8"
                                value={extraData.field8}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                    </div>
                    <div className="form-field">
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                name="field9"
                                label={headersList?.header9 || t("header_9")}
                                id="header9"
                                value={extraData.field9}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                name="field10"
                                label={headersList?.header10 || t("header_10")}
                                id="header10"
                                value={extraData.field10}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                    </div>
                    <div className="form-field">
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                name="field11"
                                label={headersList?.header11 || t("header_11")}
                                id="header11"
                                value={extraData.field11}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                name="field12"
                                label={headersList?.header12 || t("header_12")}
                                id="header12"
                                value={extraData.field12}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                    </div>
                    <div className="form-field">
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                name="field13"
                                label={headersList?.header13 || t("header_13")}
                                id="header13"
                                value={extraData.field13}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                name="field14"
                                label={headersList?.header14 || t("header_14")}
                                id="header14"
                                value={extraData.field14}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                    </div>
                    <div className="form-field">
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                name="field15"
                                label={headersList?.header15 || t("header_15")}
                                id="header15"
                                value={extraData.field15}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>
                        <Box sx={smallBoxStyle}>
                            <TextField size="small"
                                fullWidth
                                hidden
                                label={t("blank_space")}
                                id="blank"
                                sx={textField}
                            />
                        </Box>
                    </div>
                    {/* <div className="form-field">

                        <Box sx={smallBoxStyle}>
                            <FormControl fullWidth sx={textField}>
                                <InputLabel size="small" id="demo-simple-select-label">
                                    {t('gender')}
                                </InputLabel>
                                <Select size="small"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="gender"
                                    label="Gender"
                                    value={userData.gender}
                                    onChange={onChange}
                                >
                                    <MenuItem value={10}>Male</MenuItem>
                                    <MenuItem value={20}>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            sx={smallBoxStyle}
                        >
                            <TextField size="small"
                                fullWidth
                                name="phoneNumber"
                                label="MOBILE"
                                id="MOBILE"
                                value={userData.phoneNumber}
                                onChange={onChange}
                                sx={textField}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <PhoneIphoneIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>


                    </div> */}
                    {/* <div className="form-field">


                        <Box sx={smallBoxStyle}>
                            <FormControl fullWidth sx={textField}>
                                <InputLabel size="small" id="demo-simple-select-label">
                                    Status
                                </InputLabel>
                                <Select size="small"
                                    labelId="demo-simple-select-label"
                                    name="status"
                                    id="demo-simple-select"
                                    label="Status"
                                    value={userData.status}
                                    onChange={onChange}
                                >
                                    {
                                        userInfoStatusList?.map(item => (
                                            <MenuItem value={item?.id}>{item?.name}</MenuItem>
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
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Step2OtherDetails;