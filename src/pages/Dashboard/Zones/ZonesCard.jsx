import React, { useState } from "react";
// Material ui
import AddBuildingModel from "./Modal/AddBuildingModal";
import ZoneCardDetail from "./ZoneCardDetail";
import { Accordion } from 'react-bootstrap';
import AddZoneModal from "./Modal/AddZoneModal";
import { Link, useNavigate } from 'react-router-dom';
import { ZoneDetailAuthorizedEmployee, ZoneDetailFatherAndChild, ZoneDetailListDevice } from "../../../reduxToolkit/EmployeeZones/EmployeeZonesApi";
import { useDispatch, useSelector } from "react-redux";
import { permissionObj } from "../../../Helpers/permission";
import { useTranslation } from 'react-i18next';
import eye from '../../../assets/eye-solid.svg'
import Cookies from 'js-cookie';
import { Checkbox } from "@mui/material";

/*
Author : Arman Ali
Module: Zone 
github: https://github.com/Arman-Arzoo
*/

const ZonesCard = ({ item, index, selectForDelete, handleCheckboxChange }) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  // use hook importer
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // use State hook for local state management
  const [modalShow, setModalShow] = useState(false);
  const [isFatherZone, setIsFatherZone] = useState({});
  const [pageZoneEmployee, setPageZoneEmployee] = useState(0);
  const [rowsPerPageZoneEmployee, setRowsPerPageZoneEmployee] = useState(4);
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();

  //use Selector hook to get state for redux store
  const { permission } = useSelector(state => state.authenticatioauthennSlice);

  // return main page 
  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey={index} key={index}>
          <Accordion.Header className="accordionHeader">
            <div className="main">
              <div className="leftText d-flex gap-2 align-items-center">

                <Checkbox
                  className="grid-checkall checkbox"
                  checked={selectForDelete?.includes(item?.id)}
                  id={item?.id}
                  onChange={handleCheckboxChange}
                  size="small"
                />
                {item?.name}
                {
                  permission?.includes(permissionObj?.WEB_ZONE_CREATE) &&
                  <div className="hover_effect" onClick={() => { setModalShow(true); setIsFatherZone({ id: item?.id, name: item?.name }) }}>{t("add_sub_zone")} </div>
                }
              </div>
              {/* <div className="middeltext">

                <Link
                  to={"/dashboard/employee/zones/singlezonedetails"}
                  onClick={() => {
                    const body = {

                      pagination: {
                        "order": sortBy === 'asc' ? true : false,
                        "page": pageZoneEmployee,
                        "size": rowsPerPageZoneEmployee,
                        "sortBy": orderBy ? orderBy : "id"
                      },
                      zoneId: item?.id
                    }
                    localStorage.setItem('singlezoneId', item?.id)
                    dispatch(ZoneDetailFatherAndChild(body))
                    dispatch(ZoneDetailAuthorizedEmployee(body))
                    dispatch(ZoneDetailListDevice(body))
                  }}
                >{t("manage_zones").toUpperCase()}</Link>
              </div> */}
              <div className="rightText">
                {t("status")} <span>{item?.status?.name.split("_").join(" ")} </span>
                <div className="circle_status">

                </div>
              </div>
              <img src={eye} alt="eye" className="mr-5 img_view"

                onClick={() => {
                  navigate("/dashboard/employee/zones/singlezonedetails");
                  const body = {

                    pagination: {
                      "order": sortBy === 'asc' ? true : false,
                      "page": pageZoneEmployee,
                      "size": rowsPerPageZoneEmployee,
                      "sortBy": orderBy ? orderBy : "id"
                    },
                    zoneId: item?.id
                  }
                  localStorage.setItem('singlezoneId', item?.id)
                  dispatch(ZoneDetailFatherAndChild(body))
                  dispatch(ZoneDetailAuthorizedEmployee(body))
                  dispatch(ZoneDetailListDevice(body))
                }} />

            </div>
          </Accordion.Header>
          <Accordion.Body>
            {/* a componet for zone card detail */}
            <ZoneCardDetail item={item} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {/* add zone modal popup */}
      <AddZoneModal
        title={t("internal_monitoring")}
        check="true"
        show={modalShow}
        sub_title={t("sub_zone")}
        onHide={() => setModalShow(false)}
        isFatherZone={isFatherZone}
      />
      <AddBuildingModel />
    </>
  );
};

export default ZonesCard;
