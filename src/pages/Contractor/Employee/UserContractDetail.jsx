import { Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import EmployeCard from "./EmployeCard";
import ViewCard from "../Vehicle/ViewCard";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TablePagination from "@mui/material/TablePagination";
import { Link, useNavigate } from "react-router-dom";
import emptyList from "../../../assets/images/warning.svg";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import { GetContractById, GetVehicleOnContractById, GetEmployeOnContractById, GetAllVehicleByContractor, VehicleWorkOnContract, GetAllVehicleByContractorId, GetlistofcontractorEmployees, GetlistofEmployeWorkOnContract, GetByUserId } from "../../../reduxToolkit/Contractor/ContractorApi";
import { allVehicleByContractorId, currentContract, vehicleOnContractById, employeOnContractById, allVehicleByContractor, byUserId, allvehicleWorkOnContract, listofcontractorEmployees } from "../../../reduxToolkit/Contractor/ContractorSlice";
import { userDetail } from "../../../reduxToolkit/authentication/authenticationSlice";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import AddVehicleToContractorModal from "../Vehicle/AddVehicleToContractorModal";
import AddEmployeToContractModal from "../Vehicle/AddEmployeToContractModal";
import i18next, { t } from "i18next";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";

const UserContractDetail = () => {
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();
  const getByUserId = useSelector(byUserId)
  const getContractById = useSelector(currentContract);
  const getVehicleOnContractById = useSelector(vehicleOnContractById);
  const getEmployeOnContractById = useSelector(employeOnContractById);
  const getAllVehicleByContractor = useSelector(allVehicleByContractor)
  const vehicleWorkOnContract = useSelector(allvehicleWorkOnContract)
  const getlistofcontractorEmployees = useSelector(listofcontractorEmployees)
  const { user } = useSelector(state => state.authenticatioauthennSlice);

  const userData = useSelector(userDetail);

  //modal
  const [addUserModal, setaddUserModal] = useState(false);
  const [addVehicleModal, setAddVehicleModal] = useState(false);

  const [removeUserModal, setRemoveUserModal] = useState(false);

  //end modal

  const [name, setName] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [vehicleModal, setvehicleModal] = useState(false);
  const [userRemoveModal, setuserRemoveModal] = useState(false);
  const [allVehicle, setAllVehicle] = useState(false);
  const [allUser, setAllUser] = useState(false);
  let contractId = useParams();
  let id = user?.data?.id;

  const endDate = new Date(getContractById?.endDate);
  const startDate = new Date(getContractById?.starDate);

  //Employee
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [page, setPage] = useState(0);
  const [pagePaginationEmp, setPagePaginationEmp] = useState(0);
  const [rowsPerPageProviderEmp, setRowsPerProviderEmp] = useState(4);

  const handleChangePageProviderEmp = (event, newPage) => {
    setPagePaginationEmp(newPage);
  };

  const handleChangeRowsPerPageProviderEmp = (event) => {
    setRowsPerProviderEmp(parseInt(event.target.value));
    setPagePaginationEmp(0);
  };
  //end Employee


  //vehicel
  const [pagePaginationVeh, setPagePaginationVeh] = useState(0);
  const [rowsPerPageProviderVeh, setRowsPerProviderVeh] = useState(4);

  const handleChangePageProviderVeh = (event, newPage) => {
    setPagePaginationVeh(newPage);
  };

  const handleChangeRowsPerPageProviderVeh = (event) => {
    setRowsPerProviderVeh(parseInt(event.target.value));
    setPagePaginationVeh(0);
  };
  //end vehicle

  let employeePagination = {
    order: sortBy === "asc" ? true : false,
    page: pagePaginationVeh,
    size: rowsPerPageProviderEmp,
    sortBy: orderBy ? orderBy : "id",
  };

  let vehiclePagination = {
    order: sortBy === "asc" ? true : false,
    page: pagePaginationVeh,
    size: rowsPerPageProviderVeh,
    sortBy: orderBy ? orderBy : "id",
  };



  const [addUserquery, setAddUserQuery] = useState("");
  const [totalEmployees, setTotalEmployees] = useState([]);

  function AllUser(props) {
    return (
      <div className="primary-modal">
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <button onClick={props.onHide} className="modal-close-btn">
            X
          </button>
          <span className="main-modal-heading">Employee</span>
          <div className="unlink-modal-body">
            <span className="all-vehical-modal">REMOVE Employee</span>
            <div className="all-vehical-modal--body">
              <span className="all-vehical-modal--body__item">
                Kia Rio 2021 | ULK-123-56{" "}
                <DeleteForeverIcon
                  onClick={() => {
                    setAllUser(false);
                    setuserRemoveModal(true);
                  }}
                />
              </span>
              <span className="all-vehical-modal--body__item">
                Kia Rio 2021 | ULK-123-56 <DeleteForeverIcon onClick={() => {
                  setAllUser(false);
                  setuserRemoveModal(true);
                }} />
              </span>
              <span className="all-vehical-modal--body__item">
                Kia Rio 2021 | ULK-123-56 <DeleteForeverIcon onClick={() => {
                  setAllUser(false);
                  setuserRemoveModal(true);
                }} />
              </span>
              <span className="all-vehical-modal--body__item">
                Kia Rio 2021 | ULK-123-56 <DeleteForeverIcon onClick={() => {
                  setAllUser(false);
                  setuserRemoveModal(true);
                }} />
              </span>
              <span className="all-vehical-modal--body__item">
                Kia Rio 2021 | ULK-123-56 <DeleteForeverIcon onClick={() => {
                  setAllUser(false);
                  setuserRemoveModal(true);
                }} />
              </span>
            </div>

            <span className="all-vehical-modal">ADD Employee</span>
            <span className="all-vehical-modal__search">
              <input className="all-vehical-modal__search--input" ></input>
              <SearchIcon />
            </span>
            <div className="all-vehical-modal--body">
              <span className="all-vehical-modal--body__add">
                Kia Rio 2021 | ULK-123-56 <CancelIcon />
              </span>
              <span className="all-vehical-modal--body__add">
                Kia Rio 2021 | ULK-123-56 <CancelIcon />
              </span>
              <span className="all-vehical-modal--body__add">
                Kia Rio 2021 | ULK-123-56 <CancelIcon />
              </span>
              <span className="all-vehical-modal--body__add">
                Kia Rio 2021 | ULK-123-56 <CancelIcon />
              </span>
              <span className="all-vehical-modal--body__add">
                Kia Rio 2021 | ULK-123-56 <CancelIcon />
              </span>
            </div>
            <div className="btn-div">
              <button
                className="button-sec btn-cancel"
                style={{ color: "red" }}
                onClick={props.onHide}
              >
                CANCEL
              </button>
              <button className="button-sec btn-confirm">
                <b>APPLY CHANGES</b>
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  const handleselected = (user) => {
    // if(AllByWorkShiftId.some(person => person.id === user.id)){
    //   toast.info("All ready Member Of Work Shift")
    // }
    // else{
    //   if(totalEmployees.some(person => person.id === user.id)){
    //     toast.info("All ready User Added");
    // } else{
    //     dispatch(updateAllEmployees(AllUser.filter((data) => data.id !== user.id)));
    //     setTotalEmployees([...totalEmployees, user]);
    // }
    // }
  };
  let [names, setNames] = useState("Nate");
  let nameRef = useRef();
  const submitButton = () => {
    setName(nameRef.current.value);
  };





  function AllVehicle(props) {
    return (
      <div className="primary-modal">
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <button onClick={props.onHide} className="modal-close-btn">
            X
          </button>
          <span className="main-modal-heading">VEHICLE</span>
          <div className="unlink-modal-body">
            <span className="all-vehical-modal">REMOVE VEHICLE</span>
            <div className="all-vehical-modal--body">
              <span className="all-vehical-modal--body__item">
                Kia Rio 2021 | ULK-123-56 <DeleteForeverIcon onClick={() => { setvehicleModal(true); setAllVehicle(false) }} />
              </span>
            </div>
            <span className="all-vehical-modal">ADD VEHICLE</span>
            <span className="all-vehical-modal__search">
              <input className="all-vehical-modal__search--input"
                // id="Search"
                ref={nameRef}
              //  onChange={submitButton}
              // onChange={(e) => setAddUserQuery(e.target.value)}
              ></input>
              <SearchIcon />
            </span>
            {nameRef?.current?.value}
            <div className="all-vehical-modal--body">
              {getAllVehicleByContractor?.filter((user) => {
                if (addUserquery === "") {
                  return user;
                } else if (
                  user.name.toLowerCase().includes(addUserquery.toLowerCase())
                ) {
                  return user;
                }
              }).map((user) => (
                <span className="all-vehical-modal--body__add" key={user.id}
                  onClick={() => handleselected(user)}>
                  {user.name} <CancelIcon />
                </span>
              ))}

            </div>
            <div className="btn-div">
              <button
                className="button-sec btn-cancel"
                style={{ color: "red" }}
                onClick={props.onHide}
              >
                CANCEL
              </button>
              <button className="button-sec btn-confirm">
                <b>APPLY CHANGES</b>
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  function UserRemove(props) {
    return (
      <div className="primary-modal">
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <button onClick={props.onHide} className="modal-close-btn">
            X
          </button>
          <span className="main-modal-heading">REMOVE USER</span>
          <div className="unlink-modal-body">
            <span
              className="modal-desc-text"
              style={{ color: "#000", fontSize: "12px", fontWeight: 400 }}
            >
              Please. confirm the action the remove the role <b>CEO</b> for the
              employee <b>Luis Cornejo</b>. The employee must have a role so we
              will assign <b>NONE</b> meanwhile you assign his new role.
            </span>
            <div className="btn-div">
              <button
                className="button-sec btn-cancel"
                style={{ color: "red" }}
                onClick={props.onHide}
              >
                CANCEL
              </button>
              <button className="button-sec btn-confirm">CONFIRM</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  function VehicleRemove(props) {
    return (
      <div className="primary-modal">
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <button onClick={props.onHide} className="modal-close-btn">
            X
          </button>
          <span className="main-modal-heading">REMOVE VEHICLE</span>
          <div className="unlink-modal-body">
            <span
              className="modal-desc-text"
              style={{ color: "#000", fontSize: "14px" }}
            >
              Are you sure that would you like to remove to the vehicle Kia | RIO
              - ULK-232-2C?
            </span>
            <div className="btn-div">
              <button
                className="button-sec btn-cancel"
                style={{ color: "red" }}
                onClick={props.onHide}
              >
                CANCEL
              </button>
              <button className="button-sec btn-confirm">CONFIRM</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  useEffect(() => {
    /*author mazhar iqbal
      get contractor details
    */
    dispatch(GetByUserId(id))
    /*author mazhar iqbal
      get contract details
    */
    dispatch(GetContractById(contractId.id))
    /*author mazhar iqbal
      get all vehicles work with contractor
    */
    dispatch(GetAllVehicleByContractor(id))
    /*author mazhar iqbal
      get vehicles work on contract 
    */
    dispatch(VehicleWorkOnContract(contractId?.id))
    /*author mazhar iqbal
      get vehicles work on contract with pagination 
    */
    dispatch(GetAllVehicleByContractorId(getByUserId?.id))
    /*author mazhar iqbal
      get all employees work with contractor
    */
    dispatch(GetlistofcontractorEmployees(getByUserId?.id))
    /*author mazhar iqbal
      get all employees work on contract 
    */
    dispatch(GetlistofEmployeWorkOnContract(contractId?.id))
  }, [])


  useEffect(() => {
    /*author mazhar iqbal
      get all employees work on contract with pagination
    */
    dispatch(GetEmployeOnContractById({ id: contractId?.id, contractPagination: employeePagination }))
  }, [pagePaginationVeh, rowsPerPageProviderEmp])

  useEffect(() => {
    /*author mazhar iqbal
      get all vehicles work on contract with pagination
    */
    dispatch(GetVehicleOnContractById({ id: contractId?.id, contractPagination: vehiclePagination }))
  }, [pagePaginationVeh, rowsPerPageProviderVeh])
  return (
    <>
      <div className="head">
        <div className="headLeft mt-3 addcontractor">
          <Link to="/dashboard/contractor/contracts">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}></i>
          </Link>
          <h2>{t("contract_details")}</h2>
        </div>
      </div>
      <div className="emloyee-contract-detail-sec" style={{ width: "100%" }}>
        <Grid>
          <Grid item xs={12}>
            {getContractById?.status?.id == 22 ? (
              <span className="viewcard-container__status">
                {getContractById?.status?.name.replaceAll("_", " ")}
                <FiberManualRecordIcon
                  sx={{ fontSize: 40 }}
                />
              </span>
            ) : null}

            {getContractById?.status?.id == 21 ? (
              <span className="viewcard-container__status employe-status-documents">
                {getContractById?.status?.name.replaceAll("_", " ")}
                <FiberManualRecordIcon />
              </span>
            ) : null}
            {getContractById?.status?.id == 23 ? (
              <span className="viewcard-container__status employe-status-Vacation">
                {getContractById?.status?.name.replaceAll("_", " ")} <FiberManualRecordIcon style={{ color: "red" }} />
              </span>
            ) : null}
          </Grid>
        </Grid>
        {getContractById && <div className="emloyee-contract-detail">
          <div className="emloyee-contract-detail-first">
            <span>
              <spna className="contract-card__heading">{t("contracts")}</spna>
              <spna className="contract-card__no"> #102</spna>
            </span>
            <span>
              <span className="contract-card__name">
                {getContractById?.contractor?.user?.name}
              </span>
              <span className="contract-card__contractor d-block">{t("contractor")}</span>
              <span className="contract-card__name">
                {getContractById?.contractor?.user?.email}
              </span>
              <span className="contract-card__contractor d-block">{t("email")}</span>
              <span className="contract-card__name">
                {getContractById?.contractor?.user?.phoneNumber}
              </span>
            </span>
            <span className="contract-card__contractor d-block">{t("celular")}</span>

          </div>
          <div
            className="emloyee-contract-detail-second"
            style={{
              borderRight: "2px solid green",
              borderLeft: "2px solid green",
            }}
          >
            <span className="contract-card__title">{t("start_contract")}</span>
            <span className="contract-card__desc">{startDate.toLocaleDateString("en-US")}</span>

            <span className="contract-card__title">Corporate</span>
            <span className="contract-card__desc">              {getContractById?.contractor?.contractorCompanyName}</span>

            <span className="contract-card__title">{t("vehicles")}</span>
            <span className="contract-card__desc">{getContractById?.noVehicles}</span>

          </div>
          <div className="emloyee-contract-detail-third">
            <span className="contract-card__title">{t("end_date")}</span>
            <span className="contract-card__desc"> {endDate.toLocaleDateString("en-US")}</span>
            <span className="contract-card__title">{t("no_employees")}</span>
            <span className="contract-card__desc">{getContractById?.noEmployees}</span>

          </div>
          <div
            className="emloyee-contract-detail-second"
            style={{
              borderRight: "2px solid green",
              borderLeft: "2px solid green",
            }}
          >
            <span className="contract-card__title">{t("description")}</span>

            <span className="contract-card__desc">{getContractById?.description}</span>
          </div>
        </div>}

      </div>
      <div className="all-emloyee-contract">
        <span className="user-contract-detail">{t("employee")}</span>
        <span
          className="ms-5"
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => setaddUserModal(true)}
        >
          {" "}
          {t("add_remove_employees")} +
        </span>

        <AllUser show={allUser} onHide={() => setAllUser(false)} />

        <Grid container spacing={3}>
          {getEmployeOnContractById && getEmployeOnContractById?.length != 0 ? (
            getEmployeOnContractById?.content?.map((item) => {
              return (
                <Grid item xs={3}>
                  <EmployeCard data={item} />
                </Grid>
              );
            })
          ) : (

            <NotFoundDataWarning text={t("no_employee")} />
          )}

        </Grid>
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[4, 8, 16, 24]}
            count={getEmployeOnContractById?.totalElements}
            page={pagePaginationEmp}
            onPageChange={handleChangePageProviderEmp}
            labelRowsPerPage={t("employees_per_page")}
            rowsPerPage={rowsPerPageProviderEmp}
            onRowsPerPageChange={handleChangeRowsPerPageProviderEmp}
            sx={{
              "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root": {
                transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
              }
            }}
          />
        </div>
      </div>
      <div className="all-vehicle-contract">
        <span className="user-contract-detail">{t("vehicles")}</span>
        <span
          className="ms-5"
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => setAddVehicleModal(true)}
        >
          {" "}
          {t("add_remove_vehicles")} +
        </span>

        <Grid container spacing={3}>
          {getVehicleOnContractById && getVehicleOnContractById?.totalElements != 0 ? (
            getVehicleOnContractById?.content?.map((item) => {
              return (
                <Grid item xs={3}>
                  <ViewCard vehicles={item} />
                </Grid>
              );
            })
          ) : (

            <NotFoundDataWarning text={t("no_vehicles")} />
          )}
        </Grid>
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[4, 8, 16, 24]}
            count={getVehicleOnContractById?.totalElements}
            page={pagePaginationVeh}
            onPageChange={handleChangePageProviderVeh}
            labelRowsPerPage={t("vehicles_per_page")}
            rowsPerPage={rowsPerPageProviderVeh}
            onRowsPerPageChange={handleChangeRowsPerPageProviderVeh}
            sx={{
              "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root": {
                transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
              }
            }}
          />
        </div>
      </div>
      <AllVehicle show={allVehicle} onHide={() => setAllVehicle(false)} />
      <VehicleRemove
        show={vehicleModal}
        onHide={() => setvehicleModal(false)}
      />
      <UserRemove
        show={userRemoveModal}
        onHide={() => setuserRemoveModal(false)}
      />
      <AddVehicleToContractorModal
        setRemoveUserModal={setRemoveUserModal}
        setAddVehicleModal={setAddVehicleModal}
        title={t("shift_management")}
        check="false"
        id={id}
        show={addVehicleModal}
        onHide={() => setAddVehicleModal(false)}
      />
      <AddEmployeToContractModal
        setRemoveUserModal={setRemoveUserModal}
        setaddUserModal={setaddUserModal}
        title={t("shift_management")}
        check="false"
        id={getByUserId?.id}
        show={addUserModal}
        onHide={() => setaddUserModal(false)}
      />
    </>
  );
};

export default UserContractDetail;
