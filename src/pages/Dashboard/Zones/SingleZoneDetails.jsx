import React, { useEffect, useRef, useState } from "react";
import ic_map from "../../../assets/images/ic-map.svg";
import warningImg from "../../../assets/images/warning.svg";
import { Link } from "react-router-dom";
import AddZoneModal from "./Modal/AddZoneModal";
// Materail ui
import { Table } from "react-bootstrap";
import AddBuildingModel from "./Modal/AddBuildingModal";
import RemovePlanModal from "./Modal/RemovePlanModal";
import TotalAccessService from "./TotalAccessService";
import TablePagination from '@mui/material/TablePagination';
import { useDispatch, useSelector } from "react-redux";
import { DeleteZoneUser, GetListZoneMap, ZoneDetailAuthorizedEmployee, ZoneDetailFatherAndChild } from "../../../reduxToolkit/EmployeeZones/EmployeeZonesApi";
import AuthorizedEmployeesModal from "./Modal/AuthorizedEmployeesModal";
import { getAllEmployees } from "../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi";
import AccessDeviceTable from "./AccessDeviceTable";
import { permissionObj } from "../../../Helpers/permission";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { borderRight } from "@mui/system";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";


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
  const [rowsPerPageAuthorizedEmployee, setRowsPerPageAuthorizedEmployee] = useState(4);
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();

  // use Selector hook to get state for redux store
  const { createUserZoneList, createZonePlane, uploadImgZonePlane, deleteImgZonePlane,
    zoneDetailFatherAndChild, zoneDetailAuthorizedEmployee, createCommonAreaZone,
    updateZone, updateCommonAreaZone, deleteZoneUser, setZoneImageCoordinate, createChildZone

  } = useSelector(state => state.EmployeeZonesSlice)

  const { permission } = useSelector(state => state.authenticatioauthennSlice);


  // a funtion to change authorized page
  const handleChangePageAuthorizedEmployee = (event, newPage) => {
    setPageAuthorizedEmployee(newPage);
  };

  // a funtion to change row per page
  const handleChangeRowsPerPageAuthorizedEmployee = event => {
    setRowsPerPageAuthorizedEmployee(parseInt(event.target.value));
    setPageAuthorizedEmployee(0);
  };

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

  }, [pageAuthorizedEmployee, rowsPerPageAuthorizedEmployee, orderBy, sortBy, deleteZoneUser, createUserZoneList])

  // a useEffect lifeCycle for dispatch zone detail father and child
  useEffect(() => {
    dispatch(ZoneDetailFatherAndChild({ zoneId: localStorage?.getItem("singlezoneId") }))

  }, [updateCommonAreaZone, updateZone, createCommonAreaZone, createZonePlane, uploadImgZonePlane, deleteImgZonePlane, setZoneImageCoordinate, createChildZone, deleteZoneUser])

  // set lng and lng for current zone
  localStorage.setItem("currentZoneLat", zoneDetailFatherAndChild?.latitud);
  localStorage.setItem("currentZoneLng", zoneDetailFatherAndChild?.longitud)


  useEffect(() => {
    const data = {
      zoneId: localStorage?.getItem('singlezoneId')
    }
    console.log(data)
    dispatch(GetListZoneMap(data))
  }, [])
  // return main page 
  return (
    <>
      <div className='head'>
        <div className='headLeft'>
          <Link to="/dashboard/employee/zones">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}></i>
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
              <Link to="/dashboard/employee/zones/showdevices">
                <button className="buildingetails_btn_device">
                  {t("show_devices")} <img src={ic_map} alt="" />
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
              <button className=" buildingetails_btn_update">
                {t("update_data")}
                <i
                  className="fa fa-pencil plus_building_details"
                  aria-hidden="true"
                  style={{ paddingRight: "10px", }}
                ></i>
              </button>
            </Link>
          }
        </div>
      </div>

      {/* Building Details Main Section Start */}

      <div className="zonesinactive_res">
        <div className="row">
          <div className="col-lg-5">
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
                        {zoneDetailFatherAndChild?.status?.name} <i class="fa fa-circle" aria-hidden="true"></i>
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-lg-6" >
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
                  <p style={{ color: '#BC0000', font: "normal normal 600 24px/29px Montserrat", paddingTop: '1rem' }}>NO COMMON AREA</p>
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
        <div className=" buildingdetail_access_txt">
          <h1 className="mt-5">
            {t("sub_zones")}
            {
              permission?.includes(permissionObj?.WEB_ZONE_CREATE) &&
              <span
                // data-toggle="modal"
                // data-target="#addchildzones_modal"

                onClick={() => { setModalShow(true); setIsFatherZone({ id: zoneDetailFatherAndChild?.id, name: zoneDetailFatherAndChild?.name }) }}
              >
                {t("add_sub_zone")}
              </span>
            }
          </h1>
        </div>

        <div className="zonescollaps_building">
          <div className="mt-4 row room_access_text">
            <div className="">
              {
                zoneDetailFatherAndChild?.children?.length > 0 ?
                  <Table
                  // style={{
                  //   border: "hidden",
                  // }}
                  >
                    <thead  >
                      <tr>
                        <th style={{ border: 'none' }}>
                          <h5>{t("name")}</h5>
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
                              <td>
                                <h4>
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
          permission?.includes(permissionObj?.WEB_DEVICE_MENU) &&
          <TotalAccessService item={zoneDetailFatherAndChild} />
        }

        {/* a component for access table list */}
        {

          permission?.includes(permissionObj?.WEB_DEVICE_MENU) &&
          <AccessDeviceTable />
        }

        {/* authorized employee module */}
        {
          permission?.includes(permissionObj?.WEB_ZONE_MANAGE_USERS) &&
          <div className="buildingdetail_access_d">
            <Table className="table">
              <thead>
                <tr >
                  <th style={{ border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1>{t("authorized_employees")}</h1>
                    <div
                      className="manage_employee_btn"
                      onClick={() => {
                        setShow(true);
                        dispatch(getAllEmployees());
                        // const data = {
                        //   zoneId: localStorage.getItem('singlezoneId'),
                        // }
                        // dispatch(ZoneDetailAuthorizedEmployee(data))

                      }}>
                      {t("manage_employees")}
                      {/* <i class="fa fa-plus" aria-hidden="true" /> */}

                    </div>
                    <AuthorizedEmployeesModal show={show}
                      onHide={() => setShow(false)} />
                  </th>

                </tr>
              </thead>
              {
                zoneDetailAuthorizedEmployee?.content?.length > 0 ?
                  // [].length > 0 ?
                  <tbody>
                    {zoneDetailAuthorizedEmployee?.content?.map((employee) => (
                      <>
                        <div
                          className="column"
                          style={{ float: "left", width: "25%", color: "gray" }}

                        >
                          <tr style={{ border: "hidden " }}>
                            <td
                              style={{
                                display: "flex",
                                justifyContent: "spacebetween",
                                border: "hidden",
                                alignItems: 'center',
                                width: '100%'

                              }}
                            >
                              {/* <img
                              src={iccancel}
                              className="close profile_ancel_img"
                              data-dismiss="modal"
                              data-toggle="modal"
                              data-target="#removePLan"
                              alt=""
                            /> */}
                              <i class="fa fa-trash profile_ancel_img" aria-hidden="true"
                                onClick={() => {
                                  const data = {
                                    userId: employee.id,
                                    zoneId: localStorage.getItem("singlezoneId")
                                  }
                                  dispatch(DeleteZoneUser(data))
                                }}
                              ></i>
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
              zoneDetailAuthorizedEmployee?.content?.length > 0 &&
              // [].length > 0 &&
              <div className="d-flex justify-content-center">
                <TablePagination
                  component="div"
                  rowsPerPageOptions={[2, 4, 6, 8, 12]}
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
    </>
  );
};

export default SingleZoneDetails;
