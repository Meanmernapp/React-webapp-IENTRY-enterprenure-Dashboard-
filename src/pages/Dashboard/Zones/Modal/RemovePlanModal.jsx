import React from "react";
import { useDispatch } from "react-redux";
import iccancel from "../../../../assets/images/ic-cancel.svg";
import { DeleteimgZonePlane } from "../../../../reduxToolkit/EmployeeZones/EmployeeZonesApi";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const RemovePlanModal = (props) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const dispatch = useDispatch()
  return (
    <div class="modal removePlanModal" id="removePLan">
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
                className="row zoneCardMoadlBody"
              >
                <h1>
                  <b>{t("remove_plane")}</b>
                </h1>
                <br />
                <h4 className="mt-3">{t("remove_confirmation_msg")}</h4>
                <div className="mt-3 col-md-10 cardModalFooter">
                  <button className="cancel" data-dismiss="modal">
                    {t("cancel")}
                  </button>
                  <button className="confirm"
                    onClick={() => {
                      const data = {
                        id: props.id,
                      }
                      dispatch(DeleteimgZonePlane(data))
                    }}
                    data-dismiss="modal"
                  >
                    {t("confirm")}
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
