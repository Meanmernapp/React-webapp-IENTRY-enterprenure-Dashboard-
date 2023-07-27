import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import deleteIcon from '../../../../assets/images/ic-delete-red.svg';
import { updateAllEmployees, updateSelectedEmployees } from '../../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice';
import { CreateUserZoneList, DeleteZoneUser, ZoneDetailAuthorizedEmployeeNoPagination } from '../../../../reduxToolkit/EmployeeZones/EmployeeZonesApi';
// import { updateAllEmployees, updateSelectedEmployees } from '../../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AutoCompleteSearch from '../../../../components/AutoCompleteSearch';



const AuthorizedEmployeesModal = (props) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const dispatch = useDispatch();
  const allEmployeesData = useSelector(state => state?.EmployeeEventsSlice?.allEmployees);
  // console.log(allEmployeesData)
  const { zoneDetailAuthorizedEmployeeNoPagination } = useSelector(state => state.EmployeeZonesSlice)
  console.log(zoneDetailAuthorizedEmployeeNoPagination)
  const [query, setQuery] = useState("")
  const [addUserquery, setAddUserQuery] = useState("")
  const [employeesWithRole, setEmployeesWithRole] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState([]);

  const handleDelete = (dId) => {
    const data = {
      userIds:  [dId] ,//props?.deleteData,
      zoneId: localStorage.getItem("singlezoneId")
    }
    dispatch(DeleteZoneUser(data))
    // props.onHide();
    setQuery("")

  }

  useEffect(() => {
    if (props.show === false) {
      setAddUserQuery('');
    }
  }, [props.show])

  
  const handleRemoveSelected = (user) => {

    setTotalEmployees(totalEmployees.filter((item) => item?.id !== user.id));
    dispatch(updateAllEmployees([...allEmployeesData, user]));
  };

  //  add user to workshif
  const handleAddUser = () => {
    const all_user = totalEmployees?.map(item => item?.id)
    if (all_user) {
      const data = {
        list: all_user,
        zoneId: localStorage.getItem("singlezoneId")
      }

      dispatch(CreateUserZoneList(data))
      props.onHide();
      setTotalEmployees([]);
      setAddUserQuery('');
    } else {
      toast.warn("Please Select User")
    }

  }
  // select for add user
  const handleselected = (user) => {
    console.log(user)
    const checkUser = zoneDetailAuthorizedEmployeeNoPagination?.find(item => {
      console.log(item)
      return item?.userId === user?.id
    })

    if (checkUser) {
      toast.warn(`${checkUser?.name} is already Added`)

    } else {
      const selectedUser = totalEmployees?.find(item => item?.id === user?.id)

      if (selectedUser) {
        toast.warn(`${selectedUser?.label} is already Selected`)
        setAddUserQuery("")
      } else {
        setAddUserQuery("")
        setTotalEmployees([...totalEmployees, user]);
      }
    }


  }

  // handel the logic for object transformation for all user
  const userDataTransform = (tras) => {

    const newData = tras?.map(item => {
      return {
        label: item?.name,
        id: item?.userId

      }
    })
    return newData;
  }



  return (
    <Modal
      className="manage-role-panel-modal"
      {...props}
      // size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" style={{ fontSize: '20px', letterSpacing: '7px' }}>
          {t("manage_access")}
        </Modal.Title>

        <i className="fa fa-times cross" aria-hidden="true" onClick={() => props.onHide()}></i>
      </Modal.Header>
      <Modal.Body className="manage_role_modal_body">
        <div className="row shiftmanagement_modal">
          <div className="text_field">
            <p className="title">
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
                disabled={zoneDetailAuthorizedEmployeeNoPagination?.length === 0}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
                {zoneDetailAuthorizedEmployeeNoPagination?.filter((user) => {
                  if (query === "") {
                    return user;
                  } else if (
                    user.name.toLowerCase().includes(query.toLowerCase())
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
                        src={deleteIcon}
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleDelete(item.userId)}
                      // onClick={() => {

                      //   setuserRemoveModal(true);
                      //   setDelId(item?.userId);
                      // }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* } */}
            {/* <UserRemove
                show={userRemoveModal}
                onHide={() => setuserRemoveModal(false)}
              /> */}
            <div className="mt-3 title" style={{ color: "#146F62" }}>
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
              <AutoCompleteSearch
                data={userDataTransform(allEmployeesData)}
                handleFn={handleselected}
                value={addUserquery}
                setValue={setAddUserQuery}

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
                      src={deleteIcon}
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleRemoveSelected(item)}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* } */}
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
  )
}

export default AuthorizedEmployeesModal;