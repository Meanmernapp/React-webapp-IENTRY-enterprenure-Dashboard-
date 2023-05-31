/*
Author : Arman Ali
Module: create Vehicle
github: https://github.com/Arman-Arzoo
*/

import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { permissionObj } from "../../../../Helpers/permission";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomTextWithLine from '../../../../components/CustomTextWithLine';
import VehicleStatus from '../../../../components/VehicleStatus';
import defaultUser from "../../../../assets/defaultImages/defaultUser.png"
import TablePagination from '@mui/material/TablePagination';
import DriverModal from './modal/DriverModal';
import { useState } from 'react';
import { GetAllDriverRelationship, GetListOfVehicleImages, GetVehicleById, PremmissionType } from '../../../../reduxToolkit/Vehicle/VehicleApi';
import NotFoundDataWarning from '../../../../components/NotFoundDataWarning';
import { GetAllEmployee } from '../../../../reduxToolkit/EmployeeOnBoarding/EmployeeOnBoardingApi';

const EmployeeVehicleDetail = () => {
    // use hook
    const dispatch = useDispatch()
    const params = useParams()
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    // useState
    const [showModal, setShowModal] = useState(false)
    const [isDriverAdd, setIsDriverAdd] = useState("")
    const [updateDriverId, setUpdateDriverId] = useState("")
    const [driverNameUpdate, setDriverNameUpdate] = useState("")
    const [pageImage, setPageImage] = useState(0);
    const [rowsPerPageImage, setRowsPerPageImage] = useState(4);
    const [orderBy, setOrderBy] = useState();
    const [sortBy, setSortBy] = useState();
    //  state from store reducer
    const { permission } = useSelector(state => state.authenticatioauthennSlice);
    const { getAllDriverRelationship, getListOfVehicleImages, getVehicleById,
        addDriver, removeDriverEmployee, updateDriver,updateVehicleEmployee,deleteVehicleImage
    } = useSelector(state => state.VehicleSlice)
    const {uploadImage}= useSelector(state => state.sharedSlice)
    
    // functions
    // a funtion to control zone page
    const handleChangePageImage = (event, newPage) => {
        setPageImage(newPage);
    };
    // a funtion to control row per page 
    const handleChangeRowsPerPageImage = event => {
        setRowsPerPageImage(parseInt(event.target.value));
        setPageImage(0);
    };

    useEffect(() => {
        dispatch(GetAllEmployee())
        dispatch(PremmissionType())
        dispatch(GetVehicleById(params?.id))
    }, [updateVehicleEmployee])
    useEffect(() => {

        dispatch(GetAllDriverRelationship(params?.id))
    }, [addDriver, removeDriverEmployee, updateDriver])
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
    }, [sortBy, pageImage, rowsPerPageImage, orderBy,deleteVehicleImage,uploadImage])
    return (
        <>
            {/* top header */}
            <div className="vehicle_detail_container">
                <div className='head'>
                    <div className='headLeft'>
                        <Link to="/dashboard/employee/allvehicles">
                            <i className="fa fa-arrow-left" aria-hidden="true"
                                style={{
                                    transform: lCode === "ar" ? "scaleX(-1)" : "",
                                    margin: "0 10px"
                                }}

                            ></i>
                        </Link>
                        <h2>
                            {t('vehicle_details')}
                        </h2>
                    </div>
                    {

                        permission?.includes(permissionObj?.WEB_VEHICLE_UPDATE) &&
                        <div
                            style={{
                                display: "flex",
                                gridGap: "10px"
                            }}
                        >
                            <Link to={`/dashboard/employee/allVehicles/update-vehicle/${params?.id}`}>
                                <button
                                    className="custom_primary_btn_dark"
                                    style={{ width: "230px" }}
                                // onClick={handleVehicle}
                                >
                                    {t('update')}
                                </button>
                            </Link>
                        </div>
                    }
                </div>
                {/* vehicle detail */}
                <div className="vehicle_detail_items">
                    {/* @Data */}
                    <CustomTextWithLine title={t("data")} />
                    <div className="data_items">
                        <VehicleStatus statusName={getVehicleById?.status?.name?.replaceAll("_", " ") || "-"} top={"5px"} right={"25px"} data={getVehicleById} />
                        <div className="row">
                            <div className="col-6">
                                <div className="vehical_data">
                                    <h4>{t("brand")}</h4>
                                    <p>{getVehicleById?.brand || "-"}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="vehical_data">
                                    <h4>{t("sub_brand")}</h4>
                                    <p>{getVehicleById?.subBrand || "-"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="vehical_data">
                                    <h4>{t("color")}</h4>
                                    <p>{getVehicleById?.color || "-"}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="vehical_data">
                                    <h4>{t("model")}</h4>
                                    <p>{getVehicleById?.model || "-"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="vehical_data">
                                    <h4>{t("plates")}</h4>
                                    <p>{getVehicleById?.plate || "-"}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="vehical_data">
                                    <h4>{t("vin")}</h4>
                                    <p>{getVehicleById?.vin || "-"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="vehical_data">
                                    <h4>S/N</h4>
                                    <p>{getVehicleById?.serialNumber || "-"}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="vehical_data">
                                    <h4>{t("tag")}</h4>
                                    <p>{getVehicleById?.tag || "-"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* @driver */}
                    <CustomTextWithLine title={t("CONDUCTORES")} />
                    <div className="driver_items_container">
                        <div className="driver_item_card">
                            {

                                getAllDriverRelationship?.map(item => {
                                    const fromDate = new Date(item?.from);
                                    const toDate = new Date(item?.to);
                                    return (
                                        <div className="driver_item" key={item?.id}>
                                            <div className="edit" onClick={() => {
                                                setShowModal(true)
                                                setIsDriverAdd("update")
                                                setUpdateDriverId(item?.id)
                                                setDriverNameUpdate(item)
                                            }} >
                                                <i className="fa fa-pencil " aria-hidden="true"></i>
                                            </div>
                                            <div className="driver_avatar">
                                                <img src={item?.selfie ? `data:image/png;base64,${item?.selfie}` : defaultUser} alt="" />
                                                <Link to="#">{t("see_details")}</Link>
                                            </div>

                                            <div className="driver_info">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="driver_data">
                                                            <h4>{t("name")}</h4>
                                                            <p>{item?.name || "-"}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="driver_data">
                                                            <h4>{t("employee_id")}</h4>
                                                            <p>{item?.employeeId || "-"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="driver_data">
                                                            <h4>{t("email")}</h4>
                                                            <p>{item?.email || "-"}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="driver_data">
                                                            <h4>{t("phone_number")}</h4>
                                                            <p>{item?.phoneNumber || "-"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="driver_data">
                                                            <h4>{t("permission_type")}</h4>
                                                            <p>{item?.vehiclePermissionTypeName || "-"}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="driver_data">
                                                            <h4>{t("from")}</h4>
                                                            <p>{fromDate?.toLocaleDateString("en-US") || "-"}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="driver_data">
                                                            <h4>{t("to")}</h4>
                                                            <p>{toDate?.toLocaleDateString("en-US") || "-"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                }
                                )

                            }
                        </div>

                        <div className="add_driver_container">
                            <div className="add_driver_item" onClick={() => {
                                setShowModal(true)
                                setIsDriverAdd("add")
                            }}>
                                <p>AGREGAR CONDUCTOR</p>
                                <span><i className="fa fa-plus" aria-hidden="true"></i></span>
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
                                            <div className='vehicle_image' key={item?.id}>
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
                </div>
            </div>

            <DriverModal
                title={isDriverAdd == "add" ? t("add_driver") : t("driver_detail")}
                checkmodal={isDriverAdd}
                id={isDriverAdd == "add" ? params?.id : updateDriverId}
                show={showModal}
                data={driverNameUpdate}
                onHide={() => setShowModal(false)}
            />
        </>
    )
}

export default EmployeeVehicleDetail