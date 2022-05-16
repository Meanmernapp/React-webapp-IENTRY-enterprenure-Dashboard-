import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeCards from "./EmployeeCard/EmployeeCards";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const AllEmployees = (props) => {
  const [ModalShow, setModalShow] = useState(false);

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

      <EmployeeCards />
    </>
  );
};

export default AllEmployees;
