// import React, { useEffect } from 'react'
// import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, } from "@mui/material";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useDispatch, useSelector } from 'react-redux';
// import { CreateVehicleAndRelation, SaveProviderVehicleImage, UpdateProviderVehicleData, UploadProviderVehicleImage } from '../../reduxToolkit/Providers/providersApi';
// import ChangeImageModal from './Modal/ChangeImageModal';
// import { toast } from 'react-toastify';
// import defaultUser from '../../assets/images/default-car.png'
// import { useTranslation } from 'react-i18next';
// import Cookies from 'js-cookie';

// const AddVehicle = ({ isUpdate }) => {
//     const { t } = useTranslation();
//     const lCode = Cookies.get("i18next") || "en";

//     // hooks
//     const dispatch = useDispatch()
//     const navigate = useNavigate();

//     // useState for form
//     const [brand, setBrand] = React.useState('');
//     const [subBrand, setSubBrand] = React.useState('');
//     const [color, setColor] = React.useState('');
//     const [model, setModel] = React.useState('');
//     const [plates, setPlates] = React.useState('');
//     const [vIn, setVIn] = React.useState('');
//     const [serialNumber, setSerialNumber] = React.useState('');
//     const [file, setFile] = React.useState('');
//     const [isStatus, setIsStatus] = React.useState('');
//     const [ProfileImage, setProfileImage] = React.useState("");

//     // use Selector
//     const { getSingleProviderVehicle } = useSelector(state => state?.providersSlice)
//     console.log(getSingleProviderVehicle)

//     const { checkProviderVehicleImage } = useSelector(state => state?.providersSlice)
//     console.log("checkImage", checkProviderVehicleImage)

//     const { getProviderVehicleImage } = useSelector(state => state?.providersSlice)
//     console.log(getProviderVehicleImage)

//     const { downloadProviderVehicleImage } = useSelector(state => state?.providersSlice)
//     console.log(downloadProviderVehicleImage)

//     const { getProviderVehicleStatus } = useSelector(state => state?.providersSlice)
//     console.log(getProviderVehicleStatus)




//     // funtion for reset form data
//     const resetForm = () => {
//         setBrand('');
//         setSubBrand('');
//         setColor('');
//         setModel('');
//         setPlates('');
//         setVIn('');
//         setSerialNumber('');
//         setFile('');
//         setProfileImage("");
//     }

//     // create funtion for add vehicle
//     const handelCreateVehicle = () => {
//         if (isUpdate) {
//             const updateData = {
//                 id: getSingleProviderVehicle?.id,
//                 brand,
//                 subBrand,
//                 color,
//                 model,
//                 plate: plates,
//                 vin: vIn,
//                 serialNumber,
//                 statusid: {
//                     id: isStatus
//                 },
//                 file

//             }
//             dispatch(UpdateProviderVehicleData(updateData)).then(() => {

//                 if (file != "" && getProviderVehicleImage?.id == null) {


//                     const imgData = {
//                         vehicle: {
//                             id: getSingleProviderVehicle?.id,
//                         },
//                         accessMethod: {
//                             id: "5"
//                         },
//                         description: "Face recognition"

//                     }
//                     dispatch(UploadProviderVehicleImage({ imgData, file }))

//                 } else {
//                     let formData = new FormData();
//                     formData.append('id', getProviderVehicleImage?.id);
//                     formData.append('option', "vehicle");
//                     formData.append('file', file[0]);
//                     dispatch(SaveProviderVehicleImage(formData))
//                 }
//                 resetForm();
//                 navigate("/dashboard/supplier/vehicle-documents")
//             })
//             console.log(updateData)

//         } else {
//             const data = {
//                 vehicle: {
//                     brand,
//                     subBrand,
//                     color,
//                     model: Number(model),
//                     plate: plates,
//                     vin: vIn,
//                     serialNumber,
//                     statusid: {
//                         id: isStatus
//                     },
//                 },
//                 providerId: localStorage.getItem('providerId'),
//                 file

//             }
//             console.log(data)
//             if (data.vehicle.brand == '' || data.vehicle.subBrand == '' || data.vehicle.color == '' || data.vehicle.model == '' || data.vehicle.plate == '' || data.vehicle.vin == '' || data.vehicle.serialNumber == '') {
//                 toast.error('Please fill all field')
//             } else {
//                 dispatch(CreateVehicleAndRelation(data)).then(() => {

