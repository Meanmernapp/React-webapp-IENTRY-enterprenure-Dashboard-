import { Link, useNavigate, useParams } from "react-router-dom";
import VehicleCompanyData from "./subComponents/VehicleCompanyData";
import { useDispatch, useSelector } from "react-redux";
import { createVehicle, singleVehicleDetail, updateVehicle } from "../../../../reduxToolkit/CompanyVehicles/CompanyVehiclesApi";
import { updateCreateVehicleObj } from "../../../../reduxToolkit/CompanyVehicles/CompanyVehiclesSlice";
import VehicleGallery from "./subComponents/VehicleGallery";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'


const UpdateVehicle = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const createVehicleObj = useSelector(state => state?.CompanyVehiclesSlice?.createVehicleObj);
    const singleVehicleData = useSelector(state => state?.CompanyVehiclesSlice?.singleVehicleData);


    useEffect(() => {
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
        })
    }, [])

    const handleVehicle = () => {
        const body = {
            brand: createVehicleObj?.brand,
            color: createVehicleObj?.color,
            id: id,
            model: 0,
            status: {
                id: singleVehicleData?.vehicle?.status?.id,
            },
            plate: createVehicleObj?.plate,
            serialNumber: createVehicleObj?.serialNumber,
            subBrand: createVehicleObj?.subBrand,
            vin: createVehicleObj?.vin
        }
        dispatch(updateVehicle(body)).then(() => {
            dispatch(updateCreateVehicleObj({
                brand: "",
                color: "",
                model: 0,
                plate: "",
                serialNumber: "",
                subBrand: "",
                vin: ""
            }))
            navigate('/dashboard/employee/allVehicles');
        })
    }

    return (
        <>
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
                        {t('update_vehicle')}
                    </h2>
                </div>
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
            </div>
            <div className="row" style={{ marginTop: "4rem" }}>
                <VehicleCompanyData />
            </div>
            <VehicleGallery />
        </>
    )

}
export default UpdateVehicle;