/*
Author: Mazhar Iqbal
Module: Work Shift Panel      
*/

//work Shift detail
import React, { useEffect, useState } from "react";
import WorkShiftAccessCard from "./Modals/WorkShiftAccessCard";
import ShiftManagementModal from "./Modals/ShiftManagementModal";
import TablePagination from "@mui/material/TablePagination";
import { GetWorkTimeAccess } from "../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import { getWorkTimeAccess } from "../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice";
import {
  UserWorkSchedule,
  DeleteUserFromWorkShift,
  GetAllByWorkShiftId,
} from "../../../../reduxToolkit/CompanyWorkShift/CompanyWorkShiftApi";
import { getAllUserWithThisWorkAccess } from "../../../../reduxToolkit/CompanyWorkShift/CompanyWorkShiftSlice";
import { Modal } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../../../assets/images/redTrash.svg";
import { Box, Grid } from "@mui/material";
import emptyList from "../../../../assets/images/warning.svg";
import apiInstance from "../../../../Apis/Axios";
import { toast } from "react-toastify";
import { permissionObj } from "../../../../Helpers/permission";
import NotFoundDataWarning from "../../../../components/NotFoundDataWarning";
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import NotFoundAnything from "../../../../components/NotFoundAnything";
import DeleteModal from "../../../Modals/DeleteModal";
import dayId from "../../../../hooks/dayId";
import { DeleteItemsApi } from "../../../../reduxToolkit/Commons/CommonsApi";
import Tooltip from '@mui/material/Tooltip';
import { Checkbox, FormControlLabel } from "@mui/material";
const WorkShiftCardDetails = ({ setRemoveUserModal, id }) => {

  // use hook importer
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  // use state hook  for local state managment
  const [addUserModal, setaddUserModal] = useState(false);

  // use selector hook to get state from redux
  const WorkTimeAccess = useSelector(getWorkTimeAccess);
  const AllUserWithThisWorkAccess = useSelector(getAllUserWithThisWorkAccess);
  const { permission } = useSelector(state => state.authenticatioauthennSlice);

  // Pagination
  const [page, setPage] = useState(0);
  const [selectZoneWorkShift, setSelectZoneWorkShift] = useState([])
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [selectManageUser, setSelectManageUser] = useState([])
  const [isAllCheckedManageUser, setIsAllCheckedManageUser] = useState(false)
  const [deleteManageUser, setDeleteManageUser] = useState(false)
  const [deleteAccessWorkShift, setDeleteAccessWorkShift] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderby, setOrderby] = useState("id");
  let contractPagination = {
    order: true,
    page: page,
    size: rowsPerPage,
    sortBy: orderby,
  };
  // End Pagination

  // users Pagination
  const [userPage, setUserPage] = useState(0);

  const handleChangeUserPage = (event, newPage) => {
    setUserPage(newPage);
  };
  const handleChangeUserRowsPerPage = (event) => {
    setUserRowsPerPage(parseInt(event.target.value));
    setUserPage(0);
  };
  const [rowsUserPerPage, setUserRowsPerPage] = useState(10);
  const [userOrderby, setUserOrderby] = useState("id");
  let UsercontractPagination = {
    order: true,
    page: userPage,
    size: rowsUserPerPage,
    sortBy: userOrderby,
  };
  // End Pagination
  const [selIndex, setSelIndex] = useState(null);


  // this function control select all id or unSelect all
  const handelDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = WorkTimeAccess?.content?.map(item => {
        return item?.id
      })
      setSelectZoneWorkShift(selectAllIds)


    } else {
      setSelectZoneWorkShift([])
    }

  }
  // this function handle only specific id base on selection
  const handleCheckboxChange = (e) => {

    if (e.target.checked) {
      setSelectZoneWorkShift([...selectZoneWorkShift, e.target.id]);
    } else {
      setSelectZoneWorkShift(selectZoneWorkShift.filter((removeid) => removeid !== e.target.id));
    }
  };

  // this function control select all id or unSelect all for manage user
  const handelDeleteAllManageUser = (e) => {
    setIsAllCheckedManageUser(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = AllUserWithThisWorkAccess?.content?.map(item => {
        return item?.userId
      })
      setSelectManageUser(selectAllIds)


    } else {
      setSelectManageUser([])
    }

  }
  // this function handle only specific id base on selection for manage user
  const handleCheckboxChangeManageUser = (e) => {

    if (e.target.checked) {
      setSelectManageUser([...selectManageUser, e.target.id]);
    } else {
      setSelectManageUser(selectManageUser.filter((removeid) => removeid !== e.target.id));
    }
  };


  useEffect(() => {
    //get work shift access time with pagination
    dispatch(UserWorkSchedule({ id, UsercontractPagination }));
  }, [rowsUserPerPage]);

  const [userRemoveModal, setuserRemoveModal] = useState(false);
  const [timeRemoveModal, setTimeRemoveModal] = useState(false);

  const [delId, setDelId] = useState(null);
  const [deletedUser, setDelatedUser] = useState();


  console.log("delid", AllUserWithThisWorkAccess)
  //remove user from work shift  Modal
  function UserRemove(props) {
    return (
      <div className="primary-modal">
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <button onClick={props.onHide} className="modal-close-btn">
            X
          </button>
          <span className="main-modal-heading">REMOVE USER</span>
          <div className="unlink-modal-body">
            <span
              className="modal-desc-text"
              style={{ color: "#000", fontSize: "14px", fontWeight: 400 }}
            >
              Are you sure that would you like to remove to the user{" "}
              <b style={{ letterSpacing: "1px" }}>{deletedUser}</b>?
            </span>

            <div className="btn-div">
              <button
                className="button-sec btn-cancel"
                style={{ color: "red" }}
                onClick={props.onHide}
              >
                CANCEL
              </button>
              <button
                className="button-sec btn-confirm"
                onClick={() => {
                  // removeShift();
                  setuserRemoveModal(false);
                }}
              >
                CONFIRM
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  //remove access time from work shift Modal 
  function RemoveTimeShift(props) {
    return (
      <div className="primary-modal">
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <button onClick={props.onHide} className="modal-close-btn">
            X
          </button>
          <span className="main-modal-heading">REMOVE ACCESS</span>
          <div className="unlink-modal-body">
            <span
              className="modal-desc-text"
              style={{ color: "#000", fontSize: "14px", fontWeight: 400 }}
            >
              Are you sure that would you like to remove to the access{" "}
              {deletedUser?.from} to {deletedUser?.to} in the work shift{" "}
              <b style={{ letterSpacing: "1px", color: "rgba(0,0,0,0.7)" }}>
                {deletedUser?.day?.name}
              </b>
              ?
            </span>

            <div className="btn-div">
              <button
                className="button-sec btn-cancel"
                style={{ color: "red" }}
                onClick={props.onHide}
              >
                CANCEL
              </button>
              <button
                className="button-sec btn-confirm"
                onClick={() => {
                  removeCurrentShift();
                  setTimeRemoveModal(false);
                }}
              >
                CONFIRM
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  // const removeShift = () => {
  //   //delete user from work shift
  //   dispatch(DeleteUserFromWorkShift({ id, delId })).then(() => {
  //     dispatch(GetAllByWorkShiftId(id))
  //     dispatch(UserWorkSchedule({ id, UsercontractPagination }));
  //   })
  // };
  //delete access time from work shift
  const removeCurrentShift = async () => {
    let result = await apiInstance
      .delete(`work-shift-service/schedule/delete-by-id/${selIndex}`)
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          toast.success("Access time removed from Work Shift");
          dispatch(GetWorkTimeAccess({ id, contractPagination }));
        }
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  };

  const deleteSelectedWorkShift = (deleteItem) => {
    const tableName = "work_shift_schedule"
    const body = deleteItem
    dispatch(DeleteItemsApi({ tableName, body })).
      then(() => {
        dispatch(GetWorkTimeAccess({ id, contractPagination }));
        setSelectZoneWorkShift([])
        setIsAllChecked(false)
        toast.success("Deleted Successfully")
      })


  }
  const deleteSelectedManageUser = (deleteItem) => {
    const data = {
      userIds: deleteItem,
      workShiftIds: [id]
    }
    dispatch(DeleteUserFromWorkShift(data)).then(() => {
      dispatch(GetAllByWorkShiftId(id))
      dispatch(UserWorkSchedule({ id, UsercontractPagination }));
    })
  }
  useEffect(() => {
    //  get work shift access time with pagination
    dispatch(GetWorkTimeAccess({ id, contractPagination }));
  }, [page, rowsPerPage]);

  return (
    <>
      <div>
        <WorkShiftAccessCard id={id} />
        <div>
          {
            WorkTimeAccess.totalElements !== 0 ? (

              <>
                <div className="position-relative">
                  {
                    selectZoneWorkShift?.length > 0 &&
                    <div className="remove_selected_access" onClick={() => setDeleteAccessWorkShift(true)}>
                      <p>{t("remove_selected")?.toUpperCase()}</p>
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </div>
                  }
                  <div className="access-sec mt-3">
                    <span className="contractor-access-heading">{t("access")}</span>
                    <Grid container sx={{ mt: 1 }}>
                      <Grid
                        item
                        xs={3}
                        className="contractor-access-table-heading"
                        sx={{ textAlign: "left", display: "flex", alignItems: "center", gap: "0.4rem" }}
                      >

                        <Tooltip title={t("de_/_select_all").toUpperCase()} placement="top">
                          <Checkbox
                            className="grid-checkall checkbox"
                            checked={isAllChecked}
                            onChange={handelDeleteAll}
                            size="small"
                          />
                        </Tooltip>
                        {t("zones")?.toUpperCase()}
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        className="contractor-access-table-heading"
                      >
                        {t("day")?.toUpperCase()}
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        className="contractor-access-table-heading"
                      >
                        {t("from")?.toUpperCase()}
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        className="contractor-access-table-heading"
                      >
                        {t("to")?.toUpperCase()}
                      </Grid>

                    </Grid>
                  </div>
                  {WorkTimeAccess &&
                    WorkTimeAccess?.content?.map((item) => {
                      return (
                        <Grid container sx={{ mt: 1 }}>
                          <Grid
                            item
                            xs={3}
                            sx={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                            className="contractor-access-table-first"
                          >
                            <Checkbox
                              className="grid-checkall checkbox"
                              checked={selectZoneWorkShift?.includes(item?.id)}
                              id={item?.id}
                              onChange={handleCheckboxChange}
                              size="small"
                            />
                            {item?.zoneName || "-"}
                          </Grid>
                          <Grid
                            item
                            xs={3}
                            className="contractor-access-table-data"
                          >
                            {dayId(item?.dayId)}
                          </Grid>
                          <Grid
                            item
                            xs={3}
                            className="contractor-access-table-data"
                          >
                            {item?.from || "-"}
                          </Grid>
                          <Grid
                            item
                            xs={3}
                            className="contractor-access-table-data"
                          >
                            {item?.to || "-"}
                          </Grid>
                        </Grid>
                      );
                    })}
                </div>
                <div className="d-flex justify-content-center">
                  <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 15]}
                    labelRowsPerPage="Accces per page"
                    count={WorkTimeAccess?.totalElements}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              </>
            ) : (
              <div className="no_content">
                <span className="contractor-access-heading">{t("access")}</span>
                <NotFoundAnything text={t("no_access")?.toUpperCase()} mt={"0rem"} />

              </div>
            )}
          {
            permission?.includes(permissionObj?.WEB_WORK_SHIFT_MANAGE_USERS) &&
            <div className="manage_user_work_shift">
              {
                selectManageUser?.length > 0 &&
                <div className="remove_selected_user" onClick={() => setDeleteManageUser(true)}>
                  <p>{t("remove_selected")?.toUpperCase()}</p>
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </div>
              }

              <div className=" d-flex align-items-center">
                <p className="title">{t("assgined_employees")?.toUpperCase()}</p>
                <button
                  className="btn btn-lg manage-more-ext-style"

                  onClick={() => setaddUserModal(true)}
                >
                  <u>{t("manage_users")?.toUpperCase()}</u>
                </button>
              </div>
              <div className="row pl-2">
                <div className="row  ">
                  {AllUserWithThisWorkAccess.totalElements !== 0 &&
                    <div className="d-flex align-items-center gap-2 ">
                      <p className="sub_title">
                        {t("name")?.toUpperCase()}
                      </p>

                      <FormControlLabel sx={{ paddingTop: "0.4rem" }} className="grid-checkall" control={<Checkbox
                        label="Label"

                        checked={isAllCheckedManageUser}
                        onChange={handelDeleteAllManageUser}
                        size="small" />} label={t("de_/_select_all")} />

                    </div>
                  }
                </div>
                <div className="row userstable">
                  {
                    AllUserWithThisWorkAccess.totalElements !== 0 ? (
                      <>
                        {AllUserWithThisWorkAccess &&
                          AllUserWithThisWorkAccess?.content?.map((item) => {
                            console.log(item)
                            return (
                              <div className="col-md-3 mt-2">
                                <p className="item_text d-flex align-items-center gap-2">
                                  {/* <img
                                  className="delete-icon-style"
                                  src={DeleteIcon}
                                  onClick={() => {
                                    setuserRemoveModal(true);
                                    setDelId(item?.userId);
                                    setDelatedUser(item?.name);
                                  }}
                                /> */}

                                  <Checkbox
                                    className="grid-checkall checkbox"
                                    checked={selectManageUser?.includes(item?.userId)}
                                    id={item?.userId}
                                    onChange={handleCheckboxChangeManageUser}
                                    size="small"
                                  />
                                  {
                                    item && item.name
                                      ? `${item.name} ${item.firstLastName} ${item.secondLastName !== null ? item.secondLastName : ""}`
                                      : "-"
                                  }
                                </p>
                              </div>
                            );
                          })}
                        <UserRemove
                          show={userRemoveModal}
                          onHide={() => setuserRemoveModal(false)}
                        />
                        <div className="d-flex justify-content-center mt-2">
                          <TablePagination
                            component="div"
                            rowsPerPageOptions={[10, 15, 20]}
                            labelRowsPerPage="User per page"
                            count={AllUserWithThisWorkAccess?.totalElements}
                            page={userPage}
                            onPageChange={handleChangeUserPage}
                            rowsPerPage={rowsUserPerPage}
                            onRowsPerPageChange={handleChangeUserRowsPerPage}
                          />
                        </div>
                      </>
                    ) : (
                      <Box sx={{ paddingLeft: "2rem" }}>
                        <NotFoundAnything text={t("no_user")?.toUpperCase()} mt={"0rem"} />
                      </Box>
                    )
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <ShiftManagementModal
        setRemoveUserModal={setRemoveUserModal}
        setaddUserModal={setaddUserModal}
        title="Shift Management "
        check="false"
        id={id}
        show={addUserModal}
        onHide={() => setaddUserModal(false)}
      />
      <DeleteModal
        show={deleteManageUser}
        onHide={() => setDeleteManageUser(false)}
        onClickFn={() => deleteSelectedManageUser(selectManageUser)}
        data={selectManageUser}
        description={"are_you_sure_you_want_to_remove"}
        title_modal={"workshift"}
        element_modal={"relation"}
        isReset={setSelectManageUser}
        isAllReset={setIsAllCheckedManageUser}
      />
      <DeleteModal
        show={deleteAccessWorkShift}
        onHide={() => setDeleteAccessWorkShift(false)}
        onClickFn={() => deleteSelectedWorkShift(selectZoneWorkShift)}
        data={selectZoneWorkShift}
        title_modal={"workshift"}
        description={"are_you_sure_you_want_to_remove"}
        element_modal={"access"}
        isReset={setSelectZoneWorkShift}
        isAllReset={setIsAllChecked}
      />
    </>
  );
};

export default WorkShiftCardDetails;
