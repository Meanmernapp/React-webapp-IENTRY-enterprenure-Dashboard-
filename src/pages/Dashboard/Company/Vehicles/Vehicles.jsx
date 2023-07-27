import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import VehicleCard from './VehicleCard';
import TablePagination from '@mui/material/TablePagination';
import { getAllCompanyVehicles } from '../../../../Apis/companyVehicle';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import { permissionObj } from '../../../../Helpers/permission';
import { useSelector } from 'react-redux';
import i18next, { t } from "i18next";

export const Vehicles = () => {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [vehicleData, setVehicleData] = useState();

    const { permission } = useSelector(state => state.authenticatioauthennSlice);

    useEffect(() => {

        const pagination = {
            order: true,
            page: page,
            size: rowsPerPage,
            sortBy: "id"
        }

        getAllCompanyVehicles(pagination).then(({ data: { data } }) => {
            setVehicleData(data)
            // console.log(data)
        }).catch(error => {
            toast.error("something went wrong.")
        })

    }, [page, rowsPerPage])


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
                    {
                        permission?.includes(permissionObj?.WEB_VEHICLE_READ) &&
                        <h3>
                            {t('vehicles')}
                            <Link to='/dashboard/employee/allvehicles'>
                                <sub>{t('view_more')}</sub>
                            </Link>
                        </h3>
                    }

                    <p>{t('total')} <span>{vehicleData?.totalElements}</span></p>
                </div>
                {permission?.includes(permissionObj?.WEB_VEHICLE_CREATE) &&
                    <Link to="/dashboard/employee/allvehicles/create-vehicle">
                        <button className='addNewEmployeeBtn'>{t('add_new_vehicle')}</button>
                    </Link>
                }
            </div>
            <div className="row mb-3">
                {
                    vehicleData?.content !== 0 ?
                        <>
                            {vehicleData?.content?.map(item => (
                                <div className="col-12 col-md-6" style={{ marginTop: "4.5rem" }} key={item.id}>
                                    <VehicleCard vehicleCardData={item} />
                                </div>
                            ))}
                            <div className="col-10 mt-2">
                                <TablePagination
                                    component="div"
                                    rowsPerPageOptions={[8, 16, 24, 32]}
                                    count={vehicleData?.totalElements}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    labelRowsPerPage={t('vehicles_per_page')}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    sx={{
                                        "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root": {
                                            transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
                                        }
                                    }}
                                />
                            </div>
                        </> :
                        <div className='noItem'>
                            No Vehicles
                        </div>
                }
            </div>
        </>
    )
}
