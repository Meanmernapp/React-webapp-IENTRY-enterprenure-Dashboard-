import React, { useState } from "react";
import { Table } from "react-bootstrap";
import AccessRightCard from "../Employees/AccessRightCard";
import CloseIcon from "@mui/icons-material/Close";
import ShiftManagementModal from "./Modals/ShiftManagementModal";
const WorkShiftCardDetails = ({ setRemoveUserModal }) => {
  const assess = ["Access Unitad", "Monday", "00:00", "16:30"];
  const [addUserModal, setaddUserModal] = useState(false);

  const names = [
    "Luis Enrique Cornejo Arreola",
    "Diego Guerrero Estrada",
    "Pablo Villegas Ferruzca",
    "Iván Alejandro Sanchez",
    "Osiris Danae Villanueva",
    "Luis Enrique Cornejo Arreola",
  ];
  return (
    <>
      <div className="row">
        <AccessRightCard heading1="access" heading2="SCHEDULE" update />
        <div
          className="mt-3"
          style={{ borderTop: "2px dashed #178a7b", margin: "4px" }}
        >
          <div className="mt-3  row work_text">
            <p>Access</p>
          </div>
          <div className="row access_table">
            <Table borderless>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Day</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {assess?.map((item) => (
                  <tr>
                    <td>Access United</td>
                    <td>Monday</td>
                    <td>0:00</td>
                    <td>16:30</td>
                    <td>
                      <CloseIcon style={{ color: "red" }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div
            className="work_text"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <p>Registered Users</p>
            <button
              className="btn btn-lg"
              style={{ fontSize: "14px" }}
              onClick={() => setaddUserModal(true)}
            >
              <u>add users</u>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </div>
          <div className="row">
            <div className="row work_text">
              <p>NAME</p>
            </div>
            <div className="row userstable">
              {[1, 2, 3, 4].map((item) => (
                <div className="col-md-3">
                  {names.map((item) => (
                    <p>
                      <CloseIcon style={{ color: "red" }} />
                      {item}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ShiftManagementModal
        setRemoveUserModal={setRemoveUserModal}
        setaddUserModal={setaddUserModal}
        title="Shift Management "
        check="false"
        show={addUserModal}
        onHide={() => setaddUserModal(false)}
      />
    </>
  );
};

export default WorkShiftCardDetails;
