
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TablePagination from '@mui/material/TablePagination';
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import eyeIcon from '../../assets/eye-solid.svg';
import BoyAvatar from '../../assets/images/boyAvatarT.svg';
import womanAvatar from '../../assets/images/womanAvatarT.png';
import DisplayView from '../../components/DisplayView';
import NotFoundDataWarning from '../../components/NotFoundDataWarning';
import checkStatus from '../../hooks/checkStausColor';
import statusId from '../../hooks/statusId';
import { GetGenderListProvider } from '../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi';
import { GetAllStatusProvider, GetProviderVehicleDetail, ProviderlistOfVehicles } from '../../reduxToolkit/Providers/providersApi';
import BootstrapTooltip from '../../utils/BootstrapTooltip';
import AllEmployeeCards from './AllEmployeeCards';
import AllVehicleCards from "./AllVehicleCards";

const AllVehiclesProvider = () => {
  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [view, setView] = useState("grid")
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [selectEmployeeForDelete, setSlectEmployeeForDelete] = useState([])
  const [isAllChecked, setIsAllChecked] = useState(false)

  const { providerlistOfVehicles,saveProviderVehicleImage } = useSelector(state => state?.providersSlice)

  console.log(providerlistOfVehicles)




  // functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };


  // this function control select all id or unSelect all
  const handelDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = providerlistOfVehicles?.content?.map(item => {
        return item?.id
      })
      setSlectEmployeeForDelete(selectAllIds)


    } else {
      setSlectEmployeeForDelete([])
    }

  }
  // this function handle only specific id base on selection
  const handleCheckboxChange = (e) => {

    if (e.target.checked) {
      setSlectEmployeeForDelete([...selectEmployeeForDelete, e.target.id]);
    } else {
      setSlectEmployeeForDelete(selectEmployeeForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };

  // useEffect 
  useEffect(() => {
    dispatch(GetGenderListProvider())
    dispatch(GetAllStatusProvider())

  }, [])

  useEffect(() => {

    const body = {
      providerId: localStorage.getItem("providerId"),
      pagination: {
        "order": sortBy === 'asc' ? true : false,
        "page": page,
        "size": rowsPerPage,
        "sortBy": orderBy ? orderBy : "id"
      }
    }
    dispatch(ProviderlistOfVehicles(body));
  }, [page, rowsPerPage, orderBy, sortBy,saveProviderVehicleImage])
  return (
    <>
      {/* head with back link */}
      <div className='head'>
        <div className='headLeft'>
          <h2>{t('vehicles')}</h2>
          <DisplayView view={view} setView={setView} />
        </div>
        <div className="container-top-right-btns"
        >

          {/* <button className="import-file-btn-1"
          >
            {(t('import'))}
            <br />
            {(t('file'))}
          </button> */}
          {

            // permission?.includes(permissionObj?.WEB_VEHICLE_CREATE) &&
            <button className="add-btn-1"

              onClick={() => navigate("/dashboard/supplier/add-vehicles")}
            >
              <i class="fa fa-plus" aria-hidden="true"></i>
              {t('add')}
            </button>

          }
          <button className="delete-btn-1"
            disabled={selectEmployeeForDelete?.length === 0}
            onClick={() => {
              // setDeleteVehicleShow(true)
            }}

          >
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            {t('delete')}
          </button>
          <button
            className="custom_primary_btn_dark"
            style={{ width: "48px", height: "48px" }}
          // onClick={() => setModalShow(true)}
          >
            <FilterAltIcon style={{ fontSize: "32px" }} />
          </button>
        </div>
      </div>

      {/* main */}
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
        <>
          {
            providerlistOfVehicles?.content?.length > 0 ?

              <AllVehicleCards
                apidata={providerlistOfVehicles}
                selectForDelete={selectEmployeeForDelete}
                handleCheckboxChange={handleCheckboxChange}
              />
              :
              <>
                <NotFoundDataWarning text={t("no_data")} />

              </>
          }
        </>
      }

      {
        view === "list" &&

        <div className="panelTables px-1 animated-div"
        // ref={elementRef}
        >
          {
            providerlistOfVehicles?.content?.length > 0 ?
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
                  <th>{t("s/n")}</th>
                  <th>{t("vin")}</th>
                  <th>{t("status")}</th>
                  <th>{t("options")}</th>
                  <th className='last'>{t("update")}</th>
                </thead>

                {
                  providerlistOfVehicles?.content?.map((item, index) => {
                    const dob = item?.dob ? new Date(item?.dob) : ""

                    return (
                      <tr key={item?.id}>
                        <td className='first'>
                          <input type="checkbox" className="checkbox"
                            checked={selectEmployeeForDelete?.includes(item?.id)}
                            id={item?.id}
                            onChange={handleCheckboxChange}
                          />
                        </td>
                        < td className='first ' >
                          {/* <img src={item?.genderId === 1 && BoyAvatar ||
                            item?.genderId === 2 && womanAvatar ||
                            item?.genderId === null && BoyAvatar

                          } alt="" className="name_avatar mr-2" /> */}
                          {
                            item?.brand || "-"
                            // + " " + 
                            // item?.secondLastName + " " + 
                            //  item?.lastName
                          }
                        </td>
                        <td>{item?.subBrand || "-"}</td>
                        <td >{item?.model || "-"}</td>
                        <td >{item?.color || "-"}</td>
                        <td >{item?.plate || "-"}</td>
                        <td >{item?.serialNumber || "-"}</td>
                        <td >{item?.vin || "-"}</td>
                        <td style={{ color: checkStatus(item?.status?.id), fontWeight: 'bold', fontSize: "12px" }}> {statusId(item?.status?.id) || "-"} </td>

                        <td className='tableIcon'>
                          <BootstrapTooltip title={item?.status?.id == 3 ? t('complete_documents') : t('vehicle_details')} placement="top">
                            <button className='btn-option'
                              onClick={() => {
                                item?.status.id == 3 ?

                                  navigate(`/dashboard/supplier/vehicle-documents`) :
                                  navigate(`/dashboard/supplier/vehicles-details`)
                                dispatch(GetProviderVehicleDetail(item?.id));

                                localStorage.setItem("vehicleidfordetail", item?.id)



                              }}

                            >
                              <img
                                src={eyeIcon} alt="eye"
                              />
                            </button>
                          </BootstrapTooltip>
                        </td>
                        <td className='tableIcon'>
                          <button className='btn-option'
                             onClick={() => navigate(`/dashboard/supplier/update-vehicles`)}
                  
                          >
                            <i className="fa fa-pencil" aria-hidden="true"
                              style={{ color: "#146F62" }}
                            
                            ></i>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }

              </table> :
              <NotFoundDataWarning text={t("no_data")} />
          }

        </div>

      }


      {
        providerlistOfVehicles?.content?.length > 0 &&
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[8, 16, 24, 32]}
            count={providerlistOfVehicles?.totalElements}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage={t('vehicles_per_page')}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      }
    </>
  )
}

export default AllVehiclesProvider
