import React, { useState } from "react";
import iccancel from "../../../../assets/images/ic-cancel.svg";
import ZonesMap from "../Map/ZoneMap";

const ShowDeviceMapModal = () => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  return (
    <div className="modal" id="showdevicemapModal">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* <!-- Modal Header --> */}

          <div>
            <img
              src={iccancel}
              className="close profile_ancel_img"
              data-dismiss="modal"
              alt=""
            />
          </div>

          {/* <!-- Modal body --> */}
          <div className="modal-body">
            <div className="container">
              <div className="text-center">
                <h1>ADD NEW MAP</h1>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="LATITUDE"
                  id="usr"
                  value={lat}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="LONGITUDE"
                  id="usr"
                  value={lng}
                />
              </div>
              <div className="mt-3 mb-5 zones_map">
                <ZonesMap LatLng={(e) => [setLat(e.lat), setLng(e.lng)]} />
              </div>
              <div className="text-center">
                <p>TOUCH TO ADD A POINT</p>
              </div>
              <button className="mb-4 btn btn-lg w-100">UPLOAD map</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDeviceMapModal;
