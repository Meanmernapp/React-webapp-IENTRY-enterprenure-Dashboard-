import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Switch, Divider, Grid, FormHelperText, InputAdornment } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { GetAccessType, GetDeviceSmartlock, GetDeviceType, GetDeviceZone, GetListStatusZone, UpdateDeviceSmartlock, UpdateDeviceZone } from '../../../reduxToolkit/EmployeeZones/EmployeeZonesApi'
import { GetAntiPassBackType, GetEscortMode, GetDeviceDetails, GetDeviceAirbnkLock, CreateAirbnkLock, CreateDeviceApi, UpdateDeviceApi, DeleteAirbnk, UpdateAirbnk, DeleteSmartLock, GetListStatusDevice } from '../../../reduxToolkit/Devices/DevicesApi';
import { getWorkStations } from '../../../reduxToolkit/CompanyEmployees/CompanyEmployeesApi';
import { GetAllZone } from '../../../reduxToolkit/EmployeeOnBoarding/EmployeeOnBoardingApi';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import ClearButton from '../../../components/ClearButton';
import DeleteModal from "../../Modals/DeleteModal";
import { TABLES } from "../../../Apis/Tables";
import ic_left_arrow from "../../../assets/images/ic_left_arrow.svg"
import { permissionObj } from "../../../Helpers/permission";