//                     toast.success('Create Vehicle Success')
//                     navigate('/dashboard/supplier/vehicles')
//                     resetForm()
//                 })
//             }
//         }

//     }

//     // if user wanna update
//     useEffect(() => {
//         if (isUpdate) {
//             setBrand(getSingleProviderVehicle?.brand || '')
//             setSubBrand(getSingleProviderVehicle?.subBrand || '')
//             setColor(getSingleProviderVehicle?.color || '')
//             setModel(getSingleProviderVehicle?.model || '')
//             setPlates(getSingleProviderVehicle?.plate || '')
//             setVIn(getSingleProviderVehicle?.vin || '')
//             setSerialNumber(getSingleProviderVehicle?.serialNumber || '')
//             setIsStatus(getSingleProviderVehicle?.status?.id || '')
//         }

//     }, [getSingleProviderVehicle?.id])


//     return (
//         <>
//             <div className="head">
//                 <div className="headLeft">
//                     <h2 className='mt-2'>
//                         <Link to="/dashboard/supplier/vehicle-documents">
//                             <ArrowBackIcon
//                                 style={{
//                                     color: "#146F62",
//                                     fontSize: "30px",
//                                     marginRight: "30px",
//                                     transform: lCode === "ar" ? "scaleX(-1)" : "",
//                                     margin: "0 10px"
//                                 }}
//                             />
//                         </Link>
//                         {
//                             isUpdate ? t("update_vehicle") : t("create_vehicle")
//                         }

//                         {/* {employeeDetails && " t("employee_supplier_detail") Detail"} */}
//                         {/* {approveDocument && "APPROVE DOCUMENTS"} */}
//                     </h2>


//                 </div>
//             </div>
//             <div className="vehicle_container">
//                 <div className="vehicle_continer_body">
//                     <div className="card_header">

//                         {
//                             isUpdate &&
//                             <div className="left_active">
//                                 <p>{getSingleProviderVehicle?.status?.name}</p>
//                                 <div className="status_active"></div>
//                             </div>
//                         }


//                     </div>

//                     <div className='pic_top'>
//                         <img src={!ProfileImage ? checkProviderVehicleImage == true ? URL.createObjectURL(downloadProviderVehicleImage) : defaultUser : ProfileImage} alt="" />
//                         <div className="user_upload"
//                             data-toggle="modal"
//                             data-target="#profileImageChange"
//                         >
//                             <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
//                             <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
//                         </div>
//                     </div>

//                     <div className='container_add_vehicle'>

//                         <Grid container spacing={2} sx={{ marginTop: '5rem' }}>
//                             <Grid item xs={6} sx={{ position: "relative" }}>
//                                 <TextField size="small"
//                                     fullWidth

//                                     label={t("brand")}
//                                     id="BRAND"
//                                     value={brand}
//                                     onChange={(e) => setBrand(e.target.value)}
//                                     InputLabelProps={{
//                                         style: {
//                                             fontSize: "10px",
//                                             fontWeight: 600,
//                                             background: "#ffffff",
//                                             padding: "0px 8px 0px 8px",
//                                         },
//                                     }} // font size of input label
//                                     inputProps={{
//                                         sx: {
//                                             border: "none",
//                                             outline: "none",
//                                             fontSize: "10px",
//                                             letterSpacing: "0px",
//                                             color: "#707070",
//                                             "&::placeholder": {
//                                                 color: "#707070",
//                                                 fontSize: "8px",
//                                             },
//                                         },
//                                     }} sx={{
//                                         textAlign: lCode === "ar" ? "right" : "left",
//                                         "& 	.MuiOutlinedInput-notchedOutline": {
//                                             textAlign: lCode === "ar" ? "right" : "left",
//                                         },
//                                         "& 	.MuiInputLabel-root": {
//                                             fontSize: 12,
//                                             left: lCode === "ar" ? "inherit" : "0",
//                                             right: lCode === "ar" ? "1.75rem" : "0",
//                                             transformOrigin: lCode === "ar" ? "right" : "left"
//                                         }
//                                     }}
//                                 />
//                             </Grid>
//                             <Grid item xs={6} sx={{ position: "relative" }}>
//                                 <TextField size="small"

