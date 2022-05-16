import React from "react";
import iccancel from "../../../../assets/images/ic-cancel.svg";

const RemovePlanModal = () => {
  return (
    <div className="modal buildingadd_card" id="removePLan">
      <div className="modal-dialog modal-md zonescard_m_center">
        <div className="modal-content ">
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
          <div className="modal-body ">
            <div className="container-fluid ">
              <div
                className="row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <h1>
                  <b>Remove Plane</b>
                </h1>
                <br />

                <h4 className="mt-3">DO YOU WANT TO REMOVE THIS PLANE?</h4>
                <div className="mt-3 col-md-10">
                  <button className="btn btn-danger btn-lg  btn-block">
                    Confirm 
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemovePlanModal;
