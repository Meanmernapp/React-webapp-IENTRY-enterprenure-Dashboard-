import React from "react";
import pdfpng from "../../../../assets/images/PDF.PNG";
import cloudsvg from "../../../../assets/images/cloud.svg";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Table } from "react-bootstrap";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import excelpng from "../../../../assets/images/excel.png";
import submitupload from "../../../../assets/images/upload.PNG";

import { Link } from "react-router-dom";
const UploadEmployeeFile = () => {
  return (
    <>
      <div className="mt-5 col-lg-12" style={{ padding: "15px" }}>
        <div className="mb-2 infoEmpl_text">
          <h1>DOWNLOAD FORM</h1>
        </div>
        <div className="col-md-4">
          <div className="mt-5 mb-4 main_content document_card">
            <div className="text-center card-title document_head">
              <span>JOB APPLICATION</span>
            </div>
            <div className="document_img">
              <img src={pdfpng} />
            </div>
            <div className="text-center card-text document_name">
              formato_informacion _personal.pdf
              <br /> <span>14-05-2021 15:</span>
            </div>
          </div>
        </div>
        <div className="row instruction_text">
          Please download file, then fill on it, then upload to process the
          data.
        </div>
        <div className="mb-2 infoEmpl_text">
          <h1>LOAD YOUR FILE</h1>
        </div>
        <div className="row mt-5 mb-5">
          <div className="col-md-5">
            <div className="updata_img_m">
              <label htmlFor="file-input" className="dottedborderbox">
                <img
                  src={cloudsvg}
                  alt="submitupload"
                  className="submitupload"
                />
                <input type="file" id="file-input" accept="image/*, video/*" />
                <p>
                  drag {"&"} drop <br /> your image <br /> size 20 mb max
                </p>
              </label>
            </div>
          </div>

          <div className="col-md-5 card_file ">
            <div className="main_content">
              <div className="card-body d-flex">
                <div className="col-md-2 mt-5 mb-5 cloud_img">
                  <img src={excelpng} />
                </div>
                <div className="col">
                  <div className="row">
                    <p>employees_form.xlsx</p>
                    <span>
                      SIZE <span style={{ fontWeight: "bold" }}>513 KB</span>
                    </span>
                  </div>
                  <div className="text-center mt-4 uploadFile">
                    <button className="btn btn-lg">LOAD DOCUMENT</button>
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
        <div className="mb-2 infoEmpl_text">
          <h1>EMPLOYEES</h1>
          <p>
            Total <span>45</span>
          </p>
          <div className="row mt-3" style={{ boxShadow: "3px" }}>
            <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
            >
              <TextField
                fullWidth
                placeholder="Type the name to filter ..."
                label="Search"
                id="NAME"
                className=""
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </div>
        </div>

        <div className="row mt-5 employee_card_data">
          <Table>
            <thead>
              <tr className="mt-2 mb-2">
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                <>
                  <tr classsName="tableData">
                    <td>IBL-000001</td>
                    <td>Luis Enrique Cornejo Arreola</td>
                    <td>lcornejo@ibl.mx</td>
                    <td>+514427065909</td>
                    <td>MALE</td>
                    <td>FINANCE</td>
                    <td>
                      <Link to="">
                        <DeleteOutlineIcon style={{ color: "red" }} />
                      </Link>
                    </td>
                  </tr>
                  {/* <span></span> */}
                </>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="mt-5 row text-center page_number">
          <p>
            Page 1 of 25{" "}
            <span style={{ width: "30px" }}>
              <ArrowBackIosNewIcon style={{ color: "black" }} />
              <ArrowForwardIosIcon style={{ color: "black" }} />
            </span>
          </p>
        </div>
        <div className="col-lg-12">
          <div className="col-lg-6 mt-5 mb-5" style={{ float: "right" }}>
            <div className="container">
              <div className="text-center uploadFile">
                <button className="btn btn-lg">UPLOAD EMPLOYEES</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadEmployeeFile;
