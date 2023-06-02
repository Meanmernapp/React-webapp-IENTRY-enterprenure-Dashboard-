

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TablePagination } from "@mui/material";
import { Card } from "react-bootstrap";
import car from "../../../assets/defaultImages/defaultCar.svg";
import angelright_icon from "../../../assets/images/angelright.svg";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from "react-redux";
import employee_4 from '../../../assets/defaultImages/userDef.svg'
import { GetProviderEmployeeDetail, GetProviderVehicleDetail } from "../../../reduxToolkit/Providers/providersApi";
import statusId from "../../../hooks/statusId";
import checkStatus from "../../../hooks/checkStausColor";
import genderId from "../../../hooks/genderId";
const ViewCard = ({ apidata, handleCheckboxChange, selectForDelete }) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();



    return (
        <>
            <div className="row mt-3 mr-2 employee_supplier_container">
                {

                    apidata?.content?.map(item => (
                        <div className="col-md-3" key={item?.id}>
                            <div className="vehicle_component">
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <input type="checkbox" className="checkbox"
                                        checked={selectForDelete?.includes(item?.id)}
                                        id={item?.id}
                                        onChange={handleCheckboxChange}
                                    />
                                    <div
                                        className="statusDiv"
                                        style={{
                                            color: checkStatus(item?.status?.id),
                                            textTransform: "uppercase",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        <p>
                                            {statusId(item?.status?.id)}
                                        </p>
                                        <i
                                            className="fa fa-circle"
                                            aria-hidden="true"
                                        ></i>
                                    </div>
                                </div>
                                <div className="vehicle_card_header" >
                                    <img src={item?.image ? `data:image/png;base64,${item?.image}` : car} />

                                </div>
                                <div
                                    className="vehicle_card_body"
                                >
                                    <div className="row_body">
                                        <p>{t('brand')}</p>
                                        <span>{item?.brand || "-"}</span>
                                    </div>
                                    <div className="row_body">
                                        <p>{t('sub_brand')}</p>
                                        <span>{item?.subBrand || "-"}</span>
                                    </div>
                                    <div className="row_body">
                                        <p>{t('model')}</p>
                                        <span>{item?.model || "-"}</span>
                                    </div>
                                    <div className="row_body">
                                        <p>{t('color')}</p>
                                        <span>{item?.color || "-"}</span>
                                    </div>

                                    <div className="row_body">
                                        <p>{t('plates')}</p>
                                        <span>{item?.plate || "-"}</span>
                                    </div>



                                </div>
                                {
                                    item?.status?.id == 3 ?

                                        <Link className="update_data"
                                            to={`/dashboard/contractor/upload-vehicle-documents/${item?.id}`}

                                            onClick={() => {
                                                dispatch(GetProviderVehicleDetail(item?.id));

                                                localStorage.setItem("vehicleidfordetail", item?.id)

                                            }}
                                        >
                                            {t('complete_documents')}
                                            <span>
                                                <img src={angelright_icon} alt="" style={{
                                                    transform: lCode === "ar" ? "scaleX(-1)" : "",
                                                    margin: "0 10px"
                                                }}

                                                />
                                            </span>
                                        </Link>

                                        :

                                        <Link className="update_data"
                                            to={`/dashboard/contractor/vehicle-contract-detail/${item?.id}`}

                                            onClick={() => {
                                                dispatch(GetProviderVehicleDetail(item?.id));

                                                localStorage.setItem("vehicleidfordetail", item?.id)

                                            }}
                                        >
                                            {t('vehicle_details')}
                                            <span>
                                                <img src={angelright_icon} alt="" style={{
                                                    transform: lCode === "ar" ? "scaleX(-1)" : "",
                                                    margin: "0 10px"
                                                }}

                                                />
                                            </span>
                                        </Link>

                                }

                            </div>
                        </div>
                    ))
                }
            </div>

        </>
    )
}

export default ViewCard;
