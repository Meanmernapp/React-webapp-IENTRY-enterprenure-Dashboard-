import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import bg from "../assets/images/building_2.png";
import securekey from "../config";
import SideBar from "../pages/Dashboard/SideBar";
import {
  companyRestrictions,
  getAllEmployees,
} from "../reduxToolkit/EmployeeEvents/EmployeeEventsApi";
import cryptoJs from 'crypto-js';
const DashboardLayout = () => {
  const companyId = "a6bd2887-0f4a-4e5f-b0b5-000d9817ab23";

  const [profilebgImage, setProfilebgImage] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();


  const token = sessionStorage.getItem('bearerToken');
  const bytes = cryptoJs.AES.decrypt(token, securekey)
  const isAuthenticated = bytes.toString(cryptoJs.enc.Utf8);

  // to setProfilebgimage for profile
  useEffect(() => {
    if (
      location?.pathname == "/dashboard/provider/profile" ||
      location?.pathname == "/dashboard/employee/profile" ||
      location?.pathname == "/dashboard/contractor/profile"
    ) {
      setProfilebgImage(true);
    } else {
      setProfilebgImage(false);
    }
  }, [location.pathname]);

  // dispatch api
  useEffect(() => {
    // checkAutoLogin(navigate);
    if (isAuthenticated) {
      dispatch(companyRestrictions(companyId));
      dispatch(getAllEmployees());
    }
  }, [isAuthenticated]);

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: profilebgImage ? `url(${bg})` : "",
        backgroundRepeat: profilebgImage ? "no-repeat" : "",
        backgroundSize: profilebgImage ? "cover" : "",
      }}
    >
      <div className="row">
        <div
          className="col-md-2 p-0"
          style={{
            zIndex: "1",
          }}
        >
          <div className="position-fixed">
            <SideBar />
          </div>
        </div>
        <main className="col-md-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
