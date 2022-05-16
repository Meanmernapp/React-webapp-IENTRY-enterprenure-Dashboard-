import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from '../../../../components/Pagination';
import EmployeeVehicleCard from "../../../../components/EmployeeVehicleCard";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";


const override = css`
  position: fixed;
  top: 50%;
  left: 50%;
  right: 0;
  bottom: 0; 
  z-index: 6; 
`;

export const Employees = ({ employeeData }) => {
  const [page1, setPage1] = useState("2");
  const [rowsPerPage1, setRowsPerPage1] = useState("10");
  // console.log(page1, rowsPerPage1)
  // console.log(employeeData)

  return (
    <>
      <div className="employeeVehicleHead">
        <div>
          <h3>
            Employees
            <Link to="/dashboard/company/employees">
              <sub>view more</sub>
            </Link>
          </h3>
          <p>
            Total <span>{employeeData?.length}</span>
          </p>
        </div>
        <Link to="/dashboard/company/addemployee">
          <button className="addNewEmployeeBtn">Add new Employee</button>
        </Link>
      </div>
      <div className="row mb-3">
        {
          employeeData ?
            employeeData?.map(item => (
              <div className="col-12 col-md-6" style={{ marginTop: "4.5rem" }} key={item.id}>
                <EmployeeVehicleCard employeeCardData={item} />
              </div>
            )) :
            <div className="overlay">
              <HashLoader loading="true" css={override} size={50} color="#fff" />
            </div>
        }
        <div className="col-10 mt-2">
          <Pagination
            setPage1={setPage1}
            setRowsPerPage1={setRowsPerPage1}
            label="Employees per page"
          />
        </div>
      </div>
    </>
  );
};
