import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import Notifications from "./Notifications";
import AccessHistory from "./AccessHistory";
import Logs from "./Logs";
import { t } from "i18next";

const NotificationTab = () => {
  const [show, setShow] = useState(false);
  const [showIncome, setShowIncome] = useState(false);
  const [toggleState, setToggleState] = useState(1);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleCloseIncome = () => setShowIncome(false);
  const handleShowIncome = () => setShowIncome(true);


  const toggleTab = (index) => {
    setToggleState(index);
  };


  // useEffect(() => {
  //   if(toggleState ==1){
  //     setDropDownProps({ events:true,
  //       firstItem:'DOWNLOAD FILE',
  //       secondItem:'VIEW DETAILS'})
  //   }else{
  //     setDropDownProps({ events:true,
  //       firstItem:'ALLOW EVENT',
  //       secondItem:'VIEW DETAILS'})
  //   }
  // }, [toggleState])



  return (
    <div className="providersPanel events">
      <div className="head">

        <div style={{ marginLeft: "auto", display: 'flex' }}>
          {
            toggleState === 1 && (
              <div>
                <button className="mr-4" style={{ width: '100%', height: '100%' }} onClick={() => handleShowIncome(true)}>
                  <i class="fa fa-filter" aria-hidden="true"></i>
                </button>
                {/* <IncomingModel show={showIncome} onHide={() => handleCloseIncome(false)} /> */}
              </div>
            )
          }


          <div className="ml-2">
            <button className="btn btn-lg" onClick={() => handleShow(true)}>
              {t("create_event")}
              <SaveIcon />
            </button>
            {/* <CreateEventModal
              show={show}
              onHide={() => handleClose(false)}
            /> */}
          </div>

        </div>


      </div>
      {/* portfolio-grid */}
      <div className="container">
        <div className="row steps-row mb-3" id="pills-tab" role="tablist">
          <div className="col-4 tab" role="presentation">
            <a
              className={`steps btn ${toggleState === 1 ? "active-border" : "disable-border"
                }`}
              onClick={() => toggleTab(1)}
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <span>{t("notifications")}</span>
            </a>
          </div>
          <div className="col-4 tab tab-right" role="presentation">
            <a
              className={`steps btn ${toggleState === 2 ? "active-border" : "disable-border"
                }`}
              onClick={() => toggleTab(2)}
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <span>{t("access_history")}</span>
            </a>
          </div>
          <div className="col-4 tab tab-right" role="presentation">
            <a
              className={`steps btn ${toggleState === 3 ? "active-border" : "disable-border"
                }`}
              onClick={() => toggleTab(3)}

            >
              <span>{t("logs")}</span>
            </a>
          </div>
        </div>
        <div className="tab-content" id="pills-tabContent">
          <div
            className={`${toggleState === 1 ? "tab-pane fade show active " : "tab-pane fade"
              }`}
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <Notifications />

          </div>
          <div
            className={`${toggleState === 2 ? "tab-pane fade show active " : "tab-pane fade"
              }`}
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <AccessHistory />
          </div>
          <div
            className={`${toggleState === 3 ? "tab-pane fade show active " : "tab-pane fade"
              }`}
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <Logs />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default NotificationTab
