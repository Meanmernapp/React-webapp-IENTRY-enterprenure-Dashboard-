import { Box, FormControl, Grid, InputLabel, Select, MenuItem, Stack, TextField } from '@mui/material'
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
import { AddDeviceToListPayroll, AddEmployeesToListPayroll, ChangeTimeAndSelectedDaysUpdate, DeleteDeviceToListPayroll, DeleteEmployeesToListPayroll, GetAllDevicePayroll, GetAllEmployeesPayroll, GetAllSelectedDevice, GetAllSelectedEmployees, GetEmailSetting } from '../../../reduxToolkit/EmployeePayRoll/EmployeePayRollApi';
import { toast } from 'react-toastify';
import { ClearDeleteDeviceToListPayroll, ClearDeleteEmployeesToListPayroll } from '../../../reduxToolkit/EmployeePayRoll/EmployeePayRollSlice';
import { permissionObj } from '../../../Helpers/permission';
import { t } from 'i18next';
import { iconStyle, textFieldStyle } from '../../../Helpers/arabicStyle';
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';
import Cookies from "js-cookie";


/*
Author : Arman Ali
Module: Zone
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
    const { getEmailSetting } = useSelector(state => state.employeePayrollSlice)
    const { changeTimeAndSelectedDaysUpdate } = useSelector(state => state.employeePayrollSlice)
    console.log(getEmailSetting)



    //use State hook for local state management
    const [formDate, setFormDate] = useState("");
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

    const { permission } = useSelector(state => state.authenticatioauthennSlice);

    console.log("firday", firday)
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
            dispatch(AddEmployeesToListPayroll(data)).then(() => {
                toast.success("Employee Add Successfully")
            })
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
        } else {
            // toast.success("selecting")
            dispatch(AddDeviceToListPayroll(data)).then(() => {
                toast.success("Device Add Successfully")
            })
        }

    }

    // function to handle time and checkbox
    const handelUpdateTimeAndCheckbox = () => {

        const data = {
            id: getEmailSetting?.id,
            time: formDate?.toLocaleTimeString('it-IT'),
            monday,
            tuesday,
            wednesday,
            thursday,
            firday,
            saturday,
            sunday,
            email: getEmailSetting?.email,
            password: getEmailSetting?.password,
            port: getEmailSetting?.port,
            imapHost: getEmailSetting?.imapHost
        }

        console.log(data)


        dispatch(ChangeTimeAndSelectedDaysUpdate(data)).then(() => {
            toast.success("Updated Successfully")
        })
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
        // setFirday(getEmailSetting?.firday)
        setSaturday(getEmailSetting?.saturday)
        setSunday(getEmailSetting?.sunday)
        setFormDate(getEmailSetting?.time || "")
        setFormDate(new Date(`2014-08-18T${getEmailSetting?.time}`) || "")

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
    }, [addEmployeesToListPayroll, deleteEmployeesToListPayroll, pageIncoming, rowsPerPageIncoming])


    // dispatch Device selected once and re dispatch base on add or delete 
    useEffect(() => {
        dispatch(GetAllSelectedDevice())
    }, [addDeviceToListPayroll, deleteDeviceToListPayroll])

    useEffect(() => {
        dispatch(GetEmailSetting())
    }, [changeTimeAndSelectedDaysUpdate])
    return (
        <>
            <div className='custom_head'>
                <div className='left custom_hover_back_link'>
                    <Link to='/dashboard/employee/payroll'>
                        <i className="fa fa-arrow-left" aria-hidden="true" 
                        // style={iconStyle}
                        style={{transform:lCode === "ar" ? "scaleX(-1)" : ""}}
                        ></i>
                    </Link>

                    <p>{t("manage_attendance")}</p>
                    {
                        permission?.includes(permissionObj?.WEB_EMAIL_SETTINGS_MENU) &&
                        
                        <Link className='link' to="/dashboard/employee/payroll/email-setting" state={'yes'}>{t("go_to_email_settings")?.toUpperCase()}</Link>
                    }
                </div>
            </div>
            <div className="manage_attendence_container">
                <Grid container >
                    {/* device section */}
                    <Grid item xs={4} className="device" >
                        <h4>{t("devices")}</h4>
                        <Box marginTop="1rem" marginBottom='1rem'
                            sx={{
                                width: "100%",
                                maxWidth: "100%",
                                fontSize: "20px",
                                height: "40px",
                            }}
                        >
                            <FormControl fullWidth 
                            // sx={textFieldStyle}
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

                                            <MenuItem value={device?.id}>{device?.name}</MenuItem>
                                        ))

                                    }

                                </Select>
                            </FormControl>
                        </Box>
                        {
                            getAllSelectedDevice?.map((device) => {

                                return (
                                    <Box className='device_card' >
                                        <Box>
                                            <p>{t("zone")}: <span>Main Access Build A</span></p>
                                            <p>{t("name")}: <span>{device?.name}</span></p>
                                        </Box>
                                        <i onClick={() => {
                                            setDeleteId(device?.id);
                                            setDeleteShow(true);
                                            setIsState('device')
                                            setEname(device?.name)
                                        }} className="fa fa-trash" aria-hidden="true"></i>

                                    </Box>
                                )
                            })
                        }
                        <DeleteDeviceModal
                            show={deleteShow}
                            onHide={() => setDeleteShow(false)}
                            deleteid={deleteId}
                            isState={isState}
                            name={eName}
                        />

                    </Grid>
                    {/* receiver section */}
                    <Grid item xs={8} className="receiver">
                        <h4> {t("receivers")}</h4>
                        {/* table */}
                        <Box marginTop="1rem" marginBottom='1rem'
                            sx={{
                                width: "100%",
                                maxWidth: "100%",
                                fontSize: "20px",
                                height: "40px",
                            }}
                        >
                            <FormControl fullWidth 
                            // sx={textFieldStyle}
                            >
                                <InputLabel>{t("employee")}</InputLabel>
                                <Select size="small"
                                    value={employee}
                                    label="EMPLOYEE"
                                    onChange={(e) => handleAddEmployee(e)}
                                >
                                    {
                                        getAllEmployeesPayroll?.map(employee => (

                                            <MenuItem value={employee?.id}>{employee?.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <div className='receiver_table_content'>
                            <table style={{ width: "100%" }}>
                                <thead>
                                    <th className='first'> {t("name")}</th>
                                    <th>{t("email")}</th>
                                    <th>{t("phone_number")}</th>
                                    <th>{t("role")}</th>
                                    <th>{t("opt")}</th>

                                    {/* <th className='last'>options</th> */}
                                </thead>
                                <tbody className='table_body'>
                                    {
                                        getAllSelectedEmployees?.content?.length !== 0 ?

                                            getAllSelectedEmployees?.content?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className='first'>{item?.name}</td>
                                                        <td>{item?.email}</td>
                                                        <td>{item?.phoneNumber}</td>
                                                        <td>{item?.userType?.name}</td>
                                                        <td onClick={() => {
                                                            setDeleteId(item?.id);
                                                            setDeleteShow(true);
                                                            setIsState('employee')
                                                            setEname(item?.name)
                                                        }}><i className="fa fa-trash" aria-hidden="true"></i></td>

                                                    </tr>
                                                )
                                            }) :
                                            <tr>
                                                <td colSpan="10">
                                                    <NotFoundDataWarning text={t("no_data")} />
                                                </td>
                                            </tr>
                                    }
                                </tbody>


                            </table>
                        </div>
                        <DeleteDeviceModal
                            show={deleteShow}
                            onHide={() => setDeleteShow(false)}
                            deleteid={deleteId}
                            isState={isState}
                            name={eName}



                        />
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
                        <h2>{t("select_the_date_and_time")}</h2>
                        <Grid mt='1.5rem' mb='1.5rem' xs={5}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    renderInput={(props) => <TextField size="small"
                                        {...props} 
                                        // sx={textFieldStyle} 
                                        />}
                                    ampm={false}
                                    openTo="hours"
                                    views={["hours", "minutes", "seconds"]}
                                    inputFormat="HH:mm:ss"
                                    mask="__:__:__"
                                    label="HORA"
                                    // disabled={!isCommonArea}
                                    defaultValue={new Date(`2014-08-18T${getEmailSetting?.time}`)}
                                    value={formDate}
                                    onChange={(date) => setFormDate(date)}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <h2>{t("select_the_days")}</h2>

                        {/* <Grid display="flex" mt='1rem'> */}
                        <Grid container ml='1rem' mt="1rem">
                            <Grid item xs={4} display="flex" alignItems="center" gap="0.5rem">
                                <input type="checkbox" value={monday}
                                    // defaultChecked={getEmailSetting?.monday}
                                    checked={monday}
                                    onChange={(e) => setMonday(e.target.checked)} />
                                <p>{t("monday")}</p>
                            </Grid>
                            <Grid item xs={4} display="flex" alignItems="center" gap="0.5rem">
                                <input type="checkbox" value={thursday}
                                    // defaultChecked={getEmailSetting?.thursday}
                                    checked={thursday}
                                    onChange={(e) => setThursday(e.target.checked)} />
                                <p>{t("thursday")}</p>
                            </Grid>
                            <Grid item xs={4} display="flex" alignItems="center" gap="0.5rem">
                                <input type="checkbox" value={saturday}
                                    // defaultChecked={getEmailSetting?.saturday}
                                    checked={saturday}
                                    onChange={(e) => setSaturday(e.target.checked)} />
                                <p>{t("saturday")}</p>
                            </Grid>

                        </Grid>
                        <Grid container ml='1rem' mt="1rem">
                            <Grid item xs={4} display="flex" alignItems="center" gap="0.5rem">
                                <input type="checkbox" value={tuesday}
                                    // defaultChecked={getEmailSetting?.tuesday}
                                    checked={tuesday}
                                    onChange={(e) => setTuesday(e.target.checked)} />
                                <p>{t("tuesday")}</p>
                            </Grid>
                            <Grid item xs={4} display="flex" alignItems="center" gap="0.5rem">
                                <input type="checkbox"
                                    value={firday}
                                    checked={firday}
                                    // defaultChecked={getEmailSetting?.firday}
                                    onChange={(e) => setFirday(e.target.checked)} />
                                <p>{t("friday")}</p>
                            </Grid>
                            <Grid item xs={4} display="flex" alignItems="center" gap="0.5rem">
                                <input type="checkbox" value={sunday}
                                    // defaultChecked={getEmailSetting?.sunday}
                                    checked={sunday}
                                    onChange={(e) => setSunday(e.target.checked)} />
                                <p>{t("sunday")}</p>
                            </Grid>
                        </Grid>
                        <Grid container ml='1rem' mt="1rem">
                            <Grid item xs={4} display="flex" alignItems="center" gap="0.5rem">
                                <input type="checkbox" value={wednesday}
                                    checked={wednesday}
                                    // defaultChecked={getEmailSetting?.wednesday}
                                    onChange={(e) => setWednesday(e.target.checked)} />
                                <p>{t("wednesday")}</p>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid container className='save_button' mt="1.5rem">
                    <Grid item xs={4}></Grid>
                    <Grid item xs={8} display="flex" justifyContent="center">
                        <button onClick={() => { handelUpdateTimeAndCheckbox() }}>{t("save_changes")?.toUpperCase()} <i className="fa fa-floppy-o" aria-hidden="true"></i></button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

// modal for delete
export const DeleteDeviceModal = (props) => {
    console.log(props)
    const dispatch = useDispatch();

    // a function to handel delete employee
    const handleDeleteEmployee = (props) => {

        dispatch(DeleteEmployeesToListPayroll(props?.deleteid)).then(() => {
            dispatch(ClearDeleteEmployeesToListPayroll())
            props.onHide()
            toast.success("User Removed Successfully")
        })
    }

    // a function to handel delete device
    const handleDeleteDevice = (props) => {

        dispatch(DeleteDeviceToListPayroll(props?.deleteid)).then(() => {
            dispatch(ClearDeleteDeviceToListPayroll())
            props.onHide()
            toast.success("Device Removed Successfully")
        })
    }


    return (
        <Modal
            className="filter_device_model"
            {...props}
            // size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='fiter_event_model_head'>
                <Modal.Title
                    className='title'
                >
                    {props?.isState == "device" ? t("remove_device") : t("remove_employee")}
                </Modal.Title>
                <img
                    src={cross}
                    style={{
                        position: "absolute",
                        padding: "1px",
                        right: "3px",
                        width: "15px",
                        height: "15px",
                        top: "3px",
                        cursor: "pointer",
                    }}
                    onClick={() =>
                        props.onHide()
                    }
                />
            </Modal.Header>
            <Modal.Body>
                {
                    props?.isState == "device" &&
                    <p style={{ fontSize: '14px', textAlign: 'center', paddingBottom: "1.5rem" }}>
                        The device <span style={{ fontWeight: 'bold', color: '#707070' }}>{props?.name}</span> no longer
                        {/* <br /> */}
                        will use to retrieve the information to check <br />the access
                    </p>
                }
                {
                    props?.isState == "employee" &&
                    <p style={{ fontSize: '14px', textAlign: 'center', paddingBottom: "1.5rem" }}>

                        {t("remove_confirmation_msg")}
                        {/* <br /> */}
                        <span style={{ fontWeight: 'bold', color: '#707070' }}>{props?.name} </span>
                        from the list
                        {/* <br /> */}
                        to get the email?
                    </p>
                }
                <div className="changeImgBottomDiv mt-3">
                    <button
                        className="changeImgCancelBtn"
                        style={{ fontSize: "12px" }}
                        onClick={() => props.onHide()}
                    >
                        {t("cancel")?.toUpperCase()}
                    </button>
                    <button
                        className="changeImgChangeBtn"
                        style={{ fontSize: "12px" }}
                        onClick={() => {
                            props?.isState == "device" && handleDeleteDevice(props) ||
                                props?.isState == "employee" && handleDeleteEmployee(props)
                        }}
                    >
                        {t("confirm")?.toUpperCase()}
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ManageAttendence