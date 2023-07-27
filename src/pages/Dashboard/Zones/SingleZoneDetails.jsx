import React, { useEffect, useRef, useState } from "react";
import ic_map from "../../../assets/images/ic-map.svg";
import warningImg from "../../../assets/images/warning.svg";
import { Link } from "react-router-dom";
import AddZoneModal from "./Modal/AddZoneModal";
import { Table } from "react-bootstrap";
import AddBuildingModel from "./Modal/AddBuildingModal";
import RemovePlanModal from "./Modal/RemovePlanModal";
import TotalAccessService from "./TotalAccessService";
import TablePagination from '@mui/material/TablePagination';
import { useDispatch, useSelector } from "react-redux";
import { DeleteZoneUser, GetListZoneMap, ZoneDetailAuthorizedEmployee, ZoneDetailAuthorizedEmployeeNoPagination, ZoneDetailFatherAndChild } from "../../../reduxToolkit/EmployeeZones/EmployeeZonesApi";
import AuthorizedEmployeesModal from "./Modal/AuthorizedEmployeesModal";
import { getAllEmployees } from "../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi";
import { permissionObj } from "../../../Helpers/permission";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
import ic_left_arrow from "../../../assets/images/ic_left_arrow.svg"
import DeleteModal from "../../Modals/DeleteModal";
import { Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import { DeleteItemsApi } from "../../../reduxToolkit/Commons/CommonsApi";

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

const SingleZoneDetails = (props) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  // use hook importer
  const dispatch = useDispatch();

  // use State hook for local state management 
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isFatherZone, setIsFatherZone] = useState({});
  const [pageAuthorizedEmployee, setPageAuthorizedEmployee] = useState(0);
  const [rowsPerPageAuthorizedEmployee, setRowsPerPageAuthorizedEmployee] = useState(10);
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [freeadded, setfreeadded] = useState(false);
  const [devicedeleted, setdevicedeleted] = useState(false);
  const [selectEmployeeForDelete, setSelectEmployeeForDelete] = useState([])
  const [isAllChecked, setIsAllChecked] = useState(false)

  const [selectSubZoneForDelete, setSelectSubZoneForDelete] = useState([])
  const [isAllCheckedSubZone, setIsAllCheckedSubZone] = useState(false)
  const [deleteZone, setDeleteZone] = useState(false)
  const [deleteShowSubZone, setDeleteShowSubZone] = useState(false)

  // use Selector hook to get state for redux store
  const { createUserZoneList, createZonePlane, uploadImgZonePlane, deleteImgZonePlane,
    zoneDetailFatherAndChild, zoneDetailAuthorizedEmployee, createCommonAreaZone,
    updateZone, updateCommonAreaZone, deleteZoneUser, setZoneImageCoordinate, createChildZone

  } = useSelector(state => state.EmployeeZonesSlice)
  const { deleteItemsApi } = useSelector(state => state.CommonsSlice);

  // const { addFreeDevice } = useSelector(state => state.DevicesSlice)  

  const { permission } = useSelector(state => state.authenticatioauthennSlice);


  // this function control select all id or unSelect all
  const handelDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = zoneDetailAuthorizedEmployee?.content?.map(item => {
        return item?.id
      })
      setSelectEmployeeForDelete(selectAllIds)


    } else {
      setSelectEmployeeForDelete([])
    }

  }
  // this function handle only specific id base on selection
  const handleCheckboxChange = (e) => {
    console.log(e.target)
    if (e.target.checked) {
      setSelectEmployeeForDelete([...selectEmployeeForDelete, e.target.id]);
    } else {
      setSelectEmployeeForDelete(selectEmployeeForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };
  // handel delete zone employee
  const handleDeleteEmployee = () => {
    const data = {
      userIds: selectEmployeeForDelete,
      zoneId: localStorage.getItem("singlezoneId")
    }
    dispatch(DeleteZoneUser(data))
    setDeleteZone(false)

  }

  // this function handle only specific id base on selection
  const handleCheckboxChangeSubZone = (e) => {
    console.log(e.target)
    if (e.target.checked) {
      setSelectSubZoneForDelete([...selectSubZoneForDelete, e.target.id]);
    } else {
      setSelectSubZoneForDelete(selectSubZoneForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };
  // this function control select all id or unSelect all
  const handelDeleteAllSubZone = (e) => {
    setIsAllCheckedSubZone(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = zoneDetailFatherAndChild?.children?.map(item => {
        return item?.id
      })
      setSelectSubZoneForDelete(selectAllIds)


    } else {
      setSelectSubZoneForDelete([])
    }

  }

  // a funtion to change authorized page
  const handleChangePageAuthorizedEmployee = (event, newPage) => {
    setPageAuthorizedEmployee(newPage);
  };

  // a funtion to change row per page
  const handleChangeRowsPerPageAuthorizedEmployee = event => {
    setRowsPerPageAuthorizedEmployee(parseInt(event.target.value));
    setPageAuthorizedEmployee(0);
  };
  // api function
  const deleteSubZone = (deleteItem) => {
    const tableName = "zone"
    const body = deleteItem
    dispatch(DeleteItemsApi({ tableName, body }))
  }

  // a useEffect lifeCycle for dispatch zone detail authorized employee
  useEffect(() => {
    const body = {

      pagination: {
        "order": sortBy === 'asc' ? true : false,
        "page": pageAuthorizedEmployee,
        "size": rowsPerPageAuthorizedEmployee,
        "sortBy": orderBy ? orderBy : "id"
      },
      zoneId: localStorage.getItem("singlezoneId")
    }
    dispatch(ZoneDetailAuthorizedEmployee(body))

  }, [pageAuthorizedEmployee, rowsPerPageAuthorizedEmployee, 
    orderBy, sortBy, deleteZoneUser, createUserZoneList])


    
  console.log(zoneDetailAuthorizedEmployee)

  useEffect(()=>{
    dispatch(ZoneDetailAuthorizedEmployeeNoPagination())
  },[deleteItemsApi,deleteZoneUser])
  // a useEffect lifeCycle for dispatch zone detail father and child
  useEffect(() => {
    setfreeadded(false)
    setdevicedeleted(false)
    dispatch(ZoneDetailFatherAndChild({ zoneId: localStorage?.getItem("singlezoneId") }))

  }, [updateCommonAreaZone, updateZone, createCommonAreaZone,
     createZonePlane, uploadImgZonePlane, deleteImgZonePlane, 
     setZoneImageCoordinate, createChildZone, deleteZoneUser, 
     freeadded, devicedeleted,deleteItemsApi])

  // set lng and lng for current zone
  localStorage.setItem("currentZoneLat", zoneDetailFatherAndChild?.latitud);
  localStorage.setItem("currentZoneLng", zoneDetailFatherAndChild?.longitud)




  useEffect(() => {
    const data = {
      zoneId: localStorage?.getItem('singlezoneId')
    }
    dispatch(GetListZoneMap(data))
  }, [])
  // return main page 
  return (
    <>
      <div className='head'>

        <div className="headLeft">
          <Link className="top-left-arrow-container" to="/dashboard/employee/zones" style={{ width: "32px", marginRight: "15px", paddingLeft: "0px", paddingRight: "10px" }}

          >
            <button className='btn-left-arrow' style={{ width: "32px", marginRight: "15px", paddingLeft: "0px", paddingRight: "10px" }}
            >
              <img className="left-arrow" src={ic_left_arrow} alt="ic_left_arrow" />
            </button>
          </Link>
          <h2>{t('zone_details')}</h2>
        </div>
        <div
          style={{
            display: "flex",
            gridGap: "10px",
            alignItems: "center"
          }}
        >
          {
            permission?.includes(permissionObj?.WEB_ZONE_READ_DEVICES) &&
            <div className="pull-right">
              <Link to="/dashboard/employee/zones/showdevices" style={{ opacity: 0.5 }}>
                <button className="add-btn-1" >
                  <img src={ic_map} alt="" />
                  {t("show_devices")}
                </button>
              </Link>
            </div>
          }

          {
            permission?.includes(permissionObj?.WEB_ZONE_UPDATE) &&
            <Link to="/dashboard/employee/zones/updatezone" className="pull-right" onClick={
              () => {

                localStorage.getItem("singlezoneId")
                dispatch(ZoneDetailFatherAndChild({ zoneId: localStorage.getItem("singlezoneId") }))
              }}>
              <button className="add-btn-1">
                <i class="fa fa-floppy-o" aria-hidden="true"></i>
                {t("update")}
              </button>
            </Link>
          }
        </div>
      </div>

      {/* Building Details Main Section Start */}

      <div className="zonesinactive_res">
        <div className="row">
          <div className="col-lg-6">
            <div className="building_details_text">
              <div className=" text-center">
                <h1>{t("details")}</h1>
                <div className="building_details_text_border">
                  <p>{t("name")}</p>
                  <h2>{zoneDetailFatherAndChild?.name}</h2>
                  <div className="mt-4">
                    <p>{t("status")}</p>
                    <h3>
                      <span>
                        {zoneDetailFatherAndChild?.status?.name?.split("_").join(" ")} <i class="fa fa-circle" aria-hidden="true"></i>
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5" >
            <div className="text-center buildingdetail_access_txt">
              <h1 className="mt-4">{t("common_area")}</h1>
            </div>
            <div className="text-center mt-4 schedule_zoneb" style={{
              borderLeft: lCode === "ar" ? "" : "3px solid #146f62",
              borderRight: lCode === "ar" ? "3px solid #146f62" : ""
            }}>
              {
                zoneDetailFatherAndChild?.commonArea == null &&
                <div>
                  <img src={warningImg} alt="" style={{ marginTop: '3rem' }} />
                  <p style={{ color: '#BC0000', font: "normal normal 600 24px/29px Montserrat", paddingTop: '1rem' }}>
                    {t("no_common_area")?.toUpperCase()}
                  </p>
                </div>
              }
              {
                zoneDetailFatherAndChild?.commonArea != null &&
                <>
                  <h2>{t("schedule_use")}</h2>
                  <h3>{t("from")}</h3>
                  <p>{zoneDetailFatherAndChild?.commonArea?.fromTime}</p>
                  <h3>{t("to")}</h3>
                  <p>{zoneDetailFatherAndChild?.commonArea?.toTime}</p>
                </>
              }

            </div>
          </div>
        </div>
      </div>
      <div className="div">
        {/* table for sub zone list */}
        <div className=" buildingdetail_access_txt d-flex align-items-center justify-content-between mt-4">
          <h1 >
            {t("internal_monitoring")?.toUpperCase()}
            {
              permission?.includes(permissionObj?.WEB_ZONE_CREATE) &&
              <span className="ml-2"
                onClick={() => { setModalShow(true); setIsFatherZone({ id: zoneDetailFatherAndChild?.id, name: zoneDetailFatherAndChild?.name }) }}
              >
                {t("add_sub_zone")?.toUpperCase()}
              </span>
            }
          </h1>
          <button className="delete-btn-1 mr-3"
            disabled={selectSubZoneForDelete?.length === 0}
            onClick={() => {
              setDeleteShowSubZone(true)

            }}
          >
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            {t('delete')}
          </button>
        </div>

        <div className="zonescollaps_building">
          <div className="mt-4 row room_access_text">
            <div className="">
              {
                zoneDetailFatherAndChild?.children?.length > 0 ?
                  <Table
                  >
                    <thead  >
                      <tr>

                        <th style={{ border: 'none', display: "flex", gap: "0.1rem", alignItems: "center" }}>
                          <Tooltip title={t("de_/_select_all").toUpperCase()} placement="top">
                            <Checkbox
                              className="grid-checkall checkbox"
                              checked={isAllCheckedSubZone}
                              onChange={handelDeleteAllSubZone}
                              size="small"
                            />
                          </Tooltip>
                          <h5>{t("sub_zone")?.toUpperCase()}</h5>
                        </th>
                        <th style={{ border: 'none', textAlign: "center" }}>
                          <h5>{t("access_devices")}</h5>
                        </th>
                        <th style={{ border: 'none', textAlign: "center" }}>
                          <h5>{t("common_area")}</h5>
                        </th>
                        <th style={{ border: 'none', textAlign: "center" }}>
                          <h5>{t("status")}</h5>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        zoneDetailFatherAndChild?.children?.map((item, index) => {
                          return (
                            <tr>

                              <td className="d-flex align-items-center ">
                                <Checkbox
                                  className="grid-checkall checkbox"
                                  checked={selectSubZoneForDelete?.includes(item?.id)}
                                  id={item?.id}
                                  onChange={handleCheckboxChangeSubZone}
                                  size="small"
                                />
                                <h4 className="d-flex align-items-center gap-2">
                                  {item?.name}
                                  <a
                                    className="zone_child_more_detail"
                                    onClick={() => {
                                      dispatch(ZoneDetailFatherAndChild({ zoneId: item?.id }))
                                    }}

                                    href="#">{t("more_details")}</a>
                                </h4>
                              </td>
                              <td className="text-center">
                                <div>
                                  {
                                    item?.devices.length == 0 &&
                                    <i class="fa fa-times" aria-hidden="true" style={{ color: "red", fontSize: "1.2rem" }}></i>
                                  }
                                  {
                                    item?.devices.length > 0 &&
                                    <i class="fa fa-check" aria-hidden="true" style={{ color: 'green', fontSize: "1.2rem" }}></i>
                                  }
                                </div>
                              </td>
                              <td className="text-center">
                                <div>
                                  {
                                    item?.commonArea == null &&
                                    <i class="fa fa-times" aria-hidden="true" style={{ color: "red", fontSize: "1.2rem" }}></i>
                                  }
                                  {
                                    item?.commonArea != null &&
                                    <i class="fa fa-check" aria-hidden="true" style={{ color: 'green', fontSize: "1.2rem" }}></i>
                                  }
                                </div>
                              </td>
                              <td className="text-center">
                                <h6>
                                  {item?.status?.name.split("_").join(" ")}
                                  <>
                                    <i style={{ marginLeft: "0.4rem", fontSize: '0.6rem' }} class="fa fa-circle" aria-hidden="true"></i>
                                  </>
                                </h6>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                  :
                  <div>
                    <NotFoundDataWarning text={t("no_sub_zone")} />
                  </div>
              }
            </div>
          </div>
        </div>

        {/* Total Access Sevice Section Start */}

        {
          permission?.includes(permissionObj?.WEB_DEVICE_READ) &&
          <TotalAccessService item={zoneDetailFatherAndChild} freeadded={freeadded} onfreeadded={() => setfreeadded(true)} devicedeleted={devicedeleted} ondevicedeleted={() => setdevicedeleted(true)} />
        }

        {/* authorized employee module */}
        {
          permission?.includes(permissionObj?.WEB_ZONE_MANAGE_USERS) &&
          <div className="buildingdetail_access_d mt-4">
            <Table className="table">
              <thead>
                <tr  >
                  <th className="head_line">
                    <h1>{t("authorized_employees")}</h1>
                    <div
                      className="manage_employee_btn"
                      onClick={() => {
                        setShow(true);
                        dispatch(getAllEmployees());
                      }}>
                      {t("manage_employees")}
                    </div>
                    <AuthorizedEmployeesModal
                      show={show}
                      onHide={() => setShow(false)}
                      deleteData={selectEmployeeForDelete}
                    />
                  </th>

                </tr>
                <tr>
                  <div className="d-flex gap-1 p-0 pb-2">

                    <FormControlLabel className="grid-checkall" control={<Checkbox
                      label="Label"
                      checked={isAllChecked}
                      onChange={handelDeleteAll}
                      size="small" />} label={t("de_/_select_all")} />
                  </div>
                </tr>
              </thead>
              {
                zoneDetailAuthorizedEmployee?.content?.length > 0 ?
                  <tbody>
                    {zoneDetailAuthorizedEmployee?.content?.map((employee) => (
                      <>
                        <div
                          className="column"
                          style={{ float: "left", width: "25%", color: "gray" }}

                        >
                          <tr style={{ border: "hidden" }}>
                            <td
                              style={{
                                display: "flex",
                                justifyContent: "spacebetween",
                                border: "hidden",
                                alignItems: 'center',
                                width: '100%',
                                gap: "0.5rem"

                              }}
                            >


                              <Checkbox
                                className="grid-checkall checkbox"
                                checked={selectEmployeeForDelete?.includes(employee?.userId)}
                                id={employee?.userId}
                                onChange={handleCheckboxChange}
                                size="small"
                              />
                              <span style={{ fontSize: '0.8rem', opacity: "0.5" }}>{employee?.name}</span>
                            </td>
                          </tr>
                        </div>
                      </>
                    ))}
                  </tbody>
                  :

                  <NotFoundDataWarning text={t("no_data")} />


              }
            </Table>
            {
              selectEmployeeForDelete?.length > 0 &&
              <div className="remove_selected_zone_employee"
                onClick={() => setDeleteZone(true)}
              >
                <p>{t("remove_selected")?.toUpperCase()}</p>
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </div>
            }
            {
              zoneDetailAuthorizedEmployee?.content?.length > 0 &&
              <div className="d-flex justify-content-center">
                <TablePagination
                  component="div"
                  rowsPerPageOptions={[10, 15, 20, 30]}
                  count={zoneDetailAuthorizedEmployee?.totalElements}
                  page={pageAuthorizedEmployee}
                  onPageChange={handleChangePageAuthorizedEmployee}
                  labelRowsPerPage={t("authorized_employee_per_page")}
                  rowsPerPage={rowsPerPageAuthorizedEmployee}
                  onRowsPerPageChange={handleChangeRowsPerPageAuthorizedEmployee}
                />
              </div>
            }
          </div>
        }
        {/* Total Access Sevice Section End */}
      </div>
      {/* Building Details Main Section End */}

      {/* Add Building Modal Start */}
      <AddZoneModal
        title={t("add_zone")}
        check="true"
        show={modalShow}
        onHide={() => setModalShow(false)}
        isFatherZone={isFatherZone}
      />
      {/* <!-- The Modal --> */}
      <AddBuildingModel />
      {/* Add Building Modal End */}
      {/* Add Child Zones Modal Start */}
      {/* <!-- The Modal --> */}
      {/* <AddChildZoneModal /> */}
      {/* Add Child Zones Modal End */}
      <RemovePlanModal />
      <DeleteModal
        show={deleteZone}
        onHide={() => setDeleteZone(false)}
        onClickFn={() => handleDeleteEmployee()}
        data={selectEmployeeForDelete}
        title_modal={"zone_details"}
        isReset={setSelectEmployeeForDelete}
        // description={"are_you_sure_you_want_to_remove"}
        element_modal={"authorized_employee"}
        isAllReset={setIsAllChecked}
      />
      <DeleteModal
        show={deleteShowSubZone}
        onHide={() => setDeleteShowSubZone(false)}
        onClickFn={() => deleteSubZone(selectSubZoneForDelete)}
        data={selectSubZoneForDelete}
        title_modal={"first_access"}
        element_modal={"sub_zone"}
        isReset={setSelectSubZoneForDelete}
        isAllReset={setIsAllCheckedSubZone}
      />
    </>
  );
};

export default SingleZoneDetails;
