import React from "react";
import iccancel from "../../../../assets/images/ic-cancel.svg";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const AddBuildingModel = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  return (
    <div class="modal buildingadd_card" id="addbuilding_modal">
      <div class="modal-dialog">
        <div class="modal-content w-75">
          <div>
            <img
              src={iccancel}
              className="close profile_ancel_img"
              data-dismiss="modal"
              alt=""
            />
          </div>

          {/* <!-- Modal body --> */}
          <div class="modal-body ">
            <div className="text-center buildingadd_modal">
              <h3>{t("buildinig")}</h3>
            </div>
            <div className="container-fluid input_zones">
              <div class="form-group">
                <input
                  type="number"
                  class="form-control"

                  id="usr"
                />
              </div>

              <div class="form-group">
                <input
                  type="name"
                  class="form-control"

                  id="usr"
                />
              </div>
              <select class="form-select" aria-label="Default select example">
                <option selected>{t("status")}</option>
                <option value="1">{t("active")}</option>
                <option value="2">{t("non_active")}</option>
              </select>
              <button className="btn btn-lg">{t("add")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBuildingModel;
