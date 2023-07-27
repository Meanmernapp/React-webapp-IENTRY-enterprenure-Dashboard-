import { useState, useRef } from "react";
import apiInstance from "../../../Apis/Axios";
import { Box, Grid, InputLabel, MenuItem, Select, Divider } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { FormControl } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TablePagination from "@mui/material/TablePagination";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import eyeIcon from '../../../assets/eye-solid.svg'
import { GetAllEmployeeContractors, GetAllEmployeeContracts, } from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import { getAllEmployeeContracts } from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice";
import { useSelector } from "react-redux";
import ContractorTable from "./ContractorTable";
import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
import DisplayView from "../../../components/DisplayView";
import DeleteContractModal from "./modal/DeleteContractModal";
import DeleteContractorModal from "./modal/DeleteContractorModal";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchFor from "../../Modals/SearchFor";
import { MODELS } from "../../../Apis/Models";
import { TABLES } from "../../../Apis/Tables";
import { SearchByFilters } from "../../../reduxToolkit/Search/SearchApi";
import { status } from "../../../enums/statusEnum";
import { toast } from 'react-toastify';
import { GoPrimitiveDot } from 'react-icons/go'
import { Checkbox, Tooltip } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import SettingButton from "../../../components/SettingButton";


/*
Author : Arman Ali
Module: contractor
github: https://github.com/Arman-Arzoo
some one else CodeRefactor 
*/