//                                     fullWidth


//                                     label={t("sub_brand")}
//                                     id="SUB-BRAND"
//                                     value={subBrand}
//                                     onChange={(e) => setSubBrand(e.target.value)}
//                                     InputLabelProps={{
//                                         style: {
//                                             fontSize: "10px",
//                                             fontWeight: 600,
//                                             background: "#ffffff",
//                                             padding: "0px 8px 0px 8px",
//                                         },
//                                     }} // font size of input label
//                                     inputProps={{
//                                         sx: {
//                                             border: "none",
//                                             outline: "none",
//                                             fontSize: "10px",
//                                             letterSpacing: "0px",
//                                             color: "#707070",
//                                             "&::placeholder": {
//                                                 color: "#707070",
//                                                 fontSize: "8px",
//                                             },
//                                         },
//                                     }} sx={{
//                                         textAlign: lCode === "ar" ? "right" : "left",
//                                         "& 	.MuiOutlinedInput-notchedOutline": {
//                                             textAlign: lCode === "ar" ? "right" : "left",
//                                         },
//                                         "& 	.MuiInputLabel-root": {
//                                             fontSize: 12,
//                                             left: lCode === "ar" ? "inherit" : "0",
//                                             right: lCode === "ar" ? "1.75rem" : "0",
//                                             transformOrigin: lCode === "ar" ? "right" : "left"
//                                         }
//                                     }}
//                                 />
//                             </Grid>

//                             <Grid item xs={6} sx={{ position: "relative", marginTop: '1rem' }}>
//                                 <TextField size="small"

//                                     fullWidth


//                                     label={t("color")}
//                                     id="COLOR"
//                                     value={color}
//                                     onChange={(e) => setColor(e.target.value)}
//                                     InputLabelProps={{
//                                         style: {
//                                             fontSize: "10px",
//                                             fontWeight: 600,
//                                             background: "#ffffff",
//                                             padding: "0px 8px 0px 8px",
//                                         },
//                                     }} // font size of input label
//                                     inputProps={{
//                                         sx: {
//                                             border: "none",
//                                             outline: "none",
//                                             fontSize: "10px",
//                                             letterSpacing: "0px",
//                                             color: "#707070",
//                                             "&::placeholder": {
//                                                 color: "#707070",
//                                                 fontSize: "8px",
//                                             },
//                                         },
//                                     }} sx={{
//                                         textAlign: lCode === "ar" ? "right" : "left",
//                                         "& 	.MuiOutlinedInput-notchedOutline": {
//                                             textAlign: lCode === "ar" ? "right" : "left",
//                                         },
//                                         "& 	.MuiInputLabel-root": {
//                                             fontSize: 12,
//                                             left: lCode === "ar" ? "inherit" : "0",
//                                             right: lCode === "ar" ? "1.75rem" : "0",
//                                             transformOrigin: lCode === "ar" ? "right" : "left"
//                                         }
//                                     }}
//                                 />
//                             </Grid>
//                             <Grid item xs={6} sx={{ position: "relative", marginTop: '1rem' }}>
//                                 <TextField size="small"

//                                     fullWidth


//                                     label={t("model")}
//                                     id="MODEL"
//                                     value={model}
//                                     onChange={(e) => setModel(e.target.value)}
//                                     InputLabelProps={{
//                                         style: {
//                                             fontSize: "10px",
//                                             fontWeight: 600,
//                                             background: "#ffffff",
//                                             padding: "0px 8px 0px 8px",
//                                         },
//                                     }} // font size of input label
//                                     inputProps={{
//                                         sx: {
//                                             border: "none",
//                                             outline: "none",
//                                             fontSize: "10px",
//                                             letterSpacing: "0px",
//                                             color: "#707070",
//                                             "&::placeholder": {
//                                                 color: "#707070",
//                                                 fontSize: "8px",
//                                             },
//                                         },
//                                     }} sx={{
//                                         textAlign: lCode === "ar" ? "right" : "left",
//                                         "& 	.MuiOutlinedInput-notchedOutline": {
//                                             textAlign: lCode === "ar" ? "right" : "left",
//                                         },
//                                         "& 	.MuiInputLabel-root": {
//                                             fontSize: 12,
//                                             left: lCode === "ar" ? "inherit" : "0",
//                                             right: lCode === "ar" ? "1.75rem" : "0",
//                                             transformOrigin: lCode === "ar" ? "right" : "left"
//                                         }
//                                     }}
//                                 />
//                             </Grid>

