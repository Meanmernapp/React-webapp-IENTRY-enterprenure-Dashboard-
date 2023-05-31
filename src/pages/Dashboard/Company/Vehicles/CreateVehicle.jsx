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
import useStyle from '../../../../hooks/useStyle';
import UploadImageModal from '../../../../components/UploadImageModal';
import defaultImages from "../../../../assets/defaultImages/defaultCar.svg";
import broomIcon from "../../../../assets/icon/broom-solid.svg";
import BootstrapTooltip from '../../../../utils/BootstrapTooltip';
import { useDispatch, useSelector } from 'react-redux';
import { CreateVehicleEmployee, GetVehicleStatus, GetVehicleTags } from '../../../../reduxToolkit/Vehicle/VehicleApi';
import { toast } from 'react-toastify';

// import vehicleDefault from '../../../../assets/defaultImages/vehicle.svg'

// Main Component
const CreateVehicle = () => {

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
    const [tags, setTags] = useState("")

    // useSelctor state from store slice vehicleSlice
    const { getVehicleStatus, getVehicleTags } = useSelector(state => state.VehicleSlice);
    const resetForm = () => {
        setBrand("")
        setSubBrand("")
        setColor("")
        setModel("")
        setPlates("")
        setVin("")
        setSerialNumber("")
        setStatus("")
        setTags("")
    }
    const handelCreateVehicle = () => {

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
            tag:null
            // tag: {
            //     id: tags.toString()
            // },
            // imageFile
        }
        if(!brand || !subBrand || !color || !model || !plates || !vin || !serialNumber || !status ){
            toast.warn("Please Fill All The Field")
        }else{
            dispatch(CreateVehicleEmployee({vehicleData ,imageFile})).then((res)=>{
                console.log(res)
                navigate("/dashboard/employee/allvehicles")
            })

        }
    }

    useEffect(() => {
        dispatch(GetVehicleStatus())
        dispatch(GetVehicleTags())
    }, [])
    return (
        <>
            {/* head with back link */}
            <div className='head'>
                <div className='headLeft'>
                    <Link to="/dashboard/employee/allVehicles">
                        <i className="fa fa-arrow-left" aria-hidden="true" style={{
                            transform: lCode === "ar" ? "scaleX(-1)" : "",
                            margin: "0 10px"
                        }}

                        ></i>
                    </Link>
                    <h2>
                        {t('create_vehicle')}
                    </h2>
                </div>
            </div>
            {/* vehicle create card */}
            <div className="vehicle_create_container">
                <div className='vehice_create_container_main'>
                    <div className="create_vehicle_card">
                        <button className='create custom_primary_btn_dark'
                            onClick={() => { handelCreateVehicle() }}
                            style={{ width: "230px" }}>{t("create")}
                        </button>
                        <BootstrapTooltip title={t("clean_all_inputs")} placement="right">
                            <button className='clear_all' onClick={() => { resetForm() }}>
                                <img src={broomIcon} alt="" />
                            </button>
                        </BootstrapTooltip>
                        {/* image upload */}
                        <div className='image_upload_container'>
                            <div className='image_upload'>
                                <img src={previewImage ? previewImage : defaultImages} alt="vehicle" />
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
                            <div className="row pt-2">
                                <div className="col-6">
                                    <Box sx={smallBoxStyle} >
                                        <FormControl fullWidth
                                            sx={textField}>
                                            <InputLabel id="tags">
                                                {t("tags")}
                                            </InputLabel>
                                            <Select size="small"
                                                labelId="tags"
                                                id="tagsId"
                                                label={t("tags")}
                                                value={tags}
                                                onChange={(e) => setTags(e.target.value)}
                                            >
                                                {
                                                    getVehicleTags?.map((item, index) => {
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

export default CreateVehicle