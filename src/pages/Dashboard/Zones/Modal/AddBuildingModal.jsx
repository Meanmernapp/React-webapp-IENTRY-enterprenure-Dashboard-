import React from "react";
import iccancel from "../../../../assets/images/ic-cancel.svg";

const AddBuildingModel = () => {
  return (
    <div className="modal buildingadd_card" id="addbuilding_modal">
      <div className="modal-dialog">
        <div className="modal-content w-75">
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
            <div className="text-center buildingadd_modal">
              <h3>BUILDING</h3>
            </div>
            <div className="container-fluid input_zones">
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="1000000000000002"
                  id="usr"
                />
              </div>

              <div className="form-group">
                <input
                  type="name"
                  className="form-control"
                  placeholder="NAME *"
                  id="usr"
                />
              </div>
              <select className="form-select" aria-label="Default select example">
                <option selected>Status</option>
                <option value="1">Active</option>
                <option value="2">Non Active</option>
              </select>
              <button className="btn btn-lg">add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBuildingModel;
