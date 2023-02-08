import React, { useState } from "react";
import photo from "../../../assets/images/ic-box.png";
import MeetingPhoto from "../../../assets/images/ic-meeting.png";
import { t } from "i18next";


const Notifications = () => {
  let state=false;
  return (
    <div className="notification-sec">
      <div className="notification-sec__header">
        {state ? (
          <span>
            <img src={photo} />

            <span className="notification-sec__svg">{t("package")}</span>
          </span>
        ) : (
          <span>
            <img src={MeetingPhoto} />
            <span className="notification-sec__svg">{t("meeting")}</span>
          </span>
        )}
        <span className="notification-sec__date">12/07/1995</span>
      </div>
      <span className="notification-sec__status">Provided Arrived</span>
      <span className="notification-sec__message">
        Your package is in the lobby.
      </span>
      {state ? null : (
        <span className="notification-sec__meetingDate">
          Date Meeting: 28-04-2021 12:00 P.M.
        </span>
      )}
    </div>
  );
};

export default Notifications;
