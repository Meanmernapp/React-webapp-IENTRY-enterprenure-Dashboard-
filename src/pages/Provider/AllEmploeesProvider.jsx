import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import filter from "../../assets/images/filter.svg";
import TablePagination from '@mui/material/TablePagination';
import { CheckProviderImage, GetAllStatusProvider, GetProviderEmployeeDetail, GetProvidersEmployeeSortList, ProviderslistOfEmployees } from '../../reduxToolkit/Providers/providersApi';
import FilterModalEmployee from './Modal/FilterModalEmployee';
import { GetGenderListProvider } from '../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi';
import def from '../../assets/images/user-png.png';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import NotFoundDataWarning from '../../components/NotFoundDataWarning';


const AllEmploeesProvider = () => {
    const { t } = useTranslation();
    // useState
    const dispatch = useDispatch()
    const [orderBy, setOrderBy] = useState();
    const [sortBy, setSortBy] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [showFilter, setShowFilter] = useState(false);

    // useSelector

    const { providerslistOfEmployees } = useSelector(state => state?.providersSlice)
    console.log(providerslistOfEmployees)


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

    // useEffect 
    useEffect(() => {
        dispatch(GetGenderListProvider())
        dispatch(GetAllStatusProvider())

    }, [])
    // useEffect for api call record with pagination
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
        dispatch(ProviderslistOfEmployees(body));
    }, [page, rowsPerPage, orderBy, sortBy])
    return (
        <div className="main_container_provider">
            {/* Header */}
            <div className="top_header_provider">
                <h2>{t("employees")} </h2>
                <div>
                    <Link to="/dashboard/provider/create-employee">
                        <button className='add' style={{ margin: "0 5px" }}>{t("add_employee")}</button>
                    </Link>
                    <button className="btn btn-primary filter" onClick={() => { setShowFilter(true) }}>
                        <img src={filter} alt="" />
                    </button>
                    {
                        showFilter &&
                        <FilterModalEmployee setShowFilter={setShowFilter} handlFilters={handlFilters} />

                    }


                </div>

            </div>
            {/* search bar Employeee provider*/}
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
                    providerslistOfEmployees?.content?.length > 0 ?
                        providerslistOfEmployees?.content?.map((item) => {

                            const jobTitle = item?.userType?.name.split("_").join(' ')
                            // check email length and cut off
                            const EmailSlice = item?.email.split("@")


                            return (
                                <div className="card_container mt-4">
                                    <div className="card_header">
                                        <div className="status_container">
                                            <p style={{
                                                color: item?.status?.id == 2 && "yellow" ||
                                                    item?.status?.id == 3 && "blue" ||
                                                    item?.status?.id == 4 && "green" ||
                                                    item?.status?.id == 5 && "orange" ||
                                                    item?.status?.id == 6 && "red"
                                            }}>
                                                {item?.status?.name.split("_").join(" ")}</p>
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
                                        <img src={item?.selfie != null ? `data:image/png;base64,${item?.selfie}` : def} alt="" />
                                        <div className="card_body_items">
                                            <div className="card_body_item">
                                                <h5>{t("name")}</h5>
                                                <p>{item?.name}</p>
                                            </div>
                                            <div className="card_body_item">
                                                <h5>{t("job_title")}</h5>
                                                <p>{jobTitle}</p>
                                            </div>
                                            <div className="card_body_item">
                                                <h5>{t("gender")}</h5>
                                                <p>{item?.gender ? item?.gender?.name : "- - - -"}</p>
                                            </div>
                                            <div className="card_body_item">
                                                <h5>{t("email")}</h5>
                                                <p>{EmailSlice[0]}</p>
                                            </div>
                                            <div className="card_body_item">
                                                <h5>{t("number")}</h5>
                                                <p>{item?.phoneNumber}</p>
                                            </div>
                                            <div className="card_footer">
                                                {
                                                    item?.status?.id == 3 ?
                                                        <>
                                                            <Link to="/dashboard/provider/complete-document"
                                                                onClick={() => {
                                                                    dispatch(GetProviderEmployeeDetail(item?.id));
                                                                    dispatch(CheckProviderImage(item?.id))
                                                                    localStorage.setItem("provideridfordetail", item?.id)

                                                                }}
                                                            >
                                                                {t("complete_documents")}
                                                            </Link>
                                                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                        </> :
                                                        <>
                                                            <Link to="/dashboard/provider/provider-order-detail"
                                                                onClick={() => {
                                                                    dispatch(GetProviderEmployeeDetail(item?.id));
                                                                    dispatch(CheckProviderImage(item?.id))
                                                                    localStorage.setItem("provideridfordetail", item?.id)

                                                                }}
                                                            >{t("employee_details")}</Link>
                                                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                        </>
                                                }

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        }) :
                        <NotFoundDataWarning text={t("no_employee_data")} />


                }


            </div>
            {
                providerslistOfEmployees?.content?.length > 0 &&
                <div className="d-flex justify-content-center">
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[2, 4, 6, 8, 12]}
                        count={providerslistOfEmployees?.totalElements}
                        page={page}
                        onPageChange={handleChangePage}
                        labelRowsPerPage={t("provider_employees_per_page")}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            }


        </div>
    )
}

export default AllEmploeesProvider