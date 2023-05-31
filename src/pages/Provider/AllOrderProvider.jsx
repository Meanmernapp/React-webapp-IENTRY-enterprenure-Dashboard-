import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import filter from "../../assets/images/filter.svg";
import Switch from "@mui/material/Switch";
import FilterModal from "./Modal/FilterModal";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllProviderEmployeeListDown,
  GetAllProviderVehicleListDown,
  GetOrderDetails,
  GetProvidersIncoming,
  GetProvidersRecord,
} from "../../reduxToolkit/Providers/providersApi";
import { Box } from "@mui/material";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import NotFoundDataWarning from "../../components/NotFoundDataWarning";
import DisplayView from "../../components/DisplayView";
import TableViewSuppliers from "../Dashboard/Providers/TableViewSuppliers";


const AllOrderProvider = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [pageIncoming, setPageIncoming] = useState(0);
  const [rowsPerPageIncoming, setRowsPerPageincoming] = useState(4);

  const [pageRecord, setPageRecord] = useState(0);
  const [rowsPerPageRecord, setRowsPerPageRecord] = useState(4);

  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();

  const [view, setView]= useState("grid")

  const { user } = useSelector(state => state.authenticatioauthennSlice);
  console.log(user)
  const dispatch = useDispatch();

  // get state from store

  const { getProvidersIncoming } = useSelector((state) => state.providersSlice);
  console.log(getProvidersIncoming);

  const { getProvidersRecord } = useSelector((state) => state.providersSlice);
  console.log(getProvidersRecord);

  const handlFilters = (order, sort) => {
    setOrderBy(order);
    setSortBy(sort);
  };

  const handleChangePageIcoming = (event, newPage) => {
    setPageIncoming(newPage);
  };
  const handleChangeRowsPerPageIncoming = (event) => {
    setRowsPerPageincoming(parseInt(event.target.value));
    setPageIncoming(0);
  };

  const handleChangePageRecord = (event, newPage) => {
    setPageRecord(newPage);
  };
  const handleChangeRowsPerPageRecord = (event) => {
    setRowsPerPageRecord(parseInt(event.target.value));
    setPageRecord(0);
  };
  // useEffect for api call incoming with pagination
  useEffect(() => {
    const d = new Date();
    let time_in_miliseconds = Math.round(d.getTime());

    const body = {
      date: time_in_miliseconds,
      providerId:  localStorage.getItem("providerId"),
      pagination: {
        order: sortBy === "asc" ? true : false,
        page: pageIncoming,
        size: rowsPerPageIncoming,
        sortBy: orderBy ? orderBy : "id",
      },
    };
    dispatch(GetProvidersIncoming(body));
  }, [pageIncoming, rowsPerPageIncoming, orderBy, sortBy]);

  // useEffect for api call record with pagination
  useEffect(() => {
    const d = new Date();
    let time_in_miliseconds = Math.round(d.getTime());

    const body = {
      date: time_in_miliseconds,
      providerId:  localStorage.getItem("providerId"),
      pagination: {
        order: sortBy === "asc" ? true : false,
        page: pageRecord,
        size: rowsPerPageRecord,
        sortBy: orderBy ? orderBy : "id",
      },
    };
    dispatch(GetProvidersRecord(body));
  }, [pageRecord, rowsPerPageRecord, orderBy, sortBy]);

  return (
    <div className="all_order_provider mt-4">
      {/* Header */}
      <div className="top_header_provider">
        <div className="top_haeder_provider_right">
          
          <h2>{t("orders")}</h2>
          <div className="order_option">
            <div className="d-flex align-items-center">

            <p>{t("options")}</p>
            <DisplayView view={view}  setView={setView} />
            </div>
            <div className="switch">
              <p className={isSwitchOn ? `p_inActive` : "p_active"}>{t("incoming")}</p>
              <Switch
                value={isSwitchOn}
                onChange={() => {
                  setIsSwitchOn(!isSwitchOn);
                }}
              />
              <p className={isSwitchOn ? `p_active` : "p_inActive"}>{t("records")}</p>
            </div>
          </div>
        </div>

        <div>
          <button
            className="btn btn-primary filter"
            onClick={() => {
              setShowFilter(true);
            }}
          >
            <img src={filter} alt="" />
          </button>
          {isSwitchOn && showFilter && (
            <FilterModal
              setShowFilter={setShowFilter}
              handlFilters={handlFilters}
            />
          )}
          {!isSwitchOn && showFilter && (
            <FilterModal
              setShowFilter={setShowFilter}
              handlFilters={handlFilters}
            />
          )}
        </div>
      </div>
      {/* order list body */}
      {
        view =="grid" ?
      <div className="all_order_body_container ">
        {isSwitchOn == false && getProvidersIncoming?.content?.length > 0
          ? getProvidersIncoming?.content?.map((item) => {
            return (
              <div className="order_list_card">
                <div className="folio">
                <div className="input_check">
                                    {/* <input type="checkbox" className="checkbox"
                                      checked={selectOrderForDeleteIncoming?.includes(item?.id)}
                                      id={item?.id}
                                      onChange={handleCheckboxChangeOrderIncoming}
                                    /> */}
                                    {t("Folio")}
                                    <span style={{ fontSize: "10px" }}>#{item?.folio || "-"}</span>
                                  </div>

                <div className="status">
                  <p
                    style={{
                      color:
                        (item?.status?.id == 28 && "gray") ||
                        (item?.status?.id == 29 && "blue") ||
                        (item?.status?.id == 30 && "yellow") ||
                        (item?.status?.id == 36 && "red"),
                    }}
                  >
                    {item?.status?.name.split("_").join(" ")}{" "}
                  </p>
                  <div
                    className="status_icon"
                    style={{
                      background:
                        (item?.status?.id == 28 && "gray") ||
                        (item?.status?.id == 29 && "blue") ||
                        (item?.status?.id == 30 && "yellow") ||
                        (item?.status?.id == 36 && "red"),
                    }}
                  ></div>
                </div>
                </div>

                <div className="courier_info">
                  <h4>{t("courier_information")}</h4>
                  <h6>
                    <span>{item?.supplier?.acronym} |</span>{" "}
                    {item?.supplier?.supplierCompanyName || "-"}
                  </h6>
                  <p>{t("company")}</p>
                  <h6 style={{fontWeight:'bold'}} >{item?.supplierEmployee?.user?.name || "-"}</h6>
                  <p>{t("employee")}</p>
                  <h6>
                    <span>{item?.supplierVehicle?.vehicle?.brand || "-"}|</span> {item?.supplierVehicle?.vehicle?.plate || "-"}
                  </h6>
                  <p>{t("vehicle")}</p>
                </div>
                <div className="delivery_info mt-1">
                  <h4>{t("delivery_information")}</h4>
                  <div className="item_container">
                    <div className="item_name">
                      <p>{t("eta")}</p>
                      {/* <p>Corporate</p> */}
                      <p>{t("item")}</p>
                      <p>{t("description")} </p>
                    </div>
                    <div className="item_data">
                      <h4>{item?.eta || "-"}</h4>
                      {/* <h4>IBL Corporate</h4> */}
                      <h4>{item?.item}</h4>
                      <h4>{item?.description.slice(0,15) } {item?.description?.length > 15 && "..."}</h4>
                    </div>
                  </div>
                </div>
                {item?.status?.id == 30 && (
                  <div className="delivery_info mt-1">
                    <h4>{t("reveived_information")}</h4>
                    <div className="item_container">
                      <div className="item_name">
                        <p>{t("received_by")}</p>
                        <p>{t("delivery_date")}</p>
                      </div>
                      <div className="item_data">
                        <h4>Marco Polo Perez</h4>
                        <h4>26/08/2023 11:45</h4>
                      </div>
                    </div>
                  </div>
                )}

                <div className="link">
                  {item?.status?.id == 28 ? (
                    <Link
                      to="/dashboard/supplier/complete-order"

                      onClick={() => {
                        localStorage.setItem("supplier_order_id", item?.id)
                        
                       
                      }}
                    >
                      {t("complete_order")}<i className="fa fas-arrow-right"></i>
                    </Link>
                  ) : (
                    <NavLink
                      to="/dashboard/supplier/order-detail"
                      onClick={() => {
                        localStorage.setItem("supplier_order_id", item?.id)    
                      }}
                    >
                      {t("view_details")} <i className="fa fas-arrow-right"></i>
                    </NavLink>
                  )}
                </div>
              </div>
            );
          })
          : isSwitchOn == false && (
            <NotFoundDataWarning text={"no_incoming_data"} />
          )}
        {isSwitchOn == true && getProvidersRecord?.content?.length > 0
          ? getProvidersRecord?.content?.map((item) => {
            return (
              <div className="order_list_card">
                <div className="folio pb-2">
                <div className="input_check">
                                    {/* <input type="checkbox" className="checkbox"
                                      checked={selectOrderForDeleteIncoming?.includes(item?.id)}
                                      id={item?.id}
                                      onChange={handleCheckboxChangeOrderIncoming}
                                    /> */}
                                    {t("Folio")}
                                    <span style={{ fontSize: "10px" }}>#{item?.folio || "-"}</span>
                                  </div>
                <div className="status">
                  <p
                    style={{
                      color:
                        (item?.status?.id == 28 && "gray") ||
                        (item?.status?.id == 29 && "blue") ||
                        (item?.status?.id == 30 && "yellow") ||
                        (item?.status?.id == 36 && "red"),
                    }}
                  >
                    {item?.status?.name.split("_").join(" ")}{" "}
                  </p>
                  <div
                    className="status_icon"
                    style={{
                      background:
                        (item?.status?.id == 28 && "gray") ||
                        (item?.status?.id == 29 && "blue") ||
                        (item?.status?.id == 30 && "yellow") ||
                        (item?.status?.id == 36 && "red"),
                    }}
                  ></div>
                </div>
                </div>

                <div className="courier_info">
                  <h4>{t("courier_information")}</h4>
                  <h6>
                    <span>{item?.supplier?.acronym} |</span>{" "}
                    {item?.supplier?.supplierCompanyName || "-"}
                  </h6>
                  <p>{t("company")}</p>
                  <h6 style={{fontWeight:'bold'}}>
                    {item?.supplierEmployee?.user?.name || "-"}
                  </h6>
                  <p>{t("employee")}</p>
                  <h6>
                    <span>{item?.supplierVehicle?.vehicle?.brand || "-"} |</span> {item?.supplierVehicle?.vehicle?.plate || "-"}
                  </h6>
                  <p>{t("vehicle")}</p>
                </div>
                <div className="delivery_info mt-1">
                  <h4>{t("delivery_information")}</h4>
                  <div className="item_container">
                    <div className="item_name">
                      <p>{t("eta")}</p>
                      {/* <p>Corporate</p> */}
                      <p>Item</p>
                      <p>{t("description")} </p>
                    </div>
                    <div className="item_data">
                      <h4>{item?.eta || "-"}</h4>
                      {/* <h4>IBL Corporate</h4> */}
                      <h4>{item?.item}</h4>
                      <h4>{item?.description.slice(0,15)}{item?.description?.length > 15 && "..."}</h4>
                    </div>
                  </div>
                </div>
                {item?.status?.id == 30 && (
                  <div className="delivery_info mt-1">
                    <h4>{t("received_information")}</h4>
                    <div className="item_container">
                      <div className="item_name">
                        <p>{t("received_by")}</p>
                        <p>{t("delivery_date")}</p>
                      </div>
                      <div className="item_data">
                        <h4>Marco Polo Perez</h4>
                        <h4>26/08/2023 11:45</h4>
                      </div>
                    </div>
                  </div>
                )}

                <div className="link">
                  {item?.status?.id == 28 ? (
                    <Link
                      to="/dashboard/supplier/complete-order"
                      onClick={() => {
                        localStorage.setItem("supplier_order_id", item?.id)
                      
                      }}
                    >
                      {t("complete_order")} <i className="fa fas-arrow-right"></i>
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard/supplier/order-detail"
                      onClick={() => {
                        localStorage.setItem("supplier_order_id", item?.id)
                      }}
                    >
                      {t("view_details")} <i className="fa fas-arrow-right"></i>
                    </Link>
                  )}
                </div>
              </div>
            );
          })
          : isSwitchOn == true && (

            <NotFoundDataWarning text={"no_records_data"} />
          )}
      </div>:
      <>
      {
        isSwitchOn == false && getProvidersIncoming?.content?.length > 0 ?
        <TableViewSuppliers
        dataApi={getProvidersIncoming}
        userFor="supplier"
        // selectOrderForDelete={selectOrderForDeleteIncoming}
        // isAllCheckedOrder={isAllCheckedOrderIncoming}
        // handelDeleteAllOrders={handelDeleteAllOrderIncoming}
        // handleCheckboxChangeOrder={handelDeleteAllOrderIncoming}
      />: isSwitchOn == false && (
        <NotFoundDataWarning text={"no_incoming_data"} />
      )

      }
       {
        isSwitchOn == true && getProvidersRecord?.content?.length > 0 ?
        <TableViewSuppliers
        userFor="supplier"
        dataApi={getProvidersRecord}
        // selectOrderForDelete={selectOrderForDeleteIncoming}
        // isAllCheckedOrder={isAllCheckedOrderIncoming}
        // handelDeleteAllOrders={handelDeleteAllOrderIncoming}
        // handleCheckboxChangeOrder={handelDeleteAllOrderIncoming}
      />: isSwitchOn == true && (
        <NotFoundDataWarning text={"no_records_data"} />
      )

      }
      </>
}

      {isSwitchOn == false && getProvidersIncoming?.content?.length > 0 && (
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[2, 4, 6, 8, 12]}
            count={getProvidersIncoming?.totalElements}
            page={pageIncoming}
            onPageChange={handleChangePageIcoming}
            labelRowsPerPage={t("suppliers_incoming_per_page")}
            rowsPerPage={rowsPerPageIncoming}
            onRowsPerPageChange={handleChangeRowsPerPageIncoming}
          />
        </div>
      )}

      {isSwitchOn == true && getProvidersRecord?.content?.length > 0 && (
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[2, 4, 6, 8, 12]}
            count={getProvidersRecord?.totalElements}
            page={pageRecord}
            onPageChange={handleChangePageRecord}
            labelRowsPerPage={t("suppliers_records_per_page")}
            rowsPerPage={rowsPerPageIncoming}
            onRowsPerPageChange={handleChangeRowsPerPageRecord}
          />
        </div>
      )}
    </div>
  );
};

export default AllOrderProvider;
