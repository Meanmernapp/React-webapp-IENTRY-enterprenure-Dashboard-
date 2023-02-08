import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import cryptoJs from 'crypto-js';
import securekey from "../config";

const RequireAuth = ({ allowedRoles }) => {

  const token = sessionStorage.getItem('bearerToken');
  const bytes = cryptoJs.AES.decrypt(token || "", securekey)
  const isAuthenticated = bytes.toString(cryptoJs.enc.Utf8);

  // const user = JSON.parse(sessionStorage.getItem("userdata"))?.data?.data;
  const userdata = sessionStorage.getItem('userdata');
  const bytess = cryptoJs.AES.decrypt(userdata || "", securekey)
  const userstring = bytess.toString(cryptoJs.enc.Utf8);
  const user = userstring ? JSON.parse(userstring).data.data : ""

  console.log(user)

  const location = useLocation();

  console.log(user);

  const auth = isAuthenticated;
  let roles = [user?.userType?.name];
  //   let roles = ["PROVIDER_IN_CHARGE"];

  return auth && user &&
    user?.userType?.name ===
    roles?.find((role) => allowedRoles?.includes(role)) ? (
    <EmployeeLayout />
  ) : auth && user ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/" state={{ from: location }} replace={true} />
  );
};

export default RequireAuth;