const CreateUpdateDevices = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const { id } = useParams();
    const { getAccessType, } = useSelector(state => state.EmployeeZonesSlice)
    const { getAntiPassBackType, getEscortMode, getDeviceAirbnkLock, deleteAirbnk, deleteSmartLock, getListStatusDevice } = useSelector(state => state.DevicesSlice)
    const { getDeviceType, getListStatusZone } = useSelector(state => state.EmployeeZonesSlice)
    const { getallzone } = useSelector(state => state.employeeOnBoardingSlice);
    const { employeeWorkStations } = useSelector(state => state.CompanyEmployeesSlice);
    const { permission } = useSelector(state => state.authenticatioauthennSlice);

    // Props to the delete modal window
    const title_modal = `delete_devices`;
    const element_modal = `device_s`;
    const delete_table = `${TABLES.DEVICES}`;

    // use State hook for local state management
    const [lockDeleted, setLockDeleted] = useState(false);
    const [deleteDeviceShow, setDeleteDeviceShow] = useState(false);
    const [selectDeviceForDelete, setSelectDeviceForDelete] = useState([]);
    const [deletedFlag, setDeletedFlag] = useState(false);


    const { zoneDetailFatherAndChild } = useSelector(state => state.EmployeeZonesSlice)



    const [deviceName, setDeviceName] = React.useState('')
    const [deviceId, setDeviceId] = React.useState('')
    const [zoneName, setZoneName] = React.useState('')
    const [zone, setZone] = React.useState('')
    const [deviceType, setDeviceType] = React.useState('')
    const [statusValue, setStatusValue] = React.useState('')
    const [ip, setIp] = React.useState('')
    const [accessType, setAccessType] = React.useState('')
    const [antiPassBackType, setAntiPassBackType] = React.useState('')
    const [escortMode, setEscortMode] = React.useState('')
    const [sn, setSn] = React.useState('')
    const [mac, setMac] = React.useState('')
    const [firebaseId, setFirebaseId] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [syncTime, setSyncTime] = React.useState('')
    const [validationNumber, setValidationNumber] = React.useState('');
    const [description, setDescription] = React.useState('')
    const [smartCard, setSmartCard] = React.useState(false)
    const [facialRecognition, setFacialRecognition] = React.useState(false)
    const [qr, setQr] = React.useState(false)
    const [pin, setPin] = React.useState(false)
    const [fingerprint, setFingerprint] = React.useState(false)
    const [bluetooth, setBluetooth] = React.useState(false)
    const [showLog, setShowLog] = React.useState(false)
    const [showUserList, setShowUserList] = React.useState(false)
    const [synchorizeSelfies, setSynchorizeSelfies] = React.useState(false)
    const [playSounds, setPlaySounds] = React.useState(false)
    const [smartLockId, setSmartLockId] = React.useState("")
    const [smartLockData, setSmartLockData] = React.useState("")
    const [smartLockBattery, setSmartLockBattery] = React.useState('')
    const [smartLockMac, setSmartLockMac] = React.useState('')
    const [smartLockBatteryTime, setSmartLockBatteryTime] = React.useState('')
    const [airbnkLockId, setAirbnkLockId] = React.useState("")
    const [airbnkLockKey, setAirbnkLockKey] = React.useState("")
    const [airbnkLockSerialNumber, setAirbnkLockSerialNumber] = React.useState('')

    const [requestSignature, setRequestSignature] = React.useState('')
    const [requestSignatureAlways, setRequestSignatureAlways] = React.useState('')
    const [enableTTLock, setEnableTTLock] = React.useState(false)
    const [enableAirbnk, setEnableAirbnk] = React.useState(false)
    const [enableRelay, setEnableRelay] = React.useState('')
    const [enableRelay0, setEnableRelay0] = React.useState(false)
    const [enableRelay1, setEnableRelay1] = React.useState(false)
    const [enableRelaySR3, setEnableRelaySR3] = React.useState('')
    const [enableRelaySR34ch, setEnableRelaySR34ch] = React.useState('')
    const [linked, setLinked] = React.useState(false)
    const [deviceRestriction, setDeviceRestriction] = React.useState('')

    //Enum to determine what type of reader and lock is able for each type of device
    const allowedCheckboxes = {
        1: ["fingerprint", "rfid", "qr", "airbnk", "ttlock", "relay0"],
        2: ["fingerprint", "rfid", "qr", "airbnk", "ttlock"],
        3: ["facialRecognition", "fingerprint", "rfid", "qr", "airbnk", "ttlock", "relay0", "relay1"],
        4: ["facialRecognition", "rfid", "qr", "airbnk", "ttlock", "relay0"],
        5: ["fingerprint", "rfid", "qr", "airbnk", "ttlock"],
        6: ["facialRecognition", "rfid", "qr", "airbnk", "ttlock", "relay0"],
        7: ["facialRecognition", "rfid", "qr", "airbnk", "ttlock", "relay0"]
    };

    const lockChecked = enableAirbnk || enableRelay0 || enableRelay1 || enableTTLock;

    // This section cleans the Airbnk required fields if enableAirbnk is false
    useEffect(() => {
        if (enableAirbnk === false) {
            setAirbnkLockKey("")
            setAirbnkLockSerialNumber("")
        }
    }, [enableAirbnk])

    // This section re-route us when a device is deleted
    useEffect(() => {
        if (deletedFlag) {
            location?.state?.zoneNameProps !== undefined ?
                navigate("/dashboard/employee/zones/singlezonedetails")
                :
                navigate("/dashboard/employee/devices")
        }
    }, [deletedFlag])

    useEffect(() => {
        dispatch(GetListStatusZone());
        dispatch(GetListStatusDevice());
        dispatch(GetAccessType());
        dispatch(GetDeviceType());
        dispatch(GetAntiPassBackType());
        dispatch(GetEscortMode());
        dispatch(GetAllZone());
        dispatch(getWorkStations());
        {
            if (location?.state?.zoneNameProps !== undefined) {
                setZoneName(zoneDetailFatherAndChild?.id)
            }
        }
        if (id !== undefined) {
            dispatch(GetDeviceDetails(id)).then(({ payload: { data: { data } } }) => {
                setDeviceName(data?.name)
                setDeviceId(data?.id)
                setZoneName(data?.zoneId)
                setZone(data?.zoneName)
                setDeviceType(data?.deviceTypeId)
                setStatusValue(data?.statusId)
                setIp(data?.ip)
                setAccessType(data?.deviceAccessTypeId)
                setAntiPassBackType(data?.antiPassBackId)
                setEscortMode(data?.escortId)
                setSn(data?.serialNumber)
                setMac(data?.mac)
                setFirebaseId(data?.firebaseId)
                setPassword(data?.password)
                setSyncTime(data?.syncTime)
                setValidationNumber(data?.validationNumber)
                setDescription(data?.description)
                setSmartCard(data?.rfidReader)
                setFacialRecognition(data?.facialRecognition)
                setQr(data?.qrCodeReader)
                setPin(data?.pin)
                setFingerprint(data?.fingerprintReader)
                setBluetooth(data?.bluetoothReader)
                setShowLog(data?.showLogo)
                setShowUserList(data?.showUserList)
                setSynchorizeSelfies(data?.synchronizeSelfie)
                setPlaySounds(data?.playSound)
                setRequestSignature(data?.requestSignature)
                setRequestSignatureAlways(data?.requestSignatureAlways)
                setEnableTTLock(data?.enableTTLock)
                setEnableAirbnk(data?.enableAirbnk)
                setEnableRelay(data?.enableRelay)
                setEnableRelay0(data?.enableRelay0)
                setEnableRelay1(data?.enableRelay1)
                setEnableRelaySR3(data?.enableRelaySR3)
                setEnableRelaySR34ch(data?.enableRelaySR34ch)
                setDeviceRestriction(data?.deviceRestrictionId)

                {
                    (data?.enableAirbnk && !lockDeleted) &&
                        dispatch(GetDeviceAirbnkLock(id)).then(({ payload: { data: { data } } }) => {
                            setAirbnkLockId(data?.id)
                            setAirbnkLockKey(data?.key)
                            setAirbnkLockSerialNumber(data?.serialNumber)
                            setSmartLockMac(data?.mac)
                            setSmartLockBatteryTime(data?.batteryTime)
                            if (data?.id !== undefined) {
                                setLinked(true)
                            }
                        })
                }
                {
                    (data?.enableTTLock && !lockDeleted) &&
                        dispatch(GetDeviceSmartlock(id)).then(({ payload: { data: { data } } }) => {
                            setSmartLockId(data?.id)
                            setSmartLockData(data?.data)
                            setSmartLockBattery(data?.battery)
                            setSmartLockMac(data?.mac)
                            setSmartLockBatteryTime(data?.batteryTime)
                            if (data?.id !== undefined) {
                                setLinked(true)
                            }
                        })
                }
            })
        }
    }, [])

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [showHelperText, setShowHelperText] = useState(false);


    const handleClickAirbnk = (e) => {
        {
            !linked ? setEnableAirbnk(e.target.checked) : toast.warn(t('please_unlink_the_current_lock'));
        }
    }

    //This section indicates what to do when we click TTLock checkbox
    const handleClickTTLock = (e) => {
        {
            !linked ? setEnableTTLock(e.target.checked) : toast.warn(t('please_unlink_the_current_lock'));
        }
    }

    //This section indicates what to do when we click clean button
    const handleClear = () => {
        setDeviceName("");
        if (location?.state?.zoneNameProps === undefined) {
            setZoneName("");
        }
        setDeviceType("");
        setStatusValue("");
        setIp("");
        setAccessType("");
        setSn("");
        setMac("");
        setPassword("");
        setDescription("");
        setAntiPassBackType("");
        setEscortMode("");
        setRequestSignature("");
        setSyncTime("");
        setValidationNumber("");
        setShowLog(false);
        setShowUserList(false);
        setSynchorizeSelfies(false);
        setPlaySounds(false);
        setFacialRecognition(false);
        setFingerprint(false);
        setQr(false);
        setBluetooth(false);
        setSmartCard(false);
        setPin(false);
        setEnableRelay0(false);
        setEnableRelay1(false);
        if (!linked) {
            setEnableAirbnk(false);
            setEnableTTLock(false);
            setAirbnkLockKey('');
            setAirbnkLockSerialNumber('');
        }
    }

    //This section indicates what to do when we click UNLINK
    const handleChangeLink = () => {
        setLinked(false)
        if (enableAirbnk) {
            dispatch(DeleteAirbnk(deviceId)).then(({ payload: { data: { data, success } } }) => {
                {
                    success === true ? setLockDeleted(true) : setLinked(true)
                }
                {
                    success === true ? toast.success(t('airbnk_unlinked_and_deleted_successfully')) : toast.error(t('something_went_wrong_unlinking_the_lock'))
                }
                {
                    success === true && setEnableAirbnk(false)
                }
            })
        }

        if (enableTTLock) {
            dispatch(DeleteSmartLock(deviceId)).then(({ payload: { data: { data, success } } }) => {
                {
                    success === true ? setLockDeleted(true) : setLinked(true)
                }
                {
                    success === true ? toast.success(t('smartlock_unlinked_and_deleted_successfully')) : toast.error(t('something_went_wrong_unlinking_the_lock'))
                }
                {
                    success === true && setEnableTTLock(false)
                }
            })
        }

    }

    const handelCreateDevice = () => {

        const body = {
            deviceAccessTypeId: accessType,
            bluetoothReader: bluetooth,
            rfidReader: smartCard,
            description,
            deviceTypeId: deviceType,
            facialRecognition,
            fingerprintReader: fingerprint,
            firebaseId,
            ip,
            mac,
            name: deviceName,
            password,
            pin,
            qrCodeReader: qr,
            serialNumber: sn,
            showLogo: showLog,
            showUserList,
            statusId: statusValue,
            escortId: escortMode,
            antiPassBackId: antiPassBackType,
            syncTime: syncTime,
            synchronizeSelfie: synchorizeSelfies,
            playSound: playSounds,
            zoneId: zoneName == '' ? null : zoneName,
            requestSignature: requestSignature,
            requestSignatureAlways: requestSignatureAlways,
            enableTTLock: enableTTLock,
            enableAirbnk: enableAirbnk,
            enableRelay: enableRelay,
            enableRelay0: enableRelay0,
            enableRelay1: enableRelay1,
            enableRelaySR3: enableRelaySR3,
            enableRelaySR34ch: enableRelaySR34ch,
            deviceRestrictionId: deviceRestriction
        }
        setFormSubmitted(true);
        setShowHelperText(true);
        if (id) {
            body.id = id
            if (ip !== "" && mac !== "" && deviceName !== "" && deviceType !== "" && statusValue !== ""
                && accessType !== "" && sn !== "" && antiPassBackType !== "" && escortMode !== "" && validationNumber !== "" && ((enableAirbnk && airbnkLockKey !== "" && airbnkLockSerialNumber !== "") || (!enableAirbnk && airbnkLockKey === "" && airbnkLockSerialNumber === ""))) {
                dispatch(UpdateDeviceApi(body)).then(({ payload: { data: { data, success } } }) => {
                    {
                        (success === true) ? toast.success(t('device_updated_successfully')) : toast.error(t('fail_to_update_device'))
                    }

                    if (enableAirbnk === true && data !== undefined && linked) {
                        const body = {
                            "id": airbnkLockId,
                            "deviceId": data?.id,
                            "key": airbnkLockKey,
                            "serialNumber": airbnkLockSerialNumber,
                        }
                        dispatch(UpdateAirbnk(body)).then(({ payload: { data: { data, success } } }) => {
                            {
                                (success === true) ? toast.success(t('airbnk_lock_updated_successfully')) : toast.error(t('fail_to_update_airbnk_Lock'))
                            }
                        })
                    }
                    if (enableAirbnk === true && data !== undefined && !linked) {
                        const body = {
                            "deviceId": data?.id,
                            "key": airbnkLockKey,
                            "serialNumber": airbnkLockSerialNumber,
                        }
                        dispatch(CreateAirbnkLock(body)).then(({ payload: { data: { data } } }) => {
                            {
                                (data?.id !== undefined) ? toast.success(t('airbnk_lock_created_successfully')) : toast.error(t('fail_to_create_airbnk_lock'))
                            }
                        })
                    }
                    location?.state?.zoneNameProps !== undefined ?
                        navigate("/dashboard/employee/zones/singlezonedetails")
                        :
                        navigate("/dashboard/employee/devices")
                })
            }
            else {
                toast.warn(t('fill_required_fields'))
            }
        } else {
            if (ip !== "" && mac !== "" && deviceName !== "" && deviceType !== "" && statusValue !== ""
                && accessType !== "" && sn !== "" && antiPassBackType !== "" && escortMode !== "" && validationNumber !== "" && ((enableAirbnk && airbnkLockKey !== "" && airbnkLockSerialNumber !== "") || (!enableAirbnk && airbnkLockKey === "" && airbnkLockSerialNumber === ""))) {
                dispatch(CreateDeviceApi(body)).then(({ payload: { data: { data } } }) => {
                    {
                        (data?.id !== undefined) ? toast.success(t('device_created_successfully')) : toast.error(t('fail_to_create_device'))
                    }
                    if (enableAirbnk === true && data !== undefined) {
                        const body = {
                            "batteryTime": Number(smartLockBatteryTime),
                            "device": {
                                id: data?.id,
                            },
                            "deviceId": data?.id,
                            "key": airbnkLockKey,
                            "serialNumber": airbnkLockSerialNumber,
                        }
                        dispatch(CreateAirbnkLock(body)).then(({ payload: { data: { data } } }) => {
                            {
                                (data?.id !== undefined) ? toast.success(t('airbnk_lock_created_successfully')) : toast.error(t('fail_to_create_airbnk_lock'))
                            }
                        })
                    }
                    location?.state?.zoneNameProps !== undefined ?
                        navigate("/dashboard/employee/zones/singlezonedetails")
                        :
                        navigate("/dashboard/employee/devices")
                })
            }
            else {
                toast.warn(t('fill_required_fields'))
            }
        }
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
            zIndex: 0
        },
        "& 	.MuiFormLabel-filled": {
            marginTop: '-5px',
        }
    }




    return (
        <div>
            <div className="update_zone_header">

                <div className="update_zone_header_Left">
                    {
                        location?.state?.zoneNameProps !== undefined ?
                            <Link className='top-left-arrow-container' to="/dashboard/employee/zones/singlezonedetails"
                            >
                                <button className='btn-left-arrow'
                                >
                                    <img src={ic_left_arrow} alt="ic_left_arrow" />
                                </button>
                            </Link>
                            :
                            <Link className='top-left-arrow-container' to="/dashboard/employee/devices"
                            >
                                <button className='btn-left-arrow'
                                >
                                    <img src={ic_left_arrow} alt="ic_left_arrow" />
                                </button>
                            </Link>
                    }
                    <h2>
                        {id === undefined ? t("create_device")?.toUpperCase() : t("update_device")?.toUpperCase()}
                    </h2>
                </div>

                {id !== undefined &&
                    <div className="container-top-right-btns mr-5"
                    >
                        {
                            permission?.includes(permissionObj?.WEB_DEVICE_DELETE) &&
                            <button className="delete-btn-1"
                                onClick={() => {
                                    setSelectDeviceForDelete([...selectDeviceForDelete, deviceId]);
                                    setDeleteDeviceShow(true)
                                    setDeletedFlag(false)
                                }}
                            >
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                                {t('delete')}
                            </button>
                        }
                    </div>
                }
            </div>
            <div className='divice_wrapper'>

                <div className='container-fluid'>

                    <div className='create_device_data'>
                        <Box
                            sx={{
                                position: "relative"
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <p sx={{ display: "inline-block", pr: 1 }}>
                                    {t("data")}
                                </p>
                                <Divider
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        right: 0,
                                        left: `${t("data").length * 1 + 1}rem`,
                                        background: "#146F62",
                                        height: "3px !important",
                                        opacity: "1",
                                        borderRadius: "10px"
                                    }}
                                />
                            </Box>
                            <ClearButton handleClear={handleClear} />
                        </Box>
                        {id !== undefined ?
                            <>
                                <div className='form_field'>
                                    <Box sx={inputBox}>
                                        <TextField size="small"
                                            error={formSubmitted && !deviceName === ''}
                                            fullWidth
                                            disabled
                                            label={t("id")}
                                            id="ID"
                                            value={deviceId}
                                            onChange={(e) => setDeviceId(e.target.value)}
                                            sx={textField}
                                        />
                                    </Box>
                                    {
                                        location?.state?.zoneNameProps !== undefined ?
                                            <Box sx={inputBox}>

                                                <FormControl fullWidth
                                                    sx={textField}>
                                                    <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                                        {t("zone")}
                                                    </InputLabel>
                                                    <Select size="small"

                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label={t("zone")}
                                                        disabled
                                                        value={zoneName}
                                                        onChange={(e) => setZoneName(e.target.value)}
                                                    >
                                                        <MenuItem value=''><em>--</em></MenuItem>
                                                        {

                                                            employeeWorkStations?.map(item => (
                                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                                            )
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            :
                                            <Box sx={inputBox}>

                                                <FormControl fullWidth
                                                    sx={textField}>
                                                    <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                                        {t("zone")}
                                                    </InputLabel>
                                                    <Select size="small"

                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label={t("zone")}
                                                        value={zoneName}
                                                        onChange={(e) => setZoneName(e.target.value)}
                                                    >
                                                        <MenuItem value=''><em>--</em></MenuItem>
                                                        {
                                                            employeeWorkStations?.map(item => (
                                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                                            )
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                    }
                                </div>
                                <div className='form_field'>
                                    <Box className='requiredData' sx={inputBox}>
                                        <TextField size="small"
                                            error={formSubmitted && !deviceName === ''}
                                            fullWidth
                                            required
                                            label={t("device_name")}
                                            id="ID"
                                            value={deviceName}
                                            onChange={(e) => setDeviceName(e.target.value)}
                                            helperText={
                                                formSubmitted && deviceName === '' ? t('requiredField') : ''
                                            }
                                            sx={textField}
                                        />
                                    </Box>
                                    <Box className='requiredData' sx={inputBox}>
                                        <FormControl fullWidth required error={formSubmitted && statusValue === ''}
                                            sx={textField}>
                                            <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                                {t("status")}
                                            </InputLabel>
                                            <Select size="small"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label={t("status")}
                                                value={statusValue}
                                                onChange={(e) => setStatusValue(e.target.value)}
                                            >
                                                {
                                                    getListStatusDevice?.map((item, index) => {
                                                        return (
                                                            <MenuItem value={item.id}>{item.id === 11 ? t('active').toUpperCase() : t('inactive').toUpperCase()}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                            {showHelperText && statusValue === '' && (
                                                <FormHelperText className='select_helper_text'>{t('selectOptionText')}</FormHelperText>
                                            )

                                            }
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className='form_field'>
                                    <Box className='requiredData' sx={inputBox}>
                                        <FormControl fullWidth required
                                            sx={textField}>

                                            <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                                {t("device_type")}
                                            </InputLabel>
                                            <Select className='select_form_field' size="small"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label={t("device_type")}

                                                value={deviceType}
                                                onChange={(e) => setDeviceType(e.target.value)}
                                            >
                                                {
                                                    getDeviceType?.map((item, index) => {
                                                        return (
                                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                                        )
                                                    })

                                                }

                                            </Select>
                                            {showHelperText && deviceType === '' && (
                                                <FormHelperText className='select_helper_text'>{t('selectOptionText')}</FormHelperText>
                                            )

                                            }
                                        </FormControl>
                                    </Box>

                                    <Box className='requiredData' sx={inputBox}>
                                        <FormControl
                                            fullWidth required
                                            sx={textField}
                                        >
                                            <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                                {t("device_access_type")}
                                            </InputLabel>
                                            <Select size="small"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label={t("device_access_type")}
                                                value={accessType}
                                                onChange={(e) => setAccessType(e.target.value)}
                                            >
                                                {
                                                    getAccessType?.map((item, index) => {
                                                        return (
                                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                            {showHelperText && accessType === '' && (
                                                <FormHelperText className='select_helper_text'>{t('selectOptionText')}</FormHelperText>
                                            )
                                            }
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className='form_field'>
                                    <Box className='requiredData' sx={inputBox}>
                                        <TextField size="small"
                                            error={formSubmitted && ip === ''}
                                            fullWidth
                                            label={t("ip_domain")}
                                            required
                                            id="ip"
                                            value={ip}
                                            onChange={(e) => setIp(e.target.value)}
                                            helperText={
                                                formSubmitted && ip === '' ? t('requiredField') : ''
                                            }
                                            sx={textField}
                                        />
                                    </Box>
                                    <Box className='requiredData' sx={inputBox}>
                                        <TextField size="small"
                                            error={formSubmitted && mac === ''}
                                            fullWidth
                                            required
                                            label={t("mac")}
                                            id="mac"
                                            value={mac}
                                            onChange={(e) => setMac(e.target.value)}
                                            helperText={
                                                formSubmitted && mac === '' ? t('requiredField') : ''
                                            }
                                            sx={textField}
                                        />
                                    </Box>
                                </div>
                                <div className='form_field'>
                                    <Box className='requiredData' sx={inputBox}>
                                        <TextField size="small"
                                            error={formSubmitted && !sn === ''}
                                            fullWidth
                                            required
                                            label={t("s_n")}
                                            id="s/n"
                                            value={sn}
                                            onChange={(e) => setSn(e.target.value)}
                                            helperText={
                                                formSubmitted && sn === '' ? t('requiredField') : ''
                                            }
                                            sx={textField}
                                        />
                                    </Box>
                                    <Box sx={inputBox}>
                                        <TextField size="small"
                                            fullWidth

                                            label={t("password")}
                                            id="PASSWORD"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            sx={textField}
                                        />
                                    </Box>
                                </div>
                            </>
                            :
                            <>
                                <div className='form_field'>
                                    <Box className='requiredData' sx={inputBox}>
                                        <TextField size="small"
                                            error={formSubmitted && !deviceName === ''}
                                            fullWidth
                                            required
                                            label={t("device_name")}
                                            id="ID"
                                            value={deviceName}
                                            onChange={(e) => setDeviceName(e.target.value)}
                                            helperText={
                                                formSubmitted && deviceName === '' ? t('requiredField') : ''
                                            }
                                            sx={textField}
                                        />
                                    </Box>
                                    {
                                        location?.state?.zoneNameProps !== undefined ?
                                            <Box sx={inputBox}>

                                                <FormControl fullWidth
                                                    sx={textField}>
                                                    <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                                        {t("zone")}
                                                    </InputLabel>
                                                    <Select size="small"

                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label={t("zone")}
                                                        disabled
                                                        value={zoneDetailFatherAndChild?.id}
                                                    >
                                                        <MenuItem value=''><em>--</em></MenuItem>
                                                        {
                                                            employeeWorkStations?.map(item => (
                                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                                            )
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            :
                                            <Box sx={inputBox}>

                                                <FormControl fullWidth
                                                    sx={textField}>
                                                    <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                                        {t("zone")}
                                                    </InputLabel>
                                                    <Select size="small"
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label={t("zone")}
                                                        value={zoneName}
                                                        onChange={(e) => setZoneName(e.target.value)}
                                                    >
                                                        <MenuItem value=''><em>--</em></MenuItem>
                                                        {
                                                            employeeWorkStations?.map(item => (
                                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                                            )
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                    }
                                </div>
                                <div className='form_field'>
                                    <Box className='requiredData' sx={inputBox}>
                                        <FormControl fullWidth required
                                            sx={textField}>

                                            <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                                {t("device_type")}
                                            </InputLabel>
                                            <Select className='select_form_field' size="small"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label={t("device_type")}
                                                value={deviceType}
                                                onChange={(e) => setDeviceType(e.target.value)}
                                            >
                                                {
                                                    getDeviceType?.map((item, index) => {
                                                        return (
                                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                            {showHelperText && deviceType === '' && (
                                                <FormHelperText className='select_helper_text'>{t('selectOptionText')}</FormHelperText>
                                            )
                                            }

                                        </FormControl>
                                    </Box>
                                    <Box className='requiredData' sx={inputBox}>
                                        <FormControl fullWidth required error={formSubmitted && statusValue === ''}
                                            sx={textField}>
                                            <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                                {t("status")}
                                            </InputLabel>
                                            <Select size="small"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label={t("status")}
                                                value={statusValue}
                                                onChange={(e) => setStatusValue(e.target.value)}
                                            >
                                                {
                                                    getListStatusDevice?.map((item, index) => {
                                                        return (
                                                            <MenuItem value={item.id}>{item.id === 11 ? t('active').toUpperCase() : t('inactive').toUpperCase()}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                            {showHelperText && statusValue === '' && (
                                                <FormHelperText className='select_helper_text'>{t('selectOptionText')}</FormHelperText>
                                            )
                                            }
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className='form_field'>
                                    <Box className='requiredData' sx={inputBox}>
                                        <TextField size="small"
                                            error={formSubmitted && ip === ''}
                                            fullWidth
                                            label={t("ip_domain")}
                                            required
                                            id="ip"
                                            value={ip}
                                            onChange={(e) => setIp(e.target.value)}
                                            helperText={
                                                formSubmitted && ip === '' ? t('requiredField') : ''
                                            }
                                            sx={textField}
                                        />
                                    </Box>
                                    <Box className='requiredData' sx={inputBox}>
                                        <FormControl
                                            fullWidth required
                                            sx={textField}
                                        >
                                            <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                                {t("device_access_type")}
                                            </InputLabel>
                                            <Select size="small"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label={t("device_access_type")}
                                                value={accessType}
                                                onChange={(e) => setAccessType(e.target.value)}
                                            >
                                                {
                                                    getAccessType?.map((item, index) => {
                                                        return (
                                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                            {showHelperText && accessType === '' && (
                                                <FormHelperText className='select_helper_text'>{t('selectOptionText')}</FormHelperText>
                                            )
                                            }
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className='form_field'>
                                    <Box className='requiredData' sx={inputBox}>
                                        <TextField size="small"
                                            error={formSubmitted && !sn === ''}
                                            fullWidth
                                            required
                                            label={t("s_n")}
                                            id="s/n"
                                            value={sn}
                                            onChange={(e) => setSn(e.target.value)}
                                            helperText={
                                                formSubmitted && sn === '' ? t('requiredField') : ''
                                            }
                                            sx={textField}
                                        />
                                    </Box>
                                    <Box className='requiredData' sx={inputBox}>
                                        <TextField size="small"
                                            error={formSubmitted && !mac === ''}
                                            fullWidth
                                            required
                                            label={t("mac")}
                                            id="mac"
                                            value={mac}
                                            onChange={(e) => setMac(e.target.value)}
                                            helperText={
                                                formSubmitted && mac === '' ? t('requiredField') : ''
                                            }
                                            sx={textField}
                                        />
                                    </Box>
                                </div>
                                <div className='form_field'>
                                    <Box sx={inputBox}>
                                        <TextField size="small"
                                            fullWidth

                                            label={t("password")}
                                            id="PASSWORD"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            sx={textField}
                                        />
                                    </Box>
                                    <Box sx={inputBox}>
                                        <TextField size="small"
                                            fullWidth
                                            hidden
                                            label={t("blank_space")}
                                            id="blank"
                                            sx={textField}
                                        />
                                    </Box>
                                </div>
                            </>
                        }
                        <div className='form_field'>
                            <Box sx={inputBox}>
                                <TextField size="small"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label={t("description")}
                                    id="DESCRIPTION"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    sx={textField}
                                />
                            </Box>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="zone_update_options">
                        <Box sx={{ position: "relative" }}>
                            <h1 sx={{ display: "inline-block", pr: 1 }}>
                                {t("options")}
                            </h1>
                            <Divider
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    right: 0,
                                    left: `${t("options").length * 1 + 1}rem`,
                                    background: "#146F62",
                                    height: "3px !important",
                                    opacity: "1",
                                    borderRadius: "10px"
                                }}
                            />
                        </Box>
                        <div className='create_device_data'>
                            <div className='form_field'>
                                <Box className='requiredData' sx={inputBox}>
                                    <FormControl fullWidth required
                                        sx={textField}>
                                        <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                            {t("anti_pass_back")}
                                        </InputLabel>
                                        <Select className='select_form_field' size="small"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label={t("anti_pass_back")}
                                            value={antiPassBackType}
                                            onChange={(e) => setAntiPassBackType(e.target.value)}
                                        >
                                            {
                                                getAntiPassBackType?.map((item, index) => {
                                                    return (
                                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                        {showHelperText && antiPassBackType === '' && (
                                            <FormHelperText className='select_helper_text'>{t('selectOptionText')}</FormHelperText>
                                        )
                                        }
                                    </FormControl>
                                </Box>
                                <Box className='requiredData' sx={inputBox}>
                                    <FormControl fullWidth required
                                        sx={textField}>
                                        <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                            {t("escort")}
                                        </InputLabel>
                                        <Select className='select_form_field' size="small"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label={t("escort")}
                                            value={escortMode}
                                            onChange={(e) => setEscortMode(e.target.value)}
                                        >
                                            {
                                                getEscortMode?.map((item, index) => {
                                                    return (
                                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                        {showHelperText && escortMode === '' && (
                                            <FormHelperText className='select_helper_text'>{t('selectOptionText')}</FormHelperText>
                                        )
                                        }
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='form_field'>
                                <Box sx={inputBox}>
                                    <FormControl
                                        fullWidth
                                        sx={textField}
                                    >
                                        <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                            {t("request_signature")}
                                        </InputLabel>
                                        <Select size="small"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label={t("request_signature")}
                                            value={requestSignatureAlways}
                                            onChange={(e) => setRequestSignatureAlways(e.target.value)}
                                        >
                                            <MenuItem value={true}>{t('YES')}</MenuItem>
                                            <MenuItem value={false}>{t('NO')}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={inputBox}>
                                    <TextField size="small"
                                        type='number'
                                        fullWidth
                                        label={t("request_signature_every")}
                                        id="request_signature_every"
                                        value={requestSignature}
                                        onChange={(e) => setRequestSignature(e.target.value)}
                                        helperText={t('fill_0_to_make_it_everytime')}
                                        InputProps={{
                                            endAdornment: <InputAdornment className='endAdornmentStyle' position="end">{t('days')}</InputAdornment>,
                                        }}
                                        sx={textField}
                                    />
                                </Box>
                            </div>
                            <div className='form_field'>
                                <Box sx={inputBox}>
                                    <TextField size="small"
                                        type='number'
                                        fullWidth
                                        label={t("sync_time")}
                                        id="sync_time"
                                        value={syncTime}
                                        onChange={(e) => setSyncTime(e.target.value)}
                                        helperText={t('leave_0_to_make_it_in_real_time')}
                                        InputProps={{
                                            endAdornment: <InputAdornment className='endAdornmentStyle' position="end">min</InputAdornment>,
                                        }}
                                        sx={textField}
                                    />
                                </Box>
                                <Box className='requiredData'
                                    sx={inputBox}>
                                    <TextField size="small"
                                        error={formSubmitted && validationNumber === ''}
                                        type='number'
                                        required
                                        fullWidth
                                        label={t("validation_number")}
                                        id="validation_number"
                                        value={validationNumber}
                                        onChange={(e) => setValidationNumber(e.target.value)}
                                        helperText={
                                            formSubmitted && validationNumber === '' ? t('requiredField') : ''
                                        }
                                        sx={textField}
                                    />
                                </Box>
                            </div>
                        </div>
                        <div className="row mt-4 pl-4">
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={showLog}
                                    checked={showLog}
                                    onChange={(e) => setShowLog(e.target.checked)}
                                />
                                <label htmlFor="">{t("show_logs")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={showUserList}
                                    checked={showUserList}
                                    onChange={(e) => setShowUserList(e.target.checked)}
                                />
                                <label htmlFor="">{t("show_user_list")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={synchorizeSelfies}
                                    checked={synchorizeSelfies}
                                    onChange={(e) => setSynchorizeSelfies(e.target.checked)}
                                />
                                <label htmlFor="">{t("synchronize_selfies")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={playSounds}
                                    checked={playSounds}
                                    onChange={(e) => setPlaySounds(e.target.checked)}
                                />
                                <label htmlFor="">{t("play_sounds")}</label>
                            </div>
                        </div>
                    </div>

                    <div className="zone_update_reader">
                        <Box sx={{ position: "relative" }}>
                            <h1 sx={{ display: "inline-block", pr: 1 }}>
                                {t("readers")}
                            </h1>
                            <Divider
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    right: 0,
                                    left: `${t("readers").length * 1 + 1}rem`,
                                    background: "#146F62",
                                    height: "3px !important",
                                    opacity: "1",
                                    borderRadius: "10px"
                                }}
                            />
                        </Box>
                        <div className="row mt-3 pl-4">

                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={facialRecognition}
                                    checked={facialRecognition}
                                    disabled={!deviceType || !allowedCheckboxes[deviceType].includes("facialRecognition")}
                                    onChange={(e) => setFacialRecognition(e.target.checked)}
                                />
                                <label htmlFor="">{t("facial_recognition")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={fingerprint}
                                    checked={fingerprint}
                                    disabled={!deviceType || !allowedCheckboxes[deviceType].includes("fingerprint")}
                                    onChange={(e) => setFingerprint(e.target.checked)}
                                />
                                <label htmlFor="">{t("fingerprint_reader")}</label>
                            </div>
                        </div>

                        <div className="row pl-4">
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={qr}
                                    checked={qr}
                                    disabled={!deviceType || !allowedCheckboxes[deviceType].includes("qr")}
                                    onChange={(e) => setQr(e.target.checked)}
                                />
                                <label htmlFor="">{t("qr_code_reader")}</label>
                            </div>

                            <div className="col-md-6" >
                                <input type="checkbox"
                                    value={bluetooth}
                                    checked={bluetooth}
                                    disabled={!deviceType || !allowedCheckboxes[deviceType].includes("bluetooth")}
                                    onChange={(e) => setBluetooth(e.target.checked)}
                                />
                                <label htmlFor="">{t("bluetooth_reader")}</label>
                            </div>
                        </div>

                        <div className="row pl-4">

                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={smartCard}
                                    checked={smartCard}
                                    disabled={!deviceType || !allowedCheckboxes[deviceType].includes("rfid")}
                                    onChange={(e) => setSmartCard(e.target.checked)}
                                />
                                <label htmlFor="">{t("rfid_reader")}</label>
                            </div>
                            <div className="col-md-4">
                                <input type="checkbox"
                                    value={pin}
                                    checked={pin}
                                    disabled={!deviceType || !allowedCheckboxes[deviceType].includes("pin")}
                                    onChange={(e) => setPin(e.target.checked)}
                                />
                                <label htmlFor="">{t("pin")}</label>
                            </div>

                        </div>

                    </div>

                    <div className="zone_update_lock">
                        <Box sx={{ position: "relative" }}>
                            <h1 sx={{ display: "inline-block", pr: 1 }}>
                                {t("locks")}
                            </h1>
                            <Divider
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    right: 0,
                                    left: `${t("locks").length * 1 + t("locks").length * 0.2}rem`,
                                    background: "#146F62",
                                    height: "3px !important",
                                    opacity: "1",
                                    borderRadius: "10px"
                                }}
                            />
                        </Box>
                        <div className="row mt-3 pl-4">
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={enableRelay0}
                                    checked={enableRelay0}
                                    disabled={!deviceType || !allowedCheckboxes[deviceType].includes("relay0") || lockChecked !== enableRelay0}
                                    onChange={(e) => setEnableRelay0(e.target.checked)}
                                />
                                <label htmlFor="">{t("enableRelay0")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={enableRelay1}
                                    checked={enableRelay1}
                                    disabled={!deviceType || !allowedCheckboxes[deviceType].includes("relay1") || lockChecked !== enableRelay1}
                                    onChange={(e) => setEnableRelay1(e.target.checked)}
                                />
                                <label htmlFor="">{t("enableRelay1")}</label>
                            </div>

                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={enableAirbnk}
                                    checked={enableAirbnk}
                                    readOnly={linked}
                                    disabled={!deviceType || !allowedCheckboxes[deviceType].includes("airbnk") || lockChecked !== enableAirbnk}
                                    onClick={handleClickAirbnk}
                                />
                                <label htmlFor="">{t("enable_Airbnk_lock")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={enableTTLock}
                                    checked={enableTTLock}
                                    readOnly={linked}
                                    disabled={!deviceType || !allowedCheckboxes[deviceType].includes("ttlock") || lockChecked !== enableTTLock}
                                    onClick={handleClickTTLock}
                                />
                                <label htmlFor="">{t("enableTTLock")}</label>
                            </div>

                        </div>
                    </div>
                </div>

                {
                    (enableAirbnk && linked) && (
                        <div className="container-fluid mt-3" >
                            <div className='smart_lock_setting'>
                                <Box sx={{ position: "relative" }}>
                                    <h1 sx={{ display: "inline-block", pr: 1 }}>
                                        {t("smart_lock_settings")}
                                    </h1>
                                    <Divider
                                        sx={{
                                            position: "absolute",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            right: 0,
                                            left: `${t("smart_lock_settings").length * 1 + t("smart_lock_settings").length * 0.03}rem`,
                                            background: "#146F62",
                                            height: "3px !important",
                                            opacity: "1",
                                            borderRadius: "10px"
                                        }}
                                    />
                                </Box>
                                <div className='container-top-right-btns mt-4'>
                                    <label>
                                        {t("UNLINK")}
                                    </label>
                                    <Switch
                                        checked={linked}
                                        onChange={handleChangeLink}
                                        inputProps={{ "aria-label": "controlled" }}
                                        color="primary"
                                    />
                                    <label>
                                        {t("LINK")}
                                    </label>
                                </div>


                                <div className='container-fluid'>
                                    <div className='create_device_data'>


                                        <div className='create_device_data'>
                                            <div className='form_field'>
                                                <Box className='requiredData'
                                                    sx={inputBox}>
                                                    <TextField size="small"
                                                        fullWidth
                                                        disabled
                                                        label={t("id")}
                                                        id="id"
                                                        value={airbnkLockId}
                                                        onChange={(e) => setAirbnkLockId(e.target.value)}
                                                        sx={textField}
                                                    />
                                                </Box>
                                                <Box className='requiredData'
                                                    sx={inputBox}>
                                                    <TextField size="small"
                                                        error={formSubmitted && airbnkLockSerialNumber === '' && enableAirbnk}
                                                        fullWidth
                                                        required
                                                        label={t("s_n")}
                                                        id="s/n"
                                                        value={airbnkLockSerialNumber}
                                                        onChange={(e) => setAirbnkLockSerialNumber(e.target.value)}
                                                        helperText={
                                                            formSubmitted && airbnkLockSerialNumber === '' && enableAirbnk ? t('requiredField') : ''
                                                        }
                                                        sx={textField}
                                                    />
                                                </Box>
                                            </div>
                                            <div className='form_field'>
                                                <Box className='requiredData'
                                                    sx={inputBox}>
                                                    <TextField size="small"
                                                        error={formSubmitted && airbnkLockKey === '' && enableAirbnk}
                                                        fullWidth
                                                        required
                                                        label={t("key")}
                                                        id="key"
                                                        value={airbnkLockKey}
                                                        onChange={(e) => setAirbnkLockKey(e.target.value)}
                                                        helperText={
                                                            formSubmitted && airbnkLockKey === '' && enableAirbnk ? t('requiredField') : ''
                                                        }
                                                        sx={textField}
                                                    />
                                                </Box>
                                                <Box sx={inputBox}>
                                                    <TextField size="small"
                                                        fullWidth
                                                        hidden
                                                        label={t("blank_space")}
                                                        id="blank"
                                                        sx={textField}
                                                    />
                                                </Box>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    (enableAirbnk && !linked) && (
                        <div className="container-fluid mt-3" >
                            <div className='smart_lock_setting'>
                                <Box sx={{ position: "relative" }}>
                                    <h1 sx={{ display: "inline-block", pr: 1 }}>
                                        {t("smart_lock_settings")}
                                    </h1>
                                    <Divider
                                        sx={{
                                            position: "absolute",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            right: 0,
                                            left: `${t("smart_lock_settings").length * 1 + t("smart_lock_settings").length * 0.03}rem`,
                                            background: "#146F62",
                                            height: "3px !important",
                                            opacity: "1",
                                            borderRadius: "10px"
                                        }}
                                    />
                                </Box>
                                <div className='container-fluid'>
                                    <div className='create_device_data'>
                                        <div className='create_device_data'>
                                            <div className='form_field'>
                                                <Box className='requiredData'
                                                    sx={inputBox}>
                                                    <TextField size="small"
                                                        error={formSubmitted && airbnkLockKey === '' && enableAirbnk}
                                                        fullWidth
                                                        required
                                                        label={t("key")}
                                                        id="key"
                                                        value={airbnkLockKey}
                                                        onChange={(e) => setAirbnkLockKey(e.target.value)}
                                                        helperText={
                                                            formSubmitted && airbnkLockKey === '' && enableAirbnk ? t('requiredField') : ''
                                                        }
                                                        sx={textField}
                                                    />
                                                </Box>
                                                <Box className='requiredData'
                                                    sx={inputBox}>
                                                    <TextField size="small"
                                                        error={formSubmitted && airbnkLockSerialNumber === '' && enableAirbnk}
                                                        fullWidth
                                                        required
                                                        label={t("s_n")}
                                                        id="s/n"
                                                        value={airbnkLockSerialNumber}
                                                        onChange={(e) => setAirbnkLockSerialNumber(e.target.value)}
                                                        helperText={
                                                            formSubmitted && airbnkLockSerialNumber === '' && enableAirbnk ? t('requiredField') : ''
                                                        }
                                                        sx={textField}
                                                    />
                                                </Box>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    (enableTTLock && linked) && (
                        <div className="container-fluid mt-3" >
                            <div className='smart_lock_setting'>
                                <Box sx={{ position: "relative" }}>
                                    <h1 sx={{ display: "inline-block", pr: 1 }}>
                                        {t("smart_lock_settings")}
                                    </h1>
                                    <Divider
                                        sx={{
                                            position: "absolute",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            right: 0,
                                            left: `${t("smart_lock_settings").length * 1 + t("smart_lock_settings").length * 0.03}rem`,
                                            background: "#146F62",
                                            height: "3px !important",
                                            opacity: "1",
                                            borderRadius: "10px"
                                        }}
                                    />
                                </Box>
                                <div className='container-top-right-btns mt-4'>
                                    <label>
                                        {t("UNLINK")}
                                    </label>
                                    <Switch
                                        checked={linked}
                                        onChange={handleChangeLink}
                                        inputProps={{ "aria-label": "controlled" }}
                                        color="primary"
                                    />
                                    <label>
                                        {t("LINK")}
                                    </label>
                                </div>


                                <div className='container-fluid'>
                                    <div className='create_device_data'>

                                        <div className='create_device_data'>
                                            <div className='form_field'>
                                                <Box className='requiredData'
                                                    sx={inputBox}>
                                                    <TextField size="small"
                                                        fullWidth
                                                        required
                                                        disabled
                                                        label={t("id")}
                                                        id="id"
                                                        value={smartLockId}
                                                        onChange={(e) => setSmartLockId(e.target.value)}
                                                        sx={textField}
                                                    />
                                                </Box>
                                                <Box className='requiredData'
                                                    sx={inputBox}>
                                                    <TextField size="small"
                                                        fullWidth
                                                        required
                                                        disabled
                                                        label={t("mac")}
                                                        id="mac"
                                                        value={smartLockMac}
                                                        onChange={(e) => setSmartLockMac(e.target.value)}
                                                        sx={textField}
                                                    />
                                                </Box>
                                            </div>
                                            <div className='form_field'>
                                                <Box className='requiredData'
                                                    sx={inputBox}>
                                                    <TextField size="small"
                                                        fullWidth
                                                        disabled
                                                        label={t("battery")}
                                                        id="battery"
                                                        value={smartLockBattery}
                                                        onChange={(e) => setSmartLockBattery(e.target.value)}
                                                        sx={textField}
                                                    />
                                                </Box>
                                                <Box className='requiredData'
                                                    sx={inputBox}>
                                                    <TextField size="small"
                                                        fullWidth
                                                        disabled
                                                        required
                                                        label={t("battery_time")}
                                                        id="battery_time"
                                                        value={smartLockBatteryTime}
                                                        onChange={(e) => setSmartLockBatteryTime(e.target.value)}
                                                        sx={textField}
                                                    />
                                                </Box>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className='create_device_footer mt-4'>
                {
                    location?.state?.zoneNameProps !== undefined ?
                        <Link to="/dashboard/employee/zones/singlezonedetails">
                            <button className='custom_btn_cancel_gray_hover'
                                style={{ width: "349px", color: "#BC0000" }}>
                                {t("cancel")}
                            </button>
                        </Link>
                        :
                        <Link to="/dashboard/employee/devices">
                            <button className='custom_btn_cancel_gray_hover'
                                style={{ width: "349px" }}>
                                {t("cancel")}
                            </button>
                        </Link>
                }
                <button
                    className='custom_primary_btn_dark'
                    style={{ width: "349px" }}
                    onClick={() => {
                        handelCreateDevice()
                    }}>
                    {id === undefined ? t("create_device")?.toUpperCase() : t("update_device")?.toUpperCase()}
                </button>
            </div>
            <DeleteModal
                show={deleteDeviceShow}
                onHide={() => setDeleteDeviceShow(false)}
                data={selectDeviceForDelete}
                title_modal={title_modal}
                element_modal={element_modal}
                flag={deletedFlag}
                onDelete={() => setDeletedFlag(true)}
                delete_table={delete_table}
            />
        </div>
    )
}

export default CreateUpdateDevices

const inputBox = {
    width: "100%",
    maxWidth: "100%",
    fontSize: "20px",
    height: "50px",
}