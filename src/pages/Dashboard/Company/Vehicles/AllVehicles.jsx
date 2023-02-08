import React, { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterPopus from "./FilterPopus";
import { Link } from "react-router-dom";
import AllVehiclesCards from "./subComponents/AllVehiclesCards";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { useSelector } from "react-redux";
import { permissionObj } from "../../../../Helpers/permission";
import ic_left_icon from "../../../../assets/ic-left-arrow.svg"

const AllVehicles = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const [modalShow, setModalShow] = useState();

  const { permission } = useSelector(state => state.authenticatioauthennSlice);

  return (
    <>
      <div className='head'>
        <div className='headLeft'>
          <Link to="/dashboard/employee/company">
            <img src={ic_left_icon} alt="ic_left_icon" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }} />
            {/* <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}

            ></i> */}
          </Link>
          <h2>
            {t('vehicles')}
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            gridGap: "10px"
          }}
        >
          {

            permission?.includes(permissionObj?.WEB_VEHICLE_CREATE) &&
            <Link to="/dashboard/employee/allVehicles/create-vehicle">
              <button
                className="addNewVehicle"
                style={{ backgroundColor: "#65ABA0" }}
              >
                {t('add_new_vehicle')}
              </button>
            </Link>
          }
          <button
            className="btn"
            style={{ width: "48px", height: "48px" }}
            onClick={() => setModalShow(true)}
          >
            <FilterAltIcon style={{ fontSize: "32px" }} />
          </button>
        </div>
      </div>
      {modalShow && <FilterPopus setModalShow={setModalShow} />}
      <AllVehiclesCards />
    </>
  );
};

export default AllVehicles;
