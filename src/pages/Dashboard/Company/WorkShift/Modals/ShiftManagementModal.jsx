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
import AutoCompleteSearch from "../../../../../components/AutoCompleteSearch";

const ShiftManagementModal = (props) => {
  const { title, setRemoveUserModal, setaddUserModal, id } = props;
  const dispatch = useDispatch();
  const AllUser = useSelector(getAllUser);
  const AllByWorkShiftId = useSelector(getAllByWorkShiftId);
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  // const getAllUserWithThisWorkAccess

  const [addUserquery, setAddUserQuery] = useState("");
  const [deleteUserquery, setDeleteUserquery] = useState("")
  const [totalEmployees, setTotalEmployees] = useState([]);
  const [searchUser, setSearchUser]= useState("")



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
  const [rowsUserPerPage, setUserRowsPerPage] = useState(10);
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

  const removeShift = () => {
    const data={
      userIds:[delId],
      workShiftIds:[id]
    }
    
    dispatch(DeleteUserFromWorkShift(data)).then(() => { dispatch(GetAllByWorkShiftId(id)) }).then(() => {
      let UsercontractPagination = {
        order: true,
        page: 0,
        size: 10,
        sortBy: "id",
      };
      dispatch(UserWorkSchedule({ id, UsercontractPagination }))
      setDeleteUserquery("")
      props.onHide();
    });
  };

  // remove user from selection
  const handleRemoveSelected = (user) => {

    setTotalEmployees(totalEmployees.filter((item) => item?.id !== user.id));
    dispatch(updateAllEmployees([...AllUser, user]));
  };

  //  add user to workshif
  const handleAddUser = () => {
    const all_user = totalEmployees?.map(item => item?.id)

    if (all_user?.length > 0) {
      dispatch(AddUserWithWorkShiftId({ id, all_user })).then(() => {

        dispatch(UserWorkSchedule({ id, UsercontractPagination }))
      }).then(() => {
        dispatch(GetAllByWorkShiftId(id))
      })
      setTotalEmployees([]);
      props.onHide();
      setAddUserQuery('');
    } else {
      toast.warn("Please Select User")
    }

  }
  // select for add user
  const handleselected = (user) => {
   

  
  const checkUser = AllByWorkShiftId?.find(item => {
    return item?.userId === user?.id
  })
  if (checkUser) {
    toast.warn(`${checkUser?.name} is already Added`)
  } else {
    const selectedUser = totalEmployees?.find(item => item?.id === user?.id)

    if (selectedUser) {
      toast.warn(`${selectedUser?.label} is already Selected`)
    } else {
      setTotalEmployees([...totalEmployees, user]);
      setSearchUser("")
    }
  }


  }

  // handel the logic for object transformation for all user
  const userDataTransform = (tras) =>{

   const newData =  tras?.map(item => {return {
      label:item?.name,
      id:item?.userId

    }})
    return newData;
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
        <span className="main-modal-heading" style={{ paddingBottom: "0px", fontSize: "20px", letterSpacing: '7px' }}> {title}</span>
        <Modal.Body>
          <div className="row shiftmanagement_modal">
            <div className="text_field">
            <div className="mt-3 title" style={{ color: "#65ABA0" }}>
                {t("add_user")}
              </div>
              <Box
                className="mt-2 mb-2"
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  fontSize: "20px",
                 
                  background: "#FCFCFC 0% 0% no-repeat padding-box"
                }}
              >
                
                {/* <TextField size="small"
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
                /> */}
                 <AutoCompleteSearch data={userDataTransform(AllUser) } 
                 handleFn={handleselected}
                 value={searchUser}
                 setValue={setSearchUser}
      
                //  onClick={handleselected(user)} 
                 />
              </Box>
              {/* <div
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
              </div> */}
              {/* {
                totalEmployees?.length > 0 && */}
                <div className="main_content">

                  <div className="mt-2 mb-2  pt-2 user_text">
                    {totalEmployees.map((item) => (
                      <div className="d-flex justify-content-between pr-2">
                      <div className="badge_container">
                        <div className="c_badge"></div>
                      <p>{item?.label}</p>
                      </div>

                      
                      <img
                        className="delete-icon-style"
                        src={DeleteIcon}
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleRemoveSelected(item)}
                      />
                    </div>
                    ))}
                  </div>
                </div>
              {/* } */}
              <p className="title pt-2">
                {" "}
                {t("remove_user")}
              </p>
              <Box
                className="mt-2 mb-2"
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  fontSize: "20px",
                  height: "40px",
                  background: "#FCFCFC 0% 0% no-repeat padding-box"

                }}
              >
                <TextField size="small"
                  fullWidth
                  disabled={AllByWorkShiftId?.length === 0}
                  value={deleteUserquery}
                  onChange={(e) => setDeleteUserquery(e.target.value)}
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
              {/* {
                AllByWorkShiftId?.length > 0 && */}
                <div
                  className="main_content"

                >
                  <div
                    className="body"
                  >
                    {AllByWorkShiftId?.filter((user) => {
                      if (deleteUserquery === "") {
                        return user;
                      } else if (
                        user.name.toLowerCase().includes(deleteUserquery.toLowerCase())
                      ) {
                        return user;
                      }
                    }).map((item) => {
                      // {AllByWorkShiftId?.map((item) => {

                      return (
                        <div className="d-flex justify-content-between pr-2">
                          <div className="badge_container">
                            <div className="c_badge"></div>
                          <p>{item?.name}</p>
                          </div>

                          
                          <img
                            className="delete-icon-style"
                            src={DeleteIcon}
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => {
                              setuserRemoveModal(true);
                              setDelId(item?.userId);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
               {/* } */}
              <UserRemove
                show={userRemoveModal}
                onHide={() => setuserRemoveModal(false)}
              />
             
            </div>
            <div className="btn-div">
              <button
                className="btn_cancel_background_gray_hover"
                style={{ width: "100%" }}
                onClick={props.onHide}
              >
                {t("cancel")}
              </button>
              <button className="custom_primary_btn_dark"
                style={{ width: "100%" }}
                onClick={handleAddUser}>{t("apply_changes")?.toUpperCase()}</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShiftManagementModal;
