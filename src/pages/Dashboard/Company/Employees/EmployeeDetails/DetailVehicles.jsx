import React from 'react'
import DetailNoData from './DetailNoData';
import ic_car from '../../../../../assets/images/ic-car.svg';
import angelright_icon from "../../../../../assets/images/angelright.svg";
import employee_4 from '../../../../../assets/images/employee-4.png'
import { Link } from 'react-router-dom';
import { GoPrimitiveDot } from 'react-icons/go'
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'

const handleStatus = (paramId) => {
    return paramId === 2 ? "#F2A100" :
        paramId === 3 ? "blue" :
            paramId === 4 ? "#0C4523" :
                paramId === 5 ? "orange" :
                    paramId === 6 ? "#BC0000" : "black"
}

const DetailVehicles = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const employeeVehiclesList = useSelector(state => state?.CompanyEmployeesSlice?.employeeVehiclesList);
    // console.log(employeeVehiclesList);

    return (
        <>
            <div className='detailTitleText'>
                <p>
                    <span>{t('vehicles')}</span>
                    <img src={ic_car} alt="ic_car" style={{
                        margin: "0 5px"
                    }} />
                </p>
            </div>
            {
                employeeVehiclesList.length !== 0 ?
                    <div className="row mb-5">
                        {
                            employeeVehiclesList.map(item => (
                                <div className="col-md-3" key={item}>
                                    <div className="employee_m" >
                                        <div className="top_heading_m">
                                            <p style={{ color: handleStatus(item.status.id) }}>{item?.status?.name}</p>
                                            <GoPrimitiveDot className="ml-1" style={{ color: handleStatus(item.status.id) }} />
                                        </div>
                                        <div className="emp_card_body">
                                            <img
                                                src={employee_4}
                                                style={{
                                                    width: "100%",
                                                    height: "117px"
                                                }}
                                                alt="employee_4"
                                            />
                                            <div className="p-2">
                                                <div className="emp_card_content">
                                                    <p>Brand</p>
                                                    <span>{item?.brand ? item?.brand : '-'}</span>
                                                </div>
                                                <div className="emp_card_content">
                                                    <p>Sub-Brand</p>
                                                    <span>{item?.subBrand ? item?.subBrand : '-'}</span>
                                                </div>
                                                <div className="emp_card_content">
                                                    <p>Model</p>
                                                    <span>{item?.model ? item?.model : '-'}</span>
                                                </div>
                                                <div className="emp_card_content">
                                                    <p>Color</p>
                                                    <span>{item?.color ? item?.color : '-'}</span>
                                                </div>
                                                <div className="emp_card_content">
                                                    <p>Plates</p>
                                                    <span>{item?.plate ? item?.plate : '-'}</span>
                                                </div>
                                                <div className="emp_card_content">
                                                    <p>S/N</p>
                                                    <span>{item?.serialNumber ? item?.serialNumber : '-'}</span>
                                                </div>
                                                <Link to={`/dashboard/company/employee-Detail/1`}>
                                                    <div className="employee_detail_m">
                                                        <p className="mb-1">
                                                            VEHICLE DETAILS
                                                        </p>
                                                        <img src={angelright_icon} alt="" />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div> :
                    <DetailNoData title={t('no_vehicles')} />
            }
        </>
    )
}

export default DetailVehicles