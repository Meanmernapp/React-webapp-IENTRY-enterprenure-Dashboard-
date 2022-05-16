import React, { useRef, useState } from "react";
import icwifi from "../../../assets/images/ic-wifi.svg";



import ic_check from "../../../assets/images/ic-check.svg";
import iccancel from "../../../assets/images/ic-cancel.svg";
import ic_map from "../../../assets/images/ic-map.svg";

import phoneBuilding from "../../../assets/images/Group 162818.svg";
import { Link } from "react-router-dom";

// Materail ui
import { Table } from "react-bootstrap";
import AddBuildingModel from "./Modal/AddBuildingModal";
import AddChildZoneModal from "./Modal/AddChildZoneModal";
import RemovePlanModal from "./Modal/RemovePlanModal";
import TotalAccessService from "./TotalAccessService";
const SingleZoneDetails = (props) => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const employees = [
    "Luis Enrique Cornejo Arrela",
    "Henry Clinton",
    "Brack Obbama",
    "Sherlock Homes",
    "Muhammad Umair",
    "Luis Enrique Cornejo Arrela",
    "Henry Clinton",
    "Brack Obbama",
    "Sherlock Homes",
    "Muhammad Umair",
    "Luis Enrique Cornejo Arrela",
    "Henry Clinton",
    "Brack Obbama",
    "Sherlock Homes",
    "Muhammad Umair",
  ];
  return (
    <>
      <div className="building_detauils_res">
        <div className="container-fluid">
          <div className="building_logo ">
            <div>
              <a href="/zones">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </a>
              <span>ZONE DETAILS</span>
              <div className="pull-right">
                <Link to="/dashboard/showdevices">
                  <button className="btn btn-lg buildingetails_btn_device">
                    SHOW DEVICES <img src={ic_map} alt="" />
                  </button>
                </Link>
              </div>
              <a href="/dashboard/updatezone" className="pull-right">
                <button className=" btn btn-lg buildingetails_btn_update">
                  update data
                  <i
                    className="fa fa-pencil plus_building_details"
                    aria-hidden="true"
                  ></i>
                </button>
              </a>
            </div>
          </div>

          {/* Building Details Main Section Start */}

          <div className="mt-5 zonesinactive_res">
            <div className="row">
              <div className="col-lg-3">
                <div className="building_details_text">
                  <div className="text-center">
                    <h1>details</h1>
                    <p>NAME</p>
                    <h2>Building A, floor 2</h2>
                    <p>status</p>
                    <h3>
                      <span>
                        ACTIVE <i className="fa fa-circle" aria-hidden="true"></i>
                      </span>
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="text-center buildingdetail_access_txt">
                  <h1 className="mt-5">ACCESS DEVICE</h1>
                </div>
                <div className="zones_d_access">
                  <div className=" d-flex container-fluid">
                    <div>
                      <img
                        src={icwifi}
                        className=""
                        alt="buildind_details_wifi"
                      />
                    </div>
                    <div>
                      <img
                        className="ic_phone_building"
                        src={phoneBuilding}
                        alt="buildind_details_phone"
                      />
                    </div>
                    <div>
                      <i className="fa fa-circle" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="text-center">Mantra Externo</div>
                  <p className="mb-2">
                    IP
                    <span>192.168.1.45</span>
                  </p>
                  <p className="mb-2">
                    Model
                    <span>SAMSUNG</span>
                  </p>

                  <p className="mb-2">
                    MAC
                    <span>B0-7D-64-08-46-2E</span>
                  </p>

                  <p className="mb-2">
                    Password
                    <span>**************</span>
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="text-center buildingdetail_access_txt">
                  <h1 className="mt-5">COMMON AREA</h1>
                </div>
                <div className="text-center schedule_zoneb">
                  <h2>SCHEDULE USE</h2>
                  <h3>FROM</h3>
                  <p>12:00</p>
                  <h3>TO</h3>
                  <p>18:00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="div">
            <div className=" buildingdetail_access_txt">
              <h1 className="mt-5">
                SUB - Z O N ES
                <span
                  style={{ cursor: "pointer" }}
                  data-toggle="modal"
                  data-target="#addchildzones_modal"
                >
                  ADD CHILD ZONE +
                </span>
              </h1>
            </div>

            <div className="zonescollaps_building">
              <div className="mt-4 row room_access_text">
                <div className="">
                  <Table
                    style={{
                      border: "hidden",
                    }}
                  >
                    <thead style={{ border: "hidden" }}>
                      <tr>
                        <th>
                          <h5>Name</h5>
                        </th>
                        <th>
                          <h5>ACCESS DEVICE</h5>
                        </th>
                        <th>
                          <h5>COMMON AREA</h5>
                        </th>
                        <th>
                          <h5>STATUS</h5>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <h4>
                            QUERÉTARO
                            <a href="#">MORE DETAILS</a>
                          </h4>
                        </td>
                        <td>
                          <div>
                            <img src={ic_check} alt="" />
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={ic_check} alt="" />
                          </div>
                        </td>
                        <td>
                          <h6>
                            ACTIVE
                            <>
                              <i className="fa fa-circle" aria-hidden="true"></i>
                            </>
                          </h6>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>

            {/* Total Access Sevice Section Start */}
            <TotalAccessService />
            
            <div className="buildingdetail_access_d">
              <Table className="table" style={{ border: "hidden" }}>
                <thead>
                  <tr>
                    <th style={{ border: "hidden" }}>
                      <h1>AUTHORIZED EMPLOYEES</h1>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees?.map((employee) => (
                    <>
                      <div
                        className="column"
                        style={{ float: "left", width: "25%", color: "gray" }}
                      >
                        <tr style={{ border: "hidden " }}>
                          <td
                            style={{
                              display: "flex",
                              justifyContent: "spacebetween",
                              border: "hidden",
                            }}
                          >
                            <img
                              src={iccancel}
                              className="close profile_ancel_img"
                              data-dismiss="modal"
                              data-toggle="modal"
                              data-target="#removePLan"
                              alt=""
                            />
                            <span>{employee}</span>
                          </td>
                        </tr>
                      </div>
                    </>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Total Access Sevice Section End */}
          </div>
          {/* Building Details Main Section End */}
        </div>
      </div>

      {/* Add Building Modal Start */}
      {/* <!-- The Modal --> */}
      <AddBuildingModel />
      {/* Add Building Modal End */}
      {/* Add Child Zones Modal Start */}
      {/* <!-- The Modal --> */}
      <AddChildZoneModal />
      {/* Add Child Zones Modal End */}
      <RemovePlanModal />
    </>
  );
};

export default SingleZoneDetails;
