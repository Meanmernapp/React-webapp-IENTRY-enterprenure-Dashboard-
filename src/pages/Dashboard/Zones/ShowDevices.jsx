import React, { useState } from "react";
import { Link } from "react-router-dom";
import house_plane from "../../../assets/images/house_plane@2x.png";
import map_solid from "../../../assets/images/map-solid.svg";

import globe_asia_solid from "../../../assets/images/globe-asia-solid.svg";

import ic_info from "../../../assets/images/ic-info.svg";

import ShowDeviceModal from "./Modal/ShowDeviceModal";
import ShowDeviceMapModal from "./Modal/showDeviceMapModal";
import ShowDeviceListModal from "./Modal/ShowDeviceListModal";
import AuthorizedEmployees from "./Modal/AuthorizedEmployees";

const ShowDevices = () => {
  const [ProfileImage, setProfileImage] = useState("");

  return (
    <div className=" showdevices_res">
      <div className="mt-4 container-fluid position-relative">
        <img
          src={
            ProfileImage === "" ||
            ProfileImage === null ||
            ProfileImage === undefined
              ? house_plane
              : ProfileImage
          }
          className="img-fluid"
          style={{
            width: "100%",
            height: "100%",
          }}
          alt="employeedetail-person4"
        />
        {/* Show Device View Plan Start */}
        <div className="card showdevice_left ">
          <Link to="/buildingdetails">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </Link>
          <div className="mt-3 container-fluid text-end">
            <h1>COPORATE</h1>
            <p>
              IBL | <span>Intelligence Bereau Laboratory</span>
            </p>
            <h1>zone</h1>
            <span>Querétaro</span>

            <select className="form-select" aria-label="Default select example">
              <option selected>plan</option>
              <option value="1">plan 1</option>
              <option value="2">plan 2</option>
              <option value="3">map</option>
            </select>
            <h3>remove plan</h3>
          </div>
        </div>
      </div>
      {/* Show Device View Plan End  */}
      {/* Show Device Add Plan Start  */}
      <div
        className="showdevice_addbtn"
        data-toggle="modal"
        data-target="#showdeviceModal"
      >
        <button className="btn btn-lg">
          ADD PLANE
          <img src={map_solid} alt="" />
        </button>
      </div>
      {/* Show Device Add Plan End  */}

      {/* Show Device Add Map Start  */}
      <div
        className="showdevice_addmap"
        data-toggle="modal"
        data-target="#showdevicemapModal"
      >
        <button className="btn btn-lg">
          ADD MAP
          <img src={globe_asia_solid} alt="" />
        </button>
      </div>
      {/* Show Device Add Map End  */}
      {/* Show Device Devices List Start  */}
      <div
        className="showdevice_list"
        data-toggle="modal"
        data-target="#showdevice_listModal"
      >
        <button className="btn btn-lg">
          <img src={ic_info} alt="" />
        </button>
      </div>

      {/* Show Device Devices List End  */}

      <ShowDeviceModal setProfileImage={setProfileImage} />

      <ShowDeviceMapModal />

      <ShowDeviceListModal />
    </div>
  );
};

export default ShowDevices;
