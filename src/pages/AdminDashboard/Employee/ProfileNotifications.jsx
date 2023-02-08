import { Grid } from "@mui/material";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import photo from "../../../assets/ic-box.png";
import MeetingPhoto from "../../../assets/ic-meeting.png";
import FileOpenIcon from '@mui/icons-material/FileOpen';
const ProfileNotifications = () => {
  let state = false;
  return (
    <>
      <Grid container sx={{ my: "30px" }}>
        <Grid item xs={7}>
          <span className="add-new-employe__heading">NOTIFICATION PANEL</span>
        </Grid>
        <Grid item xs={5} sx={{position:"relative"}}>
        <div className="notification-panel-export-btn">
        <button className="edit-profile-save-btn" >
        EXPORT TO EXCEL{" "}
          <span>
            <FileOpenIcon  style={{fontSize:"20px"}}/>
          </span>
        </button>
        </div>
       
        </Grid>
      </Grid>
      <div className="notification-panel">
        <div className="notification-sec">
          <div className="notification-sec__header">
            {state ? (
              <span>
                <img src={photo} />

                <span className="notification-sec__svg">package</span>
              </span>
            ) : (
              <span>
                <img src={MeetingPhoto} />
                <span className="notification-sec__svg">Meeting</span>
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
      </div>
      <div className="notification-panel">
        <div className="notification-sec">
          <div className="notification-sec__header">
            {state ? (
              <span>
                <img src={photo} />

                <span className="notification-sec__svg">package</span>
              </span>
            ) : (
              <span>
                <img src={MeetingPhoto} />
                <span className="notification-sec__svg">Meeting</span>
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
      </div> <div className="notification-panel">
        <div className="notification-sec">
          <div className="notification-sec__header">
            {state ? (
              <span>
                <img src={photo} />

                <span className="notification-sec__svg">package</span>
              </span>
            ) : (
              <span>
                <img src={MeetingPhoto} />
                <span className="notification-sec__svg">Meeting</span>
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
      </div> <div className="notification-panel">
        <div className="notification-sec">
          <div className="notification-sec__header">
            {state ? (
              <span>
                <img src={photo} />

                <span className="notification-sec__svg">package</span>
              </span>
            ) : (
              <span>
                <img src={MeetingPhoto} />
                <span className="notification-sec__svg">Meeting</span>
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
      </div> <div className="notification-panel">
        <div className="notification-sec">
          <div className="notification-sec__header">
            {state ? (
              <span>
                <img src={photo} />

                <span className="notification-sec__svg">package</span>
              </span>
            ) : (
              <span>
                <img src={MeetingPhoto} />
                <span className="notification-sec__svg">Meeting</span>
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
      </div>
    </>
  );
};

export default ProfileNotifications;
