import React from 'react';
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Switch, Divider, Card, CardActions, CardContent, Grid, FormHelperText, InputAdornment, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
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
import { gender } from '../../../../../enums/genderEnum';
import { status } from '../../../../../enums/statusEnum';
import dayId from '../../../../../hooks/dayId';
import NotFoundDataWarning from '../../../../../components/NotFoundDataWarning';
import NotFoundAnything from '../../../../../components/NotFoundAnything';



const Step8Summary = ({ userData, onChange, extraData, headersList, employeeData, employeeRoles, contractStatusList, employeeWorkStations, employeeDepartments, workShiftsList, setWorkShiftsList, customizedList, setCustomizedList }) => {

    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    return (
        <div>
            <div className='enrollment-summary-wrapper'>

                <div className='container-fluid'>

                    <div className='create_device_data'>
                        <Box
                            sx={{
                                position: "relative"
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <p sx={{ display: "inline-block", pr: 1 }}>
                                    {t("details")}
                                </p>
                                <Divider
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        right: 0,
                                        left: `${t("details").length * 1 + 1}rem`,
                                        background: "#146F62",
                                        height: "3px !important",
                                        opacity: "1",
                                        borderRadius: "10px"
                                    }}
                                />
                            </Box>
                        </Box>
                        <div className="data-items">
                            {/* <VehicleStatus statusName={getVehicleById?.status?.name?.replaceAll("_", " ") || "-"} top={"5px"} right={"25px"} data={getVehicleById} /> */}
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{t("name")}</h4>
                                        <p>{userData?.name || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{t("last_name")}</h4>
                                        <p>{userData?.lastName || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{t("second_last_name")}</h4>
                                        <p>{userData?.secondLastName || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{t("email")}</h4>
                                        <p>{userData?.email || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{t("gender")}</h4>
                                        <p className='p-mayus'>{gender[userData?.genderId] || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{t("employee_phone_number")}</h4>
                                        <p>{userData?.phoneNumber ? "+" + userData?.phoneNumber : "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{t("status")}</h4>
                                        <p className='p-mayus'>{t(status[userData?.statusId]) || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{t("DOB")}</h4>
                                        <p>{new Date(userData?.dob).toLocaleDateString(lCode) || "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Box
                            sx={{
                                position: "relative"
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <p sx={{ display: "inline-block", pr: 1 }}>
                                    {t("other_details")}
                                </p>
                                <Divider
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        right: 0,
                                        left: `${t("other_details").length * 1 + 1}rem`,
                                        background: "#146F62",
                                        height: "3px !important",
                                        opacity: "1",
                                        borderRadius: "10px"
                                    }}
                                />
                            </Box>
                        </Box>
                        <div className="data-items">
                            {/* <VehicleStatus statusName={getVehicleById?.status?.name?.replaceAll("_", " ") || "-"} top={"5px"} right={"25px"} data={getVehicleById} /> */}
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{headersList?.header1 || t("header_1")}</h4>
                                        <p>{extraData?.field1 || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{headersList?.header2 || t("header_2")}</h4>
                                        <p>{extraData?.field2 || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{headersList?.header3 || t("header_3")}</h4>
                                        <p>{extraData?.field3 || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{headersList?.header4 || t("header_4")}</h4>
                                        <p>{extraData?.field4 || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{headersList?.header5 || t("header_5")}</h4>
                                        <p>{extraData?.field5 || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{headersList?.header6 || t("header_6")}</h4>
                                        <p>{extraData?.field6 || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{headersList?.header7 || t("header_7")}</h4>
                                        <p>{extraData?.field7 || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{headersList?.header8 || t("header_8")}</h4>
                                        <p>{extraData?.field8 || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{headersList?.header9 || t("header_9")}</h4>
                                        <p>{extraData?.field9 || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{headersList?.header10 || t("header_10")}</h4>
                                        <p>{extraData?.field10 || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{headersList?.header11 || t("header_11")}</h4>
                                        <p>{extraData?.field11 || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{headersList?.header12 || t("header_12")}</h4>
                                        <p>{extraData?.field12 || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{headersList?.header13 || t("header_13")}</h4>
                                        <p>{extraData?.field13 || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{headersList?.header14 || t("header_14")}</h4>
                                        <p>{extraData?.field14 || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="vehical-data">
                                        <h4>{headersList?.header15 || t("header_15")}</h4>
                                        <p>{extraData?.field15 || "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Box
                            sx={{
                                position: "relative"
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <p sx={{ display: "inline-block", pr: 1 }}>
                                    {t("employee_contract")}
                                </p>
                                <Divider
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        right: 0,
                                        left: `${t("employee_contract").length * 1 + 1.5}rem`,
                                        background: "#146F62",
                                        height: "3px !important",
                                        opacity: "1",
                                        borderRadius: "10px"
                                    }}
                                />
                            </Box>
                        </Box>
                        <div className="data-items">
                            {/* <VehicleStatus statusName={getVehicleById?.status?.name?.replaceAll("_", " ") || "-"} top={"5px"} right={"25px"} data={getVehicleById} /> */}
                            <div className="row">
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <div className="vehical-data">
                                        <h4>{t("role")}</h4>
                                        <p>{employeeRoles.find((item) => item.id === employeeData?.roleId)?.name || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <div className="vehical-data">
                                        <h4>{t("employee_id")}</h4>
                                        <p>{employeeData?.employeeId || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <div className="vehical-data">
                                        <h4>{t("start_date")}</h4>
                                        <p>{new Date(employeeData?.startDate).toLocaleDateString(lCode) || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <div className="vehical-data">
                                        <h4>{t("work_station")}</h4>
                                        <p>{employeeWorkStations.find((item) => item.id === employeeData?.zoneId)?.name || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <div className="vehical-data">
                                        <h4>{t("department")}</h4>
                                        <p>{employeeDepartments.find((item) => item.id === employeeData?.departmentId)?.name || "-"}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <div className="vehical-data">
                                        <h4>{t("end_date")}</h4>
                                        <p>{new Date(employeeData?.endDate).toLocaleDateString(lCode) || "-"}</p>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <Box
                            sx={{
                                position: "relative"
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <p sx={{ display: "inline-block", pr: 1 }}>
                                    {t("access_rights")}
                                </p>
                                <Divider
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        right: 0,
                                        left: `${t("access_rights").length * 1 + 1.5}rem`,
                                        background: "#146F62",
                                        height: "3px !important",
                                        opacity: "1",
                                        borderRadius: "10px"
                                    }}
                                />
                            </Box>
                        </Box>
                        <Grid container spacing={2.2} className='mt-2'>
                            <Grid item xs={6} alignItems={'center'}>



                                <span className='title-card'>{t("work_shifts")}</span>
                                <div className="d-flex ml-1 pl-0 ">



                                </div>
                                <Card variant='outlined'>
                                    <CardContent className='card-content-criteria pt-0'>

                                        <List dense >
                                            {workShiftsList.map((element, index) => (
                                                <ListItem className='list-item-criteria' key={index}
                                                // onClick={() => handleAssign(element)}
                                                >

                                                    <ListItemText className='ml-3' primary={`${element?.name}`} />

                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>

                                </Card>
                            </Grid>
                            <Grid item xs={6}>

                                <span className='title-card'>{t("customized")}</span>
                                <div className="d-flex ml-1 pl-0">


                                </div>
                                <Card variant='outlined'>
                                    <CardContent className='card-content-criteria pt-0'>

                                        <List dense>
                                            {customizedList.map((element, index) => (
                                                element.added && (
                                                    <ListItem className='list-item-criteria' key={index}
                                                    >

                                                        <ListItemText className='ml-3'
                                                            primary={`${dayId(parseInt(element?.day.id))}, ${element?.from} - ${element?.to}, ${element?.zone.id.split(',')[1]}`}
                                                        />

                                                    </ListItem>
                                                )
                                            ))}
                                        </List>
                                    </CardContent>

                                </Card>
                            </Grid>
                        </Grid>
                        <Box className='mt-4'
                            sx={{
                                position: "relative"
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <p sx={{ display: "inline-block", pr: 1 }}>
                                    {t("take_selfie")}
                                </p>
                                <Divider
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        right: 0,
                                        left: `${t("take_selfie").length * 1 + 1}rem`,
                                        background: "#146F62",
                                        height: "3px !important",
                                        opacity: "1",
                                        borderRadius: "10px"
                                    }}
                                />
                            </Box>
                        </Box>
                        <div className='mt-4'>
                            <NotFoundAnything text={"no_selfie_taked"} />
                        </div>
                        <Box className='mt-4'
                            sx={{
                                position: "relative"
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <p sx={{ display: "inline-block", pr: 1 }}>
                                    {t("capture_finger")}
                                </p>
                                <Divider
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        right: 0,
                                        left: `${t("capture_finger").length * 1 + 1}rem`,
                                        background: "#146F62",
                                        height: "3px !important",
                                        opacity: "1",
                                        borderRadius: "10px"
                                    }}
                                />
                            </Box>
                        </Box>
                        <div className='mt-4'>
                            <NotFoundAnything text={t("no_fingerprint_taked")} />
                        </div>
                        <Box className='mt-4'
                            sx={{
                                position: "relative"
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <p sx={{ display: "inline-block", pr: 1 }}>
                                    {t("card")}
                                </p>
                                <Divider
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        right: 0,
                                        left: `${t("card").length * 1 + 1}rem`,
                                        background: "#146F62",
                                        height: "3px !important",
                                        opacity: "1",
                                        borderRadius: "10px"
                                    }}
                                />
                            </Box>
                        </Box>
                        <div className='mt-4 mb-4'>
                            <NotFoundAnything text={"no_cards"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step8Summary;