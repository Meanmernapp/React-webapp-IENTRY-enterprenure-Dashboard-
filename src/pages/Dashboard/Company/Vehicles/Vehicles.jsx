import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeVehicleCard from '../../../../components/EmployeeVehicleCard';
import VehicleCard from './VehicleCard';
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";
import Pagination from '../../../../components/Pagination';


const override = css`
  position: fixed;
  top: 50%;
  left: 50%;
  right: 0;
  bottom: 0; 
  z-index: 6; 
`;

export const Vehicles = ({ vehicleData }) => {
    const [page1, setPage1] = useState();
    const [rowsPerPage1, setRowsPerPage1] = useState();
    // console.log(vehicleData)
    return (
        <>
            <div className='employeeVehicleHead'>
                <div>
                    <h3>
                        Vehicles
                        <Link to='allvehicles'>
                            <sub>view more</sub>
                        </Link>
                    </h3>
                    <p>Total <span>{vehicleData?.length}</span></p>
                </div>
                <Link to="/dashboard/company/addupdatevehicle">
                    <button className='addNewEmployeeBtn'>Add new Vehicle</button>
                </Link>
            </div>
            <div className="row mb-3">
                {
                    vehicleData ?
                        vehicleData?.map(item => (
                            <div className="col-12 col-md-6" style={{ marginTop: "4.5rem" }} key={item.id}>
                                <VehicleCard vehicleCardData={item} />
                            </div>
                        )) :
                        <div className="overlay">
                            <HashLoader loading="true" css={override} size={50} color="#fff" />
                        </div>
                }
                <div className="col-10 mt-2">
                    <Pagination
                        setPage1={setPage1}
                        setRowsPerPage1={setRowsPerPage1}
                        label="Vehicles per page"
                    />
                </div>
            </div>
        </>
    )
}
