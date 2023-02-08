import React, { useEffect, useState } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { Badge, Modal } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../../assets/images/redTrash.svg"
import { toast } from "react-toastify";
import { allVehicleByContractorId, byUserId, currentContract, listofcontractorEmployees, listofEmployeWorkOnContract } from "../../../reduxToolkit/Contractor/ContractorSlice";
import { CreatelistofContractorEmployeeContract, DeleteEmployeeContractByContractAndUserID, GetAllVehicleByContractorId, GetEmployeOnContractById, GetlistofEmployeWorkOnContract, VehicleWorkOnContract } from "../../../reduxToolkit/Contractor/ContractorApi";
import { updateAllEmployees } from "../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice";
import { getAllUser } from "../../../reduxToolkit/CompanyWorkShift/CompanyWorkShiftSlice";
import i18next, { t } from "i18next";

const AddEmployeToContractModal = (props) => {
  const { title, setRemoveUserModal, setaddUserModal, id } = props;

  const dispatch = useDispatch();
  const AllUser = useSelector(getAllUser);
  const getByUserId = useSelector(byUserId)
  const getContractById = useSelector(currentContract);
  const getlistofcontractorEmployees = useSelector(listofcontractorEmployees)
  const getlistofEmployeWorkOnContract = useSelector(listofEmployeWorkOnContract)


  // const getAllUserWithThisWorkAccess
  const [addUserquery, setAddUserQuery] = useState("");
  const [totalEmployees, setTotalEmployees] = useState([]);

  useEffect(() => {
  }, []);

  // End Pagination

  const [userRemoveModal, setuserRemoveModal] = useState(false);

  const [delId, setDelId] = useState(null);

  function UserRemove(props) {

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
          <span className="main-modal-heading">{t("remove_access")}</span>
          <div className="unlink-modal-body">
            <span
              className="modal-desc-text"
              style={{ color: "#000", fontSize: "12px", fontWeight: 400 }}
            >
              {t("remove_confirmation_msg")}
            </span>

            <div className="btn-div">
              <button
                className="button-sec btn-cancel"
                style={{ color: "red" }}
                onClick={props.onHide}
              >
                {t("cancel")}
              </button>
              <button
                className="button-sec btn-confirm"
                onClick={() => {
                  removeShift();
                  setuserRemoveModal(false);
                }}
              >
                {t("confirm")}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  const removeShift = () => {
    const body = {
      contractId: getContractById?.id,
      userId: delId
    }
    /*author mazhar iqbal
      remove employee work on contract 
    */
    dispatch(DeleteEmployeeContractByContractAndUserID(body)).then(() => {
      /*author mazhar iqbal
        get all employees work on contract 
      */
      dispatch(GetlistofEmployeWorkOnContract(getContractById?.id))

        .then(() => {
          let contractPagination = {
            order: true,
            page: 0,
            size: 4,
            sortBy: "id",
          };
          /*author mazhar iqbal
            get all employees work on contract with pagination
          */
          dispatch(GetEmployeOnContractById({ id: getContractById?.id, contractPagination }))
        });
    })
  };

  const handleselected = (user) => {
    if (getlistofEmployeWorkOnContract.some(person => person.id === user.id)) {
      toast.info("All ready Employe")
    }
    else {
      if (totalEmployees.some(person => person.id === user.id)) {
        toast.info("All ready Employe Added");
      } else {
        dispatch(updateAllEmployees(getlistofcontractorEmployees.filter((data) => data.id !== user.id)));
        setTotalEmployees([...totalEmployees, user]);
      }
    }
  };

  const handleRemoveSelected = (user) => {
    setTotalEmployees(totalEmployees.filter((item) => item.id !== user.id));
    /*author mazhar iqbal
      remove employee from selected list 
    */
    dispatch(updateAllEmployees([...AllUser, user]))
  };

  const handleAddUser = () => {
    let all_user = []
    for (let i = 0; i < totalEmployees.length; i++) {
      all_user.push(totalEmployees[i].id)
    }
    const body = {
      "contractId": getContractById?.id,
      "userIds": all_user
    }
    /*author mazhar iqbal
      create list of employees to work on  contract 
    */
    dispatch(CreatelistofContractorEmployeeContract(body)).then(() => {
      toast.success("Employee Added")
      /*author mazhar iqbal
        get all employees work on contract 
      */
      dispatch(GetlistofEmployeWorkOnContract(getContractById?.id)).then(() => {
        let contractPagination = {
          order: true,
          page: 0,
          size: 4,
          sortBy: "id",
        };
        /*author mazhar iqbal
          get all employees work on contract with pagination
        */
        dispatch(GetEmployeOnContractById({ id: getContractById?.id, contractPagination }))

      })

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
        <span className="main-modal-heading" style={{ paddingBottom: "0px", fontSize: "26px" }}>
          {t("employees")}</span>
        <Modal.Body>
          <div className="row shiftmanagement_modal">
            <div className="text_field">
              <p className="title" style={{ color: "#146F62", fontWeight: "bolder" }}>
                {t("remove_user")}
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

                  label={t("search")}
                  id="Search"
                  className=""
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    textAlign: i18next.dir() == "rtl" ? "right" : "left",
                    "& 	.MuiOutlinedInput-notchedOutline": {
                      textAlign: i18next.dir() == "rtl" ? "right" : "left",
                    },
                    "& 	.MuiInputLabel-root": {
                      fontSize: 12,
                      left: i18next.dir() == "rtl" ? "inherit" : "0",
                      right: i18next.dir() == "rtl" ? "1.75rem" : "0",
                      transformOrigin: i18next.dir() == "rtl" ? "right" : "left"
                    }
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
                  {getlistofEmployeWorkOnContract?.map((item) => {
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
              <div className="mt-3 title" style={{ color: "#146F62", fontWeight: "bolder" }}>
                {t("add_user")}
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
                  sx={{
                    textAlign: i18next.dir() == "rtl" ? "right" : "left",
                    "& 	.MuiOutlinedInput-notchedOutline": {
                      textAlign: i18next.dir() == "rtl" ? "right" : "left",
                    },
                    "& 	.MuiInputLabel-root": {
                      fontSize: 12,
                      left: i18next.dir() == "rtl" ? "inherit" : "0",
                      right: i18next.dir() == "rtl" ? "1.75rem" : "0",
                      transformOrigin: i18next.dir() == "rtl" ? "right" : "left"
                    }
                  }}
                />
              </Box>
              <div
                className="col-12 searchItem W-100"
                style={{ display: addUserquery !== "" ? "block" : "none" }}
              >
                {getlistofcontractorEmployees?.filter((user) => {
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
                  className="capsules pt-2 px-2 w-100"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "left"
                    , width: "100%", border: "1px solid #707070",
                    borderRadius: "4px"
                  }}
                >
                  {totalEmployees.map((item) => (
                    <p className="mb-2 work-shift-add-item">
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
                {t("cancel")}
              </button>
              <button className="button-sec btn-confirm" onClick={handleAddUser}>{t("apply_changes")}</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddEmployeToContractModal;
