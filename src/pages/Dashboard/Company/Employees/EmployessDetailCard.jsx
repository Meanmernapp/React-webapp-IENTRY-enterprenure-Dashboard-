import React from "react";
import { Table } from "react-bootstrap";

const EmployessDetailCard = () => {
  return (
    <>
      <div className="infoEmpl_text mb-2">INFORMATION</div>
      <div
        className="main_content empdetail_c"
        style={{
          height: "258px",
          // width: "495px",
        }}
      >
        <div className="row">
          <Table
            style={{
              border: "hidden",
              marginRight: "15px",
              marginLeft: "15px",
            }}
          >
            <tbody style={{ border: "hidden" }}>
              <tr>
                <td style={{ border: "hidden" }}>
                  <p>first name</p>
                  <h2>Luis Enrique Cornejo Arreola</h2>
                </td>
              </tr>
              <tr>
                <td style={{ border: "hidden" }}>
                  <p>Gender</p>
                  <h2>Male</h2>
                </td>
                <td style={{ border: "hidden" }}>
                  <p>CELULAR</p>
                  <h2>4427059698</h2>
                </td>
              </tr>
              <tr>
                <td style={{ border: "hidden" }}>
                  <p>Status</p>
                  <h2>Active</h2>
                </td>
                <td style={{ border: "hidden" }}>
                  <p>Email</p>
                  <h2>lcornejo@ibl.mx</h2>
                </td>
              </tr>
              <tr>
                <td style={{ border: "hidden" }}>
                  <p>DOB</p>
                  <h2>28-05-97</h2>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default EmployessDetailCard;
