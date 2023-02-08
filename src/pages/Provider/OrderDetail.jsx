import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from 'react-redux';
import defaultCar from '../../assets/images/default-car.png'
import def from '../../assets/images/user-png.png';
import { CheckProviderImage, GetProviderEmployeeDetail, GetProviderVehicleDetail } from '../../reduxToolkit/Providers/providersApi';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import NotFoundDataWarning from '../../components/NotFoundDataWarning';


const OrderDetail = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    const dispatch = useDispatch();
   

    // const [emailSlice, setEmailSlice] = useState("")
    const { getOrderDetails } = useSelector(state => state.providersSlice);
    console.log(getOrderDetails)

    const date = new Date(getOrderDetails?.eta);

    // check email length and cut off
    const EmailSlice = getOrderDetails?.provider?.user?.email.split("@")

    return (
        <div className="order_detail_container">
            <div className="top_header_provider">
                <h2>
                    <Link to="/dashboard/provider/orders">
                        <ArrowBackIcon
                            style={{
                                color: "#146F62",
                                fontSize: "30px",
                                marginRight: "30px",
                            }}
                        />
                    </Link>
                    {t("order_details")}
                </h2>
                <div className='btn_with_icon'>
                    <Link to="/dashboard/provider/update-order">
                        <button className='add'
                        // onClick={() => { navigate("/dashboard/provider/update-order") }}
                        >
                            {t("update_order")} <i class="fa fa-floppy-o" aria-hidden="true"></i>

                        </button>
                    </Link>
                </div>

            </div>

            <div className='order_info_conatiner'>
                <div className='order_info_conatiner_header'>
                    <div>
                        <h5>{t("order")}<span>#{getOrderDetails?.id}</span></h5>
                    </div>
                    <div className='status'>
                        <p
                            style={{
                                color: getOrderDetails?.status?.id == 28 && "gray" ||
                                    getOrderDetails?.status?.id == 29 && "blue" ||
                                    getOrderDetails?.status?.id == 30 && "yellow" ||
                                    getOrderDetails?.status?.id == 36 && "red"
                            }}
                        >{getOrderDetails?.status?.name.split("_").join(" ")}</p>
                        <div className='status_icon' style={{
                            background: getOrderDetails?.status?.id == 28 && "gray" ||
                                getOrderDetails?.status?.id == 29 && "blue" ||
                                getOrderDetails?.status?.id == 30 && "yellow" ||
                                getOrderDetails?.status?.id == 36 && "red"
                        }}></div>
                    </div>
                </div>
                <div className='inner_container'>
                    <div className='order_info_items_left'>
                        <h5>{t("courier_information")}</h5>
                        <div className='order_info_item_left'>
                            <p>{t("provider")}</p>
                            <h4>{getOrderDetails?.provider?.providerCompanyName + "|" + getOrderDetails?.provider?.acronym}</h4>
                        </div>
                        <div className='order_info_item_left'>
                            <p>{t("email")}</p>
                            <h4>{getOrderDetails?.provider?.user?.email}</h4>
                        </div>
                        <div className='order_info_item_left'>
                            <p>{t("celular")}</p>
                            <h4>{getOrderDetails?.provider?.user?.phoneNumber}</h4>
                        </div>

                    </div>
                    <div className='order_info_items_middel'>
                        <h5>{t("delivery_information")}</h5>
                        <div className='order_info_item_middel'>
                            <p>{t("eta")}</p>
                            <h4> {getOrderDetails?.eta ? date.toLocaleDateString('en-US') : '-'}</h4>
                        </div>
                        <div className='order_info_item_middel'>
                            <p>{t("item")} </p>
                            <h4>{getOrderDetails?.item}</h4>
                        </div>
                        <div className='order_info_item_middel'>
                            <p> {t("decription")}</p>
                            <h4>{getOrderDetails?.description}</h4>
                        </div>

                    </div>
                    <div className='order_info_items_right'>
                        <h5>{t("received_information")}</h5>
                        <div className='order_info_item-right'>
                            <p>{t("received_by")}</p>
                            <h4>{getOrderDetails?.userReceived?.name ? getOrderDetails?.userReceived?.name : '-'}</h4>
                        </div>
                        <div className='order_info_item-right'>
                            <p>{t("delivery_date")}</p>
                            <h4>23/08/2022</h4>
                        </div>
                    </div>
                    <div className='order_info_items_right_last'>
                        {/* <h5>DESCRIPTION</h5> */}
                        <div className='order_info_item-right'>
                            <p>{t("description")}</p>
                            <h4>{getOrderDetails?.description ? getOrderDetails?.description : '-'}</h4>
                        </div>
                        {/* <div className='order_info_item-right'>
                            <p>DELIVERY DATE</p>
                            <h4>23/08/2022</h4>
                        </div> */}
                    </div>

                </div>


            </div>

            <div className='order_info_section'>

                <div className='order_info_employee'>
                    <h3>EMPLOYEE</h3>
                    {
                        getOrderDetails?.providerEmployee != null ?
                            <div className="card_container mt-4">
                                <div className="card_header">

                                    <div className="left_active">
                                        <p style={{
                                            color: getOrderDetails?.providerEmployee?.user?.status?.id == 2 && "yellow" ||
                                                getOrderDetails?.providerEmployee?.user?.status?.id == 3 && "blue" ||
                                                getOrderDetails?.providerEmployee?.user?.status?.id == 4 && "green" ||
                                                getOrderDetails?.providerEmployee?.user?.status?.id == 5 && "orange" ||
                                                getOrderDetails?.providerEmployee?.user?.status?.id == 6 && "red"
                                        }}>{getOrderDetails?.providerEmployee?.user?.status?.name.split("_").join(" ")}</p>
                                        <div className="status_active" style={{
                                            background: getOrderDetails?.providerEmployee?.user?.status?.id == 2 && "yellow" ||
                                                getOrderDetails?.providerEmployee?.user?.status?.id == 3 && "blue" ||
                                                getOrderDetails?.providerEmployee?.user?.status?.id == 4 && "green" ||
                                                getOrderDetails?.providerEmployee?.user?.status?.id == 5 && "orange" ||
                                                getOrderDetails?.providerEmployee?.user?.status?.id == 6 && "red"
                                        }}></div>
                                    </div>
                                </div>


                                <div className="card_body">
                                    <img src={getOrderDetails?.providerEmployee?.user?.selfie != null ? `data:image/png;base64,${getOrderDetails?.providerEmployee?.user?.selfie}` : def} alt="" />
                                    <div className="card_body_items">
                                        <div className="card_body_item">
                                            <h5>Name</h5>
                                            <p>{getOrderDetails?.providerEmployee?.user?.name}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>Job title</h5>
                                            <p>Contador</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>Gender</h5>
                                            <p>{getOrderDetails?.providerEmployee?.user?.gender?.name}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>Email</h5>
                                            <p>{EmailSlice[0]}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>Number</h5>
                                            <p>{getOrderDetails?.providerEmployee?.user?.phoneNumber}</p>
                                        </div>
                                        <div className="card_footer">
                                            {
                                                getOrderDetails?.providerEmployee?.user?.status?.id == 3 ?
                                                    <>
                                                        <Link to="/dashboard/provider/complete-document"
                                                            onClick={() => {
                                                                dispatch(GetProviderEmployeeDetail(getOrderDetails?.providerEmployee?.user?.id));
                                                                dispatch(CheckProviderImage(getOrderDetails?.providerEmployee?.user?.id))
                                                                localStorage.setItem("provideridfordetail", getOrderDetails?.providerEmployee?.user?.id)

                                                            }}
                                                        >
                                                            COMPLETE DOCUMENTS
                                                        </Link>
                                                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                    </> :
                                                    <>
                                                        <Link to="/dashboard/provider/provider-order-detail"
                                                            onClick={() => {
                                                                dispatch(GetProviderEmployeeDetail(getOrderDetails?.providerEmployee?.user?.id));
                                                                dispatch(CheckProviderImage(getOrderDetails?.providerEmployee?.user?.id))
                                                                localStorage.setItem("provideridfordetail", getOrderDetails?.providerEmployee?.user?.id)

                                                            }}
                                                        >EMPLOYEE DETAILS</Link>
                                                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div> :
                            <NotFoundDataWarning text={"NO EMPLOYEE DATA"} />

                    }

                </div>

                <div className='order_info_vehicle'>
                    <h3>VEHICLE</h3>
                    {
                        getOrderDetails?.providerVehicle != null ?
                            <div className="card_container mt-4" >
                                <div className="card_header">

                                    <div className="left_active">
                                        <p style={{
                                            color: getOrderDetails?.providerVehicle?.vehicle?.status?.id == 2 && "yellow" ||
                                                getOrderDetails?.providerVehicle?.vehicle?.status?.id == 3 && "blue" ||
                                                getOrderDetails?.providerVehicle?.vehicle?.status?.id == 4 && "green" ||
                                                getOrderDetails?.providerVehicle?.vehicle?.status?.id == 5 && "orange" ||
                                                getOrderDetails?.providerVehicle?.vehicle?.status?.id == 6 && "red"
                                        }}>{getOrderDetails?.providerVehicle?.vehicle?.status?.name.split("_").join(" ")}</p>
                                        <div className="status_active" style={{
                                            background: getOrderDetails?.providerVehicle?.vehicle?.status?.id == 2 && "yellow" ||
                                                getOrderDetails?.providerVehicle?.vehicle?.status?.id == 3 && "blue" ||
                                                getOrderDetails?.providerVehicle?.vehicle?.status?.id == 4 && "green" ||
                                                getOrderDetails?.providerVehicle?.vehicle?.status?.id == 5 && "orange" ||
                                                getOrderDetails?.providerVehicle?.vehicle?.status?.id == 6 && "red"
                                        }}></div>
                                    </div>
                                </div>
                                <div className="card_body">
                                    <img src={
                                        getOrderDetails?.providerVehicle?.vehicle?.image != null ? `data:image/png;base64,${getOrderDetails?.providerVehicle?.vehicle?.image}` :
                                            defaultCar} alt="" />
                                    <div className="card_body_items">
                                        <div className="card_body_item">
                                            <h5>Brand</h5>
                                            <p>{getOrderDetails?.providerVehicle?.vehicle?.brand}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>Sub-Brand</h5>
                                            <p>{getOrderDetails?.providerVehicle?.vehicle?.subBrand}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>Model</h5>
                                            <p>{getOrderDetails?.providerVehicle?.vehicle?.model}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>Color</h5>
                                            <p>{getOrderDetails?.providerVehicle?.vehicle?.color}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>Plates</h5>
                                            <p>{getOrderDetails?.providerVehicle?.vehicle?.plate}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>S/N</h5>
                                            <p>{getOrderDetails?.providerVehicle?.vehicle?.serialNumber}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>Vin</h5>
                                            <p>{getOrderDetails?.providerVehicle?.vehicle?.vin}</p>
                                        </div>
                                        <div className="card_footer">
                                            {
                                                getOrderDetails?.providerVehicle?.vehicle?.status?.id == 3 ?
                                                    <>
                                                        <Link to="/dashboard/provider/vehicle-documents"

                                                            onClick={() => {
                                                                dispatch(GetProviderVehicleDetail(getOrderDetails?.providerVehicle?.vehicle?.id));
                                                                // dispatch(CheckProviderImage(item?.id))
                                                                localStorage.setItem("vehicleidfordetail", getOrderDetails?.providerVehicle?.vehicle?.id)

                                                            }}
                                                        >
                                                            COMPLETE DOCUMENTS
                                                        </Link>
                                                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                    </> :
                                                    <>
                                                        <Link to="/dashboard/provider/vehicles-details"
                                                            onClick={() => {
                                                                dispatch(GetProviderVehicleDetail(getOrderDetails?.providerVehicle?.vehicle?.id));
                                                                // dispatch(CheckProviderImage(item?.id))
                                                                localStorage.setItem("vehicleidfordetail", getOrderDetails?.providerVehicle?.vehicle?.id)

                                                            }}
                                                        >VEHICLE DETAILS</Link>
                                                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div> :
                            <NotFoundDataWarning text={"NO VEHICLE DATA"} />
                    }
                </div>

            </div>
        </div>
    )
}

export default OrderDetail