//                             <Grid item xs={6} sx={{ position: "relative", marginTop: '1rem' }}>
//                                 <TextField size="small"

//                                     fullWidth


//                                     label={t("plates")}
//                                     id="PLATES"
//                                     value={plates}
//                                     onChange={(e) => setPlates(e.target.value)}
//                                     InputLabelProps={{
//                                         style: {
//                                             fontSize: "10px",
//                                             fontWeight: 600,
//                                             background: "#ffffff",
//                                             padding: "0px 8px 0px 8px",
//                                         },
//                                     }} // font size of input label
//                                     inputProps={{
//                                         sx: {
//                                             border: "none",
//                                             outline: "none",
//                                             fontSize: "10px",
//                                             letterSpacing: "0px",
//                                             color: "#707070",
//                                             "&::placeholder": {
//                                                 color: "#707070",
//                                                 fontSize: "8px",
//                                             },
//                                         },
//                                     }} sx={{
//                                         textAlign: lCode === "ar" ? "right" : "left",
//                                         "& 	.MuiOutlinedInput-notchedOutline": {
//                                             textAlign: lCode === "ar" ? "right" : "left",
//                                         },
//                                         "& 	.MuiInputLabel-root": {
//                                             fontSize: 12,
//                                             left: lCode === "ar" ? "inherit" : "0",
//                                             right: lCode === "ar" ? "1.75rem" : "0",
//                                             transformOrigin: lCode === "ar" ? "right" : "left"
//                                         }
//                                     }}
//                                 />
//                             </Grid>

//                             <>
//                                 <Grid item xs={6} sx={{ position: "relative", marginTop: '1rem' }}>
//                                     <TextField size="small"

//                                         fullWidth


//                                         label={t("vin")}
//                                         id="VIN"
//                                         value={vIn}
//                                         onChange={(e) => setVIn(e.target.value)}


//                                         InputLabelProps={{
//                                             style: {
//                                                 fontSize: "10px",
//                                                 fontWeight: 600,
//                                                 background: "#ffffff",
//                                                 padding: "0px 8px 0px 8px",
//                                             },
//                                         }} // font size of input label
//                                         inputProps={{
//                                             sx: {
//                                                 border: "none",
//                                                 outline: "none",
//                                                 fontSize: "10px",
//                                                 letterSpacing: "0px",
//                                                 color: "#707070",
//                                                 "&::placeholder": {
//                                                     color: "#707070",
//                                                     fontSize: "8px",
//                                                 },
//                                             },
//                                         }}
//                                         sx={{
//                                             textAlign: lCode === "ar" ? "right" : "left",
//                                             "& 	.MuiOutlinedInput-notchedOutline": {
//                                                 textAlign: lCode === "ar" ? "right" : "left",
//                                             },
//                                             "& 	.MuiInputLabel-root": {
//                                                 fontSize: 12,
//                                                 left: lCode === "ar" ? "inherit" : "0",
//                                                 right: lCode === "ar" ? "1.75rem" : "0",
//                                                 transformOrigin: lCode === "ar" ? "right" : "left"
//                                             }
//                                         }}
//                                     />
//                                 </Grid>

//                                 <Grid item xs={6} sx={{ position: "relative", marginTop: '1rem' }}>
//                                     <TextField size="small"

//                                         fullWidth


