import { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Incoming from "./Incoming";
import Validation from "./Validation";
import Records from "./Records";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import CreateEventModal from "./subComponents/createEventModal"
import IncomingModel from "./IncomingModel";
// import { getComopanyRestructions } from "../../../Apis/companydata";
import { useDispatch, useSelector } from "react-redux";
import { updateEmailPhoneSearchList, updateOunEmployeeData } from "../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { permissionObj } from "../../../Helpers/permission";
import { handlePagination } from '../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice';
import ic_add from "../../../assets/images/ic-add.svg"
import DeleteModal from "../../Modals/DeleteModal";
import SettingButton from "../../../components/SettingButton";

const Events = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  // const companyId = "a6bd2887-0f4a-4e5f-b0b5-000d9817ab23";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showIncome, setShowIncome] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  // const [restructions, setRestructions] = useState();
  const [selectEventForDelete, setSelectEventForDelete] = useState([])
  const [deleteEventShow, setDeleteEventShow] = useState(false)
  const incomingsData = useSelector(state => state?.EmployeeEventsSlice?.incomingEvents);
  const validationData = useSelector(state => state?.EmployeeEventsSlice?.validationEvents);
  const recordsData = useSelector(state => state?.EmployeeEventsSlice?.recordsEvents);
  const title_modal = "DELETE_EVENTS";
  const element_modal = "EVENTS";

  const companyRestrictionsData = useSelector(state => state?.EmployeeEventsSlice?.companyRestrictionsData);
  const { permission } = useSelector(state => state.authenticatioauthennSlice);

  console.log(companyRestrictionsData)
  const toggleTab = (index) => {
    setToggleState(index);
  };


  const handleCreateEvent = () => {
    dispatch(updateEmailPhoneSearchList([]));
    dispatch(updateOunEmployeeData([]));
    companyRestrictionsData?.isOnuEvent ?
      navigate("/dashboard/employee/events/onu-events") :
      navigate("/dashboard/employee/events/normal-events")
  }

  // this function control select all id or unSelect all
  const handelDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      if (toggleState === 1) {
        const selectAllIds = incomingsData?.content?.map(item => {
          return item?.id
        })
        setSelectEventForDelete(selectAllIds)
      }
      if (toggleState === 2) {
        const selectAllIds = validationData?.content?.map(item => {
          return item?.id
        })
        setSelectEventForDelete(selectAllIds)
      }
      if (toggleState === 3) {
        const selectAllIds = recordsData?.content?.map(item => {
          return item?.id
        })
        setSelectEventForDelete(selectAllIds)
      }

    } else {
      setSelectEventForDelete([])
    }

  }

  // this function handle only specific id base on selection
  const handleCheckboxChange = (e) => {

    if (e.target.checked) {
      setSelectEventForDelete([...selectEventForDelete, e.target.id]);
    } else {
      setSelectEventForDelete(selectEventForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };

  //This fragment calculates the top position of the elementRef
  const elementRef = useRef(null);
  useEffect(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const distanceTop = rect.top + 27;
      console.log(distanceTop);
      elementRef.current.style.setProperty('--top-value', `${distanceTop}px`);
    }
  }, [toggleState]);

  //This fragment makes unchecked all the checkboxes when toggleState change
  const resetAllCheckboxes = () => {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
  useEffect(() => {
    resetAllCheckboxes();
    setSelectEventForDelete([]);
    setIsAllChecked(false);
  }, [toggleState]);


  return (
    <div className="providersPanel events">
      <div className="head">
        <div className='headLeft'>
          <h2>{t('events')}</h2>
        </div>

        <div className="container-top-right-btns"
        >


          <SettingButton onAction={() => navigate("/dashboard/employee/event-restriction")}
            title={t("restriction")} />

          {
            permission?.includes(permissionObj?.WEB_EVENT_CREATE) &&

            <button className="add-btn-1"

              onClick={handleCreateEvent}
            >
              <i class="fa fa-plus" aria-hidden="true"></i>
              {t('add')}
            </button>
          }

          <button className="delete-btn-1"

            disabled={selectEventForDelete?.length === 0}
            onClick={() => {
              setDeleteEventShow(true)
            }}

          >
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            {t('delete')}
          </button>


          <button
            className="custom_primary_btn_dark"
            style={{ width: "48px", height: "48px" }}
            onClick={() => setShowIncome(true)}
          >
            <FilterAltIcon style={{ fontSize: "32px" }} />
          </button>
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
        <div

          className={`col-4 text-center p-0 tap_hover ${toggleState === 1 ? 'active_tap' : 'deactive_tap'}`}
          role="presentation">
          <a
            className={`steps-global btn ${toggleState === 1 ? "btn-bordered-global" : ""
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
        <div
          className={`col-4 text-center p-0 tap_hover ${toggleState === 2 ? 'active_tap' : 'deactive_tap'}`}
          role="presentation">
          <a
            className={`steps-global btn ${toggleState === 2 ? "btn-bordered-global" : ""
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
        <div
          className={`col-4 text-center p-0 tap_hover ${toggleState === 3 ? 'active_tap' : 'deactive_tap'}`}
          role="presentation">
          <a
            className={`steps-global btn ${toggleState === 3 ? "btn-bordered-global" : ""
              }`}
            onClick={() => toggleTab(3)}

          >
            <span>{t('records')}</span>
          </a>
        </div>
      </div>
      <div
        className="tab-content"
        id="pills-tabContent" ref={elementRef}
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
          <Incoming isAllChecked={isAllChecked}
            toggleState={toggleState}
            incomingsData={incomingsData}
            selectEventForDelete={selectEventForDelete}
            handelDeleteAll={handelDeleteAll}
            handleCheckboxChange={handleCheckboxChange} />
        </div>
        <div
          className={`${toggleState === 2 ? "tab-pane fade show active " : "tab-pane fade"}`}
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <Validation isAllChecked={isAllChecked}
            toggleState={toggleState}
            validationData={validationData}
            selectEventForDelete={selectEventForDelete}
            handelDeleteAll={handelDeleteAll}
            handleCheckboxChange={handleCheckboxChange} />
        </div>
        <div
          className={`${toggleState === 3 ? "tab-pane fade show active " : "tab-pane fade"}`}
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <Records isAllChecked={isAllChecked}
            toggleState={toggleState}
            recordsData={recordsData}
            selectEventForDelete={selectEventForDelete}
            handelDeleteAll={handelDeleteAll}
            handleCheckboxChange={handleCheckboxChange} />
        </div>
      </div>
      <Outlet />
      <DeleteModal
        show={deleteEventShow}
        onHide={() => setDeleteEventShow(false)}
        data={selectEventForDelete}
        title_modal={title_modal}
        element_modal={element_modal}
      />
    </div>

  );
};
export default Events;
