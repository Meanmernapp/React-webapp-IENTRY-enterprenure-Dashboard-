import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterPopus from "../Vehicles/FilterPopus";
import EmployeeCards from "./EmployeeCard/EmployeeCards";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortFilter from "./Modal/SortFilter";
import FilterModal from "./Modal/FilterModal";

const AllEmployees = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  console.log(orderBy, sortBy)

  const handlFilters = (order, sort) => {
    setOrderBy(order);
    setSortBy(sort);
  }

  return (
    <>
      <div className="head">
        <h2>
          <Link to="/dashboard/company">
            <ArrowBackIcon style={{ fontSize: "30px", marginRight: "30px" }} />
          </Link>
          Employees
        </h2>
        <div style={{ display: "flex" }}>
          <Link to="/dashboard/company/uploademployeefile">
            <button className="btn btn-lg" >
              Upload File
            </button>
          </Link>
          <button
            className="btn"
            style={{ width: "30px", marginLeft: "10px" }}
            onClick={() => setModalShow(true)}
          >
            <FilterAltIcon />
          </button>
        </div>
      </div>
      {modalShow &&
        <SortFilter
          setModalShow={setModalShow}
          handlFilters={handlFilters}
        />}
      {/* <FilterModal
        show={ModalShow}
        onHide={() => setModalShow(false)}
      /> */}

      <EmployeeCards
        orderBy={orderBy}
        sortBy={sortBy}
      />
    </>
  );
};

export default AllEmployees;