//                                         label={t("serial_number")}
//                                         id="SERIAL NUMBER"
//                                         value={serialNumber}
//                                         onChange={(e) => setSerialNumber(e.target.value)}
//                                         InputLabelProps={{
//                                             style: {
//                                                 fontSize: "10px",
//                                                 fontWeight: 600,
//                                                 background: "#ffffff",
//                                                 padding: "0px 8px 0px 8px",
//                                             },
//                                         }} // font size of input label
//                                         inputProps={{
//                                             sx: {
//                                                 border: "none",
//                                                 outline: "none",
//                                                 fontSize: "10px",
//                                                 letterSpacing: "0px",
//                                                 color: "#707070",
//                                                 "&::placeholder": {
//                                                     color: "#707070",
//                                                     fontSize: "8px",
//                                                 },
//                                             },
//                                         }}
//                                         sx={{
//                                             textAlign: lCode === "ar" ? "right" : "left",
//                                             "& 	.MuiOutlinedInput-notchedOutline": {
//                                                 textAlign: lCode === "ar" ? "right" : "left",
//                                             },
//                                             "& 	.MuiInputLabel-root": {
//                                                 fontSize: 12,
//                                                 left: lCode === "ar" ? "inherit" : "0",
//                                                 right: lCode === "ar" ? "1.75rem" : "0",
//                                                 transformOrigin: lCode === "ar" ? "right" : "left"
//                                             }
//                                         }}
//                                     />
//                                 </Grid>
//                             </>






//                             <Grid item xs={6} sx={{ position: "relative", marginTop: '1rem' }}>
//                                 <Box  >
//                                     <FormControl fullWidth sx={{
//                                         textAlign: lCode === "ar" ? "right" : "left",
//                                         "& 	.MuiOutlinedInput-notchedOutline": {
//                                             textAlign: lCode === "ar" ? "right" : "left",
//                                         },
//                                         "& 	.MuiInputLabel-root": {
//                                             fontSize: 12,
//                                             left: lCode === "ar" ? "inherit" : "0",
//                                             right: lCode === "ar" ? "1.75rem" : "0",
//                                             transformOrigin: lCode === "ar" ? "right" : "left"
//                                         }
//                                     }}>

//                                         <InputLabel id="demo-simple-select-STATUS">{t("status")}</InputLabel >
//                                          <Select size="small"
//                                             labelId="demo-simple-select-STATUS"
//                                             id="demo-simple-select-STATUS"
//                                             defaultValue="employe"
//                                             label="STATUS"
//                                             value={isStatus}
//                                             onChange={(e) => setIsStatus(e.target.value)}
//                                             sx={{
//                                                 fontSize: "10px",
//                                                 padding: "3px 3px 3px 10px",
//                                             }}
//                                         >
//                                             {
//                                                 getProviderVehicleStatus?.map((item, index) => {
//                                                     return (
//                                                         <MenuItem key={index} sx={{ fontSize: "10px" }} value={item.id}>{item.name}</MenuItem>
//                                                     )
//                                                 })
//                                             }
//                                         </Select>
//                                     </FormControl>
//                                 </Box>
//                             </Grid>
//                         </Grid>

//                     </div>

//                     <div className='footer_add_vehicle'>
//                         <button onClick={() => {
//                             handelCreateVehicle()
//                         }}>
//                             {
//                                 isUpdate ? t("save_changes") : t("create_vehicle")
//                             }

//                             <span> <i className="fa fa-floppy-o" aria-hidden="true"></i></span></button>
//                     </div>
//                 </div>

//             </div>

//             <ChangeImageModal setProfileImage={setProfileImage} setFile={setFile} />
//         </>
//     )
// }


// export default AddVehicle

/*
Author : Arman Ali
Module: create Vehicle
github: https://github.com/Arman-Arzoo
*/

// import libarary and other
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from "react-router-dom";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import useStyle from '../../hooks/useStyle';
import UploadImageModal from '../../components/UploadImageModal';
import defaultImages from "../../assets/defaultImages/defaultCar.svg";
import broomIcon from "../../assets/icon/broom-solid.svg";
import BootstrapTooltip from '../../utils/BootstrapTooltip';
import { useDispatch, useSelector } from 'react-redux';
import { CreateVehicleEmployee, CreateVehicleImage, GetVehicleStatus, GetVehicleTags } from '../../reduxToolkit/Vehicle/VehicleApi';
import { toast } from 'react-toastify';
import { CreateVehicleAndRelation, GetSingleProviderVehicle, UpdateProviderVehicleData } from '../../reduxToolkit/Providers/providersApi';

// import vehicleDefault from '../../../../assets/defaultImages/vehicle.svg'

