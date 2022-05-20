import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeVehicleCard from '../../../../components/EmployeeVehicleCard';
import VehicleCard from './VehicleCard';
import TablePagination from '@mui/material/TablePagination';
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

export const Vehicles = ({ vehicleData, noVehicles }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

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
                    <p>Total <span>{noVehicles}</span></p>
                </div>
                <Link to="/dashboard/company/addupdatevehicle">
                    <button className='addNewEmployeeBtn'>Add new Vehicle</button>
                </Link>
            </div>
            <div className="row mb-3">
                {
                    vehicleData ?
                        vehicleData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                            <div className="col-12 col-md-6" style={{ marginTop: "4.5rem" }} key={item.id}>
                                <VehicleCard vehicleCardData={item} />
                            </div>
                        )) :
                        <div className="overlay">
                            <HashLoader loading="true" css={override} size={50} color="#fff" />
                        </div>
                }
                <div className="col-10 mt-2">
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[1, 2, 3]}
                        count={vehicleData?.length}
                        page={page}
                        onPageChange={handleChangePage}
                        labelRowsPerPage="Vehicles per page"
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </>
    )
}
