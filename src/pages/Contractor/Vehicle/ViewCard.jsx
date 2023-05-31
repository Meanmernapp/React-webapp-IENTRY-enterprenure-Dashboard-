// import { Grid } from "@mui/material";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import CarDemoImg from "../../../assets/images/carDemoImg.png";
// import i18next,{ t } from "i18next";

// const ViewCard = ({ vehicles }) => {

//   const navigate = useNavigate();

//   return (
//     <div className="viewcard-container mb-3 mr-3" style={{ width: "300px" }}>
//       {vehicles?.status?.id == 2 ? (
//         <span className="viewcard-container__status employe-status-documents">
//           {vehicles?.status?.name.replaceAll("_", " ")}
//           <FiberManualRecordIcon sx={{ fontSize: 40 }} />
//         </span>
//       ) : null}

//       {vehicles?.status?.id == 3 ? (
//         <span
//           className="viewcard-container__status "
//           style={{ color: "#006594" }}
//         >
//           {vehicles?.status?.name.replaceAll("_", " ")}
//           <FiberManualRecordIcon />
//         </span>
//       ) : null}
//       {vehicles?.status?.id == 4 ? (
//         <span
//           className="viewcard-container__status employe-status-Vacation"
//           style={{ color: "#0C4523" }}
//         >
//           {vehicles?.status?.name.replaceAll("_", " ")}{" "}
//           <FiberManualRecordIcon />
//         </span>
//       ) : null}
//       {vehicles?.status?.id == 5 ? (
//         <span
//           className="viewcard-container__status"
//           style={{ color: "orange" }}
//         >
//           {vehicles?.status?.name.replaceAll("_", " ")}{" "}
//           <FiberManualRecordIcon />
//         </span>
//       ) : null}
//       {vehicles?.status?.id == 6 ? (
//         <span className="viewcard-container__status" style={{ color: "red" }}>
//           {vehicles?.status?.name.replaceAll("_", " ")}{" "}
//           <FiberManualRecordIcon />
//         </span>
//       ) : null}
//       {vehicles?.image ? (
//         <img
//           src={`data:image/png;base64,${vehicles?.image}`}
//           className="viewcard-container__img"
//           alt="hero image"
//         />
//       ) : (
//         <img
//           src={CarDemoImg}
//           className="viewcard-container__img"
//           alt="hero image"
//         />
//       )}
//       <Grid container>
//         <Grid item xs={5}>
//           <span className="viewcard-container__title">{t("brand")}</span>
//         </Grid>
//         <Grid item xs={7}>
//           <span className="viewcard-container__desc">{vehicles?.brand}</span>
//         </Grid>
//       </Grid>
//       <Grid container>
//         <Grid item xs={5}>
//           <span className="viewcard-container__title">{t("sub_brand")}</span>
//         </Grid>
//         <Grid item xs={7}>
//           <span className="viewcard-container__desc">{vehicles?.subBrand}</span>
//         </Grid>
//       </Grid>
//       <Grid container>
//         <Grid item xs={5}>
//           <span className="viewcard-container__title">{t("modal")}</span>
//         </Grid>
//         <Grid item xs={7}>
//           <span className="viewcard-container__desc">{vehicles?.model}</span>
//         </Grid>
//       </Grid>
//       <Grid container>
//         <Grid item xs={5}>
//           <span className="viewcard-container__title">{t("color")}</span>
//         </Grid>
//         <Grid item xs={7}>
//           <span className="viewcard-container__desc">{vehicles?.color}</span>
//         </Grid>
//       </Grid>
//       <Grid container>
//         <Grid item xs={5}>
//           <span className="viewcard-container__title">{t("plates")}</span>
//         </Grid>
//         <Grid item xs={7}>
//           <span className="viewcard-container__desc">{vehicles?.plate}</span>
//         </Grid>
//       </Grid>
//       {/* <Grid container>
//         <Grid item xs={5}>
//           <span className="viewcard-container__title">Type</span>
//         </Grid>
//         <Grid item xs={7}>
//           <span className="viewcard-container__desc">Double Tratin</span>
//         </Grid>
//       </Grid> */}
//       {vehicles?.status?.id == 3 ? (
//         <span
//           className="viewcard-container__link"
//           onClick={() =>
//             navigate(`/dashboard/contractor/upload-vehicle-documents/${vehicles?.id}`)
//           }
//         >
//           {t("complete_document")} <KeyboardArrowRightIcon style={{
//             transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
//             margin: "0 10px"
//           }} />
//         </span>
//       ) : (
//         <span
//           className="viewcard-container__link"
//           onClick={() =>
//             navigate(`/dashboard/contractor/vehicle-contract-detail/${vehicles?.id}`)
//           }
//         >
//           {t("vehicle_details")} <KeyboardArrowRightIcon style={{
//             transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
//             margin: "0 10px"
//           }} />
//         </span>
//       )}
//     </div>
//   );
// };

// export default ViewCard;

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
