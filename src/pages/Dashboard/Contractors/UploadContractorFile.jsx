import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pdfpng from "../../../assets/images/PDF.PNG";
import cloudsvg from "../../../assets/images/cloud.svg";
import excelpng from "../../../assets/images/excel.png";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MUIDataTable from "mui-datatables";

// import pdfpng from "../../../../assets/images/PDF.PNG";

const UploadContractorFile = () => {
  const columns = [
    {
      name: "MANAGER",
      label: "MANAGER",
      options: {
        filter: true,
      }
    },
    {
      name: "EMAIL",
      label: "EMAIL",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "PHONE",
      label: "PHONE NUMBER",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "GENDER",
      label: "GENDER",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "COMPANY",
      label: "COMPANY NAME",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "ACRONYM",
      label: "ACRONYM",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "OPTION",
      label: "OPTION",
      options: {
        filter: true,
        sort: false,
      }
    }
  ];

  const data = [
    { MANAGER: "Joe James", EMAIL: "luis55@gmail.com", PHONE: "Yonkers", GENDER: "NY", COMPANY: "NY", ACRONYM: "NY", OPTION: "NY" },
    { MANAGER: "Joe James", EMAIL: "Test Corp", PHONE: "Yonkers", GENDER: "NY", COMPANY: "NY", ACRONYM: "NY", OPTION: "NY" },
    { MANAGER: "Joe James", EMAIL: "Test Corp", PHONE: "Yonkers", GENDER: "NY", COMPANY: "NY", ACRONYM: "NY", OPTION: "NY" },
    { MANAGER: "Joe James", EMAIL: "Test Corp", PHONE: "Yonkers", GENDER: "NY", COMPANY: "NY", ACRONYM: "NY", OPTION: "NY" }
  ];
  const options = {
    filterType: 'checkbox',
  };
  return (
    <>
      
      <div className='head'>
                <div className='headLeft'>
                    <Link to="/dashboard/contractors-outlet/contractor-panel">
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </Link>
                    <h2>UPLOAD CONTRACTOR'S FILE</h2>
                </div>
            </div>
      <div className="upload-doc mt-5 col-lg-12" style={{ padding: "15px" }}>
        <p className="infoEmpl_text">DOWNLOAD FORM</p>
        <div className="col-md-4">
          <div
            className="mt-5 mb-4 main_content document_card"
            style={{ width: "257px" }}
          >
            <img src={excelpng} style={{ width: "50px !important", margin: "auto" }} />
            <div className="text-center card-text document_name">
              providers_form.xlsx
            </div>
            <button
              className="btn btn-lg"
              style={{
                color: "white",
                fontSize: "12px",
                background: "#178A7B",
              }}
            >
              Download File
            </button>
          </div>
        </div>
        <div className="row instruction_text">
          Please download file, then fill on it, then upload to process the
          data.
        </div>
        <p className="infoEmpl_text">LOAD YOUR FILE</p>
        <div className="row mt-3 mb-5">
          <div className="col-md-5">
            <div className="updata_img_m" style={{ width: "340px" }}>
              <label
                htmlFor="file-input"
                className="dottedborderbox"
                style={{ height: "100%" }}
              >
                <img
                  src={cloudsvg}
                  alt="submitupload"
                  className="submitupload"
                />
                <input type="file" id="file-input" accept="image/*, video/*" />
                <p>
                  drag {"&"} drop <br /> your image <br /> <span>size 20 mb max</span>
                </p>
              </label>
            </div>
          </div>

          <div className="col-md-5 card_file ">
            <div
              className="main_content"
              style={{ width: "369px", height: "133px" }}
            >
              <div className="card-body d-flex">
                <div className="col-md-2  mb-5 ">
                  <img src={excelpng} />
                </div>
                <div
                  style={{ marginLeft: "30px", padding: "0" }}
                  className="col"
                >
                  <p>employees_form.xlsx</p>
                  <span>
                    SIZE <span style={{ fontWeight: "bold" }}>513 KB</span>
                  </span>
                  <div className="mt-4">
                    <button
                      className="btn btn-lg"
                      style={{
                        color: "white",
                        fontSize: "12px",
                        background: "#178A7B",
                        width: "223px",
                      }}
                    >
                      LOAD DOCUMENT
                    </button>
                  </div>
                </div>
                <div>
                  <Link to="">
                    <DeleteOutlineIcon style={{ color: "red" }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2 ">
          <p className="infoEmpl_text">CONTRACTORS</p>
          <p>
            Total <span>45</span>
          </p>
        </div>
        <div className="row">
          <div className="col-12"><MUIDataTable
            title={"type the name to filter"}
            data={data}
            columns={columns}
            options={{
              selectableRows: false // <===== will turn off checkboxes in rows
            }}
          />
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadContractorFile;
