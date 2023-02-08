import React, { useEffect, useState } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
  GetAllUsers,
  GetAllByWorkShiftId,
  AddUserWithWorkShiftId,
  DeleteUserFromWorkShift,
  UserWorkSchedule
} from "../../../../../reduxToolkit/CompanyWorkShift/CompanyWorkShiftApi";
import {
  getAllUser,
  getAllByWorkShiftId,
} from "../../../../../reduxToolkit/CompanyWorkShift/CompanyWorkShiftSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateAllEmployees } from "../../../../../reduxToolkit/CompanyWorkShift/CompanyWorkShiftSlice";
import DeleteIcon from "../../../../../assets/images/redTrash.svg";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'

const ShiftManagementModal = (props) => {
  const { title, setRemoveUserModal, setaddUserModal, id } = props;
  const dispatch = useDispatch();
  const AllUser = useSelector(getAllUser);
  const AllByWorkShiftId = useSelector(getAllByWorkShiftId);


  // const getAllUserWithThisWorkAccess

  const [addUserquery, setAddUserQuery] = useState("");
  const [totalEmployees, setTotalEmployees] = useState([]);

  useEffect(() => {
    dispatch(GetAllUsers());
    dispatch(GetAllByWorkShiftId(id))
  }, []);
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

  const [userRemoveModal, setuserRemoveModal] = useState(false);

  const [delId, setDelId] = useState(null);

  function UserRemove(props) {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    return (
      <div className="primary-modal">
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <button onClick={props.onHide} className="modal-close-btn">
            X
          </button>
          <span className="main-modal-heading">REMOVE ACCESS</span>
          <div className="unlink-modal-body">
            <span
              className="modal-desc-text"
              style={{ color: "#000", fontSize: "12px", fontWeight: 400 }}
            >
              Are you sure that would you like to remove to the user?
            </span>

            <div className="btn-div">
              <button
                className="button-sec btn-cancel"
                style={{ color: "red" }}
                onClick={props.onHide}
              >
                {t('cancel')}
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


  /*author mazhar iqbal
    delete user from work schdule
  */
  const removeShift = () => {
    dispatch(DeleteUserFromWorkShift({ id, delId })).then(() => { dispatch(GetAllByWorkShiftId(id)) }).then(() => {
      let UsercontractPagination = {
        order: true,
        page: 1,
        size: 5,
        sortBy: "id",
      };
      dispatch(UserWorkSchedule({ id, UsercontractPagination }))
    });
  };

  const handleselected = (user) => {
    if (AllByWorkShiftId.some(person => person.id === user.id)) {
      toast.info("All ready Member Of Work Shift")
    }
    else {
      if (totalEmployees.some(person => person.id === user.id)) {
        toast.info("All ready User Added");
      } else {
        dispatch(updateAllEmployees(AllUser.filter((data) => data.id !== user.id)));
        setTotalEmployees([...totalEmployees, user]);
      }
    }
  };

  const handleRemoveSelected = (user) => {
    setTotalEmployees(totalEmployees.filter((item) => item.id !== user.id));
    dispatch(updateAllEmployees([...AllUser, user]));
  };

  const handleAddUser = () => {
    let all_user = []
    for (let i = 0; i < totalEmployees.length; i++) {
      all_user.push(totalEmployees[i].id)
    }
    /*author mazhar iqbal
      add user in the work shift schdule
    */
    dispatch(AddUserWithWorkShiftId({ id, all_user })).then(() => {
      /*author mazhar iqbal
        get work schdule with updated data
      */
      dispatch(UserWorkSchedule({ id, UsercontractPagination }))
    }).then(() => {
      dispatch(GetAllByWorkShiftId(id))
    })
    setTotalEmployees([]);
    all_user = [];
    props.onHide();
    setAddUserQuery('');
  }
  return (
    <>
      <Modal
        {...props}
        //   size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ background: "rgba(0,0,0,0.4)" }}
      >
        <button onClick={props.onHide} className="modal-close-btn">
          X
        </button>
        <span className="main-modal-heading" style={{ paddingBottom: "0px", fontSize: "26px" }}> {title}</span>
        <Modal.Body>
          <div className="row shiftmanagement_modal">
            <div className="text_field">
              <p className="title" style={{ color: "#65ABA0" }}>
                {" "}
                Remove User
              </p>
              <Box
                className="mt-2"
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  fontSize: "20px",
                  height: "40px",
                }}
              >
                <TextField size="small"
                  fullWidth

                  label="Search"
                  id="Search"
                  className=""
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <div
                className="main_content"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div
                  className="body"
                  style={{
                    height: "200px", overflowY: "scroll", width: "100%", border: "1px solid #707070",
                    borderRadius: "4px"
                  }}
                >
                  {AllByWorkShiftId?.map((item) => {
                    return (
                      <div className="d-flex justify-content-between px-2 py-1">
                        <p>{item?.name}</p>
                        <img
                          className="delete-icon-style"
                          src={DeleteIcon}
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => {
                            setuserRemoveModal(true);
                            setDelId(item?.id);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <UserRemove
                show={userRemoveModal}
                onHide={() => setuserRemoveModal(false)}
              />
              <div className="mt-3 title" style={{ color: "#65ABA0" }}>
                Add user
              </div>
              <Box
                className="mt-2"
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  fontSize: "20px",
                  height: "40px",
                }}
              >
                <TextField size="small"
                  fullWidth

                  label="Search"
                  id="Search"
                  value={addUserquery}
                  onChange={(e) => setAddUserQuery(e.target.value)}
                  className=""
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <div
                className="col-12 searchItem"
                style={{ display: addUserquery !== "" ? "block" : "none" }}
              >
                {AllUser?.filter((user) => {
                  if (addUserquery === "") {
                    return user;
                  } else if (
                    user.name.toLowerCase().includes(addUserquery.toLowerCase())
                  ) {
                    return user;
                  }
                }).map((user) => (
                  <div
                    className="add_some_one_item"
                    key={user.id}
                    onClick={() => handleselected(user)}
                  >
                    <p>{user.name}</p>
                  </div>
                ))}
              </div>
              <div className="main_content">
                <div
                  className="mt-2 mb-2 ml-2 pt-2 capsules"
                  style={{
                    // height: "200px",
                    // overflowY: "scroll",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "left",
                    border: "1px solid #707070",
                    borderRadius: "4px"
                  }}
                >
                  {totalEmployees.map((item) => (
                    <p className="mb-2 work-shift-add-item" >
                      {item?.name}{" "}
                      <CloseIcon
                        onClick={() => handleRemoveSelected(item)}
                        className="closeIcon"
                        style={{
                          borderRadius: "50%",
                          background: "black",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      />
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="btn-div">
              <button
                className="button-sec btn-cancel"
                style={{ color: "red" }}
                onClick={props.onHide}
              >
                CANCEL
              </button>
              <button className="button-sec btn-confirm" onClick={handleAddUser}>APPLY CHANGES</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShiftManagementModal;
