import { useEffect, useState, useRef } from "react";
import filter from "../../../assets/images/filter.svg";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { DetailsEmployeeProviderOrder, GetIncomingProvidersPaginable, GetRecordsProvidersPaginable } from "../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import { useDispatch, useSelector } from "react-redux";
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import FilterModal from './ProviderModels/FilterModal'
import ProviderTable from "./ProviderTable";
import { t } from "i18next";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
import DeleteModal from "../../Modals/DeleteModal";
import { permissionObj } from "../../../Helpers/permission";
import DisplayView from "../../../components/DisplayView";
import TableViewSuppliers from "./TableViewSuppliers";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchFor from "../../Modals/SearchFor";
import { MODELS } from "../../../Apis/Models";
import { TABLES } from "../../../Apis/Tables";
import { SearchByFilters } from "../../../reduxToolkit/Search/SearchApi";
import { status } from "../../../enums/statusEnum";
import { toast } from 'react-toastify';
import { GoPrimitiveDot } from 'react-icons/go'
import { Divider } from "@mui/material";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Checkbox, Tooltip } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import SettingButton from "../../../components/SettingButton";

/*
Author : Arman Ali
Module: subplier
github: https://github.com/Arman-Arzoo
*/

const ProvidersPanel = () => {

  // use hook importer
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();

  //use Selector hook to get state for redux store
  // const { permission } = useSelector(state => state.authenticatioauthennSlice);
  const { incomingProviders } = useSelector(state => state.EmployeeProviderSlice)
  const { recordsProviders } = useSelector(state => state.EmployeeProviderSlice)



  // use State hook for local state management
  const [show, setShow] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [pageIncoming, setPageIncoming] = useState(0);
  const [rowsPerPageIncoming, setRowsPerPageincoming] = useState(8);
  const [pageRecord, setPageRecord] = useState(0);
  const [rowsPerPageRecord, setRowsPerPageRecord] = useState(8);
  const [showFilter, setShowFilter] = useState(false);
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selectSupplierForDelete, setSelectSupplierForDelete] = useState([])
  const [deleteSupplierShow, setDeleteSupplierShow] = useState(false)
  const [isAllCheckedOrderIncoming, setIsAllCheckedOrderIncoming] = useState(false);
  const [isAllCheckedOrder, setIsAllCheckedOrder] = useState(false);
  const [selectOrderForDeleteIncoming, setSelectOrderForDeleteIncoming] = useState([])
  const [selectOrderForDelete, setSelectOrderForDelete] = useState([])
  const [deleteOrderShowIncomingShow, setDeleteOrderShowIncomingShow] = useState(false)

  const [isAllCheckedOrderRecord, setIsAllCheckedOrderRecord] = useState(false);
  const [selectOrderForDeleteRecord, setSelectOrderForDeleteRecord] = useState([])
  const [deleteOrderShowRecordShow, setDeleteOrderShowRecordShow] = useState(false)
  const [filterDialogShow, setFilterDialogShow] = useState(false)
  const [finalArray, setFinalArray] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [checked, setChecked] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const [view, setView] = useState("list")
  const title_modal = "DELETE_SUPPLIERS";
  const element_modal = "SUPPLIERS";

  //use selector
  const { getAllPageableProvider } = useSelector(state => state.EmployeeProviderSlice)
  const { permission } = useSelector(state => state.authenticatioauthennSlice);
  const { searchByFilters } = useSelector(state => state.SearchSlice);

  // Props to the filter window
  const [moduleId, setModuleId] = useState(`${MODELS.Order}`);
  const [option, setOption] = useState(`${TABLES.ORDERS}`);

  // funtion to set filter
  const handlFilters = (order, sort) => {
    setOrderBy(order);
    setSortBy(sort);
  }


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleTab = (index) => {
    setToggleState(index);
  };


  const options = {
    filterType: "checkbox",
  };

  // pagination change input fn

  const handleChangePageIcoming = (event, newPage) => {
    setPageIncoming(newPage);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleChangeRowsPerPageIncoming = event => {
    setRowsPerPageincoming(parseInt(event.target.value));
    setPageIncoming(0);
  };

  const handleChangePageRecord = (event, newPage) => {
    setPageRecord(newPage);
  };

  const handleChangeRowsPerPageRecord = event => {
    setRowsPerPageRecord(parseInt(event.target.value));
    setPageRecord(0);
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
      setSelectSupplierForDelete(prevState => {
        const uniqueIds = selectAllIds.filter(id => !prevState.includes(id));
        return [...prevState, ...uniqueIds];
      });
    }
    if (isAllCheckedOrder) {
      const selectAllIds = searchByFilters?.content?.map(item => item?.id);
      setSelectOrderForDelete(prevState => {
        const uniqueIds = selectAllIds.filter(id => !prevState.includes(id));
        return [...prevState, ...uniqueIds];
      });
    }
  }, [searchByFilters])

  // this function control select all id or unSelect all for supplier
  const handelDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = searchByFilters?.content?.map(item => {
        return item?.id
      })
      setSelectSupplierForDelete(selectAllIds)
    } else {
      setSelectSupplierForDelete([])
    }

  }

  // this function handle only specific id base on selection for supplier
  const handleCheckboxChange = (e) => {

    if (e.target.checked) {
      setSelectSupplierForDelete([...selectSupplierForDelete, e.target.id]);
    } else {
      setSelectSupplierForDelete(selectSupplierForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };


  // This components are used to calculate the distance between the top of the window and the top of the table panel
  const elementRef = useRef(null);
  useEffect(() => {
    const rect = elementRef.current.getBoundingClientRect();
    const distanceTop = rect.top + 15;
    elementRef.current.style.setProperty('--top-value', `${distanceTop}px`)
  }, [toggleState]);
  // this function control select all id or unSelect all for incoming
  const handelDeleteAllOrder = (e) => {
    setIsAllCheckedOrder(e.target.checked)
    if (e.target.checked) {

      const selectAllIds = searchByFilters?.content?.map(item => {
        return item?.id
      })
      setSelectOrderForDelete(selectAllIds)
    } else {
      setSelectOrderForDelete([])
    }

  }

  // this function handle only specific id base on selection for incoming
  const handleCheckboxChangeOrder = (e) => {

    if (e.target.checked) {
      setSelectOrderForDelete([...selectOrderForDelete, e.target.id]);
    } else {
      setSelectOrderForDelete(selectOrderForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };


  // this function control select all id or unSelect all for incoming
  const handelDeleteAllOrderRecord = (e) => {
    setIsAllCheckedOrderRecord(e.target.checked)
    if (e.target.checked) {

      const selectAllIds = recordsProviders?.content?.map(item => {
        return item?.id
      })
      setSelectOrderForDeleteRecord(selectAllIds)
    } else {
      setSelectOrderForDeleteRecord([])
    }

  }

  // this function handle only specific id base on selection for incoming
  const handleCheckboxChangeOrderRecord = (e) => {

    if (e.target.checked) {
      setSelectOrderForDeleteRecord([...selectOrderForDeleteRecord, e.target.id]);
    } else {
      setSelectOrderForDeleteRecord(selectOrderForDeleteRecord.filter((removeid) => removeid !== e.target.id));
    }
  };

  //This fragment makes uncheked all the checkboxes when toggleState change
  const resetAllCheckboxes = () => {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  //Clean any checkbox when toggle change
  useEffect(() => {
    resetAllCheckboxes();
    setSelectSupplierForDelete([]);
    setSelectOrderForDelete([]);
    setIsAllChecked(false);
    setIsAllCheckedOrder(false);

  }, [toggleState, view]);

  useEffect(() => {
    if (view === 'grid') {
      setRowsPerPage(8)
    } else {
      setRowsPerPage(20)
    }
  }, [view, toggleState])

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

  // useEffect for api call incoming with pagination
  useEffect(() => {

    const d = new Date();
    let time_in_miliseconds = Math.round(d.getTime());

    const body = {
      date: time_in_miliseconds,
      pagination: {
        "order": sortBy === 'asc' ? true : false,
        "page": pageIncoming,
        "size": rowsPerPageIncoming,
        "sortBy": orderBy ? orderBy : "id"
      }
    }
    dispatch(GetIncomingProvidersPaginable(body));
  }, [pageIncoming, rowsPerPageIncoming, orderBy, sortBy])
  // useEffect for api call records with pagination
  useEffect(() => {
    const d = new Date();
    let time_in_miliseconds = Math.round(d.getTime());

    const body = {
      date: time_in_miliseconds,
      pagination: {
        "order": sortBy === 'asc' ? true : false,
        "page": pageRecord,
        "size": rowsPerPageRecord,
        "sortBy": orderBy ? orderBy : "id"
      }
    }
    dispatch(GetRecordsProvidersPaginable(body));
  }, [pageRecord, rowsPerPageRecord, orderBy, sortBy])

  return (
    <div className="providersPanel">
      <div className="head">
        <div className="headLeft">
          <h2 className="mr-2">{t("suppliers_panel")}</h2>
          
          <SettingButton onAction={()=>navigate("/dashboard/employee/supplier-restriction")}
          title={t("restriction")} />
        </div>
      </div>
      {/* portfolio-grid */}
      <div>
        <div className="row steps-row mb-3 mx-0" id="pills-tab" role="tablist">

          <div className={`col-6 text-center p-0 tap_hover ${toggleState === 1 ? 'active_tap' : 'deactive_tap'}`}
            role="presentation">
            <a
              className={`steps-global btn ${toggleState === 1 ? 'btn-bordered-global' : ''
                }`}
              onClick={() => {
                if (toggleState !== 1) {
                  setToggleState(1);
                  setPage(0)
                  setView('list')
                  setRowsPerPage(20)
                  // if (view === 'grid') {
                  //   setRowsPerPage(8)
                  // } else {
                  //   setRowsPerPage(20)
                  // }
                  setOption(`${TABLES.ORDERS}`);
                  setModuleId(`${MODELS.Order}`);
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
              <span>{t("purchase_orders")}</span>
            </a>
          </div>
          <div className={`col-6 text-center p-0 tap_hover ${toggleState === 2 ? 'active_tap' : 'deactive_tap'}`}
            role="presentation">
            <a
              className={`steps-global btn ${toggleState === 2 ? 'btn-bordered-global' : ''
                }`}

              onClick={() => {
                if (toggleState !== 2) {
                  setToggleState(2);
                  setRowsPerPage(20)
                  setPage(0)
                  setOption(`${TABLES.SUPPLIERS}`);
                  setModuleId(`${MODELS.Supplier}`)
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
              <span>{t("suppliers")}</span>
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
              <div className=" order_header ">
                <div className="right_header">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p>{t("options")}</p>
                    <DisplayView view={view} setView={setView} />
                  </div>

                  {/* <div className="switch">
                    <p className={isSwitchOn ? `p_inActive` : 'p_active'}>{t("incoming")}</p>
                    <Switch value={isSwitchOn} color="primary" onChange={() => { setIsSwitchOn(!isSwitchOn) }} />
                    <p className={isSwitchOn ? `p_active` : 'p_inActive'}>{t("records")}</p>
                  </div> */}
                </div>
                <div className="container-top-right-btns">
                  {
                    permission?.includes(permissionObj?.WEB_SUPPLIER_CREATE) &&
                    <button className="add-btn-1"
                      onClick={() => navigate("add-suppliers")}
                    >
                      <i class="fa fa-plus" aria-hidden="true"></i>
                      {t('add')}
                    </button>

                  }

                  <button className="delete-btn-1"
                    disabled={selectOrderForDelete?.length === 0}
                    onClick={() => {
                      setDeleteSupplierShow(true)
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
              </div>

              {
                view === "grid" &&

                <div className="d-flex mr-0 pl-0">

                  <FormControlLabel className="grid-checkall pl-1 ml-1" control={<Checkbox
                    label="Label"
                    checked={isAllCheckedOrder}
                    onChange={handelDeleteAllOrder}
                    size="small" />} label={t("de_/_select_all")} />

                </div>
              }
              {/* incoming order list */}
              {
                searchByFilters?.content?.length > 0 ?
                  <>
                    {
                      view === "grid" &&
                      <div className="row mt-0 gap-0 px-0 mx-0">
                        {
                          searchByFilters?.content?.map((item, index) => {
                            return (
                              <div className="panel-grid animated-div-left col-md-4 col-lg-3 px-0 mx-0 mb-3">
                                <div className="card-base-grid pb-3 h-100 ml-2">
                                  <div className="top-heading-card">
                                    <div className="input_check">
                                      <Checkbox
                                        className="grid-checkall checkbox"
                                        checked={selectOrderForDelete?.includes(item?.id)}
                                        id={item?.id}
                                        onChange={handleCheckboxChangeOrder}
                                        size="small"
                                      />
                                      {/* <input type="checkbox" className="checkbox"
                                        checked={selectOrderForDelete?.includes(item?.id)}
                                        id={item?.id}
                                        onChange={handleCheckboxChangeOrder}
                                      /> */}

                                    </div>


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
                                    <div className="px-2 pb-2">

                                      <div className="card-content-grid">
                                        <span className="viewcard-container-heading">{t("Folio")}</span>
                                        <span className="viewcard-container-heading text-right">#{item?.folio || "-"}</span>
                                      </div>


                                      <div className='card-content-grid mt-1'>
                                        <span className="viewcard-container-courier">{t("courier_information")}</span>
                                      </div>
                                      <div className='card-content-grid mt-1'>
                                        <p>{t("company")}</p>
                                      </div>
                                      <div className='card-content-grid'>
                                        <span style={{ textTransform: "none" }}><span className="font-weight-bold">{item?.supplierCompanyAcronym} |</span> {item?.supplierCompanyName}</span>
                                      </div>
                                      <div className='card-content-grid'>
                                        <p>{t("employee")}</p>
                                      </div>
                                      <div className='card-content-grid'>
                                        {(() => {
                                          const supplierFullName = (item.supplierName || '') + ' ' + (item.supplierLastName || '') + ' ' + (item.supplierSecondLastName || '');
                                          return (
                                            <span title={supplierFullName} style={{ textTransform: "none", maxWidth: "100%", display: "inline-block", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                              {supplierFullName || "-"}
                                            </span>
                                          );
                                        })()}
                                      </div>
                                      <div className='card-content-grid'>
                                        <p>{t("vehicles")}</p>
                                      </div>
                                      <div className='card-content-grid mb-1'>
                                        {(() => {
                                          const vehicleFullName = (item.supplierVehicleBrand || '') + ' ' + (item.supplierVehicleSubBrand || '') + ' ' + (item.supplierVehicleModel || '') + ' | ' + (item.supplierVehiclePlate || '');
                                          return (
                                            <span style={{ textTransform: "none", maxWidth: "100%", display: "inline-block", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                              {(vehicleFullName === '' || vehicleFullName.trim() === '|') ? "-" : vehicleFullName}
                                            </span>
                                          );
                                        })()}
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
                                      <div className='card-content-grid mt-1'>
                                        <span className="viewcard-container-courier">{t("delivery_information")}</span>
                                      </div>
                                      <div className='card-content-grid mt-1'>
                                        <p>{t("eta")}</p>
                                        <span>{item.eta ? new Date(item.eta).toLocaleString() : "-"}</span>
                                      </div>
                                      <div className='card-content-grid mt-1'>
                                        <p>{t("item")}</p>
                                        <span>{item?.item || "-"}</span>
                                      </div>
                                      <div className='card-content-grid mb-1'>
                                        <p>{t("description")} </p>
                                        <span className="text-right">{item?.description || "-"}</span>
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

                                      {item?.statusId == 30 &&

                                        <>

                                          <div className='card-content-grid mt-1'>
                                            <span className="viewcard-container-courier">{t("received_information")}</span>
                                          </div>
                                          <div className='card-content-grid mt-1'>
                                            {(() => {
                                              const receiverFullName = (item.userReceivedName || '') + ' ' + (item.userReceivedLastName || '') + ' ' + (item.userReceivedSecondLastName || '');
                                              return (
                                                <>
                                                  <p className="w-75">{t("received_by")}</p>
                                                  <span title={receiverFullName} style={{ textTransform: "none", maxWidth: "100%", display: "inline-block", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                                    {receiverFullName || "-"}
                                                  </span>
                                                </>
                                              );
                                            })()}
                                          </div>
                                          <div className='card-content-grid mb-1'>
                                            <p>{t("delivery_date")}</p>
                                            <span>{item.deliveryDate ? new Date(item.deliveryDate).toLocaleString() : "-"}</span>
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

                                        </>

                                      }
                                      {/* <div className='card-detail-grid d-flex justify-content-end align-bottom'>
                                        

                                        <NavLink to="order-details"
                                          onClick={() => {
                                            dispatch(DetailsEmployeeProviderOrder(item?.id))
                                            // console.log(item?.id)
                                            localStorage.setItem("providerOrderDetail", item?.id)
                                          }}
                                        >{t("view_details")} <i class="fa fa-angle-right" aria-hidden="true"></i>
                                        </NavLink>
                                      </div> */}
                                    </div>
                                  </div>
                                  <span className="viewcard-container-link mt-2 d-flex">
                                    <Link
                                      to={"order-details"}
                                      state={{ state: item }}
                                      onClick={() => {
                                        dispatch(DetailsEmployeeProviderOrder(item?.id))
                                        localStorage.setItem("providerOrderDetail", item?.id)
                                      }}
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
                      </div>
                    }
                    {
                      view === "list" &&
                      <TableViewSuppliers
                        userFor="employee"
                        dataApi={searchByFilters}
                        selectOrderForDelete={selectOrderForDelete}
                        isAllCheckedOrder={isAllCheckedOrder}
                        handelDeleteAllOrders={handelDeleteAllOrder}
                        handleCheckboxChangeOrder={handleCheckboxChangeOrder}
                      />
                    }
                  </>
                  :
                  // !isSwitchOn &&
                  <div className="mt-4">
                    <NotFoundDataWarning text={t("no_orders_available")} />
                  </div>
              }
              {/* record imcoming list */}
              {
                // isSwitchOn && recordsProviders?.content?.length > 0 ?
                //   <>
                //     {
                //       view === "grid" &&
                //       <div className="all_order_body_container_employee">

                //         {
                //           recordsProviders?.content?.map((item, index) => {
                //             console.log(item)
                //             return (
                //               <div className="order_list_card">

                //                 <div className="folio">
                //                   <div className="input_check">
                //                     <input type="checkbox" className="checkbox"
                //                       checked={selectOrderForDeleteRecord?.includes(item?.id)}
                //                       id={item?.id}
                //                       onChange={handleCheckboxChangeOrderRecord}
                //                     />
                //                     {t("Folio")}
                //                     <span style={{ fontSize: "10px" }}>#{item?.folio || "-"}</span>
                //                   </div>

                //                   <div className="status">
                //                     <p style={{
                //                       color: item?.status?.id == 28 && "gray" ||
                //                         item?.status?.id == 29 && "blue" ||
                //                         item?.status?.id == 30 && "yellow" ||
                //                         item?.status?.id == 36 && "red"
                //                     }}>
                //                       {item?.status?.name.split("_").join(" ")} </p>
                //                     <div className='status_icon' style={{
                //                       background: item?.status?.id == 28 && "gray" ||
                //                         item?.status?.id == 29 && "blue" ||
                //                         item?.status?.id == 30 && "yellow" ||
                //                         item?.status?.id == 36 && "red"
                //                     }}></div>
                //                   </div>
                //                 </div>


                //                 <div className='courier_info'>
                //                   <h4>COURIER INFORMATION</h4>
                //                   <h6><span>{item?.supplier?.acronym} |</span> {item?.supplier?.supplierCompanyName}</h6>
                //                   <p>Company</p>
                //                   <h6><span>{item?.supplierEmployee?.user?.name}</span></h6>
                //                   <p>Employee</p>
                //                   <h6><span>{item?.supplierVehicle?.vehicle?.brand} |</span> {item?.supplierVehicle?.vehicle?.serialNumber}</h6>
                //                   <p>Vehicle</p>
                //                 </div>
                //                 <div className='delivery_info mt-1'>
                //                   <h4>DELIVERY INFORMATION</h4>
                //                   <div className="item_container">
                //                     <div className='item_name'>
                //                       <p>ETA</p>
                //                       <p>Corporate</p>
                //                       <p>Item</p>
                //                       <p>Description </p>
                //                     </div>
                //                     <div className='item_data'>
                //                       <h4>26/08/2023 11:30</h4>
                //                       <h4>IBL Corporate</h4>
                //                       <h4>{item?.item}</h4>
                //                       <h4>{item?.description.slice(0, 15)}</h4>
                //                     </div>
                //                   </div>
                //                 </div>
                //                 {item?.status?.id == 30 &&
                //                   <div className='delivery_info mt-1'>
                //                     <h4>RECEIVED INFORMATION</h4>
                //                     <div className="item_container">
                //                       <div className='item_name'>
                //                         <p>Received By</p>
                //                         <p>Delivery Date</p>

                //                       </div>
                //                       <div className='item_data'>
                //                         <h4>{item?.userReceived?.name}</h4>
                //                         <h4>26/08/2023 11:45</h4>

                //                       </div>
                //                     </div>
                //                   </div>
                //                 }



                //                 <div className='link'>
                //                   {/* {
                //                 item?.status?.id == 28 ?
                //                   <Link to="order-details">COMPLETE ORDER <i className='fa fas-arrow-right'></i></Link>
                //                   : */}

                //                   <NavLink to="order-details"

                //                     onClick={() => {
                //                       dispatch(DetailsEmployeeProviderOrder(item?.id))
                //                       localStorage.setItem("providerOrderDetail", item?.id)
                //                       // console.log(item?.id)
                //                     }}
                //                   >
                //                     {t("view_details")}
                //                     <i class="fa fa-angle-right" aria-hidden="true"></i>
                //                   </NavLink>

                //                   {/* } */}

                //                 </div>
                //               </div>

                //             )
                //           })
                //         }
                //       </div>
                //     }
                //     {
                //       view === "list" &&
                //       <TableViewSuppliers
                //         userFor="employee"
                //         dataApi={recordsProviders}
                //         selectOrderForDelete={selectOrderForDeleteRecord}
                //         isAllCheckedOrder={isAllCheckedOrderRecord}
                //         handelDeleteAllOrders={handelDeleteAllOrderRecord}
                //         handleCheckboxChangeOrder={handleCheckboxChangeOrderRecord}
                //       />
                //     }
                //   </>
                //   :
                //   isSwitchOn &&
                //   <div className="mt-4">
                //     <NotFoundDataWarning text={"No Record Orders"} />
                //   </div>
              }
            </div>
          </div>
          <div
            className={`${toggleState === 2 ? "tab-pane fade show active " : "tab-pane fade"
              }`}
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div className="providers animated-div-left">
              <div className="row top-buttons">
                <div className="container-top-right-btns">
                  <button className="import-file-btn-1"
                    onClick={() => navigate("upload-supplier")}
                  >
                    {(t('import'))}
                    <br />
                    {(t('file'))}
                  </button>
                  {
                    permission?.includes(permissionObj?.WEB_SUPPLIER_CREATE) &&
                    <button className="add-btn-1"
                      onClick={() => navigate("add-suppliers")}
                    >
                      <i class="fa fa-plus" aria-hidden="true"></i>
                      {t('add')}
                    </button>

                  }

                  <button className="delete-btn-1"
                    disabled={selectSupplierForDelete?.length === 0}
                    onClick={() => {
                      setDeleteSupplierShow(true)
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
              </div>
              <div className="row" ref={elementRef}>
                <div className="col-12">
                  {/* <MUIDataTable
                    title={"type the name to filter"}
                    data={getAllPageableProvider?.content}
                    columns={columns}
                    options={{
                      selectableRows: false, 
                    }}
                  /> */}
                  <ProviderTable toggleState={toggleState}
                    getAllPageableProvider={getAllPageableProvider}
                    selectSupplierForDelete={selectSupplierForDelete}
                    isAllChecked={isAllChecked}
                    handelDeleteAll={handelDeleteAll}
                    handleCheckboxChange={handleCheckboxChange}
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
      {/* contact-form */}
      {
        toggleState == 1 && searchByFilters?.content?.length > 0 &&
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={view === 'grid' ? [8, 16, 24, 32] : [20, 40, 60]}
            count={searchByFilters?.totalElements}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage={t("purchase_orders_per_page")}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      }

      {/* {
        isSwitchOn && toggleState == 1 && recordsProviders?.content?.length > 0 &&
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[8, 16, 24, 32]}
            count={recordsProviders?.totalElements}
            page={pageRecord}
            onPageChange={handleChangePageRecord}
            labelRowsPerPage="record order per page"
            rowsPerPage={rowsPerPageRecord}
            onRowsPerPageChange={handleChangeRowsPerPageRecord}
          />
        </div>
      } */}

      {/* delete modal for order record */}
      <DeleteModal
        show={deleteOrderShowRecordShow}
        onHide={() => setDeleteOrderShowRecordShow(false)}
        data={selectOrderForDeleteRecord}
        title_modal={t("delete_order")}
        element_modal={"orders"}
        isReset={setSelectOrderForDeleteRecord}
        isAllReset={setIsAllCheckedOrderRecord}
      />
      {/* delete modal for order incoming */}
      <DeleteModal
        show={deleteOrderShowIncomingShow}
        onHide={() => setDeleteOrderShowIncomingShow(false)}
        data={selectOrderForDeleteIncoming}
        title_modal={t("delete_order")}
        element_modal={"orders"}
        isReset={setSelectOrderForDeleteIncoming}
        isAllReset={setIsAllCheckedOrderIncoming}
      />
      {/* delete modal for supplier */}
      <DeleteModal
        show={deleteSupplierShow}
        onHide={() => setDeleteSupplierShow(false)}
        data={selectSupplierForDelete}
        title_modal={title_modal}
        element_modal={element_modal}
        isReset={setSelectSupplierForDelete}
        isAllReset={setIsAllChecked}
      />
      {/* dialog for advance search */}
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
    </div>
  );
};
export default ProvidersPanel;
