/*
author rizwan ullah
*/
import React, { useEffect, useState } from 'react';
import ic_map_marker from '../../../assets/images/ic-map-market.svg';
import { Employees } from './Employees/Employees';
import { Vehicles } from './Vehicles/Vehicles';
import CustomDropDown from '../../../components/CustomDropDown';
import LefletMap from '../../../components/LefletMap';
import { getCompanyData } from '../../../Apis/companydata';

// language translator import
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { mapCoordinates } from '../../../reduxToolkit/UpdateCompany/UpdateCompanySlice';
import { useDispatch, useSelector } from 'react-redux';

export const CompanyDetails = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const companyId = "a6bd2887-0f4a-4e5f-b0b5-000d9817ab23";
    const [companyDetail, setCompanyDetail] = useState();
    const { latLngObj } = useSelector(
        (state) => state.UpdateCompanySlice
    );



    useEffect(() => {
        /*
       get company object to show on main
       */
        getCompanyData(companyId).then(({ data: { data } }) => {
            console.log(data)
            setCompanyDetail(data);
            dispatch(mapCoordinates({
                address: data?.address,
                lat: data?.latitud,
                lng: data?.longitud
            }))
            localStorage.setItem("companyId", data[0]?.id)

        }).catch(error => {
            // toast.error("something went wrong.")
        })

    }, [])

    return (
        <div className='company-detail'>
            <div className='head'>
                <h2>{t('company_details')}</h2>
                <p>{t("location")}
                    <img
                        src={ic_map_marker}
                        style={{ width: "18px", height: "24px" }}
                        alt="ic_map_marker"
                    />
                </p>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="detailCard">
                        <div className="detailCard-head">
                            <h4>{companyDetail?.name}</h4>
                            <CustomDropDown />
                        </div>
                        <div className='mt-2' style={{ textAlign: lCode === "ar" ? "right" : "left" }}>
                            <p>{t('address')}</p>
                            <ul>
                                {/* slice address so that design should me same */}
                                <li>{`${companyDetail?.address?.slice(0, 50)}...`}</li>
                            </ul>
                            <p>{t('employees')}</p>
                            <ul>
                                <li>{`${companyDetail?.noEmployees} ${t('employees')}`}</li>
                            </ul>
                            <p>{t('vehicles')}</p>
                            <ul>
                                <li>{`${companyDetail?.noVehicles} ${t('vehicles')}`}</li>
                            </ul>
                            <p>{t('zone')}</p>
                            <ul>
                                <li>{`${companyDetail?.noZones} ${t('zone')}`}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <img
                        src={`data:${companyDetail?.path};base64,${companyDetail?.image}`}
                        className="img-fluid companyImg"
                        alt="companyImg"
                    />
                </div>
                <div className="col-md-6" style={{ zIndex: "0", position: "relative" }}>
                    <div style={{
                        width: "95%",
                        textAlign: "center",
                        height: "250px",
                        left: "0px",
                        top: "0px",
                        right: "0px",
                        overflow: "hidden",
                        position: "absolute",
                        zIndex: "1000",
                        margin: "auto",
                        borderRadius: "5px",
                    }}></div>
                    {
                        companyDetail?.latitud ?
                            <LefletMap
                                latlng={[companyDetail?.latitud, companyDetail?.longitud]}
                            /> : ""
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    {/* Author: Rizwan ullah
                        Employess cards component on main 
                    */}
                    <Employees />
                </div>
                <div className="col-md-6">
                    {/* Author: Rizwan ullah
                        Vehicles cards component on main 
                    */}
                    <Vehicles />
                </div>
            </div>
        </div >
    )
}
