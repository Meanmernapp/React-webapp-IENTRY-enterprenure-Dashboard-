import { Link, useParams, useNavigate } from "react-router-dom";
import VehicleCompanyData from "./subComponents/VehicleCompanyData";
import { TablePagination } from "@mui/material";
import vehicle from '../../../../assets/images/ic-car.svg'
import company from '../../../../assets/images/ic-building-outline.svg'
import companyImage from '../../../../assets/images/Capture4.PNG'
import { useEffect, useState } from "react";
import { ImagesByVehicleId, singleVehicleDetail } from "../../../../reduxToolkit/CompanyVehicles/CompanyVehiclesApi";
import { useDispatch, useSelector } from "react-redux";
import NoEvent from "../../Events/NoEvent";
import { updateCreateVehicleObj } from "../../../../reduxToolkit/CompanyVehicles/CompanyVehiclesSlice";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { permissionObj } from "../../../../Helpers/permission";


const EmployeeVehicleDetail = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const singleVehicleData = useSelector(state => state?.CompanyVehiclesSlice?.singleVehicleData);
    const imagesByVehicleIdList = useSelector(state => state?.CompanyVehiclesSlice?.imagesByVehicleIdList);
    const { permission } = useSelector(state => state.authenticatioauthennSlice);
    console.log(imagesByVehicleIdList)
    const { id } = useParams();
    let body;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    useEffect(() => {
        dispatch(singleVehicleDetail(id));
        body = {
            id: id,
            pagination: {
                order: true,
                page: page,
                size: rowsPerPage,
                sortBy: "id"
            }
        }
        dispatch(ImagesByVehicleId(body));
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        body = {
            id: id,
            pagination: {
                order: true,
                page: newPage,
                size: rowsPerPage,
                sortBy: "id"
            }
        }
        dispatch(ImagesByVehicleId(body));
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
        body = {
            id: id,
            pagination: {
                order: true,
                page: page,
                size: parseInt(event.target.value),
                sortBy: "id"
            }
        }
        dispatch(ImagesByVehicleId(body));
    };

    const handleVehicle = () => {
        dispatch(singleVehicleDetail(id)).then(({ payload: { data: { data } } }) => {
            const { vehicle } = data
            dispatch(updateCreateVehicleObj({
                brand: vehicle?.brand,
                color: vehicle?.color,
                model: vehicle?.model,
                plate: vehicle?.plate,
                serialNumber: vehicle?.serialNumber,
                subBrand: vehicle?.subBrand,
                vin: vehicle?.vin
            }))
            navigate(`/dashboard/employee/allVehicles/update-vehicle/${vehicle?.id}`);
        })
    }

    const checkStatus = (id) => {
        if (id === 2) {
            return "yellow"
        } else if (id === 3) {
            return "blue"
        } else if (id === 4) {
            return "green"
        } else if (id === 5) {
            return "orange"
        } else if (id === 6) {
            return "red"
        }
    }


    return (
        <>
            <div className='head'>
                <div className='headLeft'>
                    <Link to="/dashboard/employee/allvehicles">
                        <i className="fa fa-arrow-left" aria-hidden="true" style={{
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
                        <button
                            className="addNewVehicle"
                            onClick={handleVehicle}
                        >
                            {t('update_vehicle')}
                        </button>
                    </div>
                }
            </div>
            <div className="row" style={{ marginTop: "4rem" }}>
                <div className="col-12 col-md-12  col-lg-7">
                    <p className="mb-2 infoEmpl_text">
                        {t('vehicle_data')}
                        <img src={vehicle} alt="vehicle" />
                    </p>
                    <div className="empdetail_c">
                        <div
                            className="d-flex justify-content-end align-items-center"
                            style={{
                                color: checkStatus(singleVehicleData?.vehicle?.status?.id),
                                textTransform: "uppercase",
                                fontWeight: "bold"
                            }}
                        >
                            <p
                                className="mr-3 font-weight-bold"
                                style={{
                                    color: checkStatus(singleVehicleData?.vehicle?.status?.id),
                                    textTransform: "uppercase",
                                    fontWeight: "bold"
                                }}
                            >
                                {singleVehicleData?.vehicle?.status?.name ? singleVehicleData?.vehicle?.status?.name : "-"}
                            </p>
                            <i
                                className="fa fa-circle"
                                aria-hidden="true"
                            ></i>
                        </div>
                        <div className="row text-center">
                            <div className="col-md-6 mb-3">
                                <p className="font-weight-bold">{t('brand')}</p>
                                <p>{singleVehicleData?.vehicle?.brand ? singleVehicleData?.vehicle?.brand : "-"}</p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <p className="font-weight-bold">{t('sub_brand')}</p>
                                <p>{singleVehicleData?.vehicle?.subBrand ? singleVehicleData?.vehicle?.subBrand : "-"}</p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <p className="font-weight-bold">{t('color')}</p>
                                <p>{singleVehicleData?.vehicle?.color ? singleVehicleData?.vehicle?.color : "-"}</p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <p className="font-weight-bold">{t('model')}</p>
                                <p>{singleVehicleData?.vehicle?.model ? singleVehicleData?.vehicle?.model : "-"}</p>
                            </div>


                            <div className="col-md-6 mb-3">
                                <p className="font-weight-bold">{t('plates')}</p>
                                <p>{singleVehicleData?.vehicle?.plate ? singleVehicleData?.vehicle?.plate : "-"}</p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <p className="font-weight-bold">{t('vehicle_type')}</p>
                                <p>{singleVehicleData?.vehicle?.vin ? singleVehicleData?.vehicle?.vin : "-"}</p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <p className="font-weight-bold">{t('status')}</p>
                                <p>{singleVehicleData?.vehicle?.status?.name ? singleVehicleData?.vehicle?.status?.name : "-"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-12  col-lg-5">
                    <p className="mb-2 infoEmpl_text">
                        {t('company_data')}
                        <img src={company} alt="vehicle" />
                    </p>
                    <div className="empdetail_c">
                        <div className="row text-center">
                            <div className="col-md-12 mb-3">
                                <p className="font-weight-bold">{t('driver')}</p>
                                <p>{singleVehicleData?.user?.name ? singleVehicleData?.user?.name : "-"}</p>
                            </div>
                            <div className="col-md-12 mb-3">
                                <p className="font-weight-bold">{t('tag')}</p>
                                <p>{singleVehicleData?.company?.tag ? singleVehicleData?.company?.tag : "-"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-12 mt-5">
                    <p className="mb-2 infoEmpl_text">
                        {t('images')}
                        <img src={company} alt="vehicle" />
                    </p>
                    <div className="row text-center">
                        {
                            imagesByVehicleIdList?.content?.length !== 0 ?
                                <>
                                    {
                                        imagesByVehicleIdList?.content?.map(item => (
                                            <div className="col-md-3 mb-3" key={item}>
                                                <img src={companyImage} className="vehicleGallery" alt="companyImage" />
                                            </div>
                                        ))
                                    }
                                    <div className="d-flex justify-content-center">
                                        <TablePagination
                                            component="div"
                                            rowsPerPageOptions={[2, 4, 6, 8]}
                                            count={imagesByVehicleIdList?.totalElements}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            labelRowsPerPage="Images per page"
                                            rowsPerPage={rowsPerPage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </div>
                                </>
                                :
                                <NoEvent title="Images" />
                        }
                    </div>
                </div>
            </div>
        </>
    )

}
export default EmployeeVehicleDetail;