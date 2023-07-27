import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import React from 'react'
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Switch, Divider, Grid } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateDeviceSmartlock, CreateDeviceZone, GetAccessType, GetDeviceSmartlock, GetDeviceType, GetDeviceZone, GetListStatusZone, UpdateDeviceSmartlock, UpdateDeviceZone } from '../../../reduxToolkit/EmployeeZones/EmployeeZonesApi'
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';


const CreateDevice = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const { id } = useParams();
    const { getAccessType, } = useSelector(state => state.EmployeeZonesSlice)
    // console.log(getAccessType)
    const { getDeviceType, getListStatusZone } = useSelector(state => state.EmployeeZonesSlice)
    // console.log(getDeviceType)
    const { zoneDetailFatherAndChild } = useSelector(state => state.EmployeeZonesSlice)
    // console.log(zoneDetailFatherAndChild)
    const { getDeviceZone } = useSelector(state => state.EmployeeZonesSlice)
    const { getDeviceSmartlock } = useSelector(state => state.EmployeeZonesSlice)


    const [deviceName, setDeviceName] = React.useState('')
    const [deviceId, setDeviceId] = React.useState('')
    const [zoneName, setZoneName] = React.useState('')
    const [deviceType, setDeviceType] = React.useState('')
    const [statusValue, setStatusValue] = React.useState('')
    const [ip, setIp] = React.useState('')
    const [accessType, setAccessType] = React.useState('')
    const [sn, setSn] = React.useState('')
    const [mac, setMac] = React.useState('')
    const [firebaseId, setFirebaseId] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [syncTime, setSyncTime] = React.useState('')
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
    const [unlink, setUnlink] = React.useState(false)
    const [smartLockId, setSmartLockId] = React.useState("")
    const [smartLockKey, setSmartLockKey] = React.useState("")
    const [smartLockSerialNumber, setSmartLockSerialNumber] = React.useState('')
    const [smartLockBatteryTime, setSmartLockBatteryTime] = React.useState('')

    const [requestSignature, setRequestSignature] = React.useState('')
    const [requestSignatureAlways, setRequestSignatureAlways] = React.useState('')
    const [enableTTLock, setEnableTTLock] = React.useState('')
    const [enableAirbnk, setEnableAirbnk] = React.useState('')
    const [enableRelay, setEnableRelay] = React.useState('')
    const [enableRelaySR3, setEnableRelaySR3] = React.useState('')
    const [enableRelaySR34ch, setEnableRelaySR34ch] = React.useState('')


    useEffect(() => {
        dispatch(GetListStatusZone());
        dispatch(GetAccessType());
        dispatch(GetDeviceType());
        if (id !== undefined) {
            dispatch(GetDeviceZone(id)).then(({ payload: { data: { data } } }) => {
                // console.log(data)
                setDeviceName(data?.name)
                setDeviceId(data?.id)
                setZoneName(data?.zone?.name)
                setDeviceType(data?.deviceType?.id)
                setStatusValue(data?.status?.id)
                setIp(data?.ip)
                setAccessType(data?.deviceAccessType?.id)
                setSn(data?.serialNumber)
                setMac(data?.mac)
                setFirebaseId(data?.firebaseId)
                setPassword(data?.password)
                setSyncTime(data?.syncTime)
                setDescription(data?.description)
                setSmartCard(data?.cardReader)
                setFacialRecognition(data?.facialRecognition)
                setQr(data?.qrCodeReader)
                setPin(data?.pin)
                setFingerprint(data?.fingerprintReader)
                setBluetooth(data?.bluetoothReader)
                setShowLog(data?.showLogo)
                setShowUserList(data?.showUserList)
                setSynchorizeSelfies(data?.synchronizeSelfie)

                setRequestSignature(data?.requestSignature)
                setRequestSignatureAlways(data?.requestSignatureAlways)
                setEnableTTLock(data?.enableTTLock)
                setEnableAirbnk(data?.enableAirbnk)
                setEnableRelay(data?.enableRelay)
                setEnableRelaySR3(data?.enableRelaySR3)
                setEnableRelaySR34ch(data?.enableRelaySR34ch)
            })
            dispatch(GetDeviceSmartlock(id)).then(({ payload: { data: { data } } }) => {
                console.log(data)
                setSmartLockId(data?.id)
                setSmartLockKey(data?.key)
                setSmartLockSerialNumber(data?.serialNumber)
                setSmartLockBatteryTime(data?.batteryTime)
            })
        }
    }, [])

    const handelCreateDevice = () => {
        const body = {
            deviceAccessType: {
                id: accessType,
            },
            bluetoothReader: bluetooth,
            cardReader: smartCard,
            description,
            deviceType: {
                id: deviceType,
            },
            facialRecognition,
            fingerprintReader: fingerprint,
            firebaseId,
            ip,
            mac,
            name: zoneName,
            password,
            pin,
            qrCodeReader: qr,
            serialNumber: sn,
            showLogo: showLog,
            showUserList,
            status: {
                id: statusValue,
            },
            syncTime: Number(syncTime),
            synchronizeSelfie: synchorizeSelfies,
            zone: {
                id: zoneDetailFatherAndChild?.id
            },
            requestSignature: requestSignature,
            requestSignatureAlways: requestSignatureAlways,
            enableTTLock: enableTTLock,
            enableAirbnk: enableAirbnk,
            enableRelay: enableRelay,
            enableRelaySR3: enableRelaySR3,
            enableRelaySR34ch: enableRelaySR34ch
        }
        if (id) {
            body.id = id
            dispatch(UpdateDeviceZone(body)).then(({ payload: { data: { data } } }) => {
                const body = {
                    "batteryTime": Number(smartLockBatteryTime),
                    "device": {
                        id: data?.id,
                    },
                    "id": getDeviceSmartlock?.id,
                    "key": smartLockKey,
                    "serialNumber": smartLockSerialNumber
                }
                dispatch(UpdateDeviceSmartlock(body)).then(() => {
                    navigate("/dashboard/employee/zones/singlezonedetails")
                })
            })
        } else {
            dispatch(CreateDeviceZone(body)).then(({ payload: { data: { data } } }) => {
                if (unlink === true) {
                    const body = {
                        "batteryTime": Number(smartLockBatteryTime),
                        "device": {
                            id: data?.id,
                        },
                        "id": data?.id,
                        "key": smartLockKey,
                        "serialNumber": smartLockSerialNumber
                    }
                    dispatch(CreateDeviceSmartlock(body)).then(() => {
                    })
                }
                navigate("/dashboard/employee/zones/singlezonedetails")
            })
        }
    }

    const textField = {
        textAlign: lCode === "ar" ? "right" : "left",
        "& 	.MuiOutlinedInput-notchedOutline": {
            textAlign: lCode === "ar" ? "right" : "left",
        },
        "& 	.MuiInputLabel-root": {
            fontSize: 12,
            left: lCode === "ar" ? "inherit" : "0",
            right: lCode === "ar" ? "1.75rem" : "0",
            transformOrigin: lCode === "ar" ? "right" : "left"
        }
    }


    return (
        <div>
            <div className="update_zone_header">
                <div className="update_zone_header_Left">
                    <Link to="/dashboard/employee/zones/singlezonedetails">
                        <i className="fa fa-arrow-left" aria-hidden="true" style={{
                            transform: lCode === "ar" ? "scaleX(-1)" : "",
                            margin: "0 10px"
                        }} ></i>
                    </Link>
                    <h2>
                        {
                            id === undefined ? "Create Device" : "Update Device"
                        }
                    </h2>
                </div>
            </div>
            <div className='divice_wrapper'>


                <div className='container-fluid'>
                    <div className='create_device_data'>
                        <Box
                            sx={{
                                position: "relative"
                            }}
                        >
                            <p>{t("data")}</p>
                            <Divider
                                sx={{
                                    position: "absolute",
                                    width: "88%",
                                    top: "9px",
                                    right: "0",
                                    background: "#146F62",
                                    height: "3px !important",
                                    opacity: "1"
                                }}
                            />
                        </Box>
                        <div className='form_field'>
                            <Box sx={inputBox}>
                                <TextField size="small"
                                    fullWidth
                                    label={t("device_name")}
                                    id="ID"
                                    value={deviceId}
                                    onChange={(e) => setDeviceId(e.target.value)}
                                    sx={textField}
                                />
                            </Box>
                            <Box sx={inputBox}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    disabled
                                    label={t("zone_name")}
                                    id="ZONE NAME"
                                    value={location?.state?.zoneNameProps}
                                    // onChange={(e) => setZoneName(e.target.value)}
                                    sx={textField}
                                />
                            </Box>
                        </div>
                        <div className='form_field'>
                            <Box sx={inputBox}>
                                <FormControl fullWidth
                                    sx={textField}>
                                    <InputLabel id="demo-simple-select-label">
                                        {t("device_type")}
                                    </InputLabel>
                                    <Select size="small"
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
                                </FormControl>
                            </Box>
                            <Box sx={inputBox}>
                                <FormControl fullWidth
                                    sx={textField}>
                                    <InputLabel id="demo-simple-select-label">
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
                                            getListStatusZone?.map((item, index) => {
                                                return (
                                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className='form_field'>
                            <Box sx={inputBox}>
                                <TextField size="small"
                                    fullWidth
                                    label={t("ip")}
                                    required
                                    id="ip"
                                    value={ip}
                                    onChange={(e) => setIp(e.target.value)}
                                    sx={textField}
                                />
                            </Box>
                            <Box sx={inputBox}>
                                <FormControl
                                    fullWidth
                                    sx={textField}
                                >
                                    <InputLabel id="demo-simple-select-label">
                                        {t("device_access_type")}
                                    </InputLabel>
                                    <Select size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label={t("device_access_type")}
                                        defaultValue={accessType | ""}
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
                                </FormControl>
                            </Box>
                        </div>
                        <div className='form_field'>
                            <Box sx={inputBox}>
                                <TextField size="small"
                                    fullWidth
                                    required
                                    label={t("s_n")}
                                    id="s/n"
                                    value={sn}
                                    onChange={(e) => setSn(e.target.value)}
                                    sx={textField}
                                />
                            </Box>
                            <Box sx={inputBox}>
                                <TextField size="small"
                                    fullWidth
                                    required
                                    label={t("mac")}
                                    id="mac"
                                    value={mac}
                                    onChange={(e) => setMac(e.target.value)}
                                    sx={textField}
                                />
                            </Box>
                        </div>
                        <div className='form_field'>
                            <Box sx={inputBox}>
                                <TextField size="small"
                                    fullWidth
                                    type="number"
                                    label={t("sync_name")}
                                    id="SYNC TIME"
                                    helperText={t("leave_0_to_avoid_send_it")?.toUpperCase()}
                                    value={syncTime}
                                    onChange={(e) => setSyncTime(e.target.value)}
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


                <div className="container-fluid"

                >
                    <div className="zone_update_reader">
                        <Box
                            sx={{
                                position: "relative"
                            }}
                        >
                            <h1>{t("readers")}</h1>
                            <Divider
                                sx={{
                                    position: "absolute",
                                    width: "84%",
                                    top: "9px",
                                    right: "0",
                                    background: "#146F62",
                                    height: "3px !important",
                                    opacity: "1"
                                }}
                            />
                        </Box>
                        <div className="row mt-3 pl-4">
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={smartCard}
                                    onChange={(e) => setSmartCard(e.target.checked)}

                                />
                                <label htmlFor="">{t("smart_card")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={facialRecognition}
                                    onChange={(e) => setFacialRecognition(e.target.checked)}
                                />
                                <label htmlFor="">{t("face_recognation")}</label>
                            </div>
                        </div>

                        <div className="row pl-4">
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={qr}
                                    onChange={(e) => setQr(e.target.checked)}
                                />
                                <label htmlFor="">{t("qr")}</label>
                            </div>
                            <div className="col-md-4 ">
                                <input type="checkbox"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.checked)}
                                />
                                <label htmlFor="">{t("pin")}</label>
                            </div>
                        </div>

                        <div className="row pl-4">
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={fingerprint}
                                    onChange={(e) => setFingerprint(e.target.checked)}
                                />
                                <label htmlFor="">{t("finger_print")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={bluetooth}
                                    onChange={(e) => setBluetooth(e.target.checked)}
                                />
                                <label htmlFor="">{t("bluetooth")}</label>
                            </div>
                        </div>

                    </div>

                    <div className="zone_update_options">
                        <Box
                            sx={{
                                position: "relative"
                            }}
                        >
                            <h1>{t("options")}</h1>
                            <Divider
                                sx={{
                                    position: "absolute",
                                    width: "84%",
                                    top: "9px",
                                    right: "0",
                                    background: "#146F62",
                                    height: "3px !important",
                                    opacity: "1"
                                }}
                            />
                        </Box>
                        <div className="row mt-3 pl-4">
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={showLog}
                                    onChange={(e) => setShowLog(e.target.checked)}
                                />
                                <label htmlFor="">{t("show_logs")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={requestSignature}
                                    onChange={(e) => setRequestSignature(e.target.checked)}
                                />
                                <label htmlFor="">{t("request_signature")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={showUserList}
                                    onChange={(e) => setShowUserList(e.target.checked)}
                                />
                                <label htmlFor="">{t("show_user_list")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={requestSignatureAlways}
                                    onChange={(e) => setRequestSignatureAlways(e.target.checked)}
                                />
                                <label htmlFor="">{t("request_on_time_signature")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={synchorizeSelfies}
                                    onChange={(e) => setSynchorizeSelfies(e.target.checked)}
                                />
                                <label htmlFor="">{t("synchronize_selfies")}</label>
                            </div>
                        </div>
                    </div>

                    <div className="zone_update_lock">
                        <Box
                            sx={{
                                position: "relative"
                            }}
                        >
                            <h1>{t("lock")}</h1>
                            <Divider
                                sx={{
                                    position: "absolute",
                                    width: "90%",
                                    top: "9px",
                                    right: "0",
                                    background: "#146F62",
                                    height: "3px !important",
                                    opacity: "1"
                                }}
                            />
                        </Box>
                        <div className="row mt-3 pl-4">
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={enableTTLock}
                                    onChange={(e) => setEnableTTLock(e.target.checked)}
                                />
                                <label htmlFor="">{t("enableTTLock")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={enableAirbnk}
                                    onChange={(e) => setEnableAirbnk(e.target.checked)}
                                />
                                <label htmlFor="">{t("enableAirbnk")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={enableRelay}
                                    onChange={(e) => setEnableRelay(e.target.checked)}
                                />
                                <label htmlFor="">{t("enableRelay")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={enableRelaySR3}
                                    onChange={(e) => setEnableRelaySR3(e.target.checked)}
                                />
                                <label htmlFor="">{t("enableRelaySR3")}</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox"
                                    value={enableRelaySR34ch}
                                    onChange={(e) => setEnableRelaySR34ch(e.target.checked)}
                                />
                                <label htmlFor="">{t("enableRelaySR34ch")}</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid" >
                    <div className='smart_lock_setting'>
                        <Box
                            sx={{
                                position: "relative"
                            }}
                        >
                            <h1>{t("smart_lock_settings")}</h1>
                            <Divider
                                sx={{
                                    position: "absolute",
                                    width: "65%",
                                    top: "9px",
                                    right: "0",
                                    background: "#146F62",
                                    height: "3px !important",
                                    opacity: "1"
                                }}
                            />
                        </Box>
                        <Grid container spacing={2} marginTop>
                            {/* <Grid item md={12}>
                            <label htmlFor="" className="label_unlink">{t("un_link")}</label>
                            <Switch
                                value={unlink}
                                onChange={(e) => setUnlink(e.target.checked)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <label htmlFor="" className="label_link">{t("link")}</label>
                        </Grid> */}
                            {/* <Grid item md={6}>
                            <TextField size="small"
                                fullWidth
                                label={t("id")}
                                id="ID"
                                value={smartLockId}
                                onChange={(e) => setSmartLockId(e.target.value)}
                                sx={textField}
                            />
                        </Grid> */}
                            <Grid item md={6}>
                                <TextField size="small"
                                    fullWidth
                                    label={t("s_n")}
                                    id="S/N"
                                    value={smartLockSerialNumber}
                                    onChange={(e) => setSmartLockSerialNumber(e.target.value)}
                                    sx={textField}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <TextField size="small"
                                    fullWidth
                                    label={t("key")}
                                    id="KEY"
                                    value={smartLockKey}
                                    onChange={(e) => setSmartLockKey(e.target.value)}
                                    sx={textField}

                                />
                            </Grid>
                            {/* <Grid item md={6}>
                            <TextField size="small"
                                fullWidth
                                type={t("number")}
                                label="BATTERY TIME"
                                id="BATTERY TIME"
                                value={smartLockBatteryTime}
                                onChange={(e) => setSmartLockBatteryTime(e.target.value)}
                                sx={textField}
                            />
                        </Grid> */}
                        </Grid>
                    </div>
                </div>


            </div>
            <div className='create_device_footer mt-4'>
                <button className='custom_btn_cancel_gray_hover'
                    style={{ width: "349px" }}
                >
                    {t("cancel")}
                </button>
                <button
                    className='custom_primary_btn_dark'
                    style={{ width: "349px" }}
                    onClick={() => {
                        handelCreateDevice()
                    }}
                >
                    {id === undefined ? t("create_device")?.toUpperCase() : t("update_device")?.toUpperCase()}
                </button>
            </div>
        </div>
    )
}

export default CreateDevice

const inputBox = {
    width: "100%",
    maxWidth: "100%",
    fontSize: "20px",
    height: "50px",
}