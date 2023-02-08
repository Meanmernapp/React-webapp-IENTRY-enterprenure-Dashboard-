import React from "react";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const RemoveMapModal = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  <div class="modal buildingadd_card" id="removePLan">
    <div class="modal-dialog modal-md zonescard_m_center">
      <div class="modal-content ">
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
        <div class="modal-body ">
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
                <b>{t("remove_map")}</b>
              </h1>
              <br />

              <h4 className="mt-3">{t("remove_map_text")}</h4>
              <div className="mt-3 col-md-10">
                <button className="btn btn-danger btn-lg  btn-block">
                  {t("confirm")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default RemoveMapModal;
