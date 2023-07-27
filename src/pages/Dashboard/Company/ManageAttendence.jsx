import { Box, FormControl, Grid, InputLabel, Select, MenuItem, Stack, TextField, InputAdornment, Tooltip, Checkbox } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TablePagination from '@mui/material/TablePagination';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import cross from '../../../assets/images/ic-cancel.svg'
import { AddDeviceToListPayroll, AddEmployeesToListPayroll, ChangeTimeAndSelectedDaysUpdate, DeleteDeviceToListPayroll, DeleteEmployeesToListPayroll, GetAllDevicePayroll, GetAllEmployeesPayroll, GetAllSelectedDevice, GetAllSelectedEmployees, GetEmailSetting, RemoveDeviceAttendance, RemoveEmployeeAttendance } from '../../../reduxToolkit/EmployeePayRoll/EmployeePayRollApi';
import { toast } from 'react-toastify';
import { ClearDeleteDeviceToListPayroll, ClearDeleteEmployeesToListPayroll } from '../../../reduxToolkit/EmployeePayRoll/EmployeePayRollSlice';
import { permissionObj } from '../../../Helpers/permission';
import { t } from 'i18next';
import { iconStyle, textFieldStyle } from '../../../Helpers/arabicStyle';
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';
import Cookies from "js-cookie";
import useStyle from '../../../hooks/useStyle';
import CustomTextWithLine from '../../../components/CustomTextWithLine';
import ClearButton from '../../../components/ClearButton';
import arrowUp from "../../../assets/type/arrowup.svg"
import arrowDown from "../../../assets/type/arrowdown.svg"
import arrowUpDown from "../../../assets/type/arrowupdown.svg"
import DeleteModal from '../../Modals/DeleteModal';
import NotFoundAnything from '../../../components/NotFoundAnything';


/*
Author : Arman Ali
Module: manage attendance
github: https://github.com/Arman-Arzoo
*/

