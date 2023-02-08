import React, { useState } from 'react'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { Box } from "@mui/system";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { useSelector } from 'react-redux';
import { CompleteOrderProvider } from '../../reduxToolkit/Providers/providersApi';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';


const CompleteOrder = ({ isUpdateOrder }) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    // console.log(isUpdateOrder)

    // hook
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // useState
    const [employeeName, setEmployeeName] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [vehicleBrand, setVehicleBrand] = useState("");

    //useSelector

    const { getAllProviderEmployeeListDown } = useSelector(state => state.providersSlice);
    console.log(getAllProviderEmployeeListDown)

    const { getAllProviderVehicleListDown } = useSelector(state => state.providersSlice);
    console.log(getAllProviderVehicleListDown)

    const { getOrderDetails } = useSelector(state => state.providersSlice);
    console.log(getOrderDetails)


    // function

    const handleDeliveryDate = (newValue) => {
        setDeliveryDate(newValue);
    };

    const handelCompleteOrder = () => {
        let time_in_miliseconds = Math.round(deliveryDate);
        const data = {
            userId: employeeName,
            eta: time_in_miliseconds,
            vehicleId: vehicleBrand,

        }
        const orderId = getOrderDetails?.id

        dispatch(CompleteOrderProvider({ data, orderId })).then(() => {
            navigate("/dashboard/provider/orders")
        })
        console.log(data)
    }
    const eta = new Date(getOrderDetails?.eta);

    useEffect(() => {

        if (isUpdateOrder) {
            setEmployeeName(getOrderDetails?.providerEmployee?.user.id || "");
            setVehicleBrand(getOrderDetails?.providerVehicle?.vehicle?.id || "");
            setDeliveryDate(getOrderDetails?.eta)
        }
    }, [getOrderDetails?.id, isUpdateOrder])

    // main File
    return (
        <>
            <div className="head ">
                <div className="headLeft mt-3">
                    <h2>
                        <Link to="/dashboard/provider/order-detail">
                            <ArrowBackIcon
                                style={{
                                    color: "#146F62",
                                    fontSize: "30px",
                                    marginRight: "30px",
                                    transform: lCode === "ar" ? "scaleX(-1)" : "",
                                    margin: "0 10px"
                                }}
                            />
                        </Link>

                        {isUpdateOrder ? "UPDATE ORDER" : "COMPLETE ORDER"}
                        {/* {employeeDetails && "Employee PROVIDER Detail"} */}
                        {/* {approveDocument && "APPROVE DOCUMENTS"} */}
                    </h2>


                </div>
            </div>
            <div className="complete_order_container">
                <div className='complete_order_body'>
                    <div className='left'>
                        <h4>{t("data")}</h4>
                        <div className='left_conatiner'>
                            <div className='card_header'>
                                <h4>{t("provider_information")}</h4>
                                <p><span>{getOrderDetails?.provider?.acronym} | </span>{getOrderDetails?.provider?.providerCompanyName}</p>
                                <h6>Company Name</h6>
                            </div>

                            <div className='card_body'>
                                <h4 className='mb-3'>{t("delivery_information")}</h4>
                                {
                                    isUpdateOrder &&
                                    <>
                                        <div className="card_body_item">
                                            <h5>{t("eta")}</h5>
                                            <p>{eta?.toLocaleString("en-GB")}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>{t("corporate")}</h5>
                                            <p>IBL Corporate</p>
                                        </div>
                                    </>
                                }

                                <div className="card_body_item">
                                    <h5>{t("item")}</h5>
                                    <p>{getOrderDetails?.item}</p>
                                </div>
                                <div className="card_body_item">
                                    <h5>{t("description")}</h5>
                                    <p>{getOrderDetails?.description}</p>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className='right'>
                        <h4>{t("provider_data")}</h4>
                        <div className='right_container'>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3} sx={{
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
                                    }}>
                                        <DesktopDatePicker
                                            label={t("delivery_date")}
                                            inputFormat="MM/dd/yyyy"
                                            value={deliveryDate}
                                            onChange={handleDeliveryDate}
                                            renderInput={(params) => <TextField size="small" {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>


                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ mt: "2rem" }}>
                                    <FormControl fullWidth sx={{
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
                                    }} >
                                        <InputLabel id="demo-simple-select-label">{t("employee")}</InputLabel>
                                         <Select size="small"

                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"

                                            label={t("employee")}
                                            value={employeeName}
                                            onChange={(e) => setEmployeeName(e.target.value)}
                                            sx={{
                                                fontSize: "10px",
                                                padding: "3px 3px 3px 10px",
                                            }}
                                        >

                                            {
                                                getAllProviderEmployeeListDown?.map(item => {
                                                    return (
                                                        <MenuItem value={item?.id}
                                                            sx={{
                                                                fontSize: "10px",
                                                            }}
                                                        >
                                                            {item?.name}
                                                        </MenuItem>

                                                    )

                                                })
                                            }

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ mt: "2rem" }}>
                                    <FormControl fullWidth sx={{
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
                                    }}>
                                        <InputLabel id="demo-simple-select-label">{t("vehicle")}</InputLabel>
                                         <Select size="small"

                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // defaultValue="EMPLOYEE"
                                            // value={employee}
                                            label={t("vehicle")}
                                            value={vehicleBrand}
                                            onChange={(e) => setVehicleBrand(e.target.value)}

                                            sx={{
                                                fontSize: "10px",
                                                padding: "3px 3px 3px 10px",
                                            }}
                                        >
                                            {
                                                getAllProviderVehicleListDown?.map(item => {
                                                    return (
                                                        <MenuItem value={item?.id}
                                                            sx={{
                                                                fontSize: "10px",
                                                            }}
                                                        >
                                                            {item?.brand}
                                                        </MenuItem>

                                                    )

                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </div>
                        <div className='footer'>
                            <button onClick={() => {
                                handelCompleteOrder()
                            }}>{isUpdateOrder ? t("update_order") : t("complete_order")}</button>
                        </div>

                    </div>

                </div>


            </div>
        </>
    )
}

export default CompleteOrder