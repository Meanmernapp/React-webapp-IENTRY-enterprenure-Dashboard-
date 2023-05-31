import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AllEmployeeCards from "./subComponents/AllEmployeeCards";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortFilter from "./Modal/SortFilter";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { permissionObj } from "../../../../Helpers/permission";
import { useDispatch, useSelector } from "react-redux";
import { handleSelfieImage } from "../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesSlice";
import listIcon from '../../../../assets/ic-list-detail.svg'
import GridIcon from '../../../../assets/grip-vertical-solid.svg'
import eyeIcon from '../../../../assets/eye-solid.svg'
import BoyAvatar from '../../../../assets/images/boyAvatarT.svg'
import womanAvatar from '../../../../assets/images/womanAvatarT.png'
import NotFoundDataWarning from "../../../../components/NotFoundDataWarning";
import TablePagination from '@mui/material/TablePagination';
import { GetAllEmployees } from "../../../../reduxToolkit/Employee/EmployeeApi";
import SearchIcon from "@mui/icons-material/Search";
import DeleteEmployeeModal from "./Modal/DeleteEmployeeModal";
import DisplayView from "../../../../components/DisplayView";

const AllEmployees = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation();
  // const lCode = Cookies.get("i18next") || "en";
  // useState
  const [modalShow, setModalShow] = useState(false);
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [view, setView] = useState("grid")
  const [searchEmployee, setSearchEmployee] = useState("");
  const [selectEmployeeForDelete, setSlectEmployeeForDelete] = useState([])
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [deleteEmployeeShow, setDeleteEmployeeShow] = useState(false)

  // useSelector 
  const { permission } = useSelector(state => state.authenticatioauthennSlice);
  const { getAllEmployees } = useSelector(state => state.EmployeeSlice);

  // this function control select all id or unSelect all
  const handelDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = getAllEmployees?.content?.map(item => {
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

  // console.log(orderBy, sortBy)
  const handlFilters = (order, sort) => {
    setOrderBy(order);
    setSortBy(sort);
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(handleSelfieImage(null))
  }, [])

  const elementRef = useRef(null);
  useEffect(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const distanceTop = rect.top+15;
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
    dispatch(GetAllEmployees(body))

  }, [page, rowsPerPage, orderBy, sortBy])



  return (
    <>
      <div className='head'>
        <div className='headLeft'>
          {/* <Link to="/dashboard/employee/company">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}></i>
          </Link> */}
          <h2>{t('employees')}</h2>
          <DisplayView view={view} setView={setView} />

        </div>
        <div className="container-top-right-btns"
        >


          <button className="import-file-btn-1"
            onClick={() => navigate("/dashboard/employee/all-employees/uploademployeefile")}
          >
            {(t('import'))}
            <br />
            {(t('file'))}
          </button>

          {
            permission?.includes(permissionObj?.WEB_EMPLOYEE_CREATE) &&

            <button className="add-btn-1"

              onClick={() => navigate("/dashboard/employee/all-employees/add-employee")}
            >
              <i class="fa fa-plus" aria-hidden="true"></i>
              {t('add')}
            </button>
          }

          <button className="delete-btn-1"

            disabled={selectEmployeeForDelete?.length === 0}
            onClick={() => {
              setDeleteEmployeeShow(true)
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
      {modalShow &&
        <SortFilter
          setModalShow={setModalShow}
          handlFilters={handlFilters}
        />}

      <div className="contractor-detail-page-sec">
        <input
          type="text"

          className="contractor-detail-page-search"
          value={searchEmployee}
          onChange={(e) => {
            setSearchEmployee(e.target.value);
          }}
        />
        <SearchIcon className="contractor-detail-page-search__icon" />
      </div>
      {
        view === "grid" &&
        <AllEmployeeCards
          searchEmployee={searchEmployee}
          setSlectEmployeeForDelete={setSlectEmployeeForDelete}
          selectEmployeeForDelete={selectEmployeeForDelete}
          handleCheckboxChange={handleCheckboxChange}

        />
      }
      {
        view === "list" &&

        // <div className="employee_list_view animated-div">
        <div className="panelTables animated-div px-1" ref={elementRef}>
          {
            getAllEmployees?.content?.length > 0 ?
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
                  <th>{t("role")}</th>
                  <th>{t("department")}</th>
                  <th>{t("employee_id")}</th>
                  <th>{t("details")}</th>
                  <th className='last'>{t("update")}</th>
                </thead>

                {
                  getAllEmployees?.content?.filter((user) => {
                    if (searchEmployee === "") {
                      return user;
                    } else if (
                      user?.name
                        ?.toLowerCase()
                        .includes(searchEmployee?.toLowerCase())
                    ) {
                      return user;
                    }
                  })?.map((item, index) => {
                    return (
                      <tr key={item?.id}>
                        <td className='first'>
                          <input type="checkbox" className="checkbox"
                            checked={selectEmployeeForDelete?.includes(item?.id)}
                            id={item?.id}
                            onChange={handleCheckboxChange}
                          />
                        </td>
                        < td className='first' >
                          <img src={item?.gender?.name === "MALE" && BoyAvatar ||
                            item?.gender?.name === "FEMALE" && womanAvatar ||
                            item?.gender === null && BoyAvatar

                          } alt="" className="name_avatar" />
                          {
                            item?.name
                            // + " " + 
                            // item?.secondLastName + " " + 
                            //  item?.lastName
                          }
                        </td>
                        <td>{item?.phoneNumber || "-"}</td>
                        <td >{item?.email || "-"}</td>
                        <td>{item?.role || "-"}</td>
                        <td > {item?.department || "-"} </td>
                        <td>IBL-0235</td>
                        <td className='tableIcon'>
                          <button className='btn-option'
                            onClick={() => {
                              navigate(`/dashboard/employee/all-employees/employee-Detail/${item?.id}`)
                            }}>
                            <img
                              src={eyeIcon} alt="eye"
                            />
                          </button>
                        </td>
                        <td className='tableIcon'>
                          <button className='btn-option'
                            onClick={() => navigate(`/dashboard/employee/all-employees/update-employee/${item?.id}`)}>
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
              <NotFoundDataWarning text={t("no_documents")} />
          }

        </div>
      }

      {
        getAllEmployees?.content?.length > 0 &&
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[8, 16, 24, 32]}
            count={getAllEmployees?.totalElements}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage={t('empolyee_per_page')}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      }

      <DeleteEmployeeModal
        show={deleteEmployeeShow}
        onHide={() => setDeleteEmployeeShow(false)}
        data={selectEmployeeForDelete}

      />

    </>
  );
};

export default AllEmployees;