// Manage Attendence module main funtion
const ManageAttendence = () => {

    // use hook importer
    const dispatch = useDispatch()
    const lCode = Cookies.get("i18next") || "en";
    //use Selector hook to get state for redux store
    //employee
    const { getAllEmployeesPayroll } = useSelector(state => state.employeePayrollSlice)
    const { getAllSelectedEmployees } = useSelector(state => state.employeePayrollSlice)
    // console.log(getAllSelectedEmployees)
    const { addEmployeesToListPayroll } = useSelector(state => state.employeePayrollSlice)
    const { deleteEmployeesToListPayroll } = useSelector(state => state.employeePayrollSlice)
    //device
    const { getAllDevicePayroll } = useSelector(state => state.employeePayrollSlice)
    const { getAllSelectedDevice } = useSelector(state => state.employeePayrollSlice)
    const { addDeviceToListPayroll } = useSelector(state => state.employeePayrollSlice)
    const { deleteDeviceToListPayroll } = useSelector(state => state.employeePayrollSlice)
    //email setting
    const { getEmailSetting,removeEmployeeAttendance,removeDeviceAttendance} = useSelector(state => state.employeePayrollSlice)
    const { changeTimeAndSelectedDaysUpdate } = useSelector(state => state.employeePayrollSlice)
    console.log(getAllSelectedEmployees)



    //use State hook for local state management
    const [formDate, setFormDate] = useState("1970-01-01T00:00:00");
    const [deleteShow, setDeleteShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [device, setDevice] = useState("")
    const [employee, setEmployee] = useState("")
    const [monday, setMonday] = useState(false)
    const [tuesday, setTuesday] = useState(false)
    const [wednesday, setWednesday] = useState(false)
    const [thursday, setThursday] = useState(false)
    const [firday, setFirday] = useState(false)
    const [saturday, setSaturday] = useState(false)
    const [sunday, setSunday] = useState(false)
    const [isState, setIsState] = useState("")
    const [eName, setEname] = useState("")
    const [pageIncoming, setPageIncoming] = useState(0);
    const [rowsPerPageIncoming, setRowsPerPageincoming] = useState(4);
    const [orderBy, setOrderBy] = useState();
    const [sortBy, setSortBy] = useState();
    const { textField, smallBoxStyle } = useStyle()
    const [isAllCheckedDevice, setIsAllCheckedDevice] = useState(false)
    const [isAllCheckedEmployee, setIsAllCheckedEmployee] = useState(false)
    const [selectedDeviceForDelete, setSelectDeviceForDelete] = useState([])
    const [selectEmployeeForDelete, setSelectEmployeeForDelete] = useState([])
    const [deleteShowDevice, setDeleteShowDevice] = useState(false)
    const [deleteShowEmployee, setDeleteShowEmployee] = useState(false)
    const [startShiftAt, setStartShiftAt] = useState(null)
    const [endShiftAt, setEndShiftAt] = useState(null)
    const [range, setRange] = useState(0)
    const [dayAgoToSendEmail, setDayAgoToSendEmail] = useState(0)


    const { permission } = useSelector(state => state.authenticatioauthennSlice);


    // this function control select all id or unSelect all
    const handelDeleteAllDevice = (e) => {
        setIsAllCheckedDevice(e.target.checked)
        if (e.target.checked) {
            const selectAllIds = getAllSelectedDevice?.map(item => {
                return item?.id
            })
            setSelectDeviceForDelete(selectAllIds)


        } else {
            setSelectDeviceForDelete([])
        }

    }
    // this function handle only specific id base on selection
    const handleCheckboxChangeDevice = (e) => {

        if (e.target.checked) {
            setSelectDeviceForDelete([...selectedDeviceForDelete, e.target.id]);
        } else {
            setSelectDeviceForDelete(selectedDeviceForDelete.filter((removeid) => removeid !== e.target.id));
        }
    };



    // this function control select all id or unSelect all
    const handelDeleteAllEmployee = (e) => {
        setIsAllCheckedEmployee(e.target.checked)
        if (e.target.checked) {
            const selectAllIds = getAllSelectedEmployees?.content?.map(item => {
                return item?.id
            })
            setSelectEmployeeForDelete(selectAllIds)


        } else {
            setSelectEmployeeForDelete([])
        }

    }
    // this function handle only specific id base on selection
    const handleCheckboxChangeEmployee = (e) => {

        if (e.target.checked) {
            setSelectEmployeeForDelete([...selectEmployeeForDelete, e.target.id]);
        } else {
            setSelectEmployeeForDelete(selectEmployeeForDelete.filter((removeid) => removeid !== e.target.id));
        }
    };
    // delete device
    const deleteDevice = (deleteItem) => {
        const body = deleteItem
        dispatch(RemoveDeviceAttendance(body))?.then(()=>{
            dispatch(ClearDeleteDeviceToListPayroll())
        })
    }
    // delete employee
    const deleteEmployee = (deleteItem) => {
        const body = deleteItem
        dispatch(RemoveEmployeeAttendance(body))?.then(()=>{
            dispatch(ClearDeleteEmployeesToListPayroll())
        })
    }

    // clear all state
    const clearAllState = () => {
        setMonday(false)
        setTuesday(false)
        setWednesday(false)
        setThursday(false)
        setFirday(false)
        setSaturday(false)
        setSunday(false)
        setFormDate("1970-01-01T00:00:00")
        setDayAgoToSendEmail(0)
        setStartShiftAt(null)
        setEndShiftAt(null)
        setRange("")
    }

    // set page if change detect
    const handleChangePageIcoming = (event, newPage) => {
        setPageIncoming(newPage);
    };
    // set row per page if change detect
    const handleChangeRowsPerPageIncoming = event => {
        setRowsPerPageincoming(parseInt(event.target.value));
        setPageIncoming(0);
    };

    // funtion to handel add employee
    const handleAddEmployee = (e) => {

        // Find the employee that already Selected
        const checkUserList = getAllSelectedEmployees.content.find(employeeList => {
            return employeeList?.id === e.target.value
        })

        //  payload
        const data = {
            user: {
                id: e.target.value
            }
        }
        // codition to notify and dispatch API
        if (checkUserList != undefined) {
            toast.warn(`${checkUserList?.name} already Selected`)
        } else {
            dispatch(AddEmployeesToListPayroll(data))
            console.log(data)
        }

    }

    // function to handel add device
    const handelAddDevice = (e) => {
        // Find the device that already Selected
        const checkDeviceList = getAllSelectedDevice.find(deviceList => {
            return deviceList?.id === e.target.value
        })

        //  payload
        const data = {
            device: {
                id: e.target.value
            }
        }
        // codition to notify and dispatch API
        if (checkDeviceList != undefined) {
            toast.warn(`${checkDeviceList?.name} already Selected`)
        }
        else {
            // toast.success("selecting")
            dispatch(AddDeviceToListPayroll(data))
        }

    }

    // function to handle time and checkbox
    const handelUpdateTimeAndCheckbox = () => {

        const data = {
            id: getEmailSetting?.id,
            time: formDate?.toLocaleTimeString('it-IT'),
            email: getEmailSetting?.email,
            password: getEmailSetting?.password,
            port: getEmailSetting?.port,
            imapHost: getEmailSetting?.imapHost,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday:firday,
            saturday, 
            sunday,
            daysToSendEmail: dayAgoToSendEmail,
            endShiftAt: endShiftAt?.toLocaleTimeString('it-IT'),
            startShiftAt: startShiftAt?.toLocaleTimeString('it-IT'),
            range,
            timeZone:`GMT-${formDate?.toLocaleTimeString('it-IT')}`

        }
        // console.log(data)
        dispatch(ChangeTimeAndSelectedDaysUpdate(data))
    }

    // dispatch to get result
    useEffect(() => {
        dispatch(GetAllDevicePayroll())
        dispatch(GetAllEmployeesPayroll())

    }, [])

    //useEffect to set the time and checkbox
    useEffect(() => {
        setMonday(getEmailSetting?.monday)
        setTuesday(getEmailSetting?.tuesday)
        setWednesday(getEmailSetting?.wednesday)
        setThursday(getEmailSetting?.thursday)
        setFirday(getEmailSetting?.friday)
        setSaturday(getEmailSetting?.saturday)
        setSunday(getEmailSetting?.sunday)
        setFormDate(new Date(`2014-08-18T${getEmailSetting?.time}`) || "")
        setDayAgoToSendEmail(getEmailSetting?.daysToSendEmail)
        setStartShiftAt(new Date(`2014-08-18T${getEmailSetting?.startShiftAt}`) || "")
        setEndShiftAt(new Date(`2014-08-18T${getEmailSetting?.endShiftAt}`) || "")
        setRange(getEmailSetting?.range)

    }, [getEmailSetting, changeTimeAndSelectedDaysUpdate])

    // dispatch emloyee selected once and re dispatch base on add or delete 
    useEffect(() => {
        const pagination = {
            "order": sortBy === 'asc' ? true : false,
            "page": pageIncoming,
            "size": rowsPerPageIncoming,
            "sortBy": orderBy ? orderBy : "id"
        }
        dispatch(GetAllSelectedEmployees(pagination))
    }, [addEmployeesToListPayroll, removeEmployeeAttendance, pageIncoming, rowsPerPageIncoming])


    // dispatch Device selected once and re dispatch base on add or delete 
    useEffect(() => {
        dispatch(GetAllSelectedDevice())
    }, [addDeviceToListPayroll,removeDeviceAttendance])

    useEffect(() => {
        dispatch(GetEmailSetting())
    }, [changeTimeAndSelectedDaysUpdate])
    return (
        <>
            <div className='custom_head'>
                <div className='left custom_hover_back_link'>
                    <Link to='/dashboard/employee/payroll'>
                        <i className="fa fa-arrow-left" aria-hidden="true"

                            style={{ transform: lCode === "ar" ? "scaleX(-1)" : "" }}
                        ></i>
                    </Link>

                    <p>{t("manage_attendance")}</p>
                    {/* {
                        permission?.includes(permissionObj?.WEB_EMAIL_SETTINGS_READ) &&

                        <Link className='link' to="/dashboard/employee/payroll/email-setting" state={'yes'}>{t("go_to_email_settings")?.toUpperCase()}</Link>
                    } */}
                </div>
            </div>
            <div className="manage_attendence_container">
                <Grid container >
                    {/* device section */}
                    <Grid item xs={4} className="device" >
                        <Stack direction='row' justifyContent="space-between" alignItems="center">
                            <h4>{t("devices")}</h4>
                            <button className="delete-btn-1"
                                disabled={selectedDeviceForDelete?.length === 0}
                                onClick={() => {
                                    setDeleteShowDevice(true)
                                }}

                            >
                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                                {t('delete')}
                            </button>
                        </Stack>
                        <Box marginTop="1rem" marginBottom='1rem'
                            sx={smallBoxStyle}
                        >
                            <FormControl
                                fullWidth
                                size='small'
                                sx={textField}
                            >
                                <InputLabel>{t("device_to_take_attendance")}</InputLabel>
                                <Select size="small"
                                    // value={orderby}
                                    label={t("device_to_take_attendance")}
                                    // onChange={handleOrderBy}
                                    onChange={(e) => {
                                        handelAddDevice(e)
                                    }}
                                >
                                    {
                                        getAllDevicePayroll?.map(device => (
                                            <MenuItem key={device?.id} value={device?.id}>{device?.name}</MenuItem>
                                        ))

                                    }

                                </Select>
                            </FormControl>
                        </Box>
                        <Box className='device_container'>
                        <Stack className="device_header">
                            <Stack direction="row" alignItems="center">
                                <Tooltip title={t("de_/_select_all").toUpperCase()} placement="top">
                                    <Checkbox
                                        className="grid-checkall checkbox"
                                        checked={isAllCheckedDevice}
                                        onChange={handelDeleteAllDevice}
                                        size="small"
                                    />
                                </Tooltip>
                                <p>{t("data")?.toUpperCase()}</p>
                            </Stack>
                            <p>{t("type")?.toUpperCase()}</p>
                        </Stack>
                        {
                            getAllSelectedDevice?.length > 0 ?
                            getAllSelectedDevice?.map((device) => {

                                return (
                                    <Box className='device_card' >
                                        <Box>

                                            <Stack direction="row" alignItems="center">

                                                <Checkbox
                                                    className="grid-checkall checkbox"
                                                    checked={selectedDeviceForDelete?.includes(device?.id)}
                                                    id={device?.id}
                                                    onChange={handleCheckboxChangeDevice}
                                                    size="small"
                                                />
                                                <Box>
                                                    <p>{t("zone")}: <span>{device?.zoneName || "-"}</span></p>
                                                    <p>{t("name")}: <span>{device?.name}</span></p>
                                                </Box>
                                            </Stack>
                                        </Box>
                                        <Box>
                                            <img src={
                                                device?.deviceAccessTypeId == 1 && arrowUp ||
                                                device?.deviceAccessTypeId == 2 && arrowDown ||
                                                device?.deviceAccessTypeId == 3 && arrowUpDown ||
                                                device?.deviceAccessTypeId != 1 || 2|| 3  && "-"
                                            } alt="up" />
                                        </Box>
                                        {/* @imghere */}
                                        {/* <i onClick={() => {
                                            setDeleteId(device?.id);
                                            setDeleteShow(true);
                                            setIsState('device')
                                            setEname(device?.name)
                                        }} className="fa fa-trash" aria-hidden="true"></i> */}

                                    </Box>
                                )
                            })

                            :
                            <NotFoundAnything text={t("no_data")} />
                        }
                       </Box>

                    </Grid>
                    {/* receiver section */}
                    <Grid item xs={8} className="receiver">

                        <Stack direction='row' justifyContent="space-between" alignItems="center">
                            <h4> {t("receivers")}</h4>
                            <button className="delete-btn-1"
                                disabled={selectEmployeeForDelete?.length === 0}
                                onClick={() => {
                                    setDeleteShowEmployee(true)
                                }}

                            >
                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                                {t('delete')}
                            </button>
                        </Stack>

                        {/* table */}
                        <Box marginTop="1rem" marginBottom='1rem'
                            sx={smallBoxStyle}
                        >
                            <FormControl
                                fullWidth
                                size='small'
                                sx={textField}
                            >
                                <InputLabel>{t("employee")}</InputLabel>
                                <Select
                                    size="small"
                                    // value={employee}
                                    label="EMPLOYEE"
                                    onChange={(e) => handleAddEmployee(e)}
                                >
                                    {
                                        getAllEmployeesPayroll?.map(employee => (

                                            <MenuItem key={employee?.userId} value={employee?.userId}>{employee?.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <div className='receiver_table_content'>
                            <table style={{ width: "100%" }}>
                                <thead>

                                    <th className='first'>
                                        <Tooltip title={t("de_/_select_all").toUpperCase()} placement="top">
                                            <Checkbox
                                                className="grid-checkall checkbox"
                                                checked={isAllCheckedEmployee}
                                                onChange={handelDeleteAllEmployee}
                                                size="small"
                                            />
                                        </Tooltip>
                                        {t("name")}
                                    </th>
                                    <th>{t("email")}</th>
                                    <th>{t("phone_number")}</th>
                                    <th>{t("role")}</th>


                                    {/* <th className='last'>options</th> */}
                                </thead>
                                <tbody className='table_body'>
                                    {
                                        getAllSelectedEmployees?.content?.length !== 0 ?

                                            getAllSelectedEmployees?.content?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className='first'>

                                                            <Checkbox
                                                                className="grid-checkall checkbox"
                                                                checked={selectEmployeeForDelete?.includes(item?.id)}
                                                                id={item?.id}
                                                                onChange={handleCheckboxChangeEmployee}
                                                                size="small"
                                                            />
                                                            {item?.name}
                                                        </td>
                                                        <td>{item?.email}</td>
                                                        <td>{item?.phoneNumber}</td>
                                                        <td>{item?.role}</td>

                                                        {/* <td onClick={() => {
                                                            setDeleteId(item?.id);
                                                            setDeleteShow(true);
                                                            setIsState('employee')
                                                            setEname(item?.name)
                                                        }}><i className="fa fa-trash" aria-hidden="true"></i></td> */}

                                                    </tr>
                                                )
                                            }) :
                                            <tr>
                                                <td colSpan="10" style={{
                                                    backgroundColor:"#FCFCFC"
                                                  }}>
                                                    <NotFoundAnything text={t("no_data")} 
                                                    sx={{margin:"1rem"}}
                                                    />
                                                </td>
                                            </tr>
                                    }
                                </tbody>


                            </table>
                        </div>
                        {/* <DeleteDeviceModal
                            show={deleteShow}
                            onHide={() => setDeleteShow(false)}
                            deleteid={deleteId}
                            isState={isState}
                            name={eName}



                        /> */}
                        {/* pagination */}
                        <div className='payroll_pagination d-flex justify-content-center'>
                            <TablePagination
                                component="div"
                                rowsPerPageOptions={[2, 4, 6, 8, 12]}
                                count={getAllSelectedEmployees?.totalElements}
                                page={pageIncoming}
                                onPageChange={handleChangePageIcoming}
                                labelRowsPerPage={t("employees_per_page")}
                                rowsPerPage={rowsPerPageIncoming}
                                onRowsPerPageChange={handleChangeRowsPerPageIncoming}
                            />

                        </div>

                    </Grid>
                </Grid>

                <Box sx={{ paddingTop: '1rem' }}>
                    <CustomTextWithLine title={t("email_setting")} />

                    <Grid container paddingTop={"1rem"} paddingBottom="1.5rem">
                        <Grid item spacing={2} xs={8} sm={8} md={8} lg={8}>
                            <Box sx={{ paddingBottom: "1rem" }}>
                                <ClearButton flagTooltip={true} textTooltip={t("clear_all_inputs")}
                                    handleClear={clearAllState}
                                />
                            </Box>
                            <Grid container spacing={2}>

                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <TimePicker
                                            renderInput={(props) => <TextField size="small"
                                                {...props}
                                            // sx={textFieldStyle} 
                                            //    sx={textField}
                                            />}
                                            ampm={false}
                                            openTo="hours"
                                            views={["hours", "minutes", "seconds"]}
                                            inputFormat="HH:mm:ss"
                                            mask="__:__:__"
                                            label={t("time")?.toUpperCase()}
                                            // disabled={!isCommonArea}
                                            defaultValue={new Date(`2014-08-18T${getEmailSetting?.time}`)}
                                            value={formDate}
                                            onChange={(date) => setFormDate(date)}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <Box sx={smallBoxStyle}>
                                        <TextField size="small"
                                            fullWidth
                                            className='helper_color'
                                            type="number"
                                            label={t("day_ago_to_send_the_email")}
                                            id="SYNC TIME"
                                            helperText={t("leave_0_to_avoid_send_it")?.toUpperCase()}
                                            value={dayAgoToSendEmail}
                                            // onChange={(e) => setDayAgoToSendEmail(e.target.value)}
                                            onChange={(e) => {
                                                let newValue = e.target.value;
                                                // Constrain the value between 0 and 10
                                                newValue = Math.max(0, Math.min(newValue, 10));
                                                setDayAgoToSendEmail(newValue);
                                              }}
                                            InputProps={{
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*',
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <span style={{
                                                            fontSize: "10px",
                                                            fontWeight: "bold"
                                                        }}> {t("days")?.toUpperCase()}</span>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={textField}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Box className='email_setting_item'>
                                    <h2 className='pt-2'>{t("select_the_days")}</h2>
                                    <Box sx={{ paddingLeft: "1rem" }}>
                                        <Stack direction="row" gap="0.5rem" paddingTop="0.8rem">
                                            <input type="checkbox" value={monday}
                                                // defaultChecked={getEmailSetting?.monday}
                                                checked={monday}
                                                onChange={(e) => setMonday(e.target.checked)} />
                                            <p>{t("monday")}</p>
                                        </Stack>

                                        <Stack direction="row" gap="0.5rem" paddingTop="0.8rem">
                                            <input type="checkbox" value={thursday}
                                                // defaultChecked={getEmailSetting?.thursday}
                                                checked={thursday}
                                                onChange={(e) => setThursday(e.target.checked)} />
                                            <p>{t("thursday")}</p>
                                        </Stack>

                                        <Stack direction="row" gap="0.5rem" paddingTop="0.8rem">
                                            <input type="checkbox" value={saturday}
                                                // defaultChecked={getEmailSetting?.saturday}
                                                checked={saturday}
                                                onChange={(e) => setSaturday(e.target.checked)} />
                                            <p>{t("saturday")}</p>
                                        </Stack>

                                        <Stack direction="row" gap="0.5rem" paddingTop="0.8rem">
                                            <input type="checkbox" value={tuesday}
                                                // defaultChecked={getEmailSetting?.tuesday}
                                                checked={tuesday}
                                                onChange={(e) => setTuesday(e.target.checked)} />
                                            <p>{t("tuesday")}</p>
                                        </Stack>

                                        <Stack direction="row" gap="0.5rem" paddingTop="0.8rem">
                                            <input type="checkbox"
                                                value={firday}
                                                checked={firday}
                                                // defaultChecked={getEmailSetting?.firday}
                                                onChange={(e) => setFirday(e.target.checked)} />
                                            <p>{t("friday")}</p>
                                        </Stack>

                                        <Stack direction="row" gap="0.5rem" paddingTop="0.8rem">
                                            <input type="checkbox" value={sunday}
                                                // defaultChecked={getEmailSetting?.sunday}
                                                checked={sunday}
                                                onChange={(e) => setSunday(e.target.checked)} />
                                            <p>{t("sunday")}</p>
                                        </Stack>

                                        <Stack direction="row" gap="0.5rem" paddingTop="0.8rem">
                                            <input type="checkbox" value={wednesday}
                                                checked={wednesday}
                                                // defaultChecked={getEmailSetting?.wednesday}
                                                onChange={(e) => setWednesday(e.target.checked)} />
                                            <p>{t("wednesday")}</p>
                                        </Stack>
                                    </Box>

                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} ></Grid>
                    </Grid>
                </Box>
                <CustomTextWithLine title={t("attendance_setting")} />

                <Grid container paddingTop="2rem" >

                    <Grid item xs={8} sm={8} md={8} lg={8} >

                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        renderInput={(props) => <TextField size="small"
                                            {...props}
                                        // sx={textFieldStyle} 
                                        //    sx={textField}
                                        />}
                                        ampm={false}
                                        openTo="hours"
                                        views={["hours", "minutes", "seconds"]}
                                        inputFormat="HH:mm:ss"
                                        mask="__:__:__"
                                        label={t("start_shift_at")}
                                        // disabled={!isCommonArea}
                                        defaultValue={new Date(`2014-08-18T${getEmailSetting?.time}`)}
                                        value={startShiftAt}
                                        onChange={(date) => setStartShiftAt(date)}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        renderInput={(props) => <TextField size="small"
                                            {...props}
                                        // sx={textFieldStyle} 
                                        //    sx={textField}
                                        />}
                                        ampm={false}
                                        openTo="hours"
                                        views={["hours", "minutes", "seconds"]}
                                        inputFormat="HH:mm:ss"
                                        mask="__:__:__"
                                        label={t("end_shift_at")}
                                        // disabled={!isCommonArea}
                                        defaultValue={new Date(`2014-08-18T${getEmailSetting?.time}`)}
                                        value={endShiftAt}
                                        onChange={(date) => setEndShiftAt(date)}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} paddingTop="1rem">
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <Box sx={smallBoxStyle}>
                                    <TextField size="small"
                                        fullWidth
                                        className='helper_color'
                                        type="number"
                                        label={t("range")?.toUpperCase()}
                                        id="SYNC TIME"
                                        // helperText={t("leave_0_to_avoid_send_it")?.toUpperCase()}
                                        value={range}
                                        onChange={(e) => setRange(e.target.value)}
                                        InputProps={{
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*',
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <span style={{
                                                        fontSize: "10px",
                                                        fontWeight: "bold"
                                                    }}> {t("min")?.toUpperCase()}</span>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={textField}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} ></Grid>
                    <Grid item xs={8} className='save_button mt-5 mb-3' display="flex" justifyContent="center">
                        <button onClick={() => { handelUpdateTimeAndCheckbox() }}>
                            {t("update")?.toUpperCase()}
                        </button>
                    </Grid>
                </Grid>
            </div>

            <DeleteModal
                show={deleteShowDevice}
                onHide={() => setDeleteShowDevice(false)}
                data={selectedDeviceForDelete}
                onClickFn={() => deleteDevice(selectedDeviceForDelete)}
                title_modal={t("manage_attandance")}
                element_modal={t("device")}
                isReset={setSelectDeviceForDelete}
                isAllReset={setIsAllCheckedDevice}
            />
            <DeleteModal
                show={deleteShowEmployee}
                onHide={() => setDeleteShowEmployee(false)}
                data={selectEmployeeForDelete}
                onClickFn={() => deleteEmployee(selectEmployeeForDelete)}
                title_modal={t("manage_attandance")}
                element_modal={t("employee")}
                isReset={setSelectEmployeeForDelete}
                isAllReset={setIsAllCheckedEmployee}
            />

        </>
    )
}

// modal for delete
// export const DeleteDeviceModal = (props) => {
//     console.log(props)
//     const dispatch = useDispatch();

//     // a function to handel delete employee
//     const handleDeleteEmployee = (props) => {

//         dispatch(DeleteEmployeesToListPayroll(props?.deleteid)).then(() => {
//             dispatch(ClearDeleteEmployeesToListPayroll())
//             props.onHide()
//             toast.success("User Removed Successfully")
//         })
//     }

//     // a function to handel delete device
//     const handleDeleteDevice = (props) => {

//         dispatch(DeleteDeviceToListPayroll(props?.deleteid)).then(() => {
//             dispatch(ClearDeleteDeviceToListPayroll())
//             props.onHide()
//             toast.success("Device Removed Successfully")
//         })
//     }


//     return (
//         <Modal
//             className="filter_device_model"
//             {...props}
//             // size="sm"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header className='fiter_event_model_head'>
//                 <Modal.Title
//                     className='title'
//                 >
//                     {props?.isState == "device" ? t("remove_device") : t("remove_employee")}
//                 </Modal.Title>
//                 <img
//                     src={cross}
//                     style={{
//                         position: "absolute",
//                         padding: "1px",
//                         right: "3px",
//                         width: "15px",
//                         height: "15px",
//                         top: "3px",
//                         cursor: "pointer",
//                     }}
//                     onClick={() =>
//                         props.onHide()
//                     }
//                 />
//             </Modal.Header>
//             <Modal.Body>
//                 {
//                     props?.isState == "device" &&
//                     <p style={{ fontSize: '14px', textAlign: 'center', paddingBottom: "1.5rem" }}>
//                         The device <span style={{ fontWeight: 'bold', color: '#707070' }}>{props?.name}</span> no longer
//                         {/* <br /> */}
//                         will use to retrieve the information to check <br />the access
//                     </p>
//                 }
//                 {
//                     props?.isState == "employee" &&
//                     <p style={{ fontSize: '14px', textAlign: 'center', paddingBottom: "1.5rem" }}>

//                         {t("remove_confirmation_msg")}
//                         {/* <br /> */}
//                         <span style={{ fontWeight: 'bold', color: '#707070' }}>{props?.name} </span>
//                         from the list
//                         {/* <br /> */}
//                         to get the email?
//                     </p>
//                 }
//                 <div className="changeImgBottomDiv mt-3">
//                     <button
//                         className="changeImgCancelBtn"
//                         style={{ fontSize: "12px" }}
//                         onClick={() => props.onHide()}
//                     >
//                         {t("cancel")?.toUpperCase()}
//                     </button>
//                     <button
//                         className="changeImgChangeBtn"
//                         style={{ fontSize: "12px" }}
//                         onClick={() => {
//                             props?.isState == "device" && handleDeleteDevice(props) ||
//                                 props?.isState == "employee" && handleDeleteEmployee(props)
//                         }}
//                     >
//                         {t("confirm")?.toUpperCase()}
//                     </button>
//                 </div>
//             </Modal.Body>
//         </Modal>
//     )
// }

export default ManageAttendence