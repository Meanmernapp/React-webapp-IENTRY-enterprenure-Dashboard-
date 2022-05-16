import React, { useState } from "react";
import AddZoneModal from "./Modal/AddZoneModal";
import ZonesCard from "./ZonesCard";
const Zones = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div className='head'>
        <h2>company details</h2>
        <button
          className="btn btn-lg"
          onClick={() => setModalShow(true)}
        >
          ADD ZONE
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>
      <div className="subhead">
        <h5>Zones</h5>
        <p>Total 4</p>
      </div>
      <ZonesCard />

      {/* Add Building Modal Start */}
      <AddZoneModal
        title="Zone"
        check="false"
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {/* Add Building Modal End */}
    </>
  );
};
export default Zones;
