import { useEffect, useState, useRef } from "react";
import filter from "../../../assets/images/filter.svg";
import { NavLink, useNavigate } from "react-router-dom";
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

/*
Author : Arman Ali
Module: subplier
github: https://github.com/Arman-Arzoo
*/

const ProvidersPanel = () => {

  // use hook importer
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //use Selector hook to get state for redux store
  // const { permission } = useSelector(state => state.authenticatioauthennSlice);
  const { incomingProviders } = useSelector(state => state.EmployeeProviderSlice)
  console.log(incomingProviders)
  const { recordsProviders } = useSelector(state => state.EmployeeProviderSlice)
  console.log(recordsProviders)



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
  const [selectOrderForDeleteIncoming, setSelectOrderForDeleteIncoming] = useState([])
  const [deleteOrderShowIncomingShow, setDeleteOrderShowIncomingShow] = useState(false)

  const [isAllCheckedOrderRecord, setIsAllCheckedOrderRecord] = useState(false);
  const [selectOrderForDeleteRecord, setSelectOrderForDeleteRecord] = useState([])
  const [deleteOrderShowRecordShow, setDeleteOrderShowRecordShow] = useState(false)
  const [view, setView] = useState("grid")
  const title_modal = "DELETE_SUPPLIERS";
  const element_modal = "SUPPLIERS";
  const { getAllPageableProvider } = useSelector(state => state.EmployeeProviderSlice)
  console.log(getAllPageableProvider)
  const { permission } = useSelector(state => state.authenticatioauthennSlice);

  // funtion to set filter
  const handlFilters = (order, sort) => {
    setOrderBy(order);
    setSortBy(sort);
  }


  console.log(isSwitchOn)
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


  // this function control select all id or unSelect all for supplier
  const handelDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = getAllPageableProvider?.content?.map(item => {
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
    const distanceTop = rect.top +15;
    elementRef.current.style.setProperty('--top-value', `${distanceTop}px`)
  }, [toggleState]);
  // this function control select all id or unSelect all for incoming
  const handelDeleteAllOrderIncoming = (e) => {
    setIsAllCheckedOrderIncoming(e.target.checked)
    if (e.target.checked) {

      const selectAllIds = incomingProviders?.content?.map(item => {
        return item?.id
      })
      setSelectOrderForDeleteIncoming(selectAllIds)
    } else {
      setSelectOrderForDeleteIncoming([])
    }

  }

  // this function handle only specific id base on selection for incoming
  const handleCheckboxChangeOrderIncoming = (e) => {

    if (e.target.checked) {
      setSelectOrderForDeleteIncoming([...selectOrderForDeleteIncoming, e.target.id]);
    } else {
      setSelectOrderForDeleteIncoming(selectOrderForDeleteIncoming.filter((removeid) => removeid !== e.target.id));
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
          <h2>{t("suppliers_panel")}</h2>
        </div>
      </div>
      {/* portfolio-grid */}
      <div className="">
        <div className="row steps-row mb-3 mx-0" id="pills-tab" role="tablist">
          
        <div className={`col-6 text-center p-0 tap_hover ${toggleState === 1 ? 'active_tap' : 'deactive_tap'}`}
               role="presentation">
            <a
              className={`steps-global btn ${toggleState === 1 ? 'btn-bordered-global' : ''
                }`}
              onClick={() => toggleTab(1)}
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <span>{t("orders")}</span>
            </a>
          </div>
          <div className={`col-6 text-center p-0 tap_hover ${toggleState === 2 ? 'active_tap' : 'deactive_tap'}`}
               role="presentation">
            <a
              className={`steps-global btn ${toggleState === 2 ? 'btn-bordered-global' : ''
                }`}

              onClick={() => toggleTab(2)}
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

                  <div className="switch">
                    <p className={isSwitchOn ? `p_inActive` : 'p_active'}>{t("incoming")}</p>
                    <Switch value={isSwitchOn} color="primary" onChange={() => { setIsSwitchOn(!isSwitchOn) }} />
                    <p className={isSwitchOn ? `p_active` : 'p_inActive'}>{t("records")}</p>
                  </div>
                </div>
                <div className="left_header">

                  <button className="add-btn-1 mr-3"
                    onClick={() => navigate("create-order")}
                  >
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    {t('add')}
                  </button>

                  {
                    isSwitchOn ?
                      <button className="delete-btn-1 mr-3"
                        disabled={selectOrderForDeleteRecord?.length === 0}
                        onClick={() => {
                          setDeleteOrderShowRecordShow(true)
                        }}
                      >
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                        {t('delete')}
                      </button> :
                      <button className="delete-btn-1 mr-3"
                        disabled={selectOrderForDeleteIncoming?.length === 0}
                        onClick={() => {
                          setDeleteOrderShowIncomingShow(true)
                        }}
                      >
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                        {t('delete')}
                      </button>

                  }


                  <div className="filter_btn" onClick={() => setShowFilter(true)}>
                    <img src={filter} alt="filter" />
                  </div>
                  {isSwitchOn && showFilter && <FilterModal setShowFilter={setShowFilter} handlFilters={handlFilters} />}
                  {!isSwitchOn && showFilter && <FilterModal setShowFilter={setShowFilter} handlFilters={handlFilters} />}
                </div>
              </div>
              {/* incoming order list */}
              {
                !isSwitchOn && incomingProviders?.content?.length > 0 ?
                  <>
                    {
                      view === "grid" &&
                      <div className="all_order_body_container_employee">
                        {
                          incomingProviders?.content?.map((item, index) => {
                            return (
                              <div className="order_list_card">
                                <div className="folio">
                                  <div className="input_check">
                                    <input type="checkbox" className="checkbox"
                                      checked={selectOrderForDeleteIncoming?.includes(item?.id)}
                                      id={item?.id}
                                      onChange={handleCheckboxChangeOrderIncoming}
                                    />
                                    {t("Folio")}
                                    <span style={{ fontSize: "10px" }}>#{item?.folio || "-"}</span>
                                  </div>

                                  <div className="status">
                                    <p style={{
                                      color: item?.status?.id == 28 && "gray" ||
                                        item?.status?.id == 29 && "blue" ||
                                        item?.status?.id == 30 && "yellow" ||
                                        item?.status?.id == 36 && "red"
                                    }}>
                                      {item?.status?.name.split("_").join(" ")} </p>
                                    <div className='status_icon' style={{
                                      background: item?.status?.id == 28 && "gray" ||
                                        item?.status?.id == 29 && "blue" ||
                                        item?.status?.id == 30 && "yellow" ||
                                        item?.status?.id == 36 && "red"
                                    }}></div>
                                  </div>
                                </div>


                                <div className='courier_info'>
                                  <h4>{t("courier_information")}</h4>
                                  <h6><span>{item?.supplier?.acronym} |</span> {item?.supplier?.supplierCompanyName}</h6>
                                  <p>{t("company")}</p>
                                  <h6><span>{item?.supplierEmployee?.user?.name || "-"}</span></h6>
                                  <p>{t("employee")}</p>
                                  <h6><span>{item?.supplierVehicle?.vehicle?.brand || "-"}  |</span> {item?.supplierVehicle?.vehicle?.serialNumber || "-"}</h6>
                                  <p>{t("vehicles")}</p>
                                </div>
                                <div className='delivery_info mt-1'>
                                  <h4>{t("delivery_information")}</h4>
                                  <div className="item_container">
                                    <div className='item_name'>
                                      <p>{t("eta")}</p>
                                      <p>{t("corporate")}</p>
                                      <p>{t("item")}</p>
                                      <p>{t("description")} </p>
                                    </div>
                                    <div className='item_data'>
                                      <h4>26/08/2023 11:30</h4>
                                      <h4>IBL Corporate</h4>
                                      <h4>{item?.item}</h4>
                                      <h4>{item?.description.slice(0, 15)}</h4>
                                    </div>
                                  </div>
                                </div>
                                {item?.status?.id == 30 &&
                                  <div className='delivery_info mt-1'>
                                    <h4>{t("received_information")}</h4>
                                    <div className="item_container">
                                      <div className='item_name'>
                                        <p>{t("received_by")}</p>
                                        <p>{t("delivery_date")}</p>
                                      </div>
                                      <div className='item_data'>
                                        <h4>{item?.userReceived?.name}</h4>
                                        <h4>26/08/2023 11:45</h4>
                                      </div>
                                    </div>
                                  </div>
                                }
                                <div className='link'>
                                  {/* {
                              item?.status?.id == 28 ?
                                <Link to="order-details">COMPLETE ORDER <i className='fa fas-arrow-right'></i></Link>
                                : */}

                                  <NavLink to="order-details"
                                    onClick={() => {
                                      dispatch(DetailsEmployeeProviderOrder(item?.id))
                                      // console.log(item?.id)
                                      localStorage.setItem("providerOrderDetail", item?.id)
                                    }}
                                  >{t("view_details")} <i class="fa fa-angle-right" aria-hidden="true"></i>
                                  </NavLink>
                                  {/* } */}
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
                        dataApi={incomingProviders}
                        selectOrderForDelete={selectOrderForDeleteIncoming}
                        isAllCheckedOrder={isAllCheckedOrderIncoming}
                        handelDeleteAllOrders={handelDeleteAllOrderIncoming}
                        handleCheckboxChangeOrder={handelDeleteAllOrderIncoming}
                      />
                    }
                  </>
                  :
                  !isSwitchOn &&
                  <div className="mt-4">
                    <NotFoundDataWarning text={"No Incoming Orders"} />
                  </div>
              }
              {/* record imcoming list */}
              {
                isSwitchOn && recordsProviders?.content?.length > 0 ?
                  <>
                    {
                      view === "grid" &&
                      <div className="all_order_body_container_employee">

                        {
                          recordsProviders?.content?.map((item, index) => {
                            console.log(item)
                            return (
                              <div className="order_list_card">

                                <div className="folio">
                                  <div className="input_check">
                                    <input type="checkbox" className="checkbox"
                                      checked={selectOrderForDeleteRecord?.includes(item?.id)}
                                      id={item?.id}
                                      onChange={handleCheckboxChangeOrderRecord}
                                    />
                                    {t("Folio")}
                                    <span style={{ fontSize: "10px" }}>#{item?.folio || "-"}</span>
                                  </div>

                                  <div className="status">
                                    <p style={{
                                      color: item?.status?.id == 28 && "gray" ||
                                        item?.status?.id == 29 && "blue" ||
                                        item?.status?.id == 30 && "yellow" ||
                                        item?.status?.id == 36 && "red"
                                    }}>
                                      {item?.status?.name.split("_").join(" ")} </p>
                                    <div className='status_icon' style={{
                                      background: item?.status?.id == 28 && "gray" ||
                                        item?.status?.id == 29 && "blue" ||
                                        item?.status?.id == 30 && "yellow" ||
                                        item?.status?.id == 36 && "red"
                                    }}></div>
                                  </div>
                                </div>


                                <div className='courier_info'>
                                  <h4>COURIER INFORMATION</h4>
                                  <h6><span>{item?.supplier?.acronym} |</span> {item?.supplier?.supplierCompanyName}</h6>
                                  <p>Company</p>
                                  <h6><span>{item?.supplierEmployee?.user?.name}</span></h6>
                                  <p>Employee</p>
                                  <h6><span>{item?.supplierVehicle?.vehicle?.brand} |</span> {item?.supplierVehicle?.vehicle?.serialNumber}</h6>
                                  <p>Vehicle</p>
                                </div>
                                <div className='delivery_info mt-1'>
                                  <h4>DELIVERY INFORMATION</h4>
                                  <div className="item_container">
                                    <div className='item_name'>
                                      <p>ETA</p>
                                      <p>Corporate</p>
                                      <p>Item</p>
                                      <p>Description </p>
                                    </div>
                                    <div className='item_data'>
                                      <h4>26/08/2023 11:30</h4>
                                      <h4>IBL Corporate</h4>
                                      <h4>{item?.item}</h4>
                                      <h4>{item?.description.slice(0, 15)}</h4>
                                    </div>
                                  </div>
                                </div>
                                {item?.status?.id == 30 &&
                                  <div className='delivery_info mt-1'>
                                    <h4>RECEIVED INFORMATION</h4>
                                    <div className="item_container">
                                      <div className='item_name'>
                                        <p>Received By</p>
                                        <p>Delivery Date</p>

                                      </div>
                                      <div className='item_data'>
                                        <h4>{item?.userReceived?.name}</h4>
                                        <h4>26/08/2023 11:45</h4>

                                      </div>
                                    </div>
                                  </div>
                                }



                                <div className='link'>
                                  {/* {
                                item?.status?.id == 28 ?
                                  <Link to="order-details">COMPLETE ORDER <i className='fa fas-arrow-right'></i></Link>
                                  : */}

                                  <NavLink to="order-details"

                                    onClick={() => {
                                      dispatch(DetailsEmployeeProviderOrder(item?.id))
                                      localStorage.setItem("providerOrderDetail", item?.id)
                                      // console.log(item?.id)
                                    }}
                                  >
                                    {t("view_details")}
                                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                                  </NavLink>

                                  {/* } */}

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
                        dataApi={recordsProviders}
                        selectOrderForDelete={selectOrderForDeleteRecord}
                        isAllCheckedOrder={isAllCheckedOrderRecord}
                        handelDeleteAllOrders={handelDeleteAllOrderRecord}
                        handleCheckboxChangeOrder={handleCheckboxChangeOrderRecord}
                      />
                    }
                  </>
                  :
                  isSwitchOn &&
                  <div className="mt-4">
                    <NotFoundDataWarning text={"No Record Orders"} />
                  </div>
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
            <div className="providers animated-div">
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
                    permission?.includes(permissionObj?.WEB_PROVIDER_CREATE) &&
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* contact-form */}
      {
        !isSwitchOn && toggleState == 1 && incomingProviders?.content?.length > 0 &&
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[8, 16, 24, 32]}
            count={incomingProviders?.totalElements}
            page={pageIncoming}
            onPageChange={handleChangePageIcoming}
            labelRowsPerPage="incoming order per page"
            rowsPerPage={rowsPerPageIncoming}
            onRowsPerPageChange={handleChangeRowsPerPageIncoming}
          />
        </div>
      }

      {
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
      }
      
      {/* delete modal for order record */}
      <DeleteModal
        show={deleteOrderShowRecordShow}
        onHide={() => setDeleteOrderShowRecordShow(false)}
        data={selectOrderForDeleteRecord}
        title_modal={t("delete_order")}
        element_modal={"orders"}
      />
      {/* delete modal for order incoming */}
      <DeleteModal
        show={deleteOrderShowIncomingShow}
        onHide={() => setDeleteOrderShowIncomingShow(false)}
        data={selectOrderForDeleteIncoming}
        title_modal={t("delete_order")}
        element_modal={"orders"}
      />
      {/* delete modal for supplier */}
      <DeleteModal
        show={deleteSupplierShow}
        onHide={() => setDeleteSupplierShow(false)}
        data={selectSupplierForDelete}
        title_modal={title_modal}
        element_modal={element_modal}
      />
    </div>
  );
};
export default ProvidersPanel;