const ContractorPanel = () => {
  // hook 
  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();
  const navigate = useNavigate()

  // useState
  const [orderby, setOrderby] = useState("id");
  const [sort, setSort] = useState();
  const [checked, setChecked] = useState(true);
  const [show, setShow] = useState(false);
  const [view, setView] = useState("list")
  const [toggleState, setToggleState] = useState(1);
  const [showIncome, setShowIncome] = useState(false);
  const [allFilters, setAllFilters] = useState("id");
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [selectContractForDelete, setSelectContractForDelete] = useState([])
  const [deleteContractShow, setDeleteContractShow] = useState(false)
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [selectContractorForDelete, setSelectContractorForDelete] = useState([])
  const [deleteContractorShow, setDeleteContractorShow] = useState(false)
  const [isAllCheckedContractor, setIsAllCheckedContractor] = useState(false)
  const [filterDialogShow, setFilterDialogShow] = useState(false)
  const [finalArray, setFinalArray] = useState([])
  const [loaded, setLoaded] = useState(false);
  const [dropDownProps, setDropDownProps] = useState({
    panel: "contractor",
    firstItem: "ALLOW EVENT",
    secondItem: "VIEW DETAILS",
  });
  // useSelector
  const fetchAllContracts = useSelector(getAllEmployeeContracts);
  let dispatch = useDispatch();
  const { searchByFilters } = useSelector(state => state.SearchSlice);

  // Props to the filter window
  const [moduleId, setModuleId] = useState(`${MODELS.Contract}`);
  const [option, setOption] = useState(`${TABLES.CONTRACTS}`);

  // function
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // toggele function
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handlFilters = (order, sort) => {
    setOrderBy(order);
    setSortBy(sort);
  };

  // functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  let contractPagination = {
    order: sortBy === "asc" ? true : false,
    page: page,
    size: rowsPerPage,
    sortBy: orderBy ? orderBy : "id",
  };

  const fetchFilterApi = async () => {
    const result = await apiInstance
      .get("assets-service/contract/get-filters")
      .then(function (response) {
        setAllFilters(response?.data?.data);
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  };

  // useEffect to avoid first load
  useEffect(() => {
    setLoaded(true);
  }, [toggleState, view, page, rowsPerPage, finalArray]);

  // useEffect to avoid first load
  useEffect(() => {
    setLoaded(true);
  }, []);

  // useEffect to check automatically all the items when page, rowsPerPage, or search change
  useEffect(() => {
    if (isAllChecked) {
      const selectAllIds = searchByFilters?.content?.map(item => item?.id);
      setSelectContractForDelete(prevState => {
        const uniqueIds = selectAllIds.filter(id => !prevState.includes(id));
        return [...prevState, ...uniqueIds];
      });
    }
    if (isAllCheckedContractor) {
      const selectAllIds = searchByFilters?.content?.map(item => item?.id);
      setSelectContractorForDelete(prevState => {
        const uniqueIds = selectAllIds.filter(id => !prevState.includes(id));
        return [...prevState, ...uniqueIds];
      });
    }
  }, [searchByFilters])

  // this function control select all id or unSelect all
  const handelDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = searchByFilters?.content?.map(item => {
        return item?.id
      })
      setSelectContractForDelete(selectAllIds)


    } else {
      setSelectContractForDelete([])
    }

  }
  // this function handle only specific id base on selection
  const handleCheckboxChange = (e) => {

    if (e.target.checked) {
      setSelectContractForDelete([...selectContractForDelete, e.target.id]);
    } else {
      setSelectContractForDelete(selectContractForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };

  //Clean any checkbox when toggle change
  useEffect(() => {
    resetAllCheckboxes();
    setSelectContractForDelete([]);
    setSelectContractorForDelete([]);
    setIsAllChecked(false);
    setIsAllCheckedContractor(false);

  }, [toggleState, view]);

  // This components are used to calculate the distance between the top of the window and the top of the table panel
  const elementRef = useRef(null);
  const elementRefer = useRef(null);
  useEffect(() => {
    if (elementRefer.current && toggleState === 1) {
      const rect = elementRefer.current.getBoundingClientRect();
      const distanceTop = rect.top + 11;
      elementRefer.current.style.setProperty('--top-value', `${distanceTop}px`)
    }
    if (elementRef.current && toggleState === 2) {
      const rect = elementRef.current.getBoundingClientRect();
      const distanceTop = rect.top + 11;
      elementRef.current.style.setProperty('--top-value', `${distanceTop}px`)
    }

  }, [toggleState, view, checked, orderby, rowsPerPage, page, sortBy]);

  useEffect(() => {
    if (view === 'grid') {
      setRowsPerPage(8)
    } else {
      setRowsPerPage(20)
    }
  }, [view])

  //Create body to get the respectively search
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
      setLoaded(false)
    }

  }, [loaded, checked, page, rowsPerPage, orderBy, sortBy, finalArray, toggleState])

  var now = new Date();
  var nowIso = now.toISOString(); //"2020-07-24T06:11:49.911Z"
  var nowInMilliseconds = Date.parse(nowIso);
  var date = new Date("11/21/1987 16:00:00"); // some mock date
  var milliseconds = date.getTime();
  useEffect(() => {
    dispatch(GetAllEmployeeContractors());
    /*author mazhar iqbal
      get contract filter attribute list
    */
    fetchFilterApi();
  }, []);
  let inCommingActive = checked === false
    ? `incoming-active/${nowInMilliseconds}`
    : `records/${milliseconds}`;

  useEffect(() => {
    if (checked) {
      /*author mazhar iqbal
        get incommig contracts
      */
      dispatch(
        GetAllEmployeeContracts({ inCommingActive, contractPagination })
      );
    } else {
      /*author mazhar iqbal
        get contracts records
      */
      dispatch(
        GetAllEmployeeContracts({ inCommingActive, contractPagination })
      );
    }
  }, [checked, orderby, rowsPerPage, page, sortBy]);

  //This fragment makes uncheked all the checkboxes when toggleState change
  const resetAllCheckboxes = () => {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  const handleStatus = (paramId) => {
    return paramId === 2 ? "#F2A100" :
      paramId === 3 ? "blue" :
        paramId === 4 ? "#0C4523" :
          paramId === 5 ? "orange" :
            paramId === 6 ? "#BC0000" : "black"
  }

  const options = {
    filterType: "checkbox",
  };

  return (
    <>
      <div className="providersPanel contractors">
        <div className="head">
          <div className="headLeft ">
            <h2 className="mr-2">{t('contractors_panel')}</h2>
            
          <SettingButton onAction={()=>navigate("/dashboard/employee/contractor-restriction")}
          title={t("restriction")} />
          </div>
        </div>
        <div>
          <div className="row steps-row mb-3 mx-0" id="pills-tab" role="tablist">
            <div role="presentation"
              className={`col-6 text-center p-0 tap_hover ${toggleState === 1 ? 'active_tap' : 'deactive_tap'}`}

            >
              <a
                className={`steps-global btn ${toggleState === 1 ? 'btn-bordered-global' : ''
                  }`}
                onClick={() => {
                  if (toggleState !== 1) {
                    setPage(0)
                    setToggleState(1);
                    setView('list')
                    setRowsPerPage(20)
                    // if (view === 'grid') {
                    //   setRowsPerPage(8)
                    // } else {
                    //   setRowsPerPage(20)
                    // }
                    setOption(`${TABLES.CONTRACTS}`);
                    setModuleId(`${MODELS.Contract}`);
                    setFinalArray([]);
                  }
                }}
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <span>{t("contract")}</span>
              </a>
            </div>
            <div role="presentation"
              className={`col-6 text-center p-0 tap_hover ${toggleState === 2 ? 'active_tap' : 'deactive_tap'}`}
            >
              <a
                className={`steps-global btn ${toggleState === 2 ? 'btn-bordered-global' : ''
                  }`}
                onClick={() => {
                  if (toggleState !== 2) {
                    setPage(0)
                    setToggleState(2);
                    setRowsPerPage(20)
                    setOption(`${TABLES.CONTRACTORS}`);
                    setModuleId(`${MODELS.Contractor}`)
                    setFinalArray([])
                  }
                }}
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <span>{t("contractors")}</span>
              </a>
            </div>
          </div>
          <div className="tab-content" id="pills-tabContent">
            <div
              className={`${toggleState === 1 ? "tab-pane fade show active " : "tab-pane fade"
                }`}
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="orders animated-div">
                <div
                  className="head d-flex justify-content-space-between"
                  style={{ position: "relative", margin: '0rem' }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span className="d-flex font-weight-bold">{t("options")}</span>
                      <DisplayView view={view} setView={setView} />
                    </div>

                  </div>

                  <div className="container-top-right-btns">
                    <button className="add-btn-1"
                      onClick={() => navigate("/dashboard/employee/contractors/create-contract")}
                    >
                      <i class="fa fa-plus" aria-hidden="true"></i>
                      {t('add')}
                    </button>
                    <button className="delete-btn-1"

                      disabled={selectContractForDelete?.length === 0}
                      onClick={() => {
                        setDeleteContractShow(true)
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

                  </div>

                  {showIncome && (
                    <div
                      className="col-md-3 filter_parent"
                      style={{
                        right: "50px",
                        top: "0px",
                        zIndex: "101",
                      }}
                    >
                      <p className="filter_header">
                        {t('filters')}
                        <CloseIcon
                          style={{
                            marginTop: "10px",
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => setShowIncome(false)}
                        />
                      </p>
                      <div className="filter_body d-flex justify-content-between py-3">
                        <div className="col-md-12">
                          <p>{t("attributes")}</p>
                          <Box
                            style={{ marginTop: "20px !important" }}
                            className="mt-2"
                            sx={{
                              width: "100%",
                              maxWidth: "100%",
                              fontSize: "20px",
                              height: "40px",
                            }}
                          >
                            <FormControl fullWidth>
                              <InputLabel>{t("order_by")}</InputLabel>
                              <Select size="small"
                                value={orderby}
                                label={t("order_by")}
                                onChange={(e) => setOrderby(e.target.value)}
                              >
                                {allFilters &&
                                  allFilters?.map((item) => {
                                    return (
                                      <MenuItem value={item}>{item}</MenuItem>
                                    );
                                  })}
                              </Select>
                            </FormControl>
                          </Box>
                          <Box
                            className="mt-2"
                            sx={{
                              width: "100%",
                              maxWidth: "100%",
                              fontSize: "20px",
                              height: "40px",
                            }}
                          >
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                {t("sort")}
                              </InputLabel>
                              <Select size="small"
                                value={sortBy}
                                label={t("sort")}
                                onChange={(e) => setSortBy(e.target.value)}
                              >
                                <MenuItem
                                  value={10}
                                  sx={{
                                    fontSize: "16px",
                                  }}
                                >
                                  ASC
                                </MenuItem>
                                <MenuItem
                                  value={20}
                                  sx={{
                                    fontSize: "16px",
                                  }}
                                >
                                  DES
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className={'row mt-0 px-0 mx-0'} ref={elementRefer}>
                  {
                    view === "grid" &&

                    <div className="d-flex mr-0 pl-0">

                      <FormControlLabel className="grid-checkall pl-1 ml-1" control={<Checkbox
                        label="Label"
                        checked={isAllChecked}
                        onChange={handelDeleteAll}
                        size="small" />} label={t("de_/_select_all")} />

                    </div>
                  }
                  <div className="d-flex flex-wrap px-0 mx-0" >
                    {
                      searchByFilters?.content?.length > 0 ? (
                        <>
                          {
                            view === "grid" &&
                            searchByFilters?.content?.map((item) => {
                              const endDate = new Date(item?.endDate);
                              const startDate = new Date(item?.starDate);
                              return (
                                <div className="animated-div-left panel-grid col-md-4 col-lg-3 px-0 mx-0 mb-3">
                                  <div className="card-base-grid pb-3 h-100 ml-2">
                                    <div className="top-heading-card">
                                      <Checkbox
                                        className="grid-checkall checkbox"
                                        checked={selectContractForDelete?.includes(item?.id)}
                                        id={item?.id}
                                        onChange={handleCheckboxChange}
                                        size="small"
                                      />
                                      {/* <input type="checkbox" className="checkbox"
                                        checked={selectContractForDelete?.includes(item?.id)}
                                        id={item?.id}
                                        onChange={handleCheckboxChange}
                                      /> */}
                                      <div className={"status " + status[item?.statusId]}>
                                        <p
                                        >
                                          {t(status[(item?.statusId)])}
                                        </p>
                                        <GoPrimitiveDot
                                          className="ml-1"
                                        />
                                      </div>

                                    </div>
                                    <div className="card-body-grid">


                                      <div className="p-2">
                                        <div className="card-content-grid">
                                          <span className="viewcard-container-heading">{t("Folio")}</span>
                                          <span className="viewcard-container-heading text-right">#{item?.folio || "-"}</span>
                                        </div>
                                        <div className="card-content-grid">
                                          <p>{t("contractor")}</p>
                                        </div>
                                        <div className="card-content-grid">
                                          <span className="text-left"> {(() => {
                                            const contractFullName = (item.contractorName || '') + ' ' + (item.contractorLastName || '') + ' ' + (item.contractorSecondLastName || '');
                                            return (
                                              <span title={contractFullName} style={{ textTransform: "none" }}>
                                                {contractFullName || "-"}
                                              </span>
                                            );
                                          })()}
                                          </span>
                                        </div>
                                        <div className="card-content-grid">
                                          <p>{t("company")}</p>
                                        </div>
                                        <div className="card-content-grid mb-1">
                                          <span className="text-left" style={{ textTransform: "none" }}>{" "}
                                            <span className="font-weight-bold">{item?.contractorCompanyAcronym} |</span>

                                            {' ' + item?.contractorCompanyName}</span>
                                        </div>
                                        <Divider
                                          sx={{
                                            transform: "translateY(-50%)",
                                            right: 0,
                                            left: `${t("data").length * 1 + 1}rem`,
                                            background: "#146F62",
                                            height: "1px !important",
                                            opacity: "1",
                                            borderRadius: "10px"
                                          }}
                                        />
                                        <div className="card-content-grid mt-2">
                                          <p className="w-100">{t('start_date')}</p>
                                          <span className="text-right">{startDate.toLocaleDateString("en-US")}</span>
                                        </div>
                                        <div className="card-content-grid">
                                          <p className="w-100">{t("end_date")}</p>
                                          <span className="text-right">{endDate.toLocaleDateString("en-US")}</span>
                                        </div>
                                        <div className="card-content-grid">
                                          <p className="w-100">{t("num_employees")}</p>
                                          <span className="w-25 text-right">{item?.noEmployees}</span>
                                        </div>
                                        <div className="card-content-grid mb-2">
                                          <p className="w-100">{t("num_vehicles")}</p>
                                          <span className="w-25 text-right">{item?.noVehicles}</span>
                                        </div>
                                        <Divider
                                          sx={{
                                            transform: "translateY(-50%)",
                                            right: 0,
                                            left: `${t("data").length * 1 + 1}rem`,
                                            background: "#146F62",
                                            height: "1px !important",
                                            opacity: "1",
                                            borderRadius: "10px"
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <span className="viewcard-container-link mt-2 d-flex">
                                      <Link
                                        to={"contractor-details"}
                                        state={{ state: item }}

                                      >
                                        {t("details")} <KeyboardArrowRightIcon style={{
                                          transform: lCode === "ar" ? "scaleX(-1)" : "",
                                        }} />
                                      </Link>
                                    </span>


                                  </div>
                                </div>

                              )
                            })
                          }
                          {
                            view === "list" &&
                            <div className="panelTables px-1 animated-div mt-1"
                              style={{ width: "100%" }}
                            >
                              {
                                searchByFilters.content?.length > 0 ?
                                  <table style={{ width: "100%" }}>
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
                                      <th className='first_head'>{t("Folio")}</th>
                                      <th>{t("contractor")}</th>
                                      <th>{t("company")}</th>
                                      <th>{t("status")}</th>
                                      <th>{t("employees")}</th>
                                      <th>{t("vehicles")}</th>
                                      <th>{t("start_date")}</th>
                                      <th>{t("end_date")}</th>
                                      <th className='last'>{t("details")}</th>

                                    </thead>
                                    <tbody>

                                      {
                                        searchByFilters.content?.map((item, index) => {
                                          const endDate = new Date(item?.endDate);
                                          const startDate = new Date(item?.starDate);
                                          return (
                                            <tr key={item?.id}>
                                              <td className='first'>
                                                <Checkbox
                                                  className="grid-checkall checkbox"
                                                  checked={selectContractForDelete?.includes(item?.id)}
                                                  id={item?.id}
                                                  onChange={handleCheckboxChange}
                                                  size="small"
                                                />
                                                {/* <input type="checkbox" className="checkbox"
                                                  checked={selectContractForDelete?.includes(item?.id)}
                                                  id={item?.id}
                                                  onChange={handleCheckboxChange}
                                                /> */}
                                              </td>
                                              < td className='first align-middle' >
                                                {item?.folio || "-"}
                                              </td>
                                              <td style={{ maxWidth: 250 }}>
                                                {(() => {
                                                  const contractFullName = (item.contractorName || '') + ' ' + (item.contractorLastName || '') + ' ' + (item.contractorSecondLastName || '');
                                                  return (
                                                    <span className="align-middle" title={contractFullName} style={{ textTransform: "none", maxWidth: "100%", display: "inline-block", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                                      {contractFullName || "-"}
                                                    </span>
                                                  );
                                                })()}
                                              </td>
                                              <td >
                                                {(() => {
                                                  const companyFullName = (item.contractorCompanyAcronym || "") + ' | ' + (item.contractorCompanyName || '');
                                                  return (
                                                    <>
                                                      {companyFullName || "-"}
                                                    </>
                                                  );
                                                })()}
                                              </td>
                                              <td>  {item?.statusId == 22 ? (
                                                <span className="viewcard-container__status">
                                                  {t(status[item?.statusId])}

                                                </span>
                                              ) : null}

                                                {item?.statusId == 21 ? (
                                                  <span className="viewcard-container__status employe-status-documents">
                                                    {t(status[item?.statusId])}
                                                  </span>
                                                ) : null}
                                                {item?.statusId == 23 ? (
                                                  <span className="viewcard-container__status contract-status-cancel">
                                                    {t(status[item?.statusId])}
                                                  </span>
                                                ) : null}</td>
                                              <td > {item?.noEmployees} </td>
                                              <td>{item?.noVehicles}</td>
                                              <td> {startDate.toLocaleDateString("en-US")}</td>
                                              <td> {endDate.toLocaleDateString("en-US")}</td>
                                              <td className='tableIcon'>
                                                <Link to={"contractor-details"}
                                                  state={{ state: item }}>
                                                  <button className='btn-option'>
                                                    <img
                                                      src={eyeIcon} alt="eye"
                                                    />
                                                  </button>
                                                </Link>

                                              </td>

                                            </tr>
                                          )
                                        })
                                      }
                                    </tbody>
                                  </table> :
                                  <NotFoundDataWarning text={t("no_documents")} />
                              }

                            </div>
                          }
                        </>
                      ) : (
                        <NotFoundDataWarning text={t("no_contracts_to_show")} />
                      )}
                  </div>
                </div>
              </div>
              {searchByFilters && searchByFilters.content?.length > 0 ? (
                <div className="d-flex justify-content-center">
                  <TablePagination
                    component="div"
                    rowsPerPageOptions={view === 'grid' ? [8, 16, 24, 32] : [20, 40, 60]}
                    count={searchByFilters?.totalElements}
                    page={page}
                    onPageChange={handleChangePage}
                    labelRowsPerPage={t("contracts_per_page")}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              ) : null}
            </div>
            <div
              className={`${toggleState === 2 ? "tab-pane fade show active " : "tab-pane fade"
                }`}
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"

            >
              <div className="providers animated-div-left">
                <div className="container-top-right-btns mb-1">

                  <button className="import-file-btn-1"
                    onClick={() => navigate("/dashboard/employee/contractors/upload-contractor")}
                  >
                    {(t('import'))}
                    <br />
                    {(t('file'))}
                  </button>

                  <button className="add-btn-1"
                    onClick={() => navigate("/dashboard/employee/contractors/add-contractor")}
                  >
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    {t('add')}
                  </button>
                  <button className="delete-btn-1"
                    disabled={selectContractorForDelete?.length === 0}
                    onClick={() => {
                      setDeleteContractorShow(true)
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

                </div>
                <div className="row">
                  <div className="col-12" ref={elementRef}>
                    <ContractorTable
                      isAllCheckedContractor={isAllCheckedContractor}
                      setIsAllCheckedContractor={setIsAllCheckedContractor}
                      selectContractorForDelete={selectContractorForDelete}
                      deleteContractorShow={deleteContractorShow}
                      setSelectContractorForDelete={setSelectContractorForDelete}
                      searchByFilters={searchByFilters}
                      handleChangePage={handleChangePage}
                      handleChangeRowsPerPage={handleChangeRowsPerPage}
                      page={page}
                      rowsPerPage={rowsPerPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal for delete contract */}
      <DeleteContractModal
        show={deleteContractShow}
        onHide={() => setDeleteContractShow(false)}
        data={selectContractForDelete}

      />

      {/* modal for delete contract */}
      <DeleteContractorModal
        show={deleteContractorShow}
        onHide={() => setDeleteContractorShow(false)}
        data={selectContractorForDelete}

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
export default ContractorPanel;
