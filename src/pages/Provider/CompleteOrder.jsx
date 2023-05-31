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
import { CompleteOrderProvider, GetAllProviderEmployeeListDown, GetAllProviderVehicleListDown, GetOrderDetails } from '../../reduxToolkit/Providers/providersApi';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


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
        if(!employeeName || !deliveryDate || !vehicleBrand){
            toast.warn("Please input fields")

        }else{

            dispatch(CompleteOrderProvider({ data, orderId })).then(() => {
                navigate("/dashboard/supplier/order-detail")
            })
        }

       
    }
    const eta = new Date(getOrderDetails?.eta);

    useEffect(() => {

        if (isUpdateOrder) {
            setEmployeeName(getOrderDetails?.supplierEmployee?.user?.id || "");
            setVehicleBrand(getOrderDetails?.supplierVehicle?.vehicle?.id || "");
            setDeliveryDate(getOrderDetails?.eta)
        }
    }, [getOrderDetails?.id, isUpdateOrder])

    useEffect(() => {
        dispatch(GetOrderDetails(localStorage.getItem("supplier_order_id")))
        dispatch(GetAllProviderVehicleListDown(localStorage.getItem("providerId")))
        dispatch(GetAllProviderEmployeeListDown(localStorage.getItem("providerId")))
    }, [])
    // main File
    return (
        <>
            <div className="head ">
                <div className="headLeft mt-3">
                    <h2>
                        <Link to="/dashboard/supplier/order-detail">
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
                        {/* {employeeDetails && t("employee_supplier_detail")} */}
                        {/* {approveDocument && "APPROVE DOCUMENTS"} */}
                    </h2>


                </div>
            </div>
            <div className="complete_order_container">
                <div className="row m-0 gx-4">
                    {/* title */}
                    <div className="off-set-2 col-2">

                    </div>
                    <div className="col-4">
                        <h4>{t("data")}</h4>
                    </div>
                    <div className="col-4">
                        <h4>{t("supplier_data")}</h4>
                    </div>
                    <div className="off-set-2 col-2">

                    </div>
                    {/* card */}
                    <div className="off-set-2 col-2">

                    </div>
                    <div className="col-4 left_conatiner ">

                        <div className='card_header'>
                            <h4>{t("supplier_information")}</h4>
                            <p><span>{getOrderDetails?.provider?.acronym} | </span>{getOrderDetails?.provider?.providerCompanyName}</p>
                            <h6>{t("company_name")}</h6>
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
                                <p className='long_text'>{getOrderDetails?.description}</p>
                            </div>
                        </div>



                    </div>
                    <div className="col-4 right_container ml-3" >

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
                                        disablePast
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
                                       
                                    >

                                        {
                                            getAllProviderEmployeeListDown?.map(item => {
                                                return (
                                                    <MenuItem value={item?.id}
                                                      
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
                                    <InputLabel id="vehicleId">{t("vehicle")}</InputLabel>
                                    <Select size="small"

                                        labelId="vehicleId"
                                        id="vehicleId_select"
                                        // defaultValue="EMPLOYEE"
                                        // value={employee}
                                        label={t("vehicle")}
                                        value={vehicleBrand}
                                        defaultValue={getOrderDetails?.supplierVehicle?.id || ""}
                                        onChange={(e) => setVehicleBrand(e.target.value)}

                                      
                                    >
                                        {
                                            getAllProviderVehicleListDown?.map(item => {
                                                return (
                                                    <MenuItem value={item?.id}
                                                        
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
                    
                    <div className="off-set-2 col-2">

                    </div>
                    {/* button */}
                    <div className="off-set-6 col-4">

                    </div>
                    <div className="col-4">
                        <div className='footer'>
                            <button 
                            // className='add-btn-1'
                            style={{width:'100%'}}
                            onClick={() => {
                                handelCompleteOrder()
                            }}>{isUpdateOrder ? t("update")?.toUpperCase() : t("complete")?.toLowerCase()}</button>
                        </div>
                    </div>

                    <div className="off-set-2 col-2">

                    </div>

                </div>
            </div>
        </>
    )
}

export default CompleteOrder