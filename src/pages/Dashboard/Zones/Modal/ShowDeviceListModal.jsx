import React from "react";
import iccancel from "../../../../assets/images/ic-cancel.svg";

const ShowDeviceListModal = () => {
  return (
    <div className="modal" id="showdevice_listModal">
      <div className="modal-dialog">
        <div className="modal-content">
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
                <h1>DEVICES</h1>
              </div>
              <p>
                PDA 1
                <span>
                  A
                  <img src={iccancel} alt="" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDeviceListModal;
