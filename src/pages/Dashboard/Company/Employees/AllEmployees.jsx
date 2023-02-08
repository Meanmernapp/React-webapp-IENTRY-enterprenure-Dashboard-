import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AllEmployeeCards from "./subComponents/AllEmployeeCards";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortFilter from "./Modal/SortFilter";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { permissionObj } from "../../../../Helpers/permission";
import { useDispatch, useSelector } from "react-redux";
import { handleSelfieImage } from "../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesSlice";

const AllEmployees = (props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  // const lCode = Cookies.get("i18next") || "en";
  const [modalShow, setModalShow] = useState(false);
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();

  const { permission } = useSelector(state => state.authenticatioauthennSlice);
  // console.log(orderBy, sortBy)

  useEffect(() => {
    dispatch(handleSelfieImage(null))
  }, [])

  const handlFilters = (order, sort) => {
    setOrderBy(order);
    setSortBy(sort);
  }

  return (
    <>
      <div className='head'>
        <div className='headLeft'>
          {/* <Link to="/dashboard/employee/company">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}></i>
          </Link> */}
          <h2>{t('employees')}</h2>
        </div>
        <div
          style={{
            display: "flex",
            gridGap: "10px"
          }}
        >
          {
            permission?.includes(permissionObj?.WEB_EMPLOYEE_CREATE) &&
            <Link to="/dashboard/employee/all-employees/add-employee">
              <button className="btn btn-lg" style={{ backgroundColor: "#65aba0" }} >
                {(t('add_new_employee'))}
              </button>
            </Link>
          }
          <Link to="/dashboard/employee/all-employees/uploademployeefile">
            <button className="btn btn-lg" >
              {t('upload_file')}
            </button>
          </Link>
          <button
            className="btn"
            style={{ width: "48px", height: "48px" }}
            onClick={() => setModalShow(true)}
          >
            <FilterAltIcon style={{ fontSize: "32px" }} />
          </button>
        </div>
      </div>
      {modalShow &&
        <SortFilter
          setModalShow={setModalShow}
          handlFilters={handlFilters}
        />}
      <AllEmployeeCards
        orderBy={orderBy}
        sortBy={sortBy}
      />
    </>
  );
};

export default AllEmployees;