// Main Component
const AddVehicle = ({ isUpdate }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const { textField, smallBoxStyle } = useStyle()
    const [showModal, setShowModal] = useState(false)
    const [imageFile, setImageFile] = useState("")
    const [previewImage, setPreviewImage] = useState("")
    // form field state
    const [brand, setBrand] = useState("");
    const [subBrand, setSubBrand] = useState("");
    const [color, setColor] = useState("")
    const [model, setModel] = useState("")
    const [plates, setPlates] = useState("")
    const [vin, setVin] = useState("")
    const [serialNumber, setSerialNumber] = useState("")
    const [status, setStatus] = useState("")


    // useSelctor state from store slice vehicleSlice
    const { getVehicleStatus, getVehicleTags } = useSelector(state => state.VehicleSlice);
    const { getSingleProviderVehicle } = useSelector(state => state?.providersSlice)
    const resetForm = () => {
        setBrand("")
        setSubBrand("")
        setColor("")
        setModel("")
        setPlates("")
        setVin("")
        setSerialNumber("")
        setStatus("")

    }
    const handelCreateVehicle = () => {
        if (isUpdate) {
            const data = {
                id: getSingleProviderVehicle?.id,
                brand,
                subBrand,
                color,
                model,
                plate: plates,
                vin,
                serialNumber,
                status: {
                    id: status
                },



            }
            if (!brand || !subBrand || !color || !model || !plates || !vin || !serialNumber || !status) {
                toast.warn("Please Fill All The Field")
            } else {

                dispatch(UpdateProviderVehicleData({ data, imageFile })).then((res) => {
                    console.log(res)

                    navigate(-1)
                    // navigate("/dashboard/supplier/vehicles")

                })
            }
        } else {
            const vehicleData = {
                brand,
                subBrand,
                color,
                model,
                plate: plates,
                vin,
                serialNumber,
                status: {
                    id: status
                },



            }
            if (!brand || !subBrand || !color || !model || !plates || !vin || !serialNumber || !status) {
                toast.warn("Please Fill All The Field")
            } else {
                dispatch(CreateVehicleAndRelation({ vehicleData, imageFile })).then((res) => {
                    console.log(res)
                    navigate("/dashboard/supplier/vehicles")
                })

            }
        }
    }

    useEffect(() => {
        dispatch(GetVehicleStatus())
        dispatch(GetSingleProviderVehicle(localStorage.getItem("vehicleidfordetail")))
    }, [])
    //     // if user wanna update
    useEffect(() => {
        if (isUpdate) {
            setBrand(getSingleProviderVehicle?.brand || '')
            setSubBrand(getSingleProviderVehicle?.subBrand || '')
            setColor(getSingleProviderVehicle?.color || '')
            setModel(getSingleProviderVehicle?.model || '')
            setPlates(getSingleProviderVehicle?.plate || '')
            setVin(getSingleProviderVehicle?.vin || '')
            setSerialNumber(getSingleProviderVehicle?.serialNumber || '')
            setStatus(getSingleProviderVehicle?.status?.id || '')
        }

    }, [getSingleProviderVehicle?.id])
    return (
        <>
            {/* head with back link */}
            <div className='head'>
                <div className='headLeft'>
                    <Link to="#" onClick={()=>{ navigate(-1)}}>
                        <i className="fa fa-arrow-left" aria-hidden="true" style={{
                            transform: lCode === "ar" ? "scaleX(-1)" : "",
                            margin: "0 10px"
                        }}

                        ></i>
                    </Link>
                    <h2>
                        {isUpdate ? t('update_vehicle') : t('create_vehicle')}
                    </h2>
                </div>
            </div>
            {/* vehicle create card */}
            <div className="vehicle_create_container">
                <div className='vehice_create_container_main'>
                    <div className="create_vehicle_card">
                        <button className='create custom_primary_btn_dark'
                            onClick={() => { handelCreateVehicle() }}
                            style={{ width: "230px" }}>{isUpdate ? t("update").toUpperCase() : t("create")}
                        </button>
                        <BootstrapTooltip title={t("clean_all_inputs")} placement="right">
                            <button className='clear_all' onClick={() => { resetForm() }}>
                                <img src={broomIcon} alt="" />
                            </button>
                        </BootstrapTooltip>
                        {/* image upload */}
                        <div className='image_upload_container'>
                            <div className='image_upload'>
                                {
                                    isUpdate ?
                                        <img src={previewImage ? previewImage : getSingleProviderVehicle?.image ? `data:${getSingleProviderVehicle?.path};base64,${getSingleProviderVehicle?.image}` : defaultImages} alt="vehicle" />
                                        :

                                        <img src={previewImage ? previewImage : defaultImages} alt="vehicle" />
                                }
                            </div>
                            <div
                                className="upload_icon_btn"
                                onClick={() => setShowModal(true)}
                            >
                                <i className="fa fa-long-arrow-right height" aria-hidden="true"></i>
                                <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                            </div>
                        </div>

                        <div className='input_form_container p-4'>
                            <div className="row pt-2">
                                <div className="col-6">
                                    <Box

                                        sx={smallBoxStyle}
                                    >
                                        <TextField size="small"
                                            fullWidth
                                            label={t('brand')}
                                            name="brand"
                                            value={brand}
                                            onChange={(e) => setBrand(e.target.value)}
                                            id="BRAND"
                                            sx={textField}
                                        />
                                    </Box>
                                </div>
                                <div className="col-6">
                                    <Box

                                        sx={smallBoxStyle}
                                    >
                                        <TextField size="small"
                                            fullWidth
                                            label={t('sub_brand')}
                                            name="subBrand"
                                            value={subBrand}
                                            onChange={(e) => setSubBrand(e.target.value)}
                                            id="subBrand"
                                            sx={{
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
                                            }}
                                        />
                                    </Box>
                                </div>
                            </div>
                            <div className="row pt-2">
                                <div className="col-6">
                                    <Box

                                        sx={smallBoxStyle}
                                    >
                                        <TextField size="small"
                                            fullWidth
                                            label={t('color')}
                                            name="color"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            id="color"
                                            sx={textField}
                                        />
                                    </Box>
                                </div>
                                <div className="col-6">
                                    <Box

                                        sx={smallBoxStyle}
                                    >
                                        <TextField size="small"
                                            fullWidth
                                            label={t('model')}
                                            name="model"
                                            value={model}
                                            onChange={(e) => setModel(e.target.value)}
                                            id="model"
                                            sx={textField}
                                        />
                                    </Box>
                                </div>
                            </div>
                            <div className="row pt-2">
                                <div className="col-6">
                                    <Box

                                        sx={smallBoxStyle}
                                    >
                                        <TextField size="small"
                                            fullWidth
                                            label={t('plates')}
                                            name="plates"
                                            value={plates}
                                            onChange={(e) => setPlates(e.target.value)}
                                            id="plates"
                                            sx={textField}
                                        />
                                    </Box>
                                </div>
                                <div className="col-6">
                                    <Box
                                        sx={smallBoxStyle}
                                    >
                                        <TextField size="small"
                                            fullWidth
                                            label={t('vin')}
                                            name="vin"
                                            value={vin}
                                            onChange={(e) => setVin(e.target.value)}
                                            id="vin"
                                            sx={textField}
                                        />
                                    </Box>
                                </div>
                            </div>
                            <div className="row pt-2">
                                <div className="col-6">
                                    <Box
                                        sx={smallBoxStyle}
                                    >
                                        <TextField size="small"
                                            fullWidth
                                            label={t('serial_number')}
                                            name="serialNumber"
                                            value={serialNumber}
                                            onChange={(e) => setSerialNumber(e.target.value)}
                                            id="serialNumber"
                                            sx={textField}
                                        />
                                    </Box>
                                </div>
                                <div className="col-6">
                                    <Box sx={smallBoxStyle} >
                                        <FormControl fullWidth
                                            sx={textField}>
                                            <InputLabel id="status">
                                                {t("status")}
                                            </InputLabel>
                                            <Select size="small"
                                                labelId="status"
                                                id="statusId"
                                                label={t("status")}
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                {
                                                    getVehicleStatus?.map((item, index) => {
                                                        return (
                                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                                        )
                                                    })

                                                }

                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                            </div>



                        </div>


                    </div>
                </div>
            </div>

            <UploadImageModal
                title={t("add_image")}
                show={showModal}
                setImage={setImageFile}
                preview={previewImage}
                setPreview={setPreviewImage}
                onHide={() => setShowModal(false)}
            />

        </>
    )
}

export default AddVehicle