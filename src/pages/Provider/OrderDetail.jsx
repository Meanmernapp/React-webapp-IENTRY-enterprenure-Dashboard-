import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import defaultCar from '../../assets/defaultImages/defaultCar.svg';
import def from '../../assets/defaultImages/userDef.svg';
import NotFoundAnything from '../../components/NotFoundAnything';
import { CheckProviderImage, GetOrderDetails, GetProviderEmployeeDetail, GetProviderVehicleDetail } from '../../reduxToolkit/Providers/providersApi';


const OrderDetail = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";


    const dispatch = useDispatch();
    const location = useLocation();

    // const {orderId, supplierId} = location.state

    
 


    
   

    // const [emailSlice, setEmailSlice] = useState("")
    const { getOrderDetails } = useSelector(state => state.providersSlice);
    console.log(getOrderDetails)

    const date = new Date(getOrderDetails?.eta);

    // check email length and cut off
    const EmailSlice = getOrderDetails?.supplier?.user?.email.split("@")


    useEffect(()=>{
dispatch(GetOrderDetails(localStorage.getItem("supplier_order_id")))
    },[])

    return (
        <div className="order_detail_container">
            <div className="top_header_provider">
                <h2>
                    <Link to="/dashboard/supplier/orders">
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
                    <Link to="/dashboard/supplier/update-order">
                        <button className='add-btn-1'
                        // onClick={() => { navigate("/dashboard/supplier/update-order") }}
                        >
                            <i class="fa fa-floppy-o" aria-hidden="true"></i>
                            {t("update")} 

                        </button>
                    </Link>
                </div>

            </div>

            <div className='order_info_conatiner'>
                <div className='order_info_conatiner_header'>
                    <div>
                        <h5>{t("folio")} #<span >{getOrderDetails?.folio}</span></h5>
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
                            <p>{t("supplier")}</p>
                            <h4>{getOrderDetails?.supplier?.supplierCompanyName + "|" + getOrderDetails?.supplier?.acronym}</h4>
                        </div>
                        <div className='order_info_item_left'>
                            <p>{t("email")}</p>
                            <h4>{getOrderDetails?.supplier?.user?.email}</h4>
                        </div>
                        <div className='order_info_item_left'>
                            <p>{t("celular")}</p>
                            <h4>{getOrderDetails?.supplier?.user?.phoneNumber}</h4>
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
                       
                        <div className='order_info_item-right'>
                            <p>{t("description")}</p>
                            <h4>{getOrderDetails?.description ? getOrderDetails?.description : '-'}</h4>
                        </div>
                        
                    </div>

                </div>


            </div>

            <div className='order_info_section'>

                <div className='order_info_employee'>
                    <h3>{t("employee")}</h3>
                    {
                        getOrderDetails?.supplierEmployee != null ?
                            <div className="card_container mt-4">
                                <div className="card_header">

                                    <div className="left_active">
                                        <p style={{
                                            color: getOrderDetails?.supplierEmployee?.user?.status?.id == 2 && "yellow" ||
                                                getOrderDetails?.supplierEmployee?.user?.status?.id == 3 && "blue" ||
                                                getOrderDetails?.supplierEmployee?.user?.status?.id == 4 && "green" ||
                                                getOrderDetails?.supplierEmployee?.user?.status?.id == 5 && "orange" ||
                                                getOrderDetails?.supplierEmployee?.user?.status?.id == 6 && "red"
                                        }}>{getOrderDetails?.supplierEmployee?.user?.status?.name.split("_").join(" ")}</p>
                                        <div className="status_active" style={{
                                            background: getOrderDetails?.supplierEmployee?.user?.status?.id == 2 && "yellow" ||
                                                getOrderDetails?.supplierEmployee?.user?.status?.id == 3 && "blue" ||
                                                getOrderDetails?.supplierEmployee?.user?.status?.id == 4 && "green" ||
                                                getOrderDetails?.supplierEmployee?.user?.status?.id == 5 && "orange" ||
                                                getOrderDetails?.supplierEmployee?.user?.status?.id == 6 && "red"
                                        }}></div>
                                    </div>
                                </div>


                                <div className="card_body">
                                    <div className="img_round">

                                    <img src={getOrderDetails?.supplierEmployee?.user?.selfie != null ? `data:image/png;base64,${getOrderDetails?.supplierEmployee?.user?.selfie}` : def} alt="" />
                                    </div>
                                    <div className="card_body_items">
                                        <div className="card_body_item">
                                            <h5>{t("name")}</h5>
                                            <p>{getOrderDetails?.supplierEmployee?.user?.name}</p>
                                        </div>
                                        {/* <div className="card_body_item">
                                            <h5>{t("job_title")}</h5>
                                            <p>Contador</p>
                                        </div> */}
                                        <div className="card_body_item">
                                            <h5>{t("gender")}</h5>
                                            <p>{getOrderDetails?.supplierEmployee?.user?.gender?.name}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>{t("email")}</h5>
                                            <p>{getOrderDetails?.supplierEmployee?.user?.email}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>{t("number")}</h5>
                                            <p>{getOrderDetails?.supplierEmployee?.user?.phoneNumber}</p>
                                        </div>
                                        <div className="card_footer">
                                            {
                                                getOrderDetails?.supplierEmployee?.user?.status?.id == 3 ?
                                                    <>
                                                        <Link to="/dashboard/supplier/complete-document"
                                                            onClick={() => {
                                                                dispatch(GetProviderEmployeeDetail(getOrderDetails?.supplierEmployee?.user?.id));
                                                                dispatch(CheckProviderImage(getOrderDetails?.supplierEmployee?.user?.id))
                                                                localStorage.setItem("provideridfordetail", getOrderDetails?.supplierEmployee?.user?.id)

                                                            }}
                                                        >
                                                            {t("complete_documents")}
                                                        </Link>
                                                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                    </> :
                                                    <>
                                                        <Link to="/dashboard/supplier/supplier-order-detail"
                                                            onClick={() => {
                                                                dispatch(GetProviderEmployeeDetail(getOrderDetails?.supplierEmployee?.user?.id));
                                                                dispatch(CheckProviderImage(getOrderDetails?.supplierEmployee?.user?.id))
                                                                localStorage.setItem("provideridfordetail", getOrderDetails?.supplierEmployee?.user?.id)

                                                            }}
                                                        >{t("employee_details")}</Link>
                                                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div> :
                            <NotFoundAnything text={t("no_data")} />

                    }

                </div>

                <div className='order_info_vehicle'>
                    <h3>{t("vehicle")}</h3>
                    {
                        getOrderDetails?.supplierVehicle != null ?
                            <div className="card_container mt-4" >
                                <div className="card_header">

                                    <div className="left_active">
                                        <p style={{
                                            color: getOrderDetails?.supplierVehicle?.vehicle?.status?.id == 2 && "yellow" ||
                                                getOrderDetails?.supplierVehicle?.vehicle?.status?.id == 3 && "blue" ||
                                                getOrderDetails?.supplierVehicle?.vehicle?.status?.id == 4 && "green" ||
                                                getOrderDetails?.supplierVehicle?.vehicle?.status?.id == 5 && "orange" ||
                                                getOrderDetails?.supplierVehicle?.vehicle?.status?.id == 6 && "red"
                                        }}>{getOrderDetails?.supplierVehicle?.vehicle?.status?.name.split("_").join(" ")}</p>
                                        <div className="status_active" style={{
                                            background: getOrderDetails?.supplierVehicle?.vehicle?.status?.id == 2 && "yellow" ||
                                                getOrderDetails?.supplierVehicle?.vehicle?.status?.id == 3 && "blue" ||
                                                getOrderDetails?.supplierVehicle?.vehicle?.status?.id == 4 && "green" ||
                                                getOrderDetails?.supplierVehicle?.vehicle?.status?.id == 5 && "orange" ||
                                                getOrderDetails?.supplierVehicle?.vehicle?.status?.id == 6 && "red"
                                        }}></div>
                                    </div>
                                </div>
                                <div className="card_body">
                                    <div className="img_round">

                                    <img src={
                                        getOrderDetails?.supplierVehicle?.vehicle?.image != null ? `data:image/png;base64,${getOrderDetails?.supplierVehicle?.vehicle?.image}` :
                                            defaultCar} alt="" />
                                    </div>

                                    <div className="card_body_items">
                                        <div className="card_body_item">
                                            <h5>{t("brand")}</h5>
                                            <p>{getOrderDetails?.supplierVehicle?.vehicle?.brand}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>{t("sub_brand")}</h5>
                                            <p>{getOrderDetails?.supplierVehicle?.vehicle?.subBrand}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>{t("model")}</h5>
                                            <p>{getOrderDetails?.supplierVehicle?.vehicle?.model}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>{t("color")}</h5>
                                            <p>{getOrderDetails?.supplierVehicle?.vehicle?.color}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>{t("plates")}</h5>
                                            <p>{getOrderDetails?.supplierVehicle?.vehicle?.plate}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>{t("s/n")}</h5>
                                            <p>{getOrderDetails?.supplierVehicle?.vehicle?.serialNumber}</p>
                                        </div>
                                        <div className="card_body_item">
                                            <h5>{t("vin")}</h5>
                                            <p>{getOrderDetails?.supplierVehicle?.vehicle?.vin}</p>
                                        </div>
                                        <div className="card_footer">
                                            {
                                                getOrderDetails?.supplierVehicle?.vehicle?.status?.id == 3 ?
                                                    <>
                                                        <Link to="/dashboard/supplier/vehicle-documents"

                                                            onClick={() => {
                                                                dispatch(GetProviderVehicleDetail(getOrderDetails?.supplierVehicle?.vehicle?.id));
                                                                // dispatch(ChecksupplierImage(item?.id))
                                                                localStorage.setItem("vehicleidfordetail", getOrderDetails?.supplierVehicle?.vehicle?.id)

                                                            }}
                                                        >
                                                            {t("complete_documents")}
                                                        </Link>
                                                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                    </> :
                                                    <>
                                                        <Link to="/dashboard/supplier/vehicles-details"
                                                            onClick={() => {
                                                                dispatch(GetProviderVehicleDetail(getOrderDetails?.supplierVehicle?.vehicle?.id));
                                                                // dispatch(ChecksupplierImage(item?.id))
                                                                localStorage.setItem("vehicleidfordetail", getOrderDetails?.supplierVehicle?.vehicle?.id)

                                                            }}
                                                        >{t("vehicle_details")}</Link>
                                                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div> :
                            <NotFoundAnything text={t("no_data")} />
                    }
                </div>

            </div>
        </div>
    )
}

export default OrderDetail

