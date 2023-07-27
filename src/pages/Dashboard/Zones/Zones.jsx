import React, { useEffect, useState } from "react";
import { GetListFatherZones } from "../../../reduxToolkit/EmployeeZones/EmployeeZonesApi";
import AddZoneModal from "./Modal/AddZoneModal";
import ZonesCard from "./ZonesCard";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from '@mui/material/TablePagination';
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { permissionObj } from "../../../Helpers/permission";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
import DeleteModal from "../../Modals/DeleteModal";
import { DeleteItemsApi } from "../../../reduxToolkit/Commons/CommonsApi";

/*
Author : Arman Ali
Module: zone
github: https://github.com/Arman-Arzoo
website: https://www.toplinegeeks.com
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
  const { deleteItemsApi } = useSelector(state => state.CommonsSlice);

  // use State hook for local state management
  const [modalShow, setModalShow] = useState(false);
  const [pageZone, setPageZone] = useState(0);
  const [rowsPerPageZone, setRowsPerPageZone] = useState(10);
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [selectZoneForDelete, setSelectZoneForDelete] = useState([])
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [deleteShow, setDeleteShow] = useState(false)

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


  // this function control select all id or unSelect all
  const handelDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = getListFatherZones?.content?.map(item => {
        return item?.id
      })
      setSelectZoneForDelete(selectAllIds)


    } else {
      setSelectZoneForDelete([])
    }

  }
  // this function handle only specific id base on selection
  const handleCheckboxChange = (e) => {

    if (e.target.checked) {
      setSelectZoneForDelete([...selectZoneForDelete, e.target.id]);
    } else {
      setSelectZoneForDelete(selectZoneForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };

  // delete workshif
  const deleteZone = (deleteItem) => {
    const tableName = "zone"
    const body = deleteItem
    dispatch(DeleteItemsApi({ tableName, body }))
  }

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
  }, [pageZone, rowsPerPageZone, orderBy, sortBy, createFatherZone, createChildZone, deleteItemsApi])
  // return main page 
  return (
    <>
      <div className='head'
      // style={{ paddingTop: '1rem' }}
      >
        <div className="headLeft">
          <h2
          // style={{ fontSize: '1.5rem', fontWeight: '600' }}
          >{t('first_access')}</h2>
        </div>
        <div className="container-top-right-btns">
          {
            permission?.includes(permissionObj?.WEB_ZONE_CREATE) &&

            <button
              style={{ width: '15%', height: '30px', cursor: 'pointer' }}
              className="add-btn-1"
              onClick={() => setModalShow(true)}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
              {t("add")}
            </button>

          }
          <button className="delete-btn-1"
            disabled={selectZoneForDelete?.length === 0}
            onClick={() => {
              setDeleteShow(true)
            }}

          >
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            {t('delete')}
          </button>
        </div>
      </div>
      {/* <div className="subhead">
        <h5>{t("zones")}</h5>
        <p>{t("total")} {getListFatherZones?.numberOfElements}</p>
      </div> */}
      <div className="d-flex gap-1 " style={{ paddingLeft: "0.68rem" }}>
        <FormControlLabel className="grid-checkall" control={<Checkbox
          label="Label"
          checked={isAllChecked}
          onChange={handelDeleteAll}
          size="small" />} label={t("de_/_select_all")} />
      </div>
      {
        getListFatherZones?.content?.length > 0 ?

          <>
            {
              getListFatherZones?.content.map((item, index) => {
                // zone Card render list
                return <ZonesCard key={index} item={item} selectForDelete={selectZoneForDelete}
                  handleCheckboxChange={handleCheckboxChange} />
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
        title={t("first_access")}
        sub_title={t("zone")}
        check="false"
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {/* Add Building Modal End */}
      <DeleteModal
        show={deleteShow}
        onHide={() => setDeleteShow(false)}
        onClickFn={() => deleteZone(selectZoneForDelete)}
        data={selectZoneForDelete}
        title_modal={"first_access"}
        element_modal={"zone"}
        isReset={setSelectZoneForDelete}
        isAllReset={setIsAllChecked}
      />
    </>
  );
};
export default Zones;
