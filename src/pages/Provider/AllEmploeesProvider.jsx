
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
import { GetAllStatusProvider, ProviderslistOfEmployees } from '../../reduxToolkit/Providers/providersApi';
import BootstrapTooltip from '../../utils/BootstrapTooltip';
import AllEmployeeCards from './AllEmployeeCards';

const AllEmploeesProvider = () => {
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

  const { providerslistOfEmployees } = useSelector(state => state?.providersSlice)

  console.log(providerslistOfEmployees)




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
      const selectAllIds = providerslistOfEmployees?.content?.map(item => {
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
    dispatch(ProviderslistOfEmployees(body));
  }, [page, rowsPerPage, orderBy, sortBy])
  return (
    <>
      {/* head with back link */}
      <div className='head'>
        <div className='headLeft'>
          <h2>{t('employees')}</h2>
          <DisplayView view={view} setView={setView} />
        </div>
        <div className="container-top-right-btns"
        >


          {

            // permission?.includes(permissionObj?.WEB_VEHICLE_CREATE) &&
            <button className="add-btn-1"

              onClick={() => navigate("/dashboard/supplier/create-employee")}
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
            providerslistOfEmployees?.content?.length > 0 ?

              <AllEmployeeCards
                apidata={providerslistOfEmployees}
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
            providerslistOfEmployees?.content?.length > 0 ?
              <table style={{ width: "100%" }}>
                <thead>
                  <th className='first_head'>
                    <input type="checkbox" className="checkbox"
                      checked={isAllChecked}
                      onChange={handelDeleteAll}
                    />
                  </th>
                  <th className='first_head'>{t("name")}</th>
                  <th>{t("phone_number")}</th>
                  <th>{t("email")}</th>
                  <th>{t("dob")}</th>
                  <th>{t("status")}</th>
                  <th>{t("options")}</th>
                  <th className='last'>{t("update")}</th>
                </thead>

                {
                  providerslistOfEmployees?.content?.map((item, index) => {
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
                          <img src={item?.genderId === 1 && BoyAvatar ||
                            item?.genderId === 2 && womanAvatar ||
                            item?.genderId === null && BoyAvatar

                          } alt="" className="name_avatar mr-2" />
                          {
                            item && item.name
                              ? `${item.name} ${item.firstLastName} ${item.secondLastName !== null ? item.secondLastName : ""}`
                              : "-"
                          }

                        </td>
                        <td>{item?.phoneNumber || "-"}</td>
                        <td >{item?.email || "-"}</td>
                        <td> {dob ? dob.toLocaleDateString("en-US") : "" || "-"}</td>
                        <td style={{ color: checkStatus(item?.statusId), fontWeight: 'bold', fontSize: "12px" }}> {statusId(item?.statusId) || "-"} </td>

                        <td className='tableIcon'>
                          <BootstrapTooltip title={item?.statusId == 3 ? t('complete_documents') : t('employee_details')} placement="top">
                            <button className='btn-option'
                              onClick={() => {
                                item?.statusId == 3 ?

                                  navigate(`/dashboard/supplier/complete-document`) :
                                  navigate(`/dashboard/supplier/supplier-order-detail`)

                              }}>
                              <img
                                src={eyeIcon} alt="eye"
                              />
                            </button>
                          </BootstrapTooltip>
                        </td>
                        <td className='tableIcon'>
                          <button className='btn-option'
                          // onClick={() => navigate(`/dashboard/employee/allVehicles/update-vehicle/${item?.vehicle?.id}`)}
                          >
                            <i className="fa fa-pencil" aria-hidden="true"
                              style={{ color: "#146F62" }}
                              onClick={() => navigate(`/dashboard/supplier/update-employee`)}
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
        providerslistOfEmployees?.content?.length > 0 &&
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[8, 16, 24, 32]}
            count={providerslistOfEmployees?.totalElements}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage={t('employees_per_page')}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      }
    </>
  )
}

export default AllEmploeesProvider
