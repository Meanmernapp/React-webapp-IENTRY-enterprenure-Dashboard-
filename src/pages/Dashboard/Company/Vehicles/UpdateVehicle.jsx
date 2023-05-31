import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import CustomTextWithLine from '../../../../components/CustomTextWithLine';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import useStyle from '../../../../hooks/useStyle';
import broomIcon from "../../../../assets/icon/broom-solid.svg";
import cloudsvg from "../../../../assets/images/cloud.svg";
import BootstrapTooltip from '../../../../utils/BootstrapTooltip';
import TablePagination from '@mui/material/TablePagination';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';
import { fileSize } from '../../../../constant/variable';
import { GetListOfVehicleImages, GetVehicleById, GetVehicleStatus, GetVehicleTags, UpdateVehicleEmployee } from '../../../../reduxToolkit/Vehicle/VehicleApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import NotFoundDataWarning from '../../../../components/NotFoundDataWarning';
import RemoveDriver from './modal/RemoveDriver';

const UpdateVehicle = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const lCode = Cookies.get("i18next") || "en";
    const { textField, smallBoxStyle } = useStyle()
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
    const [image, setImage] = useState();
    const [preview, setPreview] = useState()
    const [showImgDelete, setShowImgDelete] = useState(false)
    const [vehicleImageId, setVehicleImageId] = useState("")

    // pagination
    const [pageImage, setPageImage] = useState(0);
    const [rowsPerPageImage, setRowsPerPageImage] = useState(4);
    const [orderBy, setOrderBy] = useState();
    const [sortBy, setSortBy] = useState();

    // useSelctor state from store slice vehicleSlice
    const { getVehicleStatus, getVehicleTags, getVehicleById, getListOfVehicleImages, deleteVehicleImage } = useSelector(state => state.VehicleSlice);

    // functions
    // reset
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

    // a funtion to control zone page
    const handleChangePageImage = (event, newPage) => {
        setPageImage(newPage);
    };
    // a funtion to control row per page 
    const handleChangeRowsPerPageImage = event => {
        setRowsPerPageImage(parseInt(event.target.value));
        setPageImage(0);
    };
    // funtion to handle image upload
    const handleImageUpload = (event) => {

        event.map((file) => {
            console.log(file)
            const fileImage = file["type"].split("/")[0] === "image";
            if (fileImage) {
                if (file?.size <= fileSize) {
                    setImage(file)
                    setPreview(URL.createObjectURL(file))
                } else {
                    toast.warn("File Should not more then 500kb")
                }
            } else {
                toast.warn("Please Upload Image File")
            }
        });


    };
    // handle update vehicle
    const handelUpdateVehicle = () => {

        const vehicleData = {
            id: params?.id,
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
            tag: null
            // tag: {
            //     id: tags.toString()
            // },

        }
        if (!brand || !subBrand || !color || !model || !plates || !vin || !serialNumber || !status
            // || !tags
        ) {
            toast.warn("Please Fill All The Field")
        } else {
            dispatch(UpdateVehicleEmployee({ vehicleData, imageFile: image })).then((res) => {
                console.log(res)
                navigate(`/dashboard/employee/allVehicles/vehicle-detail/${params?.id}`)
            })

        }
    }

    useEffect(() => {
        dispatch(GetVehicleStatus())
        dispatch(GetVehicleTags())
        dispatch(GetVehicleById(params?.id))
    }, [])
    // fill the data by id 
    useEffect(() => {
        setBrand(getVehicleById?.brand || "")
        setSubBrand(getVehicleById?.subBrand || "")
        setColor(getVehicleById?.color || "")
        setModel(getVehicleById?.model || "")
        setPlates(getVehicleById?.plate || "")
        setVin(getVehicleById?.vin || "")
        setSerialNumber(getVehicleById?.serialNumber || "")
        setStatus(getVehicleById?.status?.id || "")
        setTags(getVehicleById?.tag?.id || "")

    }, [getVehicleById?.id
    ])
    useEffect(() => {
        const data = {
            pagination: {
                "order": sortBy === 'asc' ? true : false,
                "page": pageImage,
                "size": rowsPerPageImage,
                "sortBy": orderBy ? orderBy : "id"
            },
            vehicleId: params?.id
        }
        dispatch(GetListOfVehicleImages(data))
    }, [sortBy, pageImage, rowsPerPageImage, orderBy, deleteVehicleImage])
    return (
        <>

            <div className="vehicle_upadate_container">
                {/* head with back link */}
                <div className='head'>
                    <div className='headLeft'>
                        <Link to={`/dashboard/employee/allVehicles/vehicle-detail/${params?.id}`}>
                            <i className="fa fa-arrow-left" aria-hidden="true" style={{
                                transform: lCode === "ar" ? "scaleX(-1)" : "",
                                margin: "0 10px"
                            }}
                            ></i>
                        </Link>
                        <h2>
                            {t('update_vehicle')}
                        </h2>
                    </div>
                </div>
                <div className='vehicle_update_items'>
                    {/* @data */}
                    <CustomTextWithLine title={t("data")} />
                    <div className="update_data p-4">
                        <BootstrapTooltip title={t("clean_all_inputs")} placement="right">
                            <button className='clear_all' onClick={() => { resetForm() }}>
                                <img src={broomIcon} alt="" />
                            </button>
                        </BootstrapTooltip>

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
                    {/* @images */}
                    <CustomTextWithLine title={t("images")} />
                    <div className="vehicle_images_container">
                        <div className="vehicle_images_item">

                            {
                                getListOfVehicleImages?.content?.length > 0 ?
                                    getListOfVehicleImages?.content?.map(item => {
                                        return (
                                            <div className='vehicle_image'>
                                                <button className='cross_icon' onClick={() => {
                                                    setShowImgDelete(true)
                                                    setVehicleImageId(item?.id)
                                                }}>
                                                    <i class="fa fa-times" aria-hidden="true"></i>
                                                </button>
                                                <img src={item?.image ? `data:image/png;base64,${item?.image}` : ""} alt="" />
                                            </div>
                                        )
                                    }) :
                                    <>
                                        <NotFoundDataWarning text={t("no_image")} />
                                    </>

                            }
                        </div>

                        <div className="d-flex justify-content-center pt-3">
                            <TablePagination
                                component="div"
                                rowsPerPageOptions={[4, 8]}
                                count={getListOfVehicleImages?.totalElements}
                                page={pageImage}
                                onPageChange={handleChangePageImage}
                                labelRowsPerPage={t("images_per_page")}
                                rowsPerPage={rowsPerPageImage}
                                onRowsPerPageChange={handleChangeRowsPerPageImage}
                            />
                        </div>
                    </div>
                    {/* @upload image */}
                    <CustomTextWithLine title={t("upload_image")} />
                    <div className="upload_images">

                        <div className="row">
                            <div className="col-7">
                                <Dropzone onDrop={acceptedFiles => { handleImageUpload(acceptedFiles) }}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section className='drop_zone_area'>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} onChange={(e) => handleImageUpload(e)} />
                                                <div className='drop_zone_item'>
                                                    <img src={cloudsvg} alt="" />
                                                    <p>DRAG & DROP <br /> YOUR IMAGE <br /> <span>MAX SIZE {fileSize / 1000} KB</span></p>
                                                </div>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>

                            </div>
                            <div className="col-5">
                                {
                                    preview &&
                                    <div className="preview_image">
                                        <img src={preview} alt="" width="100%" height="196px" />
                                    </div>
                                }

                            </div>
                        </div>


                        <div className="footer">
                            <button className='custom_btn_cancel_gray_hover' style={{ width: "372px" }}>{t("cancel")}</button>
                            <button className='custom_primary_btn_dark' style={{ width: "372px" }}
                                onClick={() => handelUpdateVehicle()}
                            >{t("upload")}</button>
                        </div>

                    </div>
                </div>

            </div>

            <RemoveDriver
                modal_name="delete_image"
                show={showImgDelete}
                onHide={() => setShowImgDelete(false)}
                title_modal={t("delete_image")}
                data={{ id: vehicleImageId }}
            />
        </>
    )
}

export default UpdateVehicle