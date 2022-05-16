import React, { useEffect, useState } from "react";
import exchangealt from "../../../../assets/images/exchange-alt-solid.svg";

import person4 from "../../../../assets/images/person-4.png";

import EmployessDetailCard from "./EmployessDetailCard";
import AccessRights from "./AccessRights";
import { Table } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { Link } from "react-router-dom";
import ChangeImage from "./Modal/ChangeImage";
import { NewEmployee } from "../../../../Apis/CompanyEmployee";

const UpdateEmployee = () => {
  const [employeExtarData, setEmployeExtarData] = useState(true);
  const [changeImageModal, setChangeImageModal] = useState(false);
  const [ProfileImage, setProfileImage] = useState("");
  // const empObj = {
  //   "user":
  //   {
  //     "id": "3c6f8c41-3d46-48fb-9269-551a25c544c3"
  //   },
  //   "company":
  //   {
  //     "id": "49f981b6-1737-4882-a56b-a6a22767f15d"
  //   },
  //   "zone":
  //   {
  //     "id": "1dd7f2b2-7856-4cb9-b93b-53d0bc4f96ec"
  //   },
  //   "role":
  //   {
  //     "id": "7326008f-716f-4e31-b7ea-915cb2d92e67"
  //   },
  //   "employeeId": "IBL-0000001",
  //   "startDate": 1639065970000,
  //   "endDate": 1639065970000
  // }
  // const handlesave = () => {
  //   NewEmployee(empObj);
  // }
  
  return (
    <>
      {/* Employess Detail Page Start */}
      <div className="head">
        <h2>
          <ArrowBackIcon style={{ fontSize: "30px", marginRight: "30px" }} />
          User Data
        </h2>
        <span
          style={{
            backgroundColor: "#0C4523",
            color: "white",
            fontWeight: "600",
            padding: "5px",
            width: "153px",
            borderRadius: "100px",
            textAlign: "center",
            position: "absolute",
            textTransform: "uppercase",
            float: "left",
            marginLeft: "300px",
          }}
        >
          active
        </span>
        <div>
          <button
            className="btn "
            style={{ backgroundColor: "#BC0000", marginBottom: "5px" }}
          >
            Unlink Device
            <PhoneIphoneIcon />
          </button>
          <button className="btn" style={{ backgroundColor: "#A2CBF4" }}>
            SEND QR CODE BY EMAIL
            <MailOutlineIcon />
          </button>
        </div>
      </div>
      <div className="main_all_p ">
        <div className="text-center exchange_icon">
          <img
            // src={person4}
            src={
              ProfileImage === "" ||
                ProfileImage === null ||
                ProfileImage === undefined
                ? person4
                : ProfileImage
            }
            className="img-fluid"
            style={{ width: 240, height: 240, borderRadius: "100%" }}
            alt="employeedetail-person4"
          />
          <Link
            to="#"
            onClick={() => setChangeImageModal(true)}
            className="position-relative"
          >
            <span className="dot">
              <img
                src={exchangealt}
                className="img-fluid exchange_alt_m"
                alt="exchange_alt"
              />
            </span>
          </Link>
        </div>
        <div className="pt-3 mb-4 row">
          {
            <div
              className={
                employeExtarData === false
                  ? "col-sm-12"
                  : "col-lg-6 col-md-6 col-12"
              }
            >
              <EmployessDetailCard />
            </div>
          }

          {employeExtarData === true && (
            <div
              className="col-lg-6 col-md-6 col-12"
              style={{ paddingRight: "15px", paddingLeft: "15px" }}
            >
              <div className="infoEmpl_text mb-2">EXTRA DATA</div>
              <div
                className="main_content empdetail_c"
              // style={{ width: "495px" }}
              >
                <Table
                  style={{
                    width: "100%",
                    border: "hidden",
                    marginRight: "15px",
                    marginLeft: "15px",
                  }}
                >
                  <tbody>
                    <tr style={{ border: "hidden" }}>
                      <td>
                        <p>ADDESS 1</p>
                        <h2>Paseos de san miguel 5041</h2>
                      </td>
                      <td>
                        <p>ADDESS 2</p>
                        <h2>-</h2>
                      </td>
                    </tr>
                    <tr style={{ border: "hidden" }}>
                      <td>
                        <p>COUNTRY</p>
                        <h2>México</h2>
                      </td>
                      <td>
                        <p>STATE</p>
                        <h2>Querétaro</h2>
                      </td>
                    </tr>
                    <tr style={{ border: "hidden" }}>
                      <td>
                        <p>POST CODE</p>
                        <h2>76118</h2>
                      </td>
                      <td>
                        <p>HOME NUMBER</p>
                        <h2>4422698565</h2>
                      </td>
                    </tr>
                    <tr style={{ border: "hidden" }}>
                      <td>
                        <p>GENDER</p>
                        <h2>MALE</h2>
                      </td>
                      <td>
                        <p>BLOOD TYPE</p>
                        <h2>A+</h2>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>ARABIC NAME</p>
                        <h2>لويس إنريكي كورنيجو أريولا </h2>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          )}
        </div>
        <div className="infoEmpl_text mb-2">CONTRACT</div>
        <div
          className="main_content empdetail_c"
          style={{ paddingTop: "2rem" }}
        >
          <div className="row p-3">
            <Table style={{ border: "hidden" }}>
              <tbody>
                <tr style={{ border: "hidden" }}>
                  <td>
                    <p>ROLE</p>
                  </td>
                  <td>
                    <p>EMPLOYEE ID</p>
                  </td>
                  <td>
                    <p>END DATE</p>
                  </td>
                </tr>
                <tr style={{ border: "hidden" }}>
                  <td>
                    <h2>General Employee</h2>
                  </td>
                  <td>
                    <h2>IBL-000981</h2>
                  </td>
                  <td>
                    <h2>UNDEFINED TIME</h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>WORK STATION</p>
                  </td>
                  <td>
                    <p>CONTRACT STATUS</p>
                  </td>
                  <td>
                    <p>START DATE</p>
                  </td>
                </tr>
                <tr style={{ border: "hidden" }}>
                  <td>
                    <h2>Zone - Building A</h2>
                  </td>
                  <td>
                    <h2>ACTIVE</h2>
                  </td>
                  <td>
                    <h2>24-12-2019</h2>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <AccessRights />
      </div>
      <ChangeImage
        title="Change Image"
        check="false"
        show={changeImageModal}
        onHide={() => setChangeImageModal(false)}
      />
    </>
  );
};

export default UpdateEmployee;
