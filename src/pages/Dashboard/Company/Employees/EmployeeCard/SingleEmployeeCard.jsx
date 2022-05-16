import React from "react";

import angelright_icon from "../../../../../assets/images/angelright.svg";
import { Link } from "react-router-dom";
import img from '../../../../../assets/images/employee-4.png'

const top_heading_mh4 = {
  0: {
    color: "#F2A100",
  },
  1: {
    color: "#0C4523",
  },
  2: {
    color: "#BC0000",
  },
  3: {
    color: "#F2A100",
  },
};

const SingleEmployeeCard = ({ character }) => {
  return (
    <>
      <div className="employee_m card mb-3" style={{ width: "100%" }}>
        <div className="text-center top_heading_m">
          {/* <p style={top_heading_mh4[id]}>{heading}</p> */}
        </div>
        <div className="emp_card_body">
          <img src={img} className="img-fluid w-100 common_img_emp" alt="" />
          <div className="container-fluid">
            <div className="emp_card_content">
              <p>Name</p>
              <span>{character?.user?.name}</span>
            </div>
            <div className="emp_card_content">
              <p>Work Station</p>
              <span>JobTitle</span>
            </div>
            <div className="emp_card_content">
              <p>Email</p>
              <span>{character?.user?.email}</span>
            </div>
            <div className="emp_card_content">
              <p>Number</p>
              <span>{character?.user?.phoneNumber}</span>
            </div>
            <div className="emp_card_content">
              <p>Corporate</p>
              <span>Corporate</span>
            </div>

            <div className="mt-3 pull-right employee_detail_m">
              <Link to="/dashboard/company/updateemployee">
                <p className="mb-1">
                  EMPLOYEE DETAILS
                  <span>
                    <img src={angelright_icon} alt="" />
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleEmployeeCard;
