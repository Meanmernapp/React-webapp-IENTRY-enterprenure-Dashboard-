import React, { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import photo from "../../../assets/images/ic-password.png";
import FingerPhoto from "../../../assets/images/ic-fingerprint.png";
import NfcPhoto from "../../../assets/images/nfc.png";
import PcPhoto from "../../../assets/images/ic-pc.png";
import MobilePhoto from "../../../assets/images/ic-mobile.png";
import { t } from "i18next";

const AccessHistory = () => {
  let state = true;
  return (
    <div className="notification-sec">
      <div className="notification-sec__header">
        {state ? (
          <span>
            <img src={photo} />
            <span className="notification-sec__svg">
              {t("entry")}
              <ExpandLessIcon />
            </span>
          </span>
        ) : (
          <span>
            <img src={photo} />
            <span className="notification-sec__svg">
            {t("exit")}
              <KeyboardArrowDownIcon />
            </span>
          </span>
        )}
        <span className="notification-sec__date">12/07/1995</span>
      </div>
      <span className="notification-sec__status">Zone: Meeting Access</span>
      {state ? (
        <span className="notification-sec__success-message">
          Access with fingerprint {"->"} Successfully
        </span>
      ) : (
        <span className="notification-sec__failed-message">
          Access with face recognition {"->"} Failed.
        </span>
      )}

      {/* use according to design */}
      <img src={FingerPhoto} />
      <img src={NfcPhoto} />
      <img src={PcPhoto} />
      <img src={MobilePhoto} />

    </div>
  );
};

export default AccessHistory;
