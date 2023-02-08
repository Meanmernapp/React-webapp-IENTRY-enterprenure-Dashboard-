import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import filter from "../../assets/images/filter.svg";
import defaultCar from '../../assets/images/default-car.png'
import { useDispatch, useSelector } from 'react-redux';
import TablePagination from '@mui/material/TablePagination';
import { DownloadProviderVehicleImages, GetProviderVehicleDetail, GetProviderVehicleImage, GetProviderVehicleImages, ProviderlistOfVehicles } from '../../reduxToolkit/Providers/providersApi';
import FilterModalVehicle from './Modal/FilterModalVehicle';
import apiInstance from '../../Apis/Axios';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import NotFoundDataWarning from '../../components/NotFoundDataWarning';




const AllVehiclesProvider = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";


    // useState
    const dispatch = useDispatch()
    const [orderBy, setOrderBy] = useState();
    const [sortBy, setSortBy] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [showFilter, setShowFilter] = useState(false);
    // const [vehicleImgUrl, setVehicleImgUrl] = useState('');

    const { providerlistOfVehicles } = useSelector(state => state?.providersSlice)
    console.log(providerlistOfVehicles)

    const handlFilters = (order, sort) => {
        setOrderBy(order);
        setSortBy(sort);
    }

    // functions
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };


    useEffect(() => {
        const body = {
            providerId: localStorage.getItem("providerId"),
            pagination: {
                "order": sortBy === 'asc' ? true : false,
                "page": page,
                "size": rowsPerPage,
                "sortBy": orderBy ? orderBy : "id"
            }
        }
        dispatch(ProviderlistOfVehicles(body));
    }, [page, rowsPerPage, orderBy, sortBy])

    return (
        <div className="main_container_vehicle">
            {/* Header */}
            <div className="top_header_vehicle">
                <h2>{t("vehicles")}</h2>
                <div>
                    <Link to='/dashboard/provider/add-vehicles'>
                        <button className='add' style={{ margin: "0 5px" }}>{t("add_vehicle")}</button>
                    </Link>
                    <button className="btn btn-primary filter" onClick={() => { setShowFilter(true) }}>
                        <img src={filter} alt="" />
                    </button>
                    {
                        showFilter &&
                        <FilterModalVehicle setShowFilter={setShowFilter} handlFilters={handlFilters} />

                    }
                </div>

            </div>
            {/* search bar vehicle provider*/}
            <div className="row  mt-4">
                <div className="col-12">
                    <input type="text" class="form-control" name="x" />
                    <span class="search_btn">
                        <button class="btn btn-default" type="button">
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </span>
                </div>
            </div>
            {/* body all employee */}
            <div className='list_employees'>
                {
                    providerlistOfVehicles?.content?.length > 0 ?
                        providerlistOfVehicles?.content?.map((item, i) => {

                            // let vehicleImgUrl;
                            // async function getData(id) {
                            //     const response = await dispatch(GetProviderVehicleImages(id));
                            //     console.log(response)
                            //     vehicleImgUrl = await response.payload?.data?.data?.image
                            //     console.log(vehicleImgUrl)
                            // }
                            // getData(item?.id);

                            // async function getData(id) {
                            // var vehicleImgUrl = apiInstance
                            //     .get(
                            //         `vehicle-service/vehicle-image/get-image/get-by-vehicle-id/${item?.id}`
                            //     )
                            //     .then(function (response) {
                            //         return response?.data?.data?.image;
                            //     })
                            //     .catch(function (error) {
                            //         return error.response;
                            //     });
                            // console.log(vehicleImgUrl)

                            // return result    
                            // }
                            // getData(item?.id);
                            // console.log(vehicleImgUrl)



                            return (
                                <div className="card_container mt-4" key={i}>
                                    <div className="card_header">

                                        <div className="status_container">
                                            <p style={{
                                                color: item?.status?.id == 2 && "yellow" ||
                                                    item?.status?.id == 3 && "blue" ||
                                                    item?.status?.id == 4 && "green" ||
                                                    item?.status?.id == 5 && "orange" ||
                                                    item?.status?.id == 6 && "red"
                                            }}>{item?.status?.name.split("_").join(" ")}</p>
                                            <div className="status_active" style={{
                                                background: item?.status?.id == 2 && "yellow" ||
                                                    item?.status?.id == 3 && "blue" ||
                                                    item?.status?.id == 4 && "green" ||
                                                    item?.status?.id == 5 && "orange" ||
                                                    item?.status?.id == 6 && "red"
                                            }}></div>
                                        </div>
                                    </div>
                                    <div className="card_body">
                                        <img src={
                                            item?.image != null ? `data:image/png;base64,${item?.image}` :
                                                defaultCar} alt="" />
                                        <div className="card_body_items">
                                            <div className="card_body_item">
                                                <h5>{t("brand")}</h5>
                                                <p>{item?.brand}</p>
                                            </div>
                                            <div className="card_body_item">
                                                <h5>{t("sub_brand")}</h5>
                                                <p>{item?.subBrand}</p>
                                            </div>
                                            <div className="card_body_item">
                                                <h5>{t("model")}</h5>
                                                <p>{item?.model}</p>
                                            </div>
                                            <div className="card_body_item">
                                                <h5>{t("color")}</h5>
                                                <p>{item?.color}</p>
                                            </div>
                                            <div className="card_body_item">
                                                <h5>{t("plates")}</h5>
                                                <p>{item?.plate}</p>
                                            </div>
                                            {/* <div className="card_body_item">
                                        <h5>Type</h5>
                                        <p>{item?.type}</p>
                                    </div> */}
                                            <div className="card_body_item">
                                                <h5>{t("s_n")}</h5>
                                                <p>{item?.serialNumber}</p>
                                            </div>
                                            <div className="card_footer">
                                                {
                                                    item?.status?.id == 3 ?
                                                        <>
                                                            <Link to="/dashboard/provider/vehicle-documents"

                                                                onClick={() => {
                                                                    dispatch(GetProviderVehicleDetail(item?.id));
                                                                    // dispatch(CheckProviderImage(item?.id))
                                                                    localStorage.setItem("vehicleidfordetail", item?.id)

                                                                }}
                                                            >
                                                                {t("complete_documents")}
                                                            </Link>
                                                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                        </> :
                                                        <>
                                                            <Link to="/dashboard/provider/vehicles-details"
                                                                onClick={() => {
                                                                    dispatch(GetProviderVehicleDetail(item?.id));
                                                                    // dispatch(CheckProviderImage(item?.id))
                                                                    localStorage.setItem("vehicleidfordetail", item?.id)

                                                                }}
                                                            >{t("vehicle_details")}</Link>
                                                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                        </>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        }) :
                        <NotFoundDataWarning text={t("nov_vehicle_data")} />
                }


            </div>
            {
                providerlistOfVehicles?.content?.length > 0 &&
                <div className="d-flex justify-content-center">
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[2, 4, 6, 8, 12]}
                        count={providerlistOfVehicles?.totalElements}
                        page={page}
                        onPageChange={handleChangePage}
                        labelRowsPerPage={t("vehicles_per_page")}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            }


        </div>
    )
}

export default AllVehiclesProvider