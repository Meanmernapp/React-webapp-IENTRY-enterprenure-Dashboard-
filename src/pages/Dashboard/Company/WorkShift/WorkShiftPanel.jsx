import React, { useState } from "react";
import AddWorkShift from "./Modals/AddWorkShift";
import RemoveUser from "./Modals/RemoveUser";
import WorkShiftPanelCard from "./WorkShiftPanelCard";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { permissionObj } from "../../../../Helpers/permission";



const WorkShiftPanel = () => {
  let dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  const { permission } = useSelector(state => state.authenticatioauthennSlice);

  const [workShiftModalShow, setWorkShiftModalShow] = useState(false);
  const [removeUserModal, setRemoveUserModal] = useState();

  return (
    <>
      <div className="head">
        <span className="add-new-employe__heading"  >
          {/* <ArrowBackIcon onClick={() => { navigate("/dashboard/employee/company") }}
            style={{
              transform: lCode === "ar" ? "scaleX(-1)" : ""
            }}
          />  */}
          {t('work_shift_panel')}
        </span>
        {permission?.includes(permissionObj?.WEB_WORK_SHIFT_CREATE) &&
          <button
            className="btn btn-lg btn-hover" style={{ width: "270px" }}
            onClick={() => setWorkShiftModalShow(true)}
          >
            {t('add_new_work_shift')}
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
        }
      </div>
      <WorkShiftPanelCard setRemoveUserModal={setRemoveUserModal} />
      <AddWorkShift
        title="Add Work Shift"
        check="false"
        show={workShiftModalShow}
        onHide={() => setWorkShiftModalShow(false)}
      />
      <RemoveUser
        title="Remove User"
        show={removeUserModal}
        onHide={() => setRemoveUserModal(false)}
      />

    </>
  );
};

export default WorkShiftPanel;
