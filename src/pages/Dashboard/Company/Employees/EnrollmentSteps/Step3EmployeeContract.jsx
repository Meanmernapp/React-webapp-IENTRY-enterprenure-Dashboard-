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



const Step3EmployeeContract = ({ employeeData, onChange, setEmployeeData, employeeRoles, contractStatusList, employeeWorkStations, employeeDepartments }) => {

    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    const handleStartDateChange = (selectedDate) => {
        setEmployeeData((prevData) => ({
            ...prevData,
            startDate: selectedDate
        }));
    };

    const handleEndDateChange = (selectedDate) => {
        setEmployeeData((prevData) => ({
            ...prevData,
            endDate: selectedDate
        }));
    };

    //This section indicates what to do when we click clean button
    const handleClear = () => {
        setEmployeeData({
            departmentId: '',
            employeeId: '',
            startDate: null,
            endDate: null,
            roleId: '',
            zoneId: '',
            contractStatusId: ''
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
                            <FormControl fullWidth required sx={textField}>
                                <InputLabel size="small" id="demo-simple-select-label">
                                    {t("role")}
                                </InputLabel>
                                <Select size="small"
                                    labelId="demo-simple-select-label"
                                    name="roleId"
                                    id="demo-simple-select"
                                    label={t("role")}
                                    value={employeeData.roleId}
                                    onChange={onChange}
                                >
                                    {
                                        employeeRoles?.map(item => (
                                            <MenuItem value={item?.id}>{item?.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            sx={smallBoxStyle}
                        >
                            <TextField size="small"
                                fullWidth
                                required
                                name="employeeId"
                                label={t("employee_id")}
                                id="employeeId"
                                value={employeeData.employeeId}
                                onChange={onChange}
                                sx={textField}
                            />
                        </Box>

                    </div>
                    
                    <div className="form-field">

                        <Box sx={smallBoxStyle}>
                            <FormControl fullWidth required sx={textField}>
                                <InputLabel size="small" id="demo-simple-select-label">
                                    {t("work_station")}
                                </InputLabel>
                                <Select size="small"
                                    labelId="demo-simple-select-label"
                                    name="zoneId"
                                    id="demo-simple-select"
                                    label={t("work_station")}
                                    value={employeeData.zoneId}
                                    onChange={onChange}
                                >
                                    {
                                        employeeWorkStations?.map(item => (
                                            <MenuItem value={item?.id}>{item?.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={smallBoxStyle}>
                            <FormControl fullWidth required sx={textField}>
                                <InputLabel size="small" id="demo-simple-select-label">
                                    {t("department")}
                                </InputLabel>
                                <Select size="small"
                                    labelId="demo-simple-select-label"
                                    name="departmentId"
                                    id="demo-simple-select"
                                    label={t("department")}
                                    value={employeeData.departmentId}
                                    onChange={onChange}
                                >
                                    {
                                        employeeDepartments?.map(item => (
                                            <MenuItem value={item?.id}>{item?.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>


                    </div>
                    <div className="form-field">

                        <Box
                            sx={smallBoxStyle}
                        >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    allowSameDateSelection
                                    name="startDate"
                                    label={t("start_date")}
                                    inputFormat="dd/MM/yyyy"
                                    value={employeeData.startDate}
                                    onChange={handleStartDateChange}
                                    renderInput={(params) => <TextField name="startDate" size="small" sx={textField} fullWidth {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box
                            sx={smallBoxStyle}
                        >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    allowSameDateSelection
                                    name="endDate"
                                    label={t("end_date")}
                                    inputFormat="dd/MM/yyyy"
                                    value={employeeData.endDate}
                                    onChange={handleEndDateChange}
                                    renderInput={(params) => <TextField name="endDate" size="small" sx={textField} fullWidth {...params} helperText={t('put_the_same_as_the_start_date_if_the_contract_is_for_an_indefinite_period')} />}
                                />
                            </LocalizationProvider>
                        </Box>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Step3EmployeeContract;
