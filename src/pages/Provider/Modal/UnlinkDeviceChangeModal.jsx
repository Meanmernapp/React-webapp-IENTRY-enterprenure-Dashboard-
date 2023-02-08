import React from "react";
import { useDispatch, useSelector } from "react-redux";
import iccancel from "../../../assets/images/ic-cancel.svg";
import { UnLinkDeviceProvider } from "../../../reduxToolkit/Providers/providersApi";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';


const UnlinkDeviceChangeModal = (props) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch()
    const { getProviderEmployeeDetail } = useSelector(state => state?.providersSlice)
    console.log(getProviderEmployeeDetail)

    return (
        <div class="modal removePlanModal" id="changeLinkDevice">
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
                                    <b>{t("unlink_device")}</b>
                                </h1>
                                <br />

                                <h4 className="mt-3">{t("unlink_confirmation_msg")}</h4>
                                <div className="mt-3 col-md-10 cardModalFooter">
                                    <button className="cancel" data-dismiss="modal">
                                        {t("cancel")}
                                    </button>
                                    <button className="confirm"
                                        onClick={() => {

                                            dispatch(UnLinkDeviceProvider(getProviderEmployeeDetail?.user?.id))
                                        }}
                                        data-dismiss="modal"
                                    >

                                        {t("change")}
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

export default UnlinkDeviceChangeModal;
