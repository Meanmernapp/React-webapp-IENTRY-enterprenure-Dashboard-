// import { t } from 'i18next';
// import React, { useEffect, useState } from 'react'
// import { Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from 'react-redux';
// import deleteIcon from '../../../../../assets/images/ic-delete-red.svg';
// import { addUsersToRole, getAllEmployees, getAllroleEmployeesPageable, getEmployesWithRole, removeRoleToUserById } from '../../../../../reduxToolkit/EmployeeRoles/EmployeeRolesApi';
// import { EmployeesInCreate } from '../../../../../reduxToolkit/EmployeeRoles/EmployeeRolesSlice';


// const ManageRoleModal = (props) => {
//     const dispatch = useDispatch();
//     const { employeesWithRoleList } = useSelector(state => state?.EmployeeRolesSlice);

//     const [query, setQuery] = useState("")
//     const [addUserquery, setAddUserQuery] = useState("")
//     const [totalEmployees, setTotalEmployees] = useState([]);
//     const [selectedEmployees, setSelectedEmployees] = useState([]);

//     useEffect(() => {
//         dispatch(getAllEmployees()).then(({ payload: { data: { data } } }) => {
//             let filteredIds = employeesWithRoleList.map(item => { return item.id; });
//             const newArr = data.filter(item => !filteredIds.includes(item.id));
//             setTotalEmployees(newArr)
//         })
//     }, [])

//     const handleDelete = (userSelectedId) => {
//         dispatch(removeRoleToUserById(userSelectedId)).then(() => {
//             dispatch(getEmployesWithRole(props?.roleid));
//         })
//     }


//     const handleUserList = (user) => {
//         setTotalEmployees([...totalEmployees, user]);
//         const filterArray = selectedEmployees.filter(item => item.id !== user.id);
//         setSelectedEmployees(filterArray);
//     }

//     const handleselected = (user) => {
//         setSelectedEmployees([...selectedEmployees, user]);
//         const filterArray = totalEmployees.filter(item => item.id !== user.id)
//         setTotalEmployees(filterArray);
//     }

//     const handleAddUser = () => {
//         dispatch(EmployeesInCreate(selectedEmployees));
//         setAddUserQuery("");
//         let filteredIds = totalEmployees.map(item => { return item.id; });

//         const body = {
//             roleId: props.roleid,
//             userIds: filteredIds
//         }

//         if (props.roleid) {
//             dispatch(addUsersToRole(body))
//             const employeeBody = {
//                 id: props.roleid,
//                 pagination: {
//                     order: true,
//                     page: 0,
//                     size: 10,
//                     sortBy: "id"
//                 }
//             }
//             dispatch(getAllroleEmployeesPageable(employeeBody))
//         }
//         props.onHide();
//     }

//     return (
//         <Modal
//             className="manage-role-panel-modal"
//             {...props}
//             size="md"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     {t("employees")}
//                 </Modal.Title>
//                 <i className="fa fa-times cross" aria-hidden="true" onClick={() => props.onHide()}></i>
//             </Modal.Header>
//             <Modal.Body className="manage_role_modal_body">'

//                 <p>{t("remove_user")}</p>
//                 {/* search bar role panel */}
//                 <div className="row">
//                     <div className="col-12">
//                         <input
//                             type="text"
//                             class="form-control"
//                             value={query}
//                             onChange={(e) => setQuery(e.target.value)}

//                         />
//                         <span class="search_btn">
//                             <button class="btn btn-default" type="button">
//                                 <i class="fa fa-search mx-2" aria-hidden="true"></i>
//                             </button>
//                         </span>
//                     </div>
//                 </div>
//                 {/* serach option */}
//                 <div className='delete_some_one'>
//                     {
//                         employeesWithRoleList && employeesWithRoleList?.filter(user => {
//                             if (query === '') {
//                                 return user;
//                             } else if (user.name.toLowerCase().includes(query.toLowerCase())) {
//                                 return user;
//                             }
//                         }).map(user => (
//                             <div className='delte_some_one_item' key={user.id}>
//                                 <p>{user.name}</p>
//                                 <img
//                                     src={deleteIcon}
//                                     alt="deleteimg"
//                                     onClick={() => handleDelete(user.id)}
//                                     style={{
//                                         cursor: "pointer"
//                                     }}
//                                 />
//                             </div>
//                         ))
//                     }
//                 </div>

//                 <p className='mt-3'>{t("add_user")}</p>
//                 {/* search bar role panel */}
//                 <div className="row">
//                     <div className="col-12">
//                         <input
//                             type="text"
//                             class="form-control"
//                             value={addUserquery}
//                             onChange={(e) => setAddUserQuery(e.target.value)}

