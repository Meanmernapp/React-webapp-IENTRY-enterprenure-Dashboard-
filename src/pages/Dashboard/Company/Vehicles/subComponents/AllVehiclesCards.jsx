import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllCompanyVehicles } from "../../../../../Apis/companyVehicle";
import { TablePagination } from "@mui/material";
import { Card } from "react-bootstrap";
import car from "../../../../../assets/defaultImages/defaultCar.svg";
import angelright_icon from "../../../../../assets/images/angelright.svg";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { useSelector } from "react-redux";
const AllVehiclesCards = ({ searchVehicle, handleCheckboxChange, selectVehicleForDelete }) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const { getAllVehicle } = useSelector(state => state.VehicleSlice);

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
            <div className="row mt-3 mr-2">
                {
                    // getAllVehicle?.content?.filter((user) => {
                    //     if (searchVehicle === "") {
                    //       return user;
                    //     } else if (
                    //       user?.vehicle?.brand
                    //         ?.toLowerCase()
                    //         .includes(searchVehicle?.toLowerCase())
                    //     ) {
                    //       return user;
                    //     }
                    //   })
                    getAllVehicle?.content?.map(item => (
                        <div className="col-md-3" key={item?.id}>
                            <div className="vehicle_component">
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <input type="checkbox" className="checkbox"
                                        checked={selectVehicleForDelete?.includes(item?.vehicle?.id)}
                                        id={item?.vehicle?.id}
                                        onChange={handleCheckboxChange}
                                    />
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
                                </div>
                                <div className="vehicle_card_header" >
                                    <img src={item?.vehicle?.image ? `data:image/png;base64,${item?.vehicle?.image}`:car} />
                                    {/* <div className="header_component">
                                        <p>{item?.vehicle?.brand}</p>
                                        <span>{item?.vehicle?.subBrand}</span>
                                    </div> */}
                                </div>
                                <div
                                    className="vehicle_card_body"
                                >
                                    <div className="row_body">
                                        <p>{t('brand')}</p>
                                        <span>{item?.vehicle?.brand || "-"}</span>
                                    </div>
                                    <div className="row_body">
                                        <p>{t('sub_Brand')}</p>
                                        <span>{item?.vehicle?.subBrand || "-"}</span>
                                    </div>
                                    <div className="row_body">
                                        <p>{t('model')}</p>
                                        <span>{item?.vehicle?.model || "-"}</span>
                                    </div>
                                    <div className="row_body">
                                        <p>{t('color')}</p>
                                        <span>{item?.vehicle?.color || "-"}</span>
                                    </div>
                                    <div className="row_body">
                                        <p>{t('plates')}</p>
                                        <span>{item?.vehicle?.plate || "-"}</span>
                                    </div>
                                    {/* <div className="row_body">
                                        <p>{t('type')}</p>
                                        <span>{item?.vehicle?.type || "-"}</span>
                                    </div> */}
                                    <div className="row_body">
                                        <p>{t('tag')}</p>
                                        <span>{item?.vehicle?.tag || "-"}</span>
                                    </div>


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

        </>
    )
}

export default AllVehiclesCards;