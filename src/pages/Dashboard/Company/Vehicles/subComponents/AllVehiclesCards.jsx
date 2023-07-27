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
import { status } from "../../../../../enums/statusEnum";
import { GoPrimitiveDot } from 'react-icons/go';
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const AllVehiclesCards = ({ searchVehicle, handleCheckboxChange, selectVehicleForDelete }) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const { getAllVehicle } = useSelector(state => state.VehicleSlice);
    const { searchByFilters } = useSelector(state => state.SearchSlice);

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
            <div className="row animated-div-left mt-0 ml-0">
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
                    searchByFilters?.content?.map(item => (
                        <div className="panel-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 pr-1 mb-3" key={item?.id}>
                            <div className="card-base-grid mb-3 pb-2 mr-1 h-100">
                                <div className="top-heading-card">
                                    {/* <input type="checkbox" className="checkbox"
                                        checked={selectVehicleForDelete?.includes(item?.id)}
                                        id={item?.id}
                                        onChange={handleCheckboxChange}
                                    /> */}
                                    <Checkbox
                                        className="grid-checkall checkbox"
                                        checked={selectVehicleForDelete?.includes(item?.id)}
                                        id={item?.id}
                                        onChange={handleCheckboxChange}
                                        size="small"
                                    />
                                    <div className={"status " + status[item?.statusId]}>
                                        <p
                                        >
                                            {t(status[(item?.statusId)])}
                                        </p>
                                        <GoPrimitiveDot
                                            className="ml-1"
                                        />
                                    </div>
                                </div>
                                <div
                                    className="card-body-grid px-2 pb-2"
                                >
                                    <div className="img-body" >
                                        <img src={item?.image ? `data:image/png;base64,${item?.image}` : car} />
                                        {/* <div className="header_component">
                                        <p>{item?.vehicle?.brand}</p>
                                        <span>{item?.vehicle?.subBrand}</span>
                                    </div> */}
                                    </div>

                                    <div className="card-content-grid">
                                        <p>{t('brand')}</p>
                                        <span>{item?.brand || "-"}</span>
                                    </div>
                                    <div className="card-content-grid">
                                        <p>{t('sub_brand')}</p>
                                        <span>{item?.subBrand || "-"}</span>
                                    </div>
                                    <div className="card-content-grid">
                                        <p>{t('model')}</p>
                                        <span>{item?.model || "-"}</span>
                                    </div>
                                    <div className="card-content-grid">
                                        <p>{t('color')}</p>
                                        <span>{item?.color || "-"}</span>
                                    </div>
                                    <div className="card-content-grid">
                                        <p>{t('plates')}</p>
                                        <span>{item?.plate || "-"}</span>
                                    </div>
                                    {/* <div className="row_body">
                                        <p>{t('type')}</p>
                                        <span>{item?.vehicle?.type || "-"}</span>
                                    </div> */}
                                    <div className="card-content-grid">
                                        <p>{t('tag')}</p>
                                        <span>{item?.tag || "-"}</span>
                                    </div>


                                </div>
                                <span className="viewcard-container-link mt-2 d-flex mr-2">
                                    <Link to={`/dashboard/employee/allVehicles/vehicle-detail/${item?.id}`}>
                                        {t('details')}
                                        <span>
                                            <KeyboardArrowRightIcon style={{
                                                transform: lCode === "ar" ? "scaleX(-1)" : "",
                                            }} />
                                        </span>
                                    </Link>
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>

        </>
    )
}

export default AllVehiclesCards;