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
import SearchFor from "../../../Modals/SearchFor";
import { MODELS } from "../../../../Apis/Models";
import { TABLES } from "../../../../Apis/Tables";
import { SearchByFilters } from "../../../../reduxToolkit/Search/SearchApi";
import genderId from "../../../../hooks/genderId";
import { current } from "immer";
import { toast } from 'react-toastify';
import { Checkbox, Tooltip } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import SettingButton from "../../../../components/SettingButton";
import HeaderSettingButton from "../../../../components/HeaderSettingButton";

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
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [view, setView] = useState("list")
  const [searchEmployee, setSearchEmployee] = useState("");
  const [selectEmployeeForDelete, setSlectEmployeeForDelete] = useState([])
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [deleteEmployeeShow, setDeleteEmployeeShow] = useState(false)
  const [filterDialogShow, setFilterDialogShow] = useState(false)
  const [finalArray, setFinalArray] = useState([])
  const [showTooltip, setShowTooltip] = useState(false);
  const [loaded, setLoaded] = useState(false);


  // useSelector 
  const { permission } = useSelector(state => state.authenticatioauthennSlice);
  const { getAllEmployees } = useSelector(state => state.EmployeeSlice);
  const { searchByFilters } = useSelector(state => state.SearchSlice);

  // Props to the filter window
  const moduleId = `${MODELS.Employee}`;
  const option = `${TABLES.EMPLOYEES}`;

  const spanRef = useRef(null);
  const tdRef = useRef(null)

  // this function control select all id or unSelect all
  const handelDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = searchByFilters?.content?.map(item => {
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

  // useEffect to check automatically all the items when page, rowsPerPage, or search change
  useEffect(() => {
    if (isAllChecked) {
      const selectAllIds = searchByFilters?.content?.map(item => item?.id);
      setSlectEmployeeForDelete(prevState => {
        const uniqueIds = selectAllIds.filter(id => !prevState.includes(id));
        return [...prevState, ...uniqueIds];
      });
    }
  }, [searchByFilters])

  //This fragment makes uncheked all the checkboxes when toggleState change
  const resetAllCheckboxes = () => {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  const elementRef = useRef(null);
  useEffect(() => {

    resetAllCheckboxes();
    setSlectEmployeeForDelete([]);
    setIsAllChecked(false);
    setPage(0)
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const distanceTop = rect.top + 15;
      console.log(distanceTop);
      elementRef.current.style.setProperty('--top-value', `${distanceTop}px`);
    }
    if (view !== 'grid') {
      setRowsPerPage(20)
    } else {
      setRowsPerPage(8)
    }
  }, [view]);

  // useEffect to avoid first load
  useEffect(() => {
    setLoaded(true);
  }, [view, page, rowsPerPage, finalArray]);

  // useEffect to avoid first load
  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {


      const criteriaList = finalArray.map((item) => {
        return {
          dataOption: item.dataOption,
          fieldType: item.fieldType,
          filterKey: item.filterKey,
          operation: item.operation,
          sort: item.sort,
          table: item.table,
          values: item.values,
          from: item.from,
          to: item.to
        };
      });

      const body = {
        pagination: {
          page: page,
          size: rowsPerPage,
        },
        searchCriteriaList: criteriaList
      }
      dispatch(SearchByFilters({ option, body })).then(({ payload: { data: { data, success } } }) => {
        {
          (success !== true) && toast.error(t('fail_to_complete_fetch'))
        }
      })
      // const body = {
      //   order: sortBy === 'asc' ? true : false,
      //   page: page,
      //   size: rowsPerPage,
      //   sortBy: orderBy ? orderBy : "id"
      // }
      // dispatch(GetAllEmployees(body))
      setLoaded(false)
    }

  }, [loaded, page, rowsPerPage, finalArray])



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

        <div className="d-flex flex-column gap-1">

          <SettingButton onAction={()=>navigate("/dashboard/employee/user-restriction")}
          title={t("modify_settings")?.toUpperCase()} />
              <HeaderSettingButton onAction={()=>navigate("/dashboard/employee/company/headers")}
          title={t("modify_headers")?.toUpperCase()} />
        </div>

          {/* <button className="import-file-btn-1"
            onClick={() => navigate("/dashboard/employee/all-employees/uploademployeefile")}
          >
            {(t('import'))}
            <br />
            {(t('file'))}
          </button> */}

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
            className="filter-btn-1"
            style={{ width: "48px", height: "48px" }}
            onClick={() => setFilterDialogShow(true)}
          >
            <FilterAltIcon style={{ fontSize: "32px" }} />
          </button>
          {/* <button
            className="custom_primary_btn_dark"
            style={{ width: "48px", height: "48px" }}
            onClick={() => setModalShow(true)}
          >
            <FilterAltIcon style={{ fontSize: "32px" }} />
          </button> */}
        </div>
      </div>
      {modalShow &&
        <SortFilter
          setModalShow={setModalShow}
          handlFilters={handlFilters}
        />}

      {/* <div className="contractor-detail-page-sec">
        <input
          type="text"

          className="contractor-detail-page-search"
          value={searchEmployee}
          onChange={(e) => {
            setSearchEmployee(e.target.value);
          }}
        />
        <SearchIcon className="contractor-detail-page-search__icon" />
      </div> */}
      {
        view === "grid" &&

        <div className="d-flex ml-1 pl-0">

          <FormControlLabel className="grid-checkall" control={<Checkbox
            label="Label"
            checked={isAllChecked}
            onChange={handelDeleteAll}
            size="small" />} label={t("de_/_select_all")} />

        </div>
      }
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
        <div className="panelTables w-100 animated-div px-1" ref={elementRef}>
          {
            // getAllEmployees?.content?.length > 0 ?
            searchByFilters?.content?.length > 0 ?
              <table className="w-100">
                <thead>
                  <th className='first_head'>
                    <Tooltip title={t("de_/_select_all").toUpperCase()} placement="top">
                      <Checkbox
                        className="grid-checkall checkbox"
                        checked={isAllChecked}
                        onChange={handelDeleteAll}
                        size="small"
                      />
                    </Tooltip>
                    {/* <input type="checkbox" className="checkbox"
                      checked={isAllChecked}
                      onChange={handelDeleteAll}
                    /> */}
                  </th>
                  <th className='first_head pl-0'>{t("name")}</th>
                  <th>{t("last_name")}</th>
                  <th>{t("second_last_name")}</th>
                  <th>{t("email")}</th>
                  <th>{t("phone_number")}</th>
                  <th>{t("work_station")}</th>
                  <th>{t("role")}</th>
                  <th>{t("department")}</th>
                  <th>{t("employee_id")}</th>
                  {/* <th>{t("details")}</th> */}
                  <th className='last'>{t("update")}</th>
                </thead>

                {
                  searchByFilters?.content?.filter((user) => {
                    // getAllEmployees?.content?.filter((user) => {
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
                          <Checkbox
                            className="grid-checkall checkbox"
                            checked={selectEmployeeForDelete?.includes(item?.id)}
                            id={item?.id}
                            onChange={handleCheckboxChange}
                            size="small"
                          />
                          {/* <input type="checkbox" className="checkbox"
                            checked={selectEmployeeForDelete?.includes(item?.id)}
                            id={item?.id}
                            onChange={handleCheckboxChange}
                          /> */}
                        </td>
                        < td ref={tdRef} className='first pl-0 align-middle' style={{ maxWidth: 180 }}>

                          {
                            <>
                              {/* {(item?.name.length > 12) ? */}
                              {/* {showTooltip ? */}
                              {/* <Tooltip title={item.name}>
                                  <span ref={spanRef} style={{ textTransform: "none", maxWidth: "99%", display:"inline-block", textOverflow:"ellipsis", whiteSpace:"nowrap", overflow:"hidden" }}>
                                    <img src={item?.genderId === 1 && BoyAvatar ||
                                      item?.genderId === 2 && womanAvatar ||
                                      item?.genderId === null && BoyAvatar
                                    } alt="" className="name_avatar mr-2" />
                                    {
                                      (item?.name)
                                      // .slice(0, 12) + '...'
                                    }
                                  </span>
                                </Tooltip> */}
                              {/* : */}
                              <span className="align-middle" title={item?.name} ref={spanRef} style={{ textTransform: "none", maxWidth: "100%", display: "inline-block", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }} >
                                <img src={item?.genderId === 1 && BoyAvatar ||
                                  item?.genderId === 2 && womanAvatar ||
                                  item?.genderId === null && BoyAvatar
                                } alt="" className="name_avatar mr-2 align-middle" />
                                {item?.name}
                              </span>

                              {/* :
                                <span style={{textTransform: "none", display:"inline-block",textOverflow:"ellipsis", whiteSpace:"nowrap", overflow:"hidden" }} >
                                  <img src={item?.genderId === 1 && BoyAvatar ||
                                    item?.genderId === 2 && womanAvatar ||
                                    item?.genderId === null && BoyAvatar
                                  } alt="" className="name_avatar mr-2" />
                                  {
                                    (item?.name)
                                  }
                                </span> */}

                              {/* {((item.name+' ' || '') + (item.lastName+' ' || '') + (item.secondLastName || '')).length > 20 ?
                                (<Tooltip title={((item.name || '') + (item.lastName ? ' ' + item.lastName : '') + (item.secondLastName ? ' ' + item.secondLastName : ''))} arrow>
                                <span style={{ textTransform:"none" }}>
                                  {((item.name || '') + (item.lastName ? ' ' + item.lastName : '') + (item.secondLastName ? ' ' + item.secondLastName : ''))?.slice(0, 20) + '...'}
                                </span>
                              </Tooltip>) :
                                (item.name+' ' || '') + (item.lastName+' ' || '') + (item.secondLastName || '')
                              } */}
                              {/* {((item.name || '') + (item.lastName ? ' ' + item.lastName : '') + (item.secondLastName ? ' ' + item.secondLastName : '')).slice(0, 20) + '...'} */}
                              {/* ({item.name+' '} {item.lastName && item.lastName+' '} {item.secondLastName && item.secondLastName}).slice(0, 20) + '...'; */}
                            </>
                          }
                          {/* {
                          item?.name + ' ' 
                          + item?.lastName + ' '
                          + item?.secondLastName
                          } */}
                        </td>
                        <td >{item?.lastName || "-"}</td>
                        <td >{item?.secondLastName || "-"}</td>
                        <td >{item?.email || "-"}</td>
                        <td>{item?.phoneNumber || "-"}</td>
                        <td >{item?.workStation || "-"}</td>
                        <td>{item?.role || "-"}</td>
                        <td > {item?.department || "-"} </td>
                        <td>{item?.employeeId || "-"}</td>
                        {/* <td className='tableIcon'>
                          <button className='btn-option'
                            onClick={() => {
                              navigate(`/dashboard/employee/all-employees/employee-Detail/${item?.id}`)
                            }}>
                            <img
                              src={eyeIcon} alt="eye"
                            />
                          </button>
                        </td> */}
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
              <NotFoundDataWarning text={t("no_employees_to_show")} />
          }

        </div>
      }

      {
        // getAllEmployees?.content?.length > 0 &&
        searchByFilters?.content?.length > 0 &&
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={view === 'grid' ? [8, 16, 24, 32] : [20, 40, 60]}
            count={searchByFilters?.totalElements}
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
      <SearchFor
        open={filterDialogShow}
        onClose={() => {
          setFilterDialogShow(false);
        }}
        onFiltered={(originalArray) => {
          setFilterDialogShow(false);
          setFinalArray(originalArray);
        }}
        moduleId={moduleId}
        option={option}
        finalArray={finalArray}
      />

    </>
  );
};

export default AllEmployees;
