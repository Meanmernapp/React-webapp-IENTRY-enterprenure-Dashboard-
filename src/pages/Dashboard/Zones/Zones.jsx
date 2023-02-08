import React, { useEffect, useState } from "react";
import { GetListFatherZones } from "../../../reduxToolkit/EmployeeZones/EmployeeZonesApi";
import AddZoneModal from "./Modal/AddZoneModal";
import ZonesCard from "./ZonesCard";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from '@mui/material/TablePagination';
import { Box } from "@mui/material";
import { permissionObj } from "../../../Helpers/permission";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

// Zone module main funtion
const Zones = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  // use hook importer
  const dispatch = useDispatch()

  //use Selector hook to get state for redux store
  const { getListFatherZones } = useSelector(state => state.EmployeeZonesSlice)
  const { createFatherZone } = useSelector(state => state.EmployeeZonesSlice)
  const { createChildZone } = useSelector(state => state.EmployeeZonesSlice)
  const { permission } = useSelector(state => state.authenticatioauthennSlice);

  // use State hook for local state management
  const [modalShow, setModalShow] = useState(false);
  const [pageZone, setPageZone] = useState(0);
  const [rowsPerPageZone, setRowsPerPageZone] = useState(10);
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();

  // custom Funtion
  // a funtion to control zone page
  const handleChangePageZone = (event, newPage) => {
    setPageZone(newPage);
  };
  // a funtion to control row per page 
  const handleChangeRowsPerPageZone = event => {
    setRowsPerPageZone(parseInt(event.target.value));
    setPageZone(0);
  };

  // useEffect for api call incoming with pagination
  useEffect(() => {

    const body = {
      pagination: {
        "order": sortBy === 'asc' ? true : false,
        "page": pageZone,
        "size": rowsPerPageZone,
        "sortBy": orderBy ? orderBy : "id"
      }
    }
    dispatch(GetListFatherZones(body));
  }, [pageZone, rowsPerPageZone, orderBy, sortBy, createFatherZone, createChildZone])
  // return main page 
  return (
    <>
      <div className='head' style={{ paddingTop: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>PANEL DEVICE</h2>
        {
          permission?.includes(permissionObj?.WEB_ZONE_CREATE) &&

          <button
            style={{ width: '15%', height: '30px', cursor: 'pointer' }}
            className="btn btn-sm"
            onClick={() => setModalShow(true)}
          >
            {t("add_zone")}
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        }
      </div>
      <div className="subhead">
        <h5>{t("zones")}</h5>
        <p>{t("total")} {getListFatherZones?.numberOfElements}</p>
      </div>
      {
        getListFatherZones?.content?.length > 0 ?

          <>
            {
              getListFatherZones?.content.map((item, index) => {
                // zone Card render list
                return <ZonesCard key={index} item={item} />
              })
            }
          </>
          :
          <NotFoundDataWarning text={t("no_zone_data")} />

      }
      {/* pagination for zone per page */}
      {
        getListFatherZones?.content?.length > 0 &&
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[10, 15, 20, 30]}
            count={getListFatherZones?.totalElements}
            page={pageZone}
            onPageChange={handleChangePageZone}
            labelRowsPerPage={t("zone_per_page")}
            rowsPerPage={rowsPerPageZone}
            onRowsPerPageChange={handleChangeRowsPerPageZone}
          />
        </div>
      }


      {/* 
      Add Building Modal Start 
      this modal let you create a zone or sub zone 
      */}
      <AddZoneModal
        title={t("zone")}
        check="false"
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {/* Add Building Modal End */}
    </>
  );
};
export default Zones;
