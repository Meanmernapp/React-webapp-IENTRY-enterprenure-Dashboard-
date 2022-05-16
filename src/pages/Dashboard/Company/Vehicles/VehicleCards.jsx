import React from "react";
import SingleVehicleCard from "./SingleVehicleCard";
import HashLoader from "react-spinners/HashLoader";
import { override } from "../../../../Helpers/spinnercss";
const VehicleCards = ({ vehicleData }) => {
  return (
    <div style={{ display: "flex" }} className="mt-2">
      <div className="row mt-5 mr-2">
        {
          vehicleData ?
            vehicleData?.map(item => (
              <div className="col-md-4" key={item.id}>
                <SingleVehicleCard vehicle={item.vehicle} />
              </div>
            )) :
            <div className="overlay">
              <HashLoader loading="true" css={override} size={50} color="#fff" />
            </div>
        }
      </div>
    </div>
  );
};

export default VehicleCards;
