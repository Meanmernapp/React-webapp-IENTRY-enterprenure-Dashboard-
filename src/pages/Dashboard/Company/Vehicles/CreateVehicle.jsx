import { Link, useNavigate } from "react-router-dom";
import VehicleCompanyData from "./subComponents/VehicleCompanyData";
import { useDispatch, useSelector } from "react-redux";
import { createVehicle } from "../../../../reduxToolkit/CompanyVehicles/CompanyVehiclesApi";
import { updateCreateVehicleObj } from "../../../../reduxToolkit/CompanyVehicles/CompanyVehiclesSlice";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'


const CreateVehicle = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createVehicleObj = useSelector(state => state?.CompanyVehiclesSlice?.createVehicleObj);

    const handleVehicle = () => {
        dispatch(createVehicle(createVehicleObj)).then(() => {
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
                        {t('create_vehicle')}
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
                        {t('create_vehicle')}
                    </button>
                </div>
            </div>
            <div className="row" style={{ marginTop: "4rem" }}>
                <VehicleCompanyData />
            </div>
        </>
    )

}
export default CreateVehicle;