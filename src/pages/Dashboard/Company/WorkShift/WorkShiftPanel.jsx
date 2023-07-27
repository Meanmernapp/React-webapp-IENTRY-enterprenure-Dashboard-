import React, { useEffect, useState } from "react";
import AddWorkShift from "./Modals/AddWorkShift";
import RemoveUser from "./Modals/RemoveUser";
import WorkShiftPanelCard from "./WorkShiftPanelCard";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { permissionObj } from "../../../../Helpers/permission";
import { AllWorkShiftTime } from "../../../../reduxToolkit/CompanyWorkShift/CompanyWorkShiftSlice";
import DeleteModal from "../../../Modals/DeleteModal";
import { DeleteItemsApi } from "../../../../reduxToolkit/Commons/CommonsApi";
import { toast } from "react-toastify";
import NotFoundDataWarning from "../../../../components/NotFoundDataWarning";
import { GetAllWorkShifts } from "../../../../reduxToolkit/CompanyWorkShift/CompanyWorkShiftApi";
import { Checkbox, FormControlLabel } from "@mui/material";



const WorkShiftPanel = () => {
  let dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const title_modal = `workshift_panel`;
  const element_modal = `workshift`;

  // useState
  const [workShiftModalShow, setWorkShiftModalShow] = useState(false);
  const [removeUserModal, setRemoveUserModal] = useState();
  const [selectWorkshiftForDelete, setSelectWorkshiftForDelete] = useState([])
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [deleteShow, setDeleteShow] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [updateData, setUpdateData] = useState()
  // use selector
  const { permission } = useSelector(state => state.authenticatioauthennSlice);
  const fetchAllWorkTime = useSelector(AllWorkShiftTime);

  // this function control select all id or unSelect all
  const handelDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = fetchAllWorkTime?.content?.map(item => {
        return item?.id
      })
      setSelectWorkshiftForDelete(selectAllIds)
    } else {
      setSelectWorkshiftForDelete([])
    }
  }
  // this function handle only specific id base on selection
  const handleCheckboxChange = (e) => {

    if (e.target.checked) {
      setSelectWorkshiftForDelete([...selectWorkshiftForDelete, e.target.id]);
    } else {
      setSelectWorkshiftForDelete(selectWorkshiftForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };

  useEffect(() => {
    const pagination = {
      "order": true,
      "page": 0,
      "size": 8,
      "sortBy": "id"
    }
    //get all work shifts
    dispatch(GetAllWorkShifts(pagination));
  }, [])

  // delete workshif
  const deleteWorkShift = (deleteItem) => {
    const tableName = "work_shift"
    const body = deleteItem
    dispatch(DeleteItemsApi({ tableName, body }))
  }
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
        <div className="container-top-right-btns">
          {permission?.includes(permissionObj?.WEB_WORK_SHIFT_CREATE) &&
            <>
              <button
                className="add-btn-1"
                onClick={() => {
                  setWorkShiftModalShow(true)
                  setIsUpdate(false)
                }}

              >
                <i className="fa fa-plus" aria-hidden="true"></i>
                {t('add')}
              </button>

              <button className="delete-btn-1"
                disabled={selectWorkshiftForDelete?.length === 0}
                onClick={() => {
                  setDeleteShow(true)
                }}

              >
                <i class="fa fa-trash-o" aria-hidden="true"></i>
                {t('delete')}
              </button>
            </>
          }
        </div>
      </div>
      <div className="d-flex gap-1 pl-2 pb-2">
         <FormControlLabel className="grid-checkall" control={<Checkbox
          label="Label"
          checked={isAllChecked}
          onChange={handelDeleteAll}
          size="small" />} label={t("de_/_select_all")} />
      </div>
      {
        fetchAllWorkTime?.content?.length > 0 ?
          <WorkShiftPanelCard
            setRemoveUserModal={setRemoveUserModal}
            selectForDelete={selectWorkshiftForDelete}
            handleCheckboxChange={handleCheckboxChange}
            setUpdateModal={setWorkShiftModalShow}
            setIsUpdate={setIsUpdate}
            setUpdateData={setUpdateData}
          /> :
          <>
            <NotFoundDataWarning text={t("no_workshift")} />
          </>
      }
      <AddWorkShift
        title={""}
        check="false"
        isUpdate={isUpdate}
        data={updateData}
        show={workShiftModalShow}
        onHide={() => setWorkShiftModalShow(false)}
      />
      <RemoveUser
        title="Remove User"
        show={removeUserModal}
        onHide={() => setRemoveUserModal(false)}
      />

      <DeleteModal
        show={deleteShow}
        onHide={() => setDeleteShow(false)}
        data={selectWorkshiftForDelete}
        onClickFn={() => deleteWorkShift(selectWorkshiftForDelete)}
        title_modal={title_modal}
        element_modal={element_modal}
        isReset={setSelectWorkshiftForDelete}
        isAllReset={setIsAllChecked}
      />

    </>
  );
};

export default WorkShiftPanel;
