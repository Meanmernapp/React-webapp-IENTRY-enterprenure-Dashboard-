import React, { useEffect, useState } from 'react';
import companyImg from "../../../assets/images/companyImg.png";
import ic_map_marker from '../../../assets/images/ic-map-market.svg';
import { Employees } from './Employees/Employees';
import { Vehicles } from './Vehicles/Vehicles';
import CustomDropDown from '../../../components/CustomDropDown';
import LefletMap from '../../../components/LefletMap';
import { getAllCompaniesData, getCompanyData } from '../../../Apis/companydata';
import { getAllCompanyEmployees } from '../../../Apis/CompanyEmployee';
import { toast } from 'react-toastify';
import { getAllCompanyVehicles } from '../../../Apis/companyVehicle';
// import { toast } from 'react-toastify';

export const CompanyDetails = () => {
    const userdata = JSON.parse(sessionStorage.getItem("userdata"));
    const [companyDetail, setCompanyDetail] = useState();
    const [employeeData, setEmployeeData] = useState();
    const [vehicleData, setVehicleData] = useState();

    useEffect(() => {

        getAllCompaniesData().then(({ data: { data } }) => {
            console.log(data)
            setCompanyDetail(data[0]);
            localStorage.setItem("companyId", data[0]?.id)

            const body = {
                companyId: data[0]?.id,
                email: userdata?.data.email,
                pagination: {
                    order: true,
                    page: 0,
                    size: 4,
                    sortBy: "id"
                },
                userId: userdata?.data.id,
                userTypes: userdata?.data?.userType.name
            }

            getAllCompanyEmployees(body).then(({ data: { data } }) => {
                setEmployeeData(data.content)
                // console.log(data)
            }).catch(error => {
                // toast.error("something went wrong.")
            })


            getAllCompanyVehicles(body).then(({ data: { data } }) => {
                setVehicleData(data.content)
                // console.log(data)
            }).catch(error => {
                // toast.error("something went wrong.")
            })


        }).catch(error => {
            toast.error("something went wrong.")
        })

    }, [])
    return (
        <div className='company-detail'>
            <div className='head'>
                <h2>company details</h2>
                <p>location <img src={ic_map_marker} style={{ width: "18px", height: "24px" }} alt="ic_map_marker" /></p>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="detailCard">
                        <div className="detailCard-head">
                            <h4>{companyDetail?.name}</h4>
                            <CustomDropDown />
                        </div>
                        <div className='mt-2'>
                            <p>ADDRESS</p>
                            <ul>
                                <li>{companyDetail?.address}</li>
                            </ul>
                            <p>Employees</p>
                            <ul>
                                <li>{companyDetail?.noEmployees} Employees</li>
                            </ul>
                            <p>ZONES</p>
                            <ul>
                                <li>{companyDetail?.noZones} Zones</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <img
                        src={companyImg}
                        className="img-fluid companyImg"
                        alt="companyImg"
                    />
                </div>
                <div className="col-md-6" style={{ zIndex: "0" }}>
                    <LefletMap />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Employees employeeData={employeeData} />
                </div>
                <div className="col-md-6">
                    <Vehicles vehicleData={vehicleData} />
                </div>
            </div>
        </div>
    )
}