//                         />
//                         <span class="search_btn">
//                             <button class="btn btn-default" type="button">
//                                 <i class="fa fa-search" aria-hidden="true"></i>
//                             </button>
//                         </span>
//                     </div>
//                     <div className="col-12 searchItem" style={{ display: addUserquery !== '' ? "block" : "none" }}>
//                         {
//                             totalEmployees?.filter(user => {
//                                 if (addUserquery === '') {
//                                     return user;
//                                 } else if (user.name.toLowerCase().includes(addUserquery.toLowerCase())) {
//                                     return user;
//                                 }
//                             }).map(user => (
//                                 <div
//                                     className='add_some_one_item'
//                                     key={user.id}
//                                     onClick={() => handleselected(user)}
//                                 >
//                                     <p>{user.name}</p>
//                                 </div>
//                             ))
//                         }
//                     </div>
//                 </div>

//                 {/* add user fileter delete */}
//                 <div className='add_some_one'>
//                     {
//                         selectedEmployees?.map((item) => (
//                             <span
//                                 key={item.id}
//                                 className='add_some_one_item'
//                             >
//                                 {item.name}
//                                 <i
//                                     className="fa fa-times"
//                                     aria-hidden="true"
//                                     onClick={() => handleUserList(item)}
//                                 ></i>
//                             </span>
//                         ))
//                     }

//                 </div>
//                 <div className="buttonArea mt-4">
//                     <button className="btns btn btn-light" onClick={() => props.onHide()}>{t("cancel")}</button>
//                     <button
//                         className="btn btn-success"
//                         onClick={handleAddUser}
//                     >{t("apply_changes")}
//                     </button>
//                 </div>
//             </Modal.Body>
//         </Modal>
//     )
// }

// export default ManageRoleModal


import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import deleteIcon from '../../../../../assets/images/ic-delete-red.svg';
import { updateAllEmployees, updateSelectedEmployees } from '../../../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice';
import { CreateUserZoneList, DeleteZoneUser, ZoneDetailAuthorizedEmployeeNoPagination } from '../../../../../reduxToolkit/EmployeeZones/EmployeeZonesApi';
// import { updateAllEmployees, updateSelectedEmployees } from '../../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AutoCompleteSearch from '../../../../../components/AutoCompleteSearch';
import { addUsersToRole, removeRoleToUserByIds } from '../../../../../reduxToolkit/EmployeeRoles/EmployeeRolesApi';
import { getAllroleEmployeesPageable } from '../../../../../Apis/roles';



const ManageRoleModal = (props) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const dispatch = useDispatch();
  //   const allEmployeesData = useSelector(state => state?.EmployeeEventsSlice?.allEmployees);
  // console.log(allEmployeesData)
  const { employeesWithRoleList, allEmployeesList } = useSelector(state => state?.EmployeeRolesSlice);
  const [query, setQuery] = useState("")
  const [addUserquery, setAddUserQuery] = useState("")
  const [employeesWithRole, setEmployeesWithRole] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState([]);


  const handleDelete = (dId) => {
    const data = {
      userIds: [dId],//props?.deleteData,
      roleId: props.roleid
    }
    dispatch(removeRoleToUserByIds(data))
    props.onHide();
    setQuery("")

  }
  const handleRemoveSelected = (user) => {

    setTotalEmployees(totalEmployees.filter((item) => item?.id !== user.id));
    // dispatch(updateAllEmployees([...allEmployeesData, user]));
  };


  //  add user to role
  const handleAddUser = () => {
    const all_user = totalEmployees?.map(item => item?.id)
    console.log(all_user)
    console.log(totalEmployees)
    if (all_user?.length > 0) {
      const data = {
        userIds: all_user,
        roleId: props.roleid
      }
      dispatch(addUsersToRole(data))
      props.onHide();
      setTotalEmployees([]);
      setAddUserQuery('');
    } else {
      toast.warn("Please atlest select one user")
    }

  }
  // select for add user
  const handleselected = (user) => {
    console.log(user)
    const checkUser = employeesWithRoleList?.find(item => {
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

  useEffect(() => {
    if (props.show === false) {
      setAddUserQuery('');
    }
  }, [props.show])


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
                data={userDataTransform(allEmployeesList)}
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
                // disabled={zoneDetailAuthorizedEmployeeNoPagination?.length === 0}
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
                {employeesWithRoleList && employeesWithRoleList?.filter((user) => {
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

export default ManageRoleModal;