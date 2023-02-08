import { useEffect, useState } from "react";
import search from "../../../assets/images/search.svg";
import filter from "../../../assets/images/filter.svg";
import plus from "../../../assets/images/plus.svg";
import file from "../../../assets/images/file.svg";
import ProvidersFilterModal from "./ProviderModels/providersFilterModal";
import { Link, NavLink } from "react-router-dom";
import CustomDropDown from "../../../components/CustomDropDown";
import ProviderDropDown from "./SubComponents/providerDropDown";
import MUIDataTable from "mui-datatables";
import { CreateEmployeeProviderOrders, DetailsEmployeeProviderOrder, GetAllPageableProvider, GetEmployeeProviderOrders, GetIncomingProvidersPaginable, GetRecordsProvidersPaginable } from "../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import { useDispatch, useSelector } from "react-redux";
import { GetEventFilters } from "../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi";
import Switch from '@mui/material/Switch';
import FilterModalProviders from "./ProviderModels/FilterModalProviders";
import TablePagination from '@mui/material/TablePagination';
import FilterModal from './ProviderModels/FilterModal'
import ProviderTable from "./ProviderTable";
import { t } from "i18next";
import { Box } from "@mui/material";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

const ProvidersPanel = () => {

  // use hook importer
  const dispatch = useDispatch()

  //use Selector hook to get state for redux store
  const { incomingProviders } = useSelector(state => state.EmployeeProviderSlice)
  console.log(incomingProviders)
  const { recordsProviders } = useSelector(state => state.EmployeeProviderSlice)
  console.log(recordsProviders)


  // use State hook for local state management
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [pageIncoming, setPageIncoming] = useState(0);
  const [rowsPerPageIncoming, setRowsPerPageincoming] = useState(8);
  const [pageRecord, setPageRecord] = useState(0);
  const [rowsPerPageRecord, setRowsPerPageRecord] = useState(8);
  const [showFilter, setShowFilter] = useState(false);
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();

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
          <h2>{t("providers_panel")}</h2>
        </div>
      </div>
      {/* portfolio-grid */}
      <div className="">
        <div className="row steps-row mb-3" id="pills-tab" role="tablist">
          <div className="col-6 tab" role="presentation">
            <a
              className={`steps btn ${toggleState === 1 ? "active-border" : "disable-border"
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
          <div className="col-6 tab tab-right" role="presentation">
            <a
              className={`steps btn ${toggleState === 2 ? "active-border" : "disable-border"
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
              <span>{t("provider")}</span>
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
            <div className="orders">
              <div className=" order_header ">
                <div className="right_header">
                  <p>{t("options")}</p>
                  <div className="switch">
                    <p className={isSwitchOn ? `p_inActive` : 'p_active'}>{t("incoming")}</p>
                    <Switch value={isSwitchOn} color="primary" onChange={() => { setIsSwitchOn(!isSwitchOn) }} />
                    <p className={isSwitchOn ? `p_active` : 'p_inActive'}>{t("records")}</p>
                  </div>
                </div>
                <div className="left_header">
                  <Link to="/dashboard/employee/providers/create-order"> <span className="mr-4">{t("create_order")} </span><i class="fa fa-plus" aria-hidden="true"></i></Link>
                  <div className="filter_btn" onClick={() => setShowFilter(true)}>
                    <img src={filter} alt="filter" />
                  </div>


                  {isSwitchOn && showFilter && <FilterModal setShowFilter={setShowFilter} handlFilters={handlFilters} />}
                  {!isSwitchOn && showFilter && <FilterModal setShowFilter={setShowFilter} handlFilters={handlFilters} />}
                  {/* <div className="col-4lter-col">
                    <div className="filter" onClick={() => handleShow(true)}>
                      <img src={filter} alt="filter" />
                    </div>
                    <ProvidersFilterModal
                      show={show}
                      onHide={() => handleClose(false)}
                    />
                  </div> */}
                </div>
              </div>
              {/* incoming order list */}
              {
                !isSwitchOn && incomingProviders?.content?.length > 0 ?
                  <div className="all_order_body_container_employee">
                    {
                      incomingProviders?.content?.map((item, index) => {


                        return (
                          <div className="order_list_card">

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

                            <div className='courier_info'>
                              <h4>{t("courier_information")}</h4>
                              <h6><span>{item?.provider?.acronym} |</span> {item?.provider?.providerCompanyName}</h6>
                              <p>{t("company")}</p>
                              <h6><span>{item?.providerEmployee?.user?.name || "-"}</span></h6>
                              <p>{t("employee")}</p>
                              <h6><span>{item?.providerVehicle?.vehicle?.brand || "-"}  |</span> {item?.providerVehicle?.vehicle?.serialNumber || "-"}</h6>
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
                                  <h4>{item?.description}</h4>
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
                  :

                  !isSwitchOn &&
                  <div className="mt-4">

                    <NotFoundDataWarning text={"No Incoming Orders"} />
                  </div>

              }
              {/* record imcoming list */}
              {
                isSwitchOn && recordsProviders?.content?.length > 0 ?
                  <div className="all_order_body_container_employee">

                    {
                      recordsProviders?.content?.map((item, index) => {
                        console.log(item)
                        return (
                          <div className="order_list_card">

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

                            <div className='courier_info'>
                              <h4>COURIER INFORMATION</h4>
                              <h6><span>{item?.provider?.acronym} |</span> {item?.provider?.providerCompanyName}</h6>
                              <p>Company</p>
                              <h6><span>{item?.providerEmployee?.user?.name}</span></h6>
                              <p>Employee</p>
                              <h6><span>{item?.providerVehicle?.vehicle?.brand} |</span> {item?.providerVehicle?.vehicle?.serialNumber}</h6>
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
                                  <h4>{item?.description}</h4>
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
            <div className="providers">
              <div className="row top-buttons">
                <div className="col-3">
                  <Link to={"upload-provider"}>
                    <div className=" upload-document">
                      <span>UPLOAD DOCUMENT</span>
                      <img src={file} alt="file" />
                    </div>
                  </Link>
                </div>

                <div className="col-3">
                  <Link to="add-providers">
                    <div className="add-provider">
                      <span>ADD NEW PROVIDER</span>
                      {/* <img src={} alt="file" /> */}
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </div>
                  </Link>
                </div>

                {/* <div className="col-3 add-provider">
                                    <Link to={'new-providers'}>
                                        <span>ADD NEW PROVIDER</span>
                                        <img src={file} alt="file" />
                                    </Link>
                                </div> */}
              </div>
              <div className="row">
                <div className="col-12">
                  {/* <MUIDataTable
                    title={"type the name to filter"}
                    data={getAllPageableProvider?.content}
                    columns={columns}
                    options={{
                      selectableRows: false, 
                    }}
                  /> */}
                  <ProviderTable toggleState={toggleState} />
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


    </div>
  );
};
export default ProvidersPanel;
