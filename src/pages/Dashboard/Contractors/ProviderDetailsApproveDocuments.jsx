import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import personPng from "../../../assets/images/person.png";
import file from "../../../assets/images/file.png";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useLocation } from "react-router-dom";
const ProviderOrderDetail = ({ employeeDetailsFlag, approveDocumentFlag,name }) => {
  const [filePresent, setfilePresent] = useState(true);
  const [fileIdPresent, setfileIdPresent] = useState(true);
  const [employeeDetails, setEmployeeDetails] = useState(false);
  const [approveDocument, setapproveDocument] = useState(false);
  console.log({ employeeDetailsFlag }, { approveDocumentFlag });
  useEffect(() => {
    setEmployeeDetails(employeeDetailsFlag);
    setapproveDocument(approveDocumentFlag);
  }, []);

  return (
    <>
      <div className="head">
        <div className="headLeft">
          <h2>
            <Link to="/dashboard/company">
              <ArrowBackIcon
                style={{
                  color: "#146F62",
                  fontSize: "30px",
                  marginRight: "30px",
                }}
              />
            </Link>
            {approveDocument ? 'APPROVE DOCUMENT' : name ? "EMPLOYEE CONTRACTOR DETAILS" : "Employee PROVIDER Detail"}
          </h2>
        </div>
      </div>
      <div className="row employee_provider_detail">
        <div className="col-md-4 __userData">
          <img src={personPng} className="__userImage" />
          <div className="__body">
            <p>Name</p>
            <span>Luis Enrique Cornejo Arreola</span>
            <p className="ishead">Email</p>
            <span>lcornejo@ibl.mx</span>
            <p className="ishead">Phone Number</p>
            <span>4427065906</span>
            <p className="ishead">Password</p>
            <span>**************</span>
            <p className="ishead">Gender</p>
            <span>Male</span>
          </div>
        </div>
        <div className="col-md-7 employee_files_details">
          <div
            className="__header"
            style={{ paddingRight: approveDocument === false && "40px" }}
          >
            <p style={{ width: approveDocument && "40%" }}>FileName</p>
            <p>File</p>
            {approveDocument && <p>Options</p>}
          </div>
          {[1, 2, 3, 4, 5].map((item) => (
            <div className="__body">
              <div className="__file">
                <div className="__name">
                  <p>CURP</p>
                  {fileIdPresent && <span>COAL970408HMCRRS00</span>}
                </div>
                {filePresent ? (
                  <div className="__file_icon">
                    <img src={file} />
                    <div style={{ paddingLeft: "10px" }}>
                      <p>nss_leca-pdf</p>
                      <span>14-05-2021 15:33</span>
                    </div>
                    <DownloadIcon className="download_icon" />
                  </div>
                ) : (
                  <p className="noFile">NO FILE</p>
                )}
                {approveDocument && <MoreHorizIcon />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProviderOrderDetail;
