import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import personPng from "../../../assets/images/person.png";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import Cookies from "js-cookie";
import { DetailsEmployeeProviderVehicle } from "../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";

const VehicleProviderDetails = () => {
  const lCode = Cookies.get("i18next") || "en";

  const dispatch = useDispatch()
  const vehicle = {
    brand: "KIA",
    subBrand: "RIO",
    color: "Electic Blue",
    model: "2018",
    plates: "SS-568-45D",
    vehicleType: "Sedan",
    driver: "Luis Enrique Cornejo Arreola",
    status: "Active",
  };
  const { detailEmployeeProviderVehicle } = useSelector(state => state.EmployeeProviderSlice);
  console.log(detailEmployeeProviderVehicle);


  useEffect(() => {
    dispatch(DetailsEmployeeProviderVehicle(localStorage.getItem("vehicleProviderDetail")));
  }, [])
  return (
    <>
      <div className="head">
        <h2>
          <Link to="/dashboard/employee/providers/">
            <ArrowBackIcon
              style={{
                color: "#146F62",
                fontSize: "30px",
                marginRight: "30px",
                transform: lCode === "ar" ? "scaleX(-1)" : "",
                margin: "0 10px"
              }}
            />
          </Link>
          {t("vehicle_provider_detail")}
        </h2>
      </div>
      <div
        className="content"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div className="vehicleProviderDetails">
          <img src={personPng} className="__vehicleImage" />
          <p className="__vehicleStatus"> {detailEmployeeProviderVehicle?.status?.name}</p>
          <div className="__body" style={{ display: "flex" }}>
            <div className="col-md-8" style={{ padding: "0" }}>
              <p>{t("brand")}</p>
              <span> {detailEmployeeProviderVehicle?.brand}</span>
              <p>{t("color")}</p>
              <span> {detailEmployeeProviderVehicle?.color}</span>
              <p>{t("plates")} </p>
              <span> {detailEmployeeProviderVehicle?.plate}</span>
              <p>{t("driver")}</p>
              <span>Luis Enrique Cornejo Arreola {""}</span>
            </div>
            <div className="col-md-4" style={{ padding: "0" }}>
              <p>{t("sub_brand")}</p>
              <span> {detailEmployeeProviderVehicle?.subBrand}</span>
              <p>{t("mmodal")}</p>
              <span> {detailEmployeeProviderVehicle?.model}</span>
              <p>{t("vehicle_type")}</p>
              <span> {detailEmployeeProviderVehicle?.vehicalType}</span>

              <p>{t("status")}</p>
              <span>{t("active")} {""}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleProviderDetails;
