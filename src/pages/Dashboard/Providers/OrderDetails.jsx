import { t } from "i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import employee from "../../../assets/images/employee-4.png";
import vehicleDefault from "../../../assets/images/carDemoImg.png";

import { DetailsEmployeeProviderEmployee, DetailsEmployeeProviderOrder, DetailsEmployeeProviderVehicle } from "../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import Cookies from "js-cookie";
import NotFoundAnything from "../../../components/NotFoundAnything";



const OrderDetails = () => {
  const dispatch = useDispatch();
  const lCode = Cookies.get("i18next") || "en";
  const { detailEmployeeProviderOrder } = useSelector(state => state.EmployeeProviderSlice)
  console.log(detailEmployeeProviderOrder)
  console.log(detailEmployeeProviderOrder?.status?.id)

  var d = new Date(parseInt(detailEmployeeProviderOrder?.deliveryDate, 10));
  var ds = d.toString('MM/dd/yyyy')
  // var ds = d.toString('MM/dd/yy HH:mm:ss')
  const date = new Date(detailEmployeeProviderOrder?.deliveryDate);

  const colorIs = detailEmployeeProviderOrder?.status?.id == 28 && "gray" ||
    detailEmployeeProviderOrder?.status?.id == 29 && "blue" ||
    detailEmployeeProviderOrder?.status?.id == 30 && "yellow" ||
    detailEmployeeProviderOrder?.status?.id == 36 && "red"

  const backgroudIs = detailEmployeeProviderOrder?.status?.id == 28 && "gray" ||
    detailEmployeeProviderOrder?.status?.id == 29 && "blue" ||
    detailEmployeeProviderOrder?.status?.id == 30 && "yellow" ||
    detailEmployeeProviderOrder?.status?.id == 36 && "red"



  // useEffect(() => {
  //   if (localStorage.getItem("providerOrderDetail")) {

  //     dispatch(DetailsEmployeeProviderOrder(localStorage.getItem("providerOrderDetail")))
  //   }
  // }, [localStorage.getItem("providerOrderDetail")])
  return (
    <div className="order-details">
      <div className="head">
        <div className="headLeft">
          <Link to="/dashboard/employee/providers">
            <i className="fa fa-arrow-left" aria-hidden="true"
              style={{
                transform: lCode === "ar" ? "scaleX(-1)" : "",
                margin: "0 10px"
              }}></i>
          </Link>
          <h2>{t("order_details")}</h2>
        </div>
      </div>
      <div className="">
        <div className="row content-row">
          <div className="col-9 details">
            <div className="status">
              <div className="status-text-blue"
                style={{ color: colorIs }}
              >
                {detailEmployeeProviderOrder?.status?.name.split("_").join(" ")}
              </div>
              <div
                className="status-indicator-blue"
                style={{ backgroundColor: backgroudIs }}
              ></div>
            </div>
            <div className="content">
              <div className="order">
                <strong>{t("order")}</strong>
                <span style={{ color: detailEmployeeProviderOrder?.status?.id == 36 && "red !important" }}>#104-SDAS</span>
                <div className="actual-details">
                  {/* Luis Enrique Cornejo Arreola */}
                  {detailEmployeeProviderOrder?.provider?.user?.name}
                </div>
                <div className="faded-headings">{t("contract")}</div>
                <div className="actual-details">{detailEmployeeProviderOrder?.provider?.user?.email || "-"}</div>
                <div className="faded-headings">{t("contractor")}</div>
                <div className="actual-details">{detailEmployeeProviderOrder?.provider?.user?.phoneNumber || "-"}</div>
                <div className="faded-headings">{t("celular")}</div>
              </div>
              <div className="delivery-details">
                <div className="faded-headings">{t("delivery_date")}</div>
                <div className="actual-details">{date.toLocaleDateString('en-US' || "-")}</div>
                <div className="faded-headings">{t("corporate")}</div>
                <div className="actual-details">{detailEmployeeProviderOrder?.provider?.providerCompanyName || "-"}</div>
              </div>
              <div className="time-details">
                <div className="faded-headings">{t("time_of_inverval")}</div>
                <div className="actual-details">18:33 </div>
                {/* <div className="faded-headings">18:33</div> */}
                {/* <div className="actual-details">4427265969</div> */}
                <div className="faded-headings">{t("departure_time")}</div>
                <div className="actual-details">{detailEmployeeProviderOrder?.provider?.depature_time || "-"}</div>
                <div className="faded-headings">{t("total_time")}</div>
                <div className="actual-details">{detailEmployeeProviderOrder?.provider?.total_time || "-"}</div>

                <div className="faded-headings">{t("who_received")}</div>
                <div className="actual-details">{detailEmployeeProviderOrder?.userReceived?.name || "-"}</div>
              </div>
            </div>
          </div>
          <div className="col-7 cards-section">
            <div className="card e_card">
              <div className="card-heading">{t("employee")}</div>
              {
                detailEmployeeProviderOrder?.providerEmployee != null ?
                  <div className="card-body" >
                    <img className="card-img-top"
                      // src={employee} 
                      src={detailEmployeeProviderOrder?.providerVehicle?.vehicle?.selfie != null ? `data:image/png;base64,${detailEmployeeProviderOrder?.providerVehicle?.vehicle?.selfie}` : employee}
                      alt="employee" />
                    <div className="card-content">
                      <div className="card-data-row">
                        <div className="headings">{t("name")}</div>
                        <div className="details">{detailEmployeeProviderOrder?.providerEmployee?.user?.name || "-"}</div>
                      </div>
                      <div className="card-data-row">
                        <div className="headings">{t("job_title")}</div>
                        <div className="details">none</div>
                      </div>
                      <div className="card-data-row">
                        <div className="headings">{t("gender")}</div>
                        <div className="details">{detailEmployeeProviderOrder?.providerEmployee?.user?.gender?.name || "-"}</div>
                      </div>
                      <div className="card-data-row">
                        <div className="headings">{t("email")}</div>
                        <div className="details">{detailEmployeeProviderOrder?.providerEmployee?.user?.email || "-"}</div>
                      </div>
                      <div className="card-data-row">
                        <div className="headings">{t("number")}</div>
                        <div className="details">{detailEmployeeProviderOrder?.providerEmployee?.user?.phoneNumber || "-"}</div>
                      </div>
                      <div className="view-details mt-3" >

                        <Link to="/dashboard/employee/providers/employee-providers-details" onClick={() => {
                          dispatch(DetailsEmployeeProviderEmployee(detailEmployeeProviderOrder?.providerEmployee?.user?.id))
                          localStorage.setItem("employeeProviderDetail", detailEmployeeProviderOrder?.providerEmployee?.user?.id)
                        }}>
                          {t("employee_details")}
                          <i class="fa fa-angle-right" style={{
                            transform: lCode === "ar" ? "scaleX(-1)" : "",
                            // margin: "0 10px"
                          }}></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  :
                  <NotFoundAnything text={"No Employee"} />
              }

            </div>
            <div className="card v_card">
              <div className="card-heading">{t("vehicles")}</div>
              {
                detailEmployeeProviderOrder?.providerVehicle != null ?
                  <div className="card-body" style={{ width: '225px', height: "286px" }}>
                    <img className="card-img-top"
                      // src={vehicleDefault}
                      src={detailEmployeeProviderOrder?.providerVehicle?.vehicle?.image != null ? `data:image/png;base64,${detailEmployeeProviderOrder?.providerVehicle?.vehicle?.image}` : vehicleDefault}
                      alt="employee"
                      width="210px !important"
                      height="117px !important"
                    />
                    <div className="card-content">
                      <div className="card-data-row">
                        <div className="headings">{t("brand")}</div>
                        <div className="details">{detailEmployeeProviderOrder?.providerVehicle?.vehicle?.brand}</div>
                      </div>
                      <div className="card-data-row">
                        <div className="headings">{t("sub_brand")}</div>
                        <div className="details">{detailEmployeeProviderOrder?.providerVehicle?.vehicle.subBrand}</div>
                      </div>
                      <div className="card-data-row">
                        <div className="headings">{t("model")}</div>
                        <div className="details">{detailEmployeeProviderOrder?.providerVehicle?.vehicle?.model}</div>
                      </div>
                      <div className="card-data-row">
                        <div className="headings">{t("color")}</div>
                        <div className="details">{detailEmployeeProviderOrder?.providerVehicle?.vehicle?.color}</div>
                      </div>
                      <div className="card-data-row">
                        <div className="headings">{t("plates")}</div>
                        <div className="details">{detailEmployeeProviderOrder?.providerVehicle?.vehicle?.plate}</div>
                      </div>
                      <div className="card-data-row">
                        <div className="headings">{t("type")}</div>
                        <div className="details">{""}</div>
                      </div>
                      <div className="card-data-row">
                        <div className="headings">{t("corporate")}</div>
                        <div className="details">{""}</div>
                      </div>
                      <div className="view-details">
                        <Link to="/dashboard/employee/providers/vehicle-detail" onClick={() => {
                          dispatch(DetailsEmployeeProviderVehicle(detailEmployeeProviderOrder?.providerVehicle?.id))
                          localStorage.setItem("vehicleProviderDetail", detailEmployeeProviderOrder?.providerVehicle?.id)

                        }}>

                          {t("vehicle_details")}
                          <i class="fa fa-angle-right" style={{
                            transform: lCode === "ar" ? "scaleX(-1)" : "",

                          }}></i>
                        </Link>
                      </div>
                    </div>
                  </div> :
                  <NotFoundAnything text="No Vehicle" />
              }
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
