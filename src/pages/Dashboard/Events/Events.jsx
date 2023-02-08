import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Incoming from "./Incoming";
import Validation from "./Validation";
import Records from "./Records";
// import CreateEventModal from "./subComponents/createEventModal"
import IncomingModel from "./IncomingModel";
// import { getComopanyRestructions } from "../../../Apis/companydata";
import { useDispatch, useSelector } from "react-redux";
import { updateEmailPhoneSearchList, updateOunEmployeeData } from "../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { permissionObj } from "../../../Helpers/permission";
import ic_add from "../../../assets/images/ic-add.svg"

const Events = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  // const companyId = "a6bd2887-0f4a-4e5f-b0b5-000d9817ab23";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showIncome, setShowIncome] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  // const [restructions, setRestructions] = useState();

  const companyRestrictionsData = useSelector(state => state?.EmployeeEventsSlice?.companyRestrictionsData);
  const { permission } = useSelector(state => state.authenticatioauthennSlice);

  const toggleTab = (index) => {
    setToggleState(index);
  };


  // useEffect(() => {
  //   getComopanyRestructions(companyId).then(({ data: { data } }) => {
  //     setRestructions(data)
  //   })
  // }, [])

  const handleCreateEvent = () => {
    dispatch(updateEmailPhoneSearchList([]));
    dispatch(updateOunEmployeeData([]));
    companyRestrictionsData?.isOnuEvent ?
      navigate("/dashboard/employee/events/onu-events") :
      navigate("/dashboard/employee/events/normal-events")
  }

  return (
    <div className="providersPanel events">
      <div className="head">
        <div className='headLeft'>
          <h2>{t('events')}</h2>
        </div>
        <div className="d-flex">
          {
            toggleState === 1 &&
            <i
              class="fa fa-filter filterPopup"
              aria-hidden="true"
              style={{
                margin: "0 10px"
              }}


              onClick={() => setShowIncome(true)}
            ></i>
          }
          {
            permission?.includes(permissionObj?.WEB_EVENT_CREATE) &&
            <button
              className="ml-2"
              onClick={handleCreateEvent}
            >
              {t('create_event')}
              <img src={ic_add} alt="ic_add" />
            </button>
          }
        </div>
        {showIncome && <IncomingModel setShowIncome={setShowIncome} />}
      </div>

      {/* <CreateEventModal
        show={show}
        onHide={() => setShow(false)} 
      /> */}
      {/* portfolio-grid */}
      <div
        className="row steps-row mb-3"
        id="pills-tab"
        role="tablist"
        style={{
          margin: 'auto'
        }}
      >
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
            <span>{t('incoming')}</span>
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
            <span>{t('validation')}</span>
          </a>
        </div>
        <div className="col-4 tab tab-right" role="presentation">
          <a
            className={`steps btn ${toggleState === 3 ? "active-border" : "disable-border"
              }`}
            onClick={() => toggleTab(3)}

          >
            <span>{t('records')}</span>
          </a>
        </div>
      </div>
      <div
        className="tab-content"
        id="pills-tabContent"
        style={{
          // width: "95rem",
          margin: 'auto'
        }}
      >
        <div
          className={`${toggleState === 1 ? "tab-pane fade show active " : "tab-pane fade"}`}
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <Incoming />
        </div>
        <div
          className={`${toggleState === 2 ? "tab-pane fade show active " : "tab-pane fade"}`}
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <Validation />
        </div>
        <div
          className={`${toggleState === 3 ? "tab-pane fade show active " : "tab-pane fade"}`}
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <Records />
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default Events;
