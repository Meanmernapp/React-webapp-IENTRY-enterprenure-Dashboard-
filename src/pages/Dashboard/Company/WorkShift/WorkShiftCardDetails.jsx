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
import { Grid } from "@mui/material";
import emptyList from "../../../../assets/images/warning.svg";
import apiInstance from "../../../../Apis/Axios";
import { toast } from "react-toastify";
import { permissionObj } from "../../../../Helpers/permission";
import NotFoundDataWarning from "../../../../components/NotFoundDataWarning";

const WorkShiftCardDetails = ({ setRemoveUserModal, id }) => {

  // use hook importer
  const dispatch = useDispatch();

  // use state hook  for local state managment
  const [addUserModal, setaddUserModal] = useState(false);

  // use selector hook to get state from redux
  const WorkTimeAccess = useSelector(getWorkTimeAccess);
  const AllUserWithThisWorkAccess = useSelector(getAllUserWithThisWorkAccess);
  const { permission } = useSelector(state => state.authenticatioauthennSlice);

  // Pagination
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
  const [rowsUserPerPage, setUserRowsPerPage] = useState(5);
  const [userOrderby, setUserOrderby] = useState("id");
  let UsercontractPagination = {
    order: true,
    page: userPage,
    size: rowsUserPerPage,
    sortBy: userOrderby,
  };
  // End Pagination
  const [selIndex, setSelIndex] = useState(null);

  useEffect(() => {
    //get work shift access time with pagination
    dispatch(UserWorkSchedule({ id, UsercontractPagination }));
  }, []);

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
                  removeShift();
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

  const removeShift = () => {
    //delete user from work shift
    dispatch(DeleteUserFromWorkShift({ id, delId })).then(() => {
      dispatch(GetAllByWorkShiftId(id))
      dispatch(UserWorkSchedule({ id, UsercontractPagination }));
    })
  };

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
  useEffect(() => {
    //  get work shift access time with pagination
    dispatch(GetWorkTimeAccess({ id, contractPagination }));
  }, [page, rowsPerPage]);

  return (
    <>
      <div>
        <WorkShiftAccessCard id={id} />
        <div>
          {WorkTimeAccess.totalElements !== 0 ? (
            <>
              <div className="">
                <div className="access-sec mt-3">
                  <span className="contractor-access-heading">ACCESS</span>
                  <Grid container sx={{ mt: 1 }}>
                    <Grid
                      item
                      xs={4}
                      className="contractor-access-table-heading"
                      sx={{ textAlign: "left" }}
                    >
                      NAME
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      className="contractor-access-table-heading"
                    >
                      DAY
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      className="contractor-access-table-heading"
                    >
                      FROM
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      className="contractor-access-table-heading"
                    >
                      TO
                    </Grid>
                    {/* {permission?.includes(permissionObj?.WEB_WORK_SHIFT_DELETE) && */}
                    <Grid
                      item
                      xs={1}
                      className="contractor-access-table-heading"
                    >
                      REMOVE
                    </Grid>
                    {/* } */}
                  </Grid>
                </div>
                {WorkTimeAccess &&
                  WorkTimeAccess?.content?.map((item) => {
                    return (
                      <Grid container sx={{ mt: 1 }}>
                        <Grid
                          item
                          xs={4}
                          className="contractor-access-table-first"
                        >
                          {item?.zone?.name}
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          className="contractor-access-table-data"
                        >
                          {item?.day?.name}
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          className="contractor-access-table-data"
                        >
                          {item?.from}
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          className="contractor-access-table-data"
                        >
                          {item?.to}
                        </Grid>
                        {/* {permission?.includes(permissionObj?.WEB_WORK_SHIFT_DELETE) && */}
                        <Grid
                          item
                          xs={1}
                          className="contractor-access-table-data"
                        >
                          <img
                            className="delete-icon-style"
                            src={DeleteIcon}
                            onClick={() => {
                              setTimeRemoveModal(true);
                              setSelIndex(item?.id);
                              setDelatedUser(item);
                            }}
                          />
                          <RemoveTimeShift
                            show={timeRemoveModal}
                            onHide={() => setTimeRemoveModal(false)}
                          />
                        </Grid>
                        {/* } */}
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

            <NotFoundDataWarning text={"NO Access"} />
          )}
          {
            permission?.includes(permissionObj?.WEB_WORK_SHIFT_MANAGE_USERS) &&
            <>

              <div className="work_text d-flex align-items-center">
                <p>Registered Users</p>
                <button
                  className="btn btn-lg manage-more-ext-style"
                  style={{ fontSize: "14px" }}
                  onClick={() => setaddUserModal(true)}
                >
                  <u>manage users</u>
                </button>
              </div>
              <div className="row">
                <div className="row work_text">
                  {AllUserWithThisWorkAccess && <p>NAME</p>}
                </div>
                <div className="row userstable">
                  {AllUserWithThisWorkAccess.totalElements !== 0 ? (
                    <>
                      {AllUserWithThisWorkAccess &&
                        AllUserWithThisWorkAccess?.content?.map((item) => {
                          return (
                            <div className="col-md-3">
                              <p>
                                <img
                                  className="delete-icon-style"
                                  src={DeleteIcon}
                                  onClick={() => {
                                    setuserRemoveModal(true);
                                    setDelId(item?.userId);
                                    setDelatedUser(item?.name);
                                  }}
                                />
                                {item?.name}
                              </p>
                            </div>
                          );
                        })}
                      <UserRemove
                        show={userRemoveModal}
                        onHide={() => setuserRemoveModal(false)}
                      />
                      <div className="d-flex justify-content-center">
                        <TablePagination
                          component="div"
                          rowsPerPageOptions={[5, 10, 15]}
                          labelRowsPerPage="User per page"
                          count={AllUserWithThisWorkAccess?.totalElements}
                          page={userPage}
                          onPageChange={handleChangeUserPage}
                          rowsPerPage={rowsPerPage}
                          onRowsPerPageChange={handleChangeUserRowsPerPage}
                        />
                      </div>
                    </>
                  ) : (

                    <NotFoundDataWarning text={"NO User"} />
                  )}
                </div>
              </div>
            </>
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
    </>
  );
};

export default WorkShiftCardDetails;
