import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllCompanyVehicles } from "../../../../../Apis/companyVehicle";
import { TablePagination } from "@mui/material";
import { Card } from "react-bootstrap";
import car from "../../../../../assets/images/car.png";
import angelright_icon from "../../../../../assets/images/angelright.svg";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
const AllVehiclesCards = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    const [vehicleData, setVehicleData] = useState();
    // console.log(vehicleData)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    useEffect(() => {

        const body = {
            order: true,
            page: page,
            size: rowsPerPage,
            sortBy: "id"
        }

        getAllCompanyVehicles(body).then(({ data: { data } }) => {
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
            <div className="row mt-5 mr-2">
                {
                    vehicleData?.content?.map(item => (
                        <div className="col-md-3" key={item?.id}>
                            <div className="vehicle_component">
                                <div
                                    className="statusDiv"
                                    style={{
                                        color: checkStatus(item?.vehicle?.status?.id),
                                        textTransform: "uppercase",
                                        fontWeight: "bold"
                                    }}
                                >
                                    <p>
                                        {item?.vehicle?.status?.name.replace(/\_/g, " ")}
                                    </p>
                                    <i
                                        className="fa fa-circle"
                                        aria-hidden="true"
                                    ></i>
                                </div>
                                <div className="vehicle_card_header" style={{ display: "flex" }}>
                                    <img src={car} />
                                    <div className="header_component">
                                        <p>{item?.vehicle?.brand}</p>
                                        <span>{item?.vehicle?.subBrand}</span>
                                    </div>
                                </div>
                                <div
                                    className="vehicle_card_body"
                                >
                                    <p>{t('model')}</p>
                                    <span>{item?.vehicle?.model}</span>
                                    <p>{t('color')}</p>
                                    <span>{item?.vehicle?.color}</span>
                                    <p>{t('plates')}</p>
                                    <span>{item?.vehicle?.plate}</span>
                                    <p>{t('s_n')}</p>
                                    <span>{item?.vehicle?.serialNumber}</span>
                                    <p>{t('driver')}</p>
                                    <span>{item?.user?.name}</span>
                                </div>
                                <Link to={`/dashboard/employee/allVehicles/vehicle-detail/${item?.vehicle?.id}`} className="update_data">
                                    {t('vehicle_details')}
                                    <span>
                                        <img src={angelright_icon} alt="" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : "",
                                            margin: "0 10px"
                                        }}

                                        />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="d-flex justify-content-center">
                <TablePagination
                    component="div"
                    size="small"
                    rowsPerPageOptions={[8, 16, 24, 32]}
                    count={vehicleData?.totalElements}
                    page={page}
                    onPageChange={handleChangePage}
                    labelRowsPerPage="Vehicles per page"
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        textTransform: "capitalize"
                    }}
                />
            </div>
        </>
    )
}

export default AllVehiclesCards;