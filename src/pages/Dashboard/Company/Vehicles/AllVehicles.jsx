import React, { useEffect, useState, useRef } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterPopus from "./FilterPopus";
import { Link, useNavigate } from "react-router-dom";
import AllVehiclesCards from "./subComponents/AllVehiclesCards";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from "react-redux";
import { permissionObj } from "../../../../Helpers/permission";
import ic_left_icon from "../../../../assets/ic-left-arrow.svg"
import listIcon from '../../../../assets/ic-list-detail.svg'
import GridIcon from '../../../../assets/grip-vertical-solid.svg'
import eyeIcon from '../../../../assets/eye-solid.svg'
import NotFoundDataWarning from "../../../../components/NotFoundDataWarning";
import { GetAllVehicle } from "../../../../reduxToolkit/Vehicle/VehicleApi";
import TablePagination from '@mui/material/TablePagination';
import DeleteVehicleModal from "./modal/DeleteVehicleModal";
import SearchIcon from "@mui/icons-material/Search";
import DisplayView from "../../../../components/DisplayView";

const AllVehicles = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lCode = Cookies.get("i18next") || "en";
  const [modalShow, setModalShow] = useState();
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [searchVehicle, setSearchVehicle] = useState("");
  const [view, setView] = useState("grid")
  const [selectVehicleForDelete, setSlectVehicleForDelete] = useState([])
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [deleteVehicleShow, setDeleteVehicleShow] = useState(false)


  const { permission } = useSelector(state => state.authenticatioauthennSlice);
  const { getAllVehicle } = useSelector(state => state.VehicleSlice);
  const { uploadImage } = useSelector(state => state.sharedSlice);
  console.log(getAllVehicle)

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // this function control select all id or unSelect all
  const handelDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = getAllVehicle?.content?.map(item => {
        return item?.vehicle?.id
      })
      setSlectVehicleForDelete(selectAllIds)


    } else {
      setSlectVehicleForDelete([])
    }

  }
  // this function handle only specific id base on selection
  const handleCheckboxChange = (e) => {

    if (e.target.checked) {
      setSlectVehicleForDelete([...selectVehicleForDelete, e.target.id]);
    } else {
      setSlectVehicleForDelete(selectVehicleForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };

  const elementRef = useRef(null);
  useEffect(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const distanceTop = rect.top + 15;
      console.log(distanceTop);
      elementRef.current.style.setProperty('--top-value', `${distanceTop}px`);
    }
  }, [view]);

  useEffect(() => {
    const body = {
      order: sortBy === 'asc' ? true : false,
      page: page,
      size: rowsPerPage,
      sortBy: orderBy ? orderBy : "id"
    }
    dispatch(GetAllVehicle(body))

  }, [page, rowsPerPage, orderBy, sortBy, uploadImage])

  return (
    <>
      <div className='head'>
        <div className='headLeft'>
          <h2>{t('vehicles')}</h2>
          <DisplayView view={view} setView={setView} />
        </div>
        <div className="container-top-right-btns"
        >

          <button className="import-file-btn-1"
          >
            {(t('import'))}
            <br />
            {(t('file'))}
          </button>
          {

            permission?.includes(permissionObj?.WEB_VEHICLE_CREATE) &&
            <button className="add-btn-1"

              onClick={() => navigate("/dashboard/employee/allVehicles/create-vehicle")}
            >
              <i class="fa fa-plus" aria-hidden="true"></i>
              {t('add')}
            </button>

          }
          <button className="delete-btn-1"
            disabled={selectVehicleForDelete?.length === 0}
            onClick={() => {
              setDeleteVehicleShow(true)
            }}

          >
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            {t('delete')}
          </button>
          <button
            className="custom_primary_btn_dark"
            style={{ width: "48px", height: "48px" }}
            onClick={() => setModalShow(true)}
          >
            <FilterAltIcon style={{ fontSize: "32px" }} />
          </button>
        </div>
      </div>
      {modalShow && <FilterPopus setModalShow={setModalShow} />}
      {/* <div className="contractor-detail-page-sec">
        <input
          type="text"

          className="contractor-detail-page-search"
          value={searchVehicle}
          onChange={(e) => {
            setSearchVehicle(e.target.value);
          }}
        />
        <SearchIcon className="contractor-detail-page-search__icon" />
      </div> */}
      {/* select de select */}
      {
         view === "grid" &&

      <div className="d-flex gap-1 pl-2">

        <input type="checkbox" className="checkbox"
          checked={isAllChecked}
          onChange={handelDeleteAll}
        />
        
        <span className="text_size_12">de/select all</span>
      </div>
      }
      {
        view === "grid" &&
        <AllVehiclesCards
          searchVehicle={searchVehicle}
          setSlectVehicleForDelete={setSlectVehicleForDelete}
          selectVehicleForDelete={selectVehicleForDelete}
          handleCheckboxChange={handleCheckboxChange}
        />
      }

      {
        view === "list" &&

        <div className="panelTables px-1 animated-div" ref={elementRef}>
          {
            getAllVehicle?.content?.length > 0 ?
              <table style={{ width: "100%" }}>
                <thead>
                  <th className='first_head'>
                    <input type="checkbox" className="checkbox"
                      checked={isAllChecked}
                      onChange={handelDeleteAll}
                    />
                  </th>
                  <th className='first_head'>{t("brand")}</th>
                  <th>{t("sub_brand")}</th>
                  <th>{t("model")}</th>
                  <th>{t("color")}</th>
                  <th>{t("plates")}</th>
                  <th>{t("vin")}</th>
                  <th>{t("tag")}</th>
                  <th>{t("details")}</th>
                  <th className='last'>{t("update")}</th>
                </thead>

                {
                  getAllVehicle?.content?.filter((user) => {
                    if (searchVehicle === "") {
                      return user;
                    } else if (
                      user?.vehicle?.brand
                        ?.toLowerCase()
                        .includes(searchVehicle?.toLowerCase())
                    ) {
                      return user;
                    }
                  })?.map((item, index) => {
                    return (
                      <tr key={item?.id}>
                        <td className='first'>
                          <input type="checkbox" className="checkbox"
                            checked={selectVehicleForDelete?.includes(item?.vehicle?.id)}
                            id={item?.vehicle?.id}
                            onChange={handleCheckboxChange}
                          />
                        </td>
                        < td className='first' >

                          {
                            item?.vehicle?.brand
                            // + " " + 
                            // item?.secondLastName + " " + 
                            //  item?.lastName
                          }
                        </td>
                        <td>{item?.vehicle?.subBrand || "-"}</td>
                        <td >{item?.vehicle?.model || "-"}</td>
                        <td>{item?.vehicle?.color || "-"}</td>
                        <td > {item?.vehicle?.plate || "-"} </td>
                        <td>{item?.vehicle?.vin || "-"}</td>
                        <td>{item?.vehicle?.tag || "-"}</td>
                        <td className='tableIcon'>
                          <button className='btn-option'
                            onClick={() => {
                              navigate(`/dashboard/employee/allVehicles/vehicle-detail/${item?.vehicle?.id}`)
                            }}>
                            <img
                              src={eyeIcon} alt="eye"
                            />
                          </button>
                        </td>
                        <td className='tableIcon'>
                          <button className='btn-option'
                            onClick={() => navigate(`/dashboard/employee/allVehicles/update-vehicle/${item?.vehicle?.id}`)}>
                            <i className="fa fa-pencil" aria-hidden="true"
                              style={{ color: "#146F62" }}
                            // onClick={() => navigate(`/dashboard/employee/all-employees/update-employee/${item?.id}`)}
                            ></i>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }

              </table> :
              <NotFoundDataWarning text={t("no_documents")} />
          }

        </div>

      }


      {
        getAllVehicle?.content?.length > 0 &&
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[8, 16, 24, 32]}
            count={getAllVehicle?.totalElements}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage={t('vehicle_per_page')}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      }

      <DeleteVehicleModal
        show={deleteVehicleShow}
        onHide={() => setDeleteVehicleShow(false)}
        data={selectVehicleForDelete}

      />
    </>
  );
};

export default AllVehicles;